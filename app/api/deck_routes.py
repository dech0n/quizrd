from flask import Blueprint, jsonify, session, request
from app.models import db, User, Deck, Category
from flask_login import current_user, login_required


deck_routes = Blueprint('decks', __name__)

# TODO: add PUT method & logic
@deck_routes.route('/', methods=['POST'])
@login_required
def new_deck():
    data = request.get_json()
    # POST data should look like this:
    # {
    #     'title': 'some title',
    #     'description': 'some description',
    #     'image': 'some image file name',
    #     'categories': ['categ_data1', 'categ_data2', '...']
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
        return deck.to_dict()  # contains the new categories


@deck_routes.route('/<int:id>', methods=['GET', 'DELETE'])
def get_or_delete_deck(id):
    deck = Deck.query.get(id)

    if request.method == 'GET':
        pass  # already got deck from db
    elif request.method == 'DELETE':
        db.session.delete(deck)
        db.session.commit()

    return deck.to_dict()
