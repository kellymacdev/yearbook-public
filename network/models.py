from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    following = models.ManyToManyField('self', symmetrical=False, related_name='followers', blank=True)

class Graduate(models.Model):
    name = models.TextField()
    maiden_name = models.TextField(blank=True, null=True)
    pronouns = models.TextField(blank=True, null=True)
    city = models.TextField(blank=True, null=True)
    industry = models.TextField(blank=True, null=True)
    gen_description = models.TextField(blank=True, null=True)
    hobbies = models.TextField(blank=True, null=True)
    q1 = models.TextField(blank=True, null=True)
    q2 = models.TextField(blank=True, null=True)
    q3 = models.TextField(blank=True, null=True)
    q4 = models.TextField(blank=True, null=True)
    q5 = models.TextField(blank=True, null=True)
    q6 = models.TextField(blank=True, null=True)
    q7 = models.TextField(blank=True, null=True)
    q8 = models.TextField(blank=True, null=True)
    q9 = models.TextField(blank=True, null=True)
    q10 = models.TextField(blank=True, null=True)
    contact = models.TextField(blank=True, null=True)
    school_years = models.IntegerField(blank=True, null=True)
    countries = models.IntegerField(blank=True, null=True)
    jobs = models.IntegerField(blank=True, null=True)
    tattoos = models.IntegerField(blank=True, null=True)
    married = models.TextField(default=False)
    babies = models.IntegerField(blank=True, null=True)
    memoriam = models.TextField(blank=True, null=True)
    spotify = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name

