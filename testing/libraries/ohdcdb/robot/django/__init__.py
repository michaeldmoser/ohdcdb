'''
Library for testing with Django
'''
import sys
import os

from robotlibcore import DynamicCore
from robotlibcore import keyword

from django.core.management import ManagementUtility


from .users import UsersLib
from .people import PeopleLib


class Django(DynamicCore):  # pylint: disable=no-self-use
    '''
    ohddb.Django is a web testing library to interact with Django
    '''

    def __init__(self, path='', settings='backend.settings'):
        '''
        `path` is the path to the directory containing the manage.py file.
        `settings` module import containing the django settings
        '''
        libraries = [UsersLib(), PeopleLib()]
        DynamicCore.__init__(self, libraries)

        self.ManagementUtility = ManagementUtility  # pylint: disable=invalid-name

    @keyword
    def flush_database(self):
        '''
        Clears the database of all data.
        '''
        manager = self.ManagementUtility(['', 'flush', '--noinput'])
        manager.execute()

    @keyword
    def backup_database(self, path='testing/backups/backup.json'):
        '''
        Creates a backup of the database
        '''
        manager = self.ManagementUtility(
            ['', 'dumpdata', '--output', path, '-v', '0'])
        manager.execute()

    @keyword
    def restore_database(self, path='testing/backups/backup.json'):
        '''
        Creates a backup of the database
        '''
        self.flush_database()
        manager = self.ManagementUtility(
            ['', 'loaddata', '-v', '0', path])
        manager.execute()
