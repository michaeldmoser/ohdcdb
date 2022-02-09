'''
Library for testing with Django
'''
import sys
import os
import django


class Django:  # pylint: disable=no-self-use
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

        from django.core.management import ManagementUtility  # pylint: disable=import-outside-toplevel
        self.ManagementUtility = ManagementUtility

    def create_user(self, email='', username='', password=''):
        '''
        Create a regular Django user
        '''
        from django.contrib.auth.models import User  # pylint: disable=import-outside-toplevel
        user = User.objects.create_user(username, email, password)

        return {
            'username': user.username,
            'email': user.email,
        }

    def flush_database(self):
        '''
        Clears the database of all data.
        '''
        manager = self.ManagementUtility(['', 'flush', '--noinput'])
        manager.execute()

    def backup_database(self, path='testing/backups/backup.json'):
        '''
        Creates a backup of the database
        '''
        manager = self.ManagementUtility(
            ['', 'dumpdata', '--output', path, '-v', '0'])
        manager.execute()

    def restore_database(self, path='testing/backups/backup.json'):
        '''
        Creates a backup of the database
        '''
        self.flush_database()
        manager = self.ManagementUtility(
            ['', 'loaddata', '-v', '0', path])
        manager.execute()
