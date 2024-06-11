from rest_framework import serializers
from rest_framework.generics import ListCreateAPIView, RetrieveAPIView, RetrieveUpdateAPIView, RetrieveDestroyAPIView, \
    ListAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.contrib.auth import get_user_model

from account.CustomPermission import IsCustomAdminUser
from account.models import Incident
from account.serializers import UserRegisterSerializer, UserDetailSerializer, UserListSerializer, IncidentSerializer

User = get_user_model()


# Create your views here.

class RegistrationsAPIView(ListCreateAPIView):
    permission_classes = [AllowAny]
    queryset = User.objects.all()
    serializer_class = UserRegisterSerializer


class UserListAPIView(ListAPIView):
    permission_classes = [AllowAny]
    queryset = User.objects.all()
    serializer_class = UserListSerializer


class UserRetrieveAPIView(RetrieveAPIView):
    permission_classes = [IsCustomAdminUser]
    queryset = User.objects.all()
    serializer_class = UserDetailSerializer


class UserRetrieveUpdateAPIView(RetrieveUpdateAPIView):
    permission_classes = [IsCustomAdminUser]
    queryset = User.objects.all()
    serializer_class = UserDetailSerializer


class UserRetrieveDestroyAPIView(RetrieveDestroyAPIView):
    permission_classes = [IsCustomAdminUser]
    queryset = User.objects.all()
    serializer_class = UserDetailSerializer


class IncidentListCreateView(ListCreateAPIView):
    queryset = Incident.objects.all()
    serializer_class = IncidentSerializer

    def get_queryset(self):
        return self.queryset.filter(reporter=self.request.user)

    def perform_create(self, serializer):
        serializer.save(reporter=self.request.user)


class IncidentListView(ListAPIView):
    permission_classes = [AllowAny]
    queryset = Incident.objects.all()
    serializer_class = IncidentSerializer


class IncidentRetrieveView(RetrieveAPIView):
    permission_classes = [AllowAny]
    queryset = Incident.objects.all()
    serializer_class = IncidentSerializer


class IncidentRetrieveUpdateView(RetrieveUpdateAPIView):
    queryset = Incident.objects.all()
    serializer_class = IncidentSerializer

    def get_queryset(self):
        return self.queryset.filter(reporter=self.request.user)

    def perform_update(self, serializer):
        instance = serializer.instance
        if instance.status == Incident.CLOSED:
            raise serializers.ValidationError("Closed incidents cannot be edited.")
        serializer.save()


class IncidentRetrieveDestroyView(RetrieveDestroyAPIView):
    queryset = Incident.objects.all()
    serializer_class = IncidentSerializer

    def get_queryset(self):
        return self.queryset.filter(reporter=self.request.user)

    def perform_destroy(self, instance):
        if instance.status == Incident.CLOSED:
            raise serializers.ValidationError("Closed incidents cannot be deleted.")
        instance.delete()


class IncidentSearchView(ListAPIView):
    serializer_class = IncidentSerializer

    def get_queryset(self):
        incident_id = self.request.query_params.get('incident_id')
        return Incident.objects.filter(incident_id=incident_id, reporter=self.request.user)
