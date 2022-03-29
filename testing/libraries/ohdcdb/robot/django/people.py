'''Tools for working with Django People objects in Robotframework'''
from robotlibcore import keyword
from ...factories.people import PeopleFactory


class PeopleLib:  # pylint: disable=too-few-public-methods
    '''Keywords for working with People/Persons in Django'''

    @keyword
    def add_people_to_database(self, number):  # pylint: disable=no-self-use
        '''
        Add <number> of person records to the database using randomly generate data.
        '''
        return PeopleFactory.create_batch(int(number))
