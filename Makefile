# Define variables for backend and frontend folders
BACKEND_DIR=./back
FRONTEND_DIR=./front

# Docker image names
BACKEND_IMAGE=django-backend
FRONTEND_IMAGE=react-frontend

# Docker container names
BACKEND_CONTAINER=django-backend-container
FRONTEND_CONTAINER=react-frontend-container

# Build the Docker image for the backend
build-backend:
	@echo "Building the backend Docker image..."
	docker build -t $(BACKEND_IMAGE) $(BACKEND_DIR)

# Build the Docker image for the frontend
build-frontend:
	@echo "Building the frontend Docker image..."
	docker build -t $(FRONTEND_IMAGE) $(FRONTEND_DIR)

# Run both backend and frontend containers
run-containers: build-backend build-frontend
	@echo "Running containers..."
	# Run the backend container
	docker run -d --name $(BACKEND_CONTAINER) -p 8000:8000 $(BACKEND_IMAGE)

	# Run the frontend container
	docker run -d --name $(FRONTEND_CONTAINER) -p 3000:5000 $(FRONTEND_IMAGE)

# Stop the containers
stop-containers:
	@echo "Stopping containers..."
	docker stop $(BACKEND_CONTAINER) $(FRONTEND_CONTAINER)
	docker rm $(BACKEND_CONTAINER) $(FRONTEND_CONTAINER)

# Restart the containers (stops and then starts again)
restart-containers: stop-containers run-containers

# Remove all Docker images
clean-images:
	@echo "Cleaning up Docker images..."
	docker rmi $(BACKEND_IMAGE) $(FRONTEND_IMAGE)

# Show logs of the backend container
logs-backend:
	@echo "Displaying backend container logs..."
	docker logs -f $(BACKEND_CONTAINER)

# Show logs of the frontend container
logs-frontend:
	@echo "Displaying frontend container logs..."
	docker logs -f $(FRONTEND_CONTAINER)

# Full cleanup: remove containers and images
clean-all: stop-containers clean-images
	@echo "Cleaned up all containers and images."
