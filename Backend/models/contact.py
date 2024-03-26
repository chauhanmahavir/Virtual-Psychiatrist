from mongoengine import Document, StringField, DateTimeField, EmailField
from datetime import datetime

class Contact(Document):
    name = StringField(required = True, max_length = 100)
    email = EmailField(required = True, unique = False)
    message = StringField(required = True, max_length = 200)
    created_at = DateTimeField(default = datetime.utcnow())