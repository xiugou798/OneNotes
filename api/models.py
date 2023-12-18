import uuid

from django.db import models


# Create your models here.

class Note(models.Model):
    body = models.TextField(null=True, blank=True)
    userId = models.TextField(null=True, blank=True)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.body[0:69]


class NoteUser(models.Model):
    id = models.TextField(primary_key=True)
    username = models.TextField(null=True, blank=True)
    password = models.TextField(null=True, blank=True)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.id


class Todo(models.Model):
    body = models.TextField(null=True, blank=True)
    userId = models.TextField(null=True, blank=True)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.body[0:69]


class TodoUser(models.Model):
    id = models.TextField(primary_key=True)
    username = models.TextField(null=True, blank=True)
    password = models.TextField(null=True, blank=True)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.id


class LoginTmp(models.Model):
    id = models.IntegerField(auto_created=True, primary_key=True)
    username = models.TextField(null=True, blank=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.id
