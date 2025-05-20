# Step 1: Build the app using Node.js and npm
FROM node:23-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package.json package-lock.json ./

# Install dependencies using npm
RUN npm install

# Copy the rest of the source code
COPY . .

# Build the app for production
RUN npm run build

# Step 2: Serve the app using Node.js and `serve`
# Use the same image to serve the app, no duplication.
WORKDIR /app

# Install a simple HTTP server to serve static files
RUN npm install -g serve

# Expose port
EXPOSE 5000

# Start the server to serve the dist folder
CMD ["serve", "-s", "dist", "-l", "5000"]
