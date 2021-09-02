from .db import db


class Card(db.Model):
    __tablename__ = 'cards'

    id = db.Column(db.Integer, primary_key=True)
    # if error on delete, remove nullable
    deck_id = db.Column(db.Integer, db.ForeignKey('decks.id'), nullable=False)
    front_text = db.Column(db.String(150), nullable=False)
    back_text = db.Column(db.String(150), nullable=False)
    front_image = db.Column(db.String(255))
    back_image = db.Column(db.String(255))

    def to_dict(self):
        return {
            'id': self.id,
            'deck_id': self.deck_id,
            'front_text': self.front_text,
            'back_text': self.back_text,
            'front_image': self.front_image,
            'back_image': self.back_image
        }
