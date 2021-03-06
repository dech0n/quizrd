from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if not user:
        raise ValidationError('Oops!')


def password_matches(form, field):
    # Checking if password matches
    password = field.data
    email = form.data['email']
    user = User.query.filter(User.email == email).first()
    if not user:
        raise ValidationError('Invalid username or password.')
    elif not user.check_password(password):
        raise ValidationError('Invalid username or password.')


class LoginForm(FlaskForm):
    email = StringField('email', validators=[
        DataRequired(message="Email is required.")
        ])
    password = StringField('password', validators=[
                           DataRequired(message="Password is required."),
                           password_matches])
