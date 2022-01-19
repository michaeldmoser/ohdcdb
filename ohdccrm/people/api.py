from rest_framework.decorators import permission_classes
from people.models import People
from rest_framework import viewsets, permissions
from .serializers import PeopleSerializer


class PeopleViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]

    serializer_class = PeopleSerializer

    def get_queryset(self):
        return People.objects.all()

    def perform_create(self, serializer):
        serializer.save(creator=self.request.user)
