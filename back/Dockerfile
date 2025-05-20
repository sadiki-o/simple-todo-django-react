# Step 1: Use the official Python image as a base image
FROM python:3.13-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the requirements file to install dependencies
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY . .

# Set environment variables (optional but recommended for Django)
ENV PYTHONUNBUFFERED 1

# Expose port 8000 to access the Django app
EXPOSE 8000

# Run Django's development server (for production, you should use something like Gunicorn)
CMD ["python", "todoproject/manage.py", "runserver", "0.0.0.0:8000"]
