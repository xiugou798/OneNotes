from django.urls import path
from .views import *

urlpatterns = [
    path('', getRoutes, name="routes"),
    path('login/', login, name="login"),
    path('register/', register, name="register"),
    path('notes/', getNotes, name="notes"),
    path('notes/<str:pk>/update/', updateNote, name="update-note"),
    path('notes/<str:pk>/delete/', deleteNote, name="delete-note"),
    path('notes/create/', createNote, name="create-note"),
    path('notes/<str:pk>/', getNote, name="note"),

    path('todos/', getTodos, name="todos"),
    path('todos/<str:pk>/update/', updateTodo, name="update-todo"),
    path('todos/<str:pk>/delete/', deleteTodo, name="delete-todo"),
    path('todos/create/', createTodo, name="create-todo"),
    path('todos/<str:pk>/', getTodo, name="todo"),
]