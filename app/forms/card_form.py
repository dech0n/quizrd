from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired


class CardForm(FlaskForm):
    frontText = StringField('frontText', validators=[DataRequired()])
    backText = StringField('backText', validators=[DataRequired()])
    frontImage = StringField('frontImage')
    backImage = StringField('backImage')
