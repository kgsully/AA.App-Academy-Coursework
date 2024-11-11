import os

# Configuration Class:
    # Not only are you likely to want many configured values, but best practices state that separating concerns into
    # distinct files and classes is a superior approach.
    # Therefore, Flask easily supports loading a module class for your configuration. You can give it a try.
class Config(object):
    GREETING = 'Salutations, superior students!'
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'default-key-for-devs'
