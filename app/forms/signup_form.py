from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


# TODO: Add optional field for profile pic
class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[
            DataRequired(message="Username is required."),
            Length(
                min=3,
                max=20,
                message="Username must be 3-20 characters."
            ),
            username_exists
        ])
    email = StringField('email', validators=[
        DataRequired(message="Email is required."),
        Email(message="Invalid email address."),
        user_exists
    ])
    password = StringField('password', validators=[
        DataRequired(message="Both password fields are required."),
        Length(
            min=8,
            message="Password must contain at least 8 characters."
        )
    ])
