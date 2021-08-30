from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length


class DeckForm(FlaskForm):
    title = StringField('title', validators=[
        DataRequired(),
        Length(
            min=3,
            max=50,
            message="Title must be 3-50 characters in length."
        )
    ])
    description = StringField('description', validators=[
        Length(
            max=255,
            message="Description must not be more than 255 characters."
        )
    ])
    image = StringField('image')
