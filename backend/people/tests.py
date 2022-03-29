'''
Test the people app
'''
from django.test import TestCase
from django.urls import reverse
from django.contrib.auth.models import User

from rest_framework.test import APIClient

from ohdcdb.factories.people import PeopleFactory


class OrderingOfResultsTestCase(TestCase):
    '''Test authentication of users'''

    def setUp(self) -> None:
        self.password = 'Test1234!'
        self.user = User.objects.create_user(
            'sampleuser', 'sampleuser@example.com', self.password)
        self.client = APIClient()
        self.client.force_authenticate(self.user)

        return super().setUp()

    def test_list_of_people_is_ordered(self):
        '''Test the list of people is order by first/last name'''
        PeopleFactory.create_batch(10)
        response = self.client.get(
            reverse('people-list'))

        people = response.json()

        names = [' '.join([person['first_name'], person['last_name']])
                 for person in people]
        expected_order = sorted(names)

        self.assertEqual(expected_order, names)
