'''
Test the organizations app
'''
from django.test import TestCase
from django.urls import reverse
from django.contrib.auth.models import User

from rest_framework.test import APIClient

from ohdcdb.factories.organizations import OrganizationsFactory


class OrganizationsTestCase(TestCase):
    '''Test Organizations app'''

    def setUp(self) -> None:
        self.password = 'Test1234!'
        self.user = User.objects.create_user(
            'sampleuser', 'sampleuser@example.com', self.password)
        self.client = APIClient()
        self.client.force_authenticate(self.user)

        return super().setUp()

    def test_list_of_organizations_is_ordered(self):
        '''Test the list of organiztions is ordered by name'''
        OrganizationsFactory.create_batch(10)
        response = self.client.get(
            reverse('organizations-list'))

        organizations = response.json()

        names = [organization['name'] for organization in organizations]
        expected_order = sorted(names)

        self.assertEqual(expected_order, names)
