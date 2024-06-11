import datetime
import os
import random
import uuid
from django.contrib.auth.models import AbstractUser, BaseUserManager, PermissionsMixin, Group
from django.contrib.gis.db import models
from django.utils.translation import gettext_lazy as _


# Create your models here.


class UserManager(BaseUserManager):
    """
    Custom user model manager where email is the unique identifiers
    for authentication instead of usernames.
    """

    def create_user(self, email, password=None, **extra_fields):
        try:
            if not email:
                raise ValueError(_("The Email must be set"))
            email = self.normalize_email(email)
            user = self.model(email=email, **extra_fields)
            user.set_password(password)
            user.save()
            return user
        except Exception as e:
            print(f"Error creating user: {str(e)}")

    def create_superuser(self, email, password=None, **extra_fields):
        """
        Create and save a SuperUser with the given email and password.
        """
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError(_("Superuser must have is_staff=True."))
        if extra_fields.get("is_superuser") is not True:
            raise ValueError(_("Superuser must have is_superuser=True."))
        return self.create_user(email, password, **extra_fields)


class User(AbstractUser, PermissionsMixin):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, unique=True)
    email = models.EmailField(_("email address"), unique=True, max_length=200)
    phone = models.CharField(max_length=20, blank=True, null=True)
    address = models.TextField(default=None, blank=True, null=True)
    pin_code = models.PositiveBigIntegerField(blank=True, null=True)
    city = models.CharField(max_length=100, blank=True, null=True)
    country = models.CharField(max_length=100, blank=True, null=True)
    assign_user = models.ManyToManyField("self", blank=True)
    date_joined = models.DateTimeField(auto_now_add=True, editable=False)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)
    create_at = models.DateTimeField(auto_now_add=True)
    last_login = models.DateTimeField(auto_now=True)

    username = None
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []
    objects = UserManager()

    class Meta:
        ordering = ["-create_at"]


def generate_unique_incident_id():
    year = datetime.datetime.now().year
    while True:
        random_number = random.randint(10000, 99999)
        incident_id = f'RMG{random_number}{year}'
        if not Incident.objects.filter(incident_id=incident_id).exists():
            return incident_id


class Incident(models.Model):
    ENTERPRISE = 'Enterprise'
    GOVERNMENT = 'Government'
    CATEGORY_CHOICES = [
        (ENTERPRISE, 'Enterprise'),
        (GOVERNMENT, 'Government')
    ]

    HIGH = 'High'
    MEDIUM = 'Medium'
    LOW = 'Low'
    PRIORITY_CHOICES = [
        (HIGH, 'High'),
        (MEDIUM, 'Medium'),
        (LOW, 'Low')
    ]

    OPEN = 'Open'
    IN_PROGRESS = 'In progress'
    CLOSED = 'Closed'
    STATUS_CHOICES = [
        (OPEN, 'Open'),
        (IN_PROGRESS, 'In progress'),
        (CLOSED, 'Closed')
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, unique=True)
    incident_id = models.CharField(max_length=20, unique=True, default=generate_unique_incident_id)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    reporter = models.ForeignKey(User, on_delete=models.CASCADE, related_name='incidents', null=True, blank=True)
    details = models.TextField(blank=True, null=True)
    reported_date = models.DateTimeField(auto_now_add=True)
    update_date = models.DateTimeField(auto_now=True)
    priority = models.CharField(max_length=10, choices=PRIORITY_CHOICES)
    status = models.CharField(max_length=15, choices=STATUS_CHOICES, default=OPEN)

    def save(self, *args, **kwargs):
        if not self.incident_id:
            self.incident_id = generate_unique_incident_id()

        if self.pk is not None:
            try:
                orig = Incident.objects.get(pk=self.pk)
                if orig.status == self.CLOSED:
                    self.details = orig.details
                    self.priority = orig.priority
                    self.status = orig.status
            except Incident.DoesNotExist:
                pass

        super().save(*args, **kwargs)
