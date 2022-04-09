'''Tools for working with Django People objects in Robotframework'''
from robotlibcore import keyword
from ...factories.properties import PropertiesFactory


class PropertiesLib:  # pylint: disable=too-few-public-methods
    '''Keywords for working with People/Persons in Django'''

    @keyword
    def add_properties_to_database(self, number):  # pylint: disable=no-self-use
        '''
        Add <number> of person records to the database using randomly generate data.
        '''
        return PropertiesFactory.create_batch(int(number))

    @keyword
    def generate_new_property(self):
        '''
        Create a new unsaved property
        '''
        return PropertiesFactory.build()
