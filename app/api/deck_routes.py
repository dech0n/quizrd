from app.api.auth_routes import validation_errors_to_error_messages
from flask import Blueprint, jsonify, session, request
from app.models import db, Deck, Category
from app.forms import DeckForm
from flask_login import current_user, login_required


deck_routes = Blueprint('decks', __name__)

# TODO: make sure API is restful


@deck_routes.route('/')
def get_all_decks():
    decks = Deck.query.all()
    return {
        'decks': [deck.to_dict() for deck in decks]
    }


@deck_routes.route('/new', methods=['POST'])
@login_required
def new_deck():
    # POST data should look like this when categories are done:
    # {
    #     'title': 'some title',
    #     'description': 'some description',
    #     'image': 'some image file name',
    #     'categories': [
    #         {'name': 'Categ Name1'},
    #         {'name': 'Categ Name2'},
    #         {'name': '...'}
    #         ]
    # }

    form = DeckForm()
    # manually add CSRF token so form can be validatied
    form['csrf_token'].data = request.cookies['csrf_token']

    if request.method == 'POST':
        # handle optional data
        # maybe implement this on the frontend/clientside instead for efficency
        if "description" not in form.data:
            form.data.setdefault("description", "A great deck!")
        if "image" not in form.data:
            form.data.setdefault("image")

        # create the deck it it passes validations
        if form.validate_on_submit():
            deck = Deck(
                owner=current_user,
                title=form.data["title"],
                description=form.data["description"],
                image=form.data["image"]
            )
            # create the categor(ies) here
            if "catgories" in form.data:
                categories_for_db = []
                for category_data in form.data["categories"]:
                    category = Category(name=category_data["name"])
                    deck.categories.append(category)
                    categories_for_db.append(category)
                db.session.add_all(categories_for_db)
            else:
                form.data.setdefault("categories")
                # deck.categories.append("")
            # get everything into the database
            db.session.add(deck)
            db.session.commit()
            # print('*** NEW DECK ***', deck.to_dict)
            return deck.to_dict()  # contains the new categories
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@deck_routes.route('/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def get_or_delete_deck(id):
    deck = Deck.query.get(id)
    if deck is None:
        return {"errors": ["Unable to find the associated deck"]}, 400

    if request.method == 'GET':
        pass  # already got deck from db
    elif request.method == 'PUT':
        form = DeckForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        # handle empty/missing data from form
        # if 'title' not in form.data:
        #     form.data.setdefault('title', None)
        # if 'description' not in form.data:
        #     form.data.setdefault('description', None)
        # if 'image' not in form.data:
        #     form.data.setdefault('image', None)
        # update the data in the db if form validates
        if form.validate_on_submit():
            deck.title = form.data['title'],
            deck.description = form.data['description'],
            deck.image = form.data['image']

            db.session.commit()
        else:
            return {'errors': validation_errors_to_error_messages(form.errors)}, 400

    elif request.method == 'DELETE':
        # print('*** DELETE DECK ***', deck.to_dict())
        db.session.delete(deck)
        db.session.commit()
    # print('** API ONE DECK **', deck.to_dict())
    return deck.to_dict()


@ deck_routes.route('/users/<int:user_id>')
@login_required
def get_user_decks(user_id):
    decks = Deck.query.filter_by(owner_id=user_id).all()
    if decks is not None:
        # make sure to flatten this in the thunk
        return {'decks': [deck.to_dict() for deck in decks]}
    return {"errors": ["Something went wrong. Unable to find decks for this user."]}
