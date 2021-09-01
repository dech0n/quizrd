from app.api.auth_routes import validation_errors_to_error_messages
from flask import Blueprint, jsonify, session, request
from app.models import db, Deck, Card
from app.forms import CardForm
from flask_login import current_user, login_required
import pdb


card_routes = Blueprint('cards', __name__)

# TODO: add error handling to all routes


@card_routes.route('/', methods=['POST'])
@login_required
def cards():
    """
    POST method creates a new card in the database
    and returns the data in a dictionary.
    """
    if request.method == 'POST':
        form = CardForm()
        # pdb.set_trace() #! debug
        form['csrf_token'].data = request.cookies['csrf_token']
        # pdb.set_trace() #! debug
        deck = Deck.query.get(form.data["deck_id"])
        if form.validate_on_submit():
            if 'front_image' not in form.data:
                form.data.setdefault('front_image')
            if 'back_image' not in form.data:
                form.data.setdefault('back_image')
            card = Card(
                deck=deck,
                front_text=form.data['front_text'],
                back_text=form.data['back_text'],
                front_image=form.data['front_image'],
                back_image=form.data['back_image']
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
            form.data['csrf_token'] = request.cookies['csrf_token']
            if form.validate_on_submit():
                if "front_image" not in form.data:
                    form.data.setdefault("front_image")
                if "back_image" not in form.data:
                    form.data.setdefault("back_image")

                card.front_text = form.data['front_text']
                card.back_text = form.data['back_text']
                card.front_image = form.data['front_image']
                card.back_image = form.data['back_image']

                db.session.commit()
        else:
            db.session.delete(card)
            db.session.commit()

        return card.to_dict()
    # return errors here


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
        return {"cards": []}
    # return errors here
