from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired


class CardForm(FlaskForm):
    front_text = StringField('front_text', validators=[DataRequired()])
    back_text = StringField('back_text', validators=[DataRequired()])
    front_image = StringField('front_image')
    back_image = StringField('back_image')
