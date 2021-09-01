from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length


class CardForm(FlaskForm):
    deck_id = IntegerField('deck_id', validators=[
        DataRequired(message="Deck ID was not included")
        ])
    front_text = StringField('front_text', validators=[
        DataRequired(message="Text on the front is required."),
        Length(
            max=255,
            message="Card text must be 255 characters or less."
        )
    ])
    back_text = StringField('back_text', validators=[
        DataRequired(message="Text on the back is required."),
        Length(
            max=255,
            message="Card text must be 255 characters or less.")
    ])
    front_image = StringField('front_image', validators=[
        Length(
            max=255,
            message="File name must not exceed 255 characters."
        )
    ])
    back_image = StringField('back_image', validators=[
        Length(
            max=255,
            message="File name must not exceed 255 characters."
        )
    ])
