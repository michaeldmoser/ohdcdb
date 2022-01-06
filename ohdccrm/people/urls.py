from rest_framework import routers, urlpatterns
from .api import PeopleViewSet

router = routers.DefaultRouter()
router.register('api/people', PeopleViewSet, 'people')

urlpatterns = router.urls
