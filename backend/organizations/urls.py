'''Organization app urls'''
from rest_framework import routers

from .api import OrganizationViewSet

router = routers.DefaultRouter()
router.register('api/organizations', OrganizationViewSet,
                basename='organizations')

urlpatterns = router.urls
