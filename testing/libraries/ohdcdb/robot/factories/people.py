'''
Factory for creating Person/People records
'''
import factory
from factory.django import DjangoModelFactory

from people.models import People


class PeopleFactory(DjangoModelFactory):
    '''
    Factory for creating Person/People records
    '''
    class Meta:
        '''Meta class'''
        model = People

    first_name = factory.Faker('first_name')
    last_name = factory.Faker('last_name')
    email = factory.Faker('email'),
    mobile = factory.Sequence(lambda n: f'406-555-{n:04}')
    home = factory.Sequence(lambda n: f'406-555-{n:04}')
    date_entered = factory.Faker('past_datetime')
