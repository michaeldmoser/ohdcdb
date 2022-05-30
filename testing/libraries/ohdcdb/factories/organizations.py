'''
Factory for creating Organizations records
'''
import factory
from factory.django import DjangoModelFactory

from organizations.models import Organization


class OrganizationsFactory(DjangoModelFactory):
    '''
    Factory for creating Organizations records
    '''
    class Meta:
        '''Meta class'''
        model = Organization

    name = factory.Faker('company')
    contact_name = factory.Faker('name')
    contact_email = factory.Faker('email')
    contact_phone = factory.Sequence(lambda n: f'406-555-{n:04}')
    date_entered = factory.Faker('past_datetime')
