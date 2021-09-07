from .db import db
from .deck_categories import deck_categories
from .deck_learners import deck_learners

#! Add cascade delete for categories.
class Deck(db.Model):
    __tablename__ = 'decks'

    id = db.Column(db.Integer, primary_key=True)
    # if error on delete, remove nullable
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete="CASCADE"), nullable=False)
    title = db.Column(db.String(20), nullable=False)
    description = db.Column(db.String(70))
    image = db.Column(db.String(255))
    cards = db.relationship('Card', backref='deck', cascade="all, delete")
    # might need to adjust lazy='subquery' if not getting all categories
    # https://flask-sqlalchemy.palletsprojects.com/en/2.x/models/ <-- docs
    categories = db.relationship('Category',
                                 secondary=deck_categories,
                                 #  lazy='subquery',
                                 backref=db.backref('deck', lazy='dynamic'), cascade="all, delete"
                                 )
    learners = db.relationship('User',
                               secondary=deck_learners,
                               backref=db.backref('deck', lazy=True)
                               )

    def to_dict(self):
        deck_cards = [card.to_dict() for card in self.cards]
        deck_category_list = [category.to_dict()
                              for category in self.categories]
        deck_learner_list = [learner.to_learner_dict()
                             for learner in self.learners]
        return {
            'id': self.id,
            'owner_id': self.owner_id,
            'title': self.title,
            'description': self.description,
            'image': self.image,
            'cards': deck_cards,
            'categories': deck_category_list,
            'learners': deck_learner_list
            # was causing a stack overflow because User called Deck.to_dict()
            # and this calls User.to_dict() for each learner... endless loop
        }
