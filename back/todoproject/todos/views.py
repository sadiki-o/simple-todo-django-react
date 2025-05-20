from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from .models import Todo
from .serializers import TodoSerializer, UserSerializer
from rest_framework.permissions import IsAuthenticated

# Encapsulate crud operations inside TodoViewSet
class TodoViewSet(viewsets.ModelViewSet):
    serializer_class = TodoSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Users can only access their own todos
        return Todo.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        # Associate new todo with authenticated user
        serializer.save(user=self.request.user)

    def perform_update(self, serializer):
        # Ensure update does not overwrite user accidentally
        serializer.save(user=self.request.user)


@api_view(["POST"])
@permission_classes([permissions.AllowAny]) # public route
def register_user(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "User created successfully"}, status=201)
    return Response(serializer.errors, status=400)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def profile(request):
    user = request.user
    data = {
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "first_name": user.first_name,
        "last_name": user.last_name,
    }
    return Response(data)
