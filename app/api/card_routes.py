from app.api.auth_routes import validation_errors_to_error_messages
from flask import Blueprint, jsonify, session, request
from flask_login import current_user, login_required
from app.models import db, Deck, Card
from app.forms import CardForm
from app.aws_s3_helpers import upload_file_to_s3, allowed_file, get_unique_filename
# import pdb  #! debugger


card_routes = Blueprint('cards', __name__)

# TODO: add error handling to all routes


@card_routes.route('/', methods=['POST'])
@login_required
def cards():
    """
    POST method creates a new card in the database
    and returns the data in a dictionary.
    """

    # TODO: refactor front_image and back_image conditionals to be less redundant of each other
    # TODO: add audio upload functionality
    # TODO: add front/back_image editability on PUT route
    if request.method == 'POST':
        form = CardForm()
        # pdb.set_trace() #! debug
        form['csrf_token'].data = request.cookies['csrf_token']
        # pdb.set_trace() #! debug
        deck = Deck.query.get(form.data["deck_id"])
        if deck is None:
            return {"errors": ["Couldn't find the deck to add this card."]}, 400
        # validate the form data in the request
        if form.validate_on_submit():
            # check if there are any files in the request
            if "front_image" in request.files:
                front_image = request.files["front_image"]
                # validate the front_image file
                if not allowed_file(front_image.filename):
                    return {"errors": "file type not permitted for 'Front of flashcard' image"}
                front_image.filename = get_unique_filename(
                    front_image.filename)
                front_image_upload = upload_file_to_s3(front_image)
                if "url" not in front_image_upload:
                    return front_image_upload, 400
                front_image_url = front_image_upload["url"]

            if "back_image" in request.files:
                back_image = request.files["back_image"]
                # validate the back_image file
                if not allowed_file(back_image.filename):
                    return {"errors": "file type not permitted for 'Back of flashcard' image"}
                # get unique file names for the image and upload it to S3
                back_image.filename = get_unique_filename(back_image.filename)
                back_image_upload = upload_file_to_s3(back_image)
                if "url" not in back_image_upload:
                    return back_image_upload, 400
                back_image_url = back_image_upload["url"]

            card = Card(
                deck=deck,
                front_text=form.data['front_text'],
                back_text=form.data['back_text'],
                front_image=front_image_url if "front_image" in locals(
                ) else form.data['front_image'],
                back_image=back_image_url if "back_image" in locals(
                ) else form.data['back_image']
            )

            db.session.add(card)
            db.session.commit()
            return card.to_dict()
        return {"errors": validation_errors_to_error_messages(form.errors)}, 400


@card_routes.route('/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def get_one_card(id):
    """
    Queries a single card from the database with the id/pk provided in the URL
    and returns the data in a dictionary.

    DELETE method also removes the card from the database.

    PUT method also updates the card data in the database
    and the returned card data.
    """
    card = Card.query.get(id)

    if card:
        if request.method == 'GET':
            pass  # already queried card from db
        elif request.method == 'PUT':
            form = CardForm()
            form['csrf_token'].data = request.cookies['csrf_token']
            # validate the form data in the request
            if form.validate_on_submit():
                # check if there are any files in the request
                if "front_image" in request.files:
                    front_image = request.files["front_image"]
                    # validate the front_image file
                    if not allowed_file(front_image.filename):
                        return {"errors": "file type not permitted for 'Front of flashcard' image"}
                    front_image.filename = get_unique_filename(
                        front_image.filename)
                    front_image_upload = upload_file_to_s3(front_image)
                    if "url" not in front_image_upload:
                        return front_image_upload, 400
                    front_image_url = front_image_upload["url"]

                if "back_image" in request.files:
                    back_image = request.files["back_image"]
                    # validate the back_image file
                    if not allowed_file(back_image.filename):
                        return {"errors": "file type not permitted for 'Back of flashcard' image"}
                    # get unique file names for the image and upload it to S3
                    back_image.filename = get_unique_filename(
                        back_image.filename)
                    back_image_upload = upload_file_to_s3(back_image)
                    if "url" not in back_image_upload:
                        return back_image_upload, 400
                    back_image_url = back_image_upload["url"]

                card.front_text = form.data['front_text']
                card.back_text = form.data['back_text']
                # set to front_image_url if front_image exists...
                card.front_image = front_image_url if "front_image" in locals(
                # otherwise, use the value in the form data
                ) else form.data['front_image']
                card.back_image = back_image_url if "back_image" in locals(
                ) else form.data['back_image']

                db.session.commit()

                return card.to_dict()
            # if form validation fails
            return {"errors": validation_errors_to_error_messages(form.errors)}, 400

        else:
            db.session.delete(card)
            db.session.commit()

        return card.to_dict()
    return {"errors": ["Card not found, did nothing."]}, 400


@card_routes.route('/decks/<int:deck_id>')
def get_deck_cards(deck_id):
    """
    Queries database for all cards that belong to the deck
    specified by deck_id and returns the data in a dictionary.
    """
    cards = Card.query.filter_by(deck_id=deck_id).all()
    # print('*** CARDS FROM QUERY ***', cards)
    if cards:
        return {"cards": [card.to_dict() for card in cards]}
    elif cards == []:
        return {"cards": [{"id": "empty", "message": "There are no cards in this deck"}]}
    else:
        return {"errors": ["Couldn't find the decks you were looking for."]}, 400
