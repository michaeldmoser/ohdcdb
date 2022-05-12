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

        names = [property['address1'] for property in properties]
        expected_order = sorted(names)

        self.assertEqual(expected_order, names)

    def test_owner_details_on_property(self):
        '''Test that the owner details are present in the list'''
        expected = PropertiesFactory.create_batch(10)
        response = self.client.get(
            reverse('properties-list'))

        actual = response.json()

        expected.sort(key=lambda property: property.address1)
        actual.sort(key=lambda property: property['address1'])

        self.assertEqual(expected[0].owners.all()[0].first_name,
                         actual[0]['owners'][0]['first_name'])
        self.assertEqual(expected[0].owners.all()[0].last_name,
                         actual[0]['owners'][0]['last_name'])
        self.assertEqual(expected[0].owners.all()[0].id,
                         actual[0]['owners'][0]['id'])
