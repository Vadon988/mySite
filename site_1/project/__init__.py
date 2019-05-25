from flask import Flask
from flask_wtf.csrf import CSRFProtect
from flask_bcrypt import Bcrypt

app=Flask(__name__)
app.secret_key='secret'
csrf=CSRFProtect(app)
bcrypt=Bcrypt(app)


from project import routs