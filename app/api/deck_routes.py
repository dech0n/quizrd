from flask import Blueprint, jsonify, session, request
from app.models import db, Deck, Category, User
from flask_login import current_user, login_required


deck_routes = Blueprint('decks', __name__)

# TODO: add PUT method & logic
# TODO: make sure API is restful


@deck_routes.route('/')
def get_all_decks():
    decks = Deck.query.all()
    return {
        'decks': [deck.to_dict() for deck in decks]
    }


@deck_routes.route('/new', methods=['POST'])
# @login_required
def new_deck():
    data = request.get_json()
    # POST data should look like this:
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

    if request.method == 'POST':
        # handle optional data
        # maybe implement this on the frontend/clientside instead for efficency
        if "description" not in data:
            data.setdefault("description")
        if "image" not in data:
            data.setdefault("image")

        # create the deck
        deck = Deck(
            owner=current_user,
            title=data["title"],
            description=data["description"],
            image=data["image"]
        )

        # create the categor(ies) here
        categories_for_db = []
        for category_data in data["categories"]:
            category = Category(name=category_data["name"])
            deck.categories.append(category)
            categories_for_db.append(category)
        # get everything into the database
        db.session.add(deck)
        db.session.add_all(categories_for_db)
        db.session.commit()
        # print('*** NEW DECK ***', deck.to_dict)
        return deck.to_dict()  # contains the new categories


@deck_routes.route('/<int:id>', methods=['GET', 'DELETE'])
def get_or_delete_deck(id):
    deck = Deck.query.get(id)

    if request.method == 'GET':
        pass  # already got deck from db
    elif request.method == 'DELETE':
        db.session.delete(deck)
        db.session.commit()
    print('*** DELETE DECK ***', deck.to_dict())
    return deck.to_dict()


@deck_routes.route('/users/<int:user_id>')
# @login_required
def get_user_decks(user_id):
    if user_id is None:
        decks = current_user.decks
    else:
        decks = Deck.query.filter_by(owner_id=user_id).all()

    # make sure to flatten this in the thunk
    return {'decks': [deck.to_dict() for deck in decks]}
