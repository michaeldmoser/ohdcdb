'''
Factory for creating user records
'''
import factory
from factory.django import DjangoModelFactory

from django.contrib.auth.models import User


class UserFactory(DjangoModelFactory):
    '''
    Factory for creating Person/People records
    '''
    class Meta:
        '''Meta class'''
        model = User

    first_name = factory.Faker('first_name')
    last_name = factory.Faker('last_name')
    email = factory.Faker('email')
    password = factory.PostGenerationMethodCall('set_password', 'Test1234!')
