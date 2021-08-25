from .db import db

# joins table for decks and users
deck_learners = db.Table('deck_learners',
                         db.Column('learner_id',
                                   db.Integer,
                                   db.ForeignKey('users.id'),
                                   primary_key=True),
                         db.Column('deck_id',
                                   db.Integer,
                                   db.ForeignKey('decks.id'),
                                   primary_key=True)
                         )
