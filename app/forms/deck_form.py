from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length


class DeckForm(FlaskForm):
    title = StringField('title', validators=[
        DataRequired(message="Decks need a title."),
        Length(
            min=3,
            max=20,
            message="Title must be 3-20 characters."
        )
    ])
    description = StringField('description', validators=[
        Length(
            max=55,
            message="Description must not be more than 55 characters."
        )
    ])
    image = StringField('image', validators=[
        Length(
            max=255,
            message="File name must be less than 255 characters."
        )
    ])
