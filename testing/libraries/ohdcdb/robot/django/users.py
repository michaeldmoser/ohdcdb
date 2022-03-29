'''Tools for working with Django users in Robotframework'''
from robotlibcore import keyword

from rest_framework_simplejwt.tokens import RefreshToken

from ...factories.users import UserFactory


class UsersLib:
    '''Django User based keywords'''

    @keyword
    def create_user(self, username='', email=''):
        '''
        Create a regular Django user
        '''
        kwargs = {
            'username': username
        }

        if email:
            kwargs['email'] = email

        user = UserFactory.create(**kwargs)

        return user

    @keyword
    def get_token_for_user(self, user):
        '''
        Create a new token and add it to the sessionStorage in the brower. Note that a browser window must be open
        '''
        refresh = RefreshToken.for_user(user)

        return {
            'refresh_token': str(refresh),
            'access_token': str(refresh.access_token),
        }
