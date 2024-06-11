from django.urls import path

from account.views import RegistrationsAPIView, UserRetrieveAPIView, UserRetrieveUpdateAPIView, \
    UserRetrieveDestroyAPIView, UserListAPIView, IncidentListCreateView, IncidentRetrieveUpdateView, IncidentSearchView, \
    IncidentListView, IncidentRetrieveDestroyView, IncidentRetrieveView

urlpatterns = [
    path("registrations/", RegistrationsAPIView.as_view(), name="RegistrationsAPIView"),
    path("user/list/", UserListAPIView.as_view(), name="UserListAPIView"),
    path("user/<uuid:pk>/retrieve/", UserRetrieveAPIView.as_view(), name="UserRetrieveAPIView"),
    path("user/<uuid:pk>/update/", UserRetrieveUpdateAPIView.as_view(), name="UserRetrieveUpdateAPIView"),
    path("user/<uuid:pk>/destroy/", UserRetrieveDestroyAPIView.as_view(), name="UserRetrieveDestroyAPIView"),
    path('incidents/', IncidentListCreateView.as_view(), name='incident-list-create'),
    path('incidents/list/', IncidentListView.as_view(), name='incident-list'),
    path('incidents/<uuid:pk>/retrieve/', IncidentRetrieveView.as_view(), name='incident-retrieve'),
    path('incidents/<uuid:pk>/update/', IncidentRetrieveUpdateView.as_view(), name='incident-retrieve-update'),
    path('incidents/<uuid:pk>/destroy/', IncidentRetrieveDestroyView.as_view(), name='incident-retrieve-destroy'),
    path('incidents/search/', IncidentSearchView.as_view(), name='incident-search'),
]