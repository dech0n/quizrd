from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length


class DeckForm(FlaskForm):
    title = StringField('title', validators=[
        DataRequired(),
        Length(
            min=3,
            max=50,
            message="Title must be 3-50 characters."
        )
    ])
    description = StringField('description', validators=[
        Length(
            max=255,
            message="Title must be less than 255 characters."
        )
    ])
    image = StringField('image', validators=[
        Length(
            max=255,
            message="File name must be less than 255 characters."
        )
    ])
