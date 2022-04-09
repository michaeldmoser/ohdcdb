'''
Factory for creating Property records
'''
import factory
from factory.django import DjangoModelFactory

from properties.models import Properties


class PropertiesFactory(DjangoModelFactory):
    '''
    Factory for creating Property records
    '''
    class Meta:
        '''Meta class'''
        model = Properties

    address1 = factory.Faker('street_address')
    address2 = factory.Faker('random_element', elements=(
        '', '', '', '', '', '', '', '', '', 'A', 'B', 'C', 'B UNIT'))
    postalcode = factory.Faker(
        'random_element', elements=('59801', '59804', '59802'))
    acres = factory.Faker('pyfloat', positive=True,
                          max_value=5.0, right_digits=2)
    date_entered = factory.Faker('past_datetime')
