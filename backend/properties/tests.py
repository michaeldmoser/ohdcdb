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

    def test_list_of_properties_is_ordered(self):
        '''Test the list of people is order by first/last name'''
        PropertiesFactory.create_batch(10)
        response = self.client.get(
            reverse('properties-list'))

        properties = response.json()

        names = [property.address1 for property in properties]
        expected_order = sorted(names)

        self.assertEqual(expected_order, names)
