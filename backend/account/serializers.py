from djoser.serializers import UserCreateSerializer
from rest_framework import serializers
from django.contrib.auth import get_user_model

from account.models import Incident

User = get_user_model()


class UserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ('password', 'email', 'phone', 'address', 'pin_code', 'city',
                  'country', 'first_name', 'last_name')


class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)
    password2 = serializers.CharField(write_only=True, required=True, label="Confirm password")

    class Meta:
        model = User
        fields = (
            'password', 'password2', 'email', 'phone', 'address', 'pin_code', 'city', 'country', 'first_name',
            'last_name')

    def validate(self, data):
        if data['password'] != data['password2']:
            raise serializers.ValidationError("Passwords do not match.")
        return data

    def create(self, validated_data):
        user_data = {
            'email': validated_data['email'],
            'first_name': validated_data['first_name'],
            'last_name': validated_data['last_name'],
            'phone': validated_data['phone'],
            'address': validated_data['address'],
            'pin_code': validated_data['pin_code'],
            'city': validated_data['city'],
            'country': validated_data['country'],
        }
        print(validated_data['password2'])
        print(user_data, "user Data Has Been Printed !!")

        try:
            user = User.objects.create_user(
                password=validated_data['password'],
                **user_data
            )
        except Exception as e:
            print(f"Exception during user creation: {e}")
            raise serializers.ValidationError("Failed to create user. Please try again.")

        return user


class UserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'phone', 'address', 'pin_code', 'city', 'country', 'first_name', 'last_name')


class UserListSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'phone', 'address', 'pin_code', 'city', 'country', 'first_name', 'last_name')


class IncidentSerializer(serializers.ModelSerializer):
    reporter = serializers.ReadOnlyField(source='reporter.email')

    class Meta:
        model = Incident
        fields = ['id', 'incident_id', 'category', 'reporter', 'details', 'reported_date', 'update_date', 'priority',
                  'status']
        read_only_fields = ['incident_id', 'reported_date', 'update_date', 'reporter']
