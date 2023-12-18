from rest_framework.serializers import ModelSerializer
from .models import Note, Todo


class NoteSerializer(ModelSerializer):
    class Meta:
        model = Note
        fields = '__all__'


class TodoSerializer(ModelSerializer):
    class Meta:
        model = Todo
        fields = '__all__'
