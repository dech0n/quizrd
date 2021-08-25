from .db import db

# joins table for decks and categories
deck_categories = db.Table('deck_categories',
                           db.Column('category_id',
                                     db.Integer,
                                     db.ForeignKey('categories.id'),
                                     primary_key=True),
                           db.Column('deck_id',
                                     db.Integer,
                                     db.ForeignKey('decks.id'),
                                     primary_key=True)
                           )
