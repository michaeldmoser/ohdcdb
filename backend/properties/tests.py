'''
Test the people app
'''
from django.test import TestCase
from django.urls import reverse
from django.contrib.auth.models import User

from rest_framework.test import APIClient

from ohdcdb.factories.properties import PropertiesFactory


class PropertiesTestCase(TestCase):
    '''Test Properties app'''

    def setUp(self) -> None:
        self.password = 'Test1234!'
        self.user = User.objects.create_user(
            'sampleuser', 'sampleuser@example.com', self.password)
        self.client = APIClient()
        self.client.force_authenticate(self.user)

        return super().setUp()

    def test_can_list_properties(self):
        '''Test the list of properties doesnt't blow up'''
        PropertiesFactory.create_batch(10)
        response = self.client.get(
            reverse('properties-list'))

        self.assertEquals({}, response.json()[0]['address'])
