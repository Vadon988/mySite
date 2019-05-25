from flask_wtf import FlaskForm
from wtforms import StringField,SubmitField,PasswordField
from wtforms.validators import DataRequired,Email

class LoginForm(FlaskForm):
	username=StringField(validators=[DataRequired()])
	email=StringField(validators=[DataRequired()])
	password=PasswordField(validators=[DataRequired()])
	login=SubmitField()

class LogoutForm(FlaskForm):
	username=StringField()
	logout=SubmitField('Logout')