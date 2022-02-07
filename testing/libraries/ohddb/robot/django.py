import sys
import os
import django


class Django:
    '''
    ohddb.Django is a web testing library to interact with Django
    '''

    def __init__(self, path='', settings='backend.settings'):
        '''
        `path` is the path to the directory containing the manage.py file.
        `settings` module import containing the django settings
        '''
        self.path = path
        self.settings = settings

        sys.path.append(self.path)
        os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

        django.setup()

    def create_user(self, email='', username='', password=''):
        '''
        Create a regular Django user
        '''
        from django.contrib.auth.models import User
        user = User.objects.create_user(username, email, password)

        return {
            'username': user.username,
            'email': user.email,
        }

    def flush_database(self):
        '''
        Clears the database of all data.
        '''
        from django.core.management import ManagementUtility
        manager = ManagementUtility(['', 'flush', '--noinput'])
        manager.execute()
