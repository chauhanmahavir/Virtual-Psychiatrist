from mongoengine import Document, StringField, DateTimeField, EmailField
from datetime import datetime

class User(Document):
    name = StringField(required = True, max_length = 100)
    email = EmailField(required = True, unique = True)
    password = StringField(required = True, max_length = 100)
    created_at = DateTimeField(default = datetime.utcnow())
    updated_at = DateTimeField(default =  datetime.utcnow())