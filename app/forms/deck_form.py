from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired


class DeckForm(FlaskForm):
    title = StringField('title', validators=[DataRequired()])
    description = StringField('description')
    image = StringField('image')
