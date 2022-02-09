'''
Test various aspects of authentication
'''
from django.test import TestCase, Client
from django.urls import reverse

from django.contrib.auth.models import User


class AuthenticationTestCase(TestCase):
    '''Test authentication of users'''

    def setUp(self) -> None:
        self.password = 'Test1234!'
        self.user = User.objects.create_user(
            'sampleuser', 'sampleuser@example.com', self.password)
        self.client = Client()

        return super().setUp()

    def test_user_can_login(self):
        '''Test that a valid user can login'''
        response = self.client.post(reverse('token_obtain_pair'), {
            'username': self.user.username, 'password': self.password})

        self.assertEqual(response.status_code, 200)
        self.assertIn('refresh', response.json())
        self.assertIn('access', response.json())

    def test_user_login_fails_invalid_password(self):
        '''Test that using an invalid password fails'''
        response = self.client.post(reverse('token_obtain_pair'), {
            'username': self.user.username, 'password': 'invalid'})

        self.assertEqual(response.status_code, 401)

    def test_user_login_fails_invalid_username(self):
        '''Test that using an invalid username fails'''
        client = Client()
        response = client.post(reverse('token_obtain_pair'), {
                               'username': 'nouser', 'password': 'invalid'})

        self.assertEqual(response.status_code, 401)
