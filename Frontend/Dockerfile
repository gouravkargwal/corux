# Step 1: Build the React application
FROM node:alpine as build

# Set the working directory in the Docker container
WORKDIR /Frontend

# Copy the package.json and package-lock.json (or yarn.lock) files
COPY package*.json ./

# Install dependencies
RUN npm install --quiet

# Copy the rest of your app's source code from your host to your image filesystem.
COPY . .

# Build the app
RUN npm run build

# Step 2: Serve the app with Caddy
FROM caddy:alpine

# Copy the built app from the previous stage
COPY --from=build /Frontend/build /srv

# Expose port 8080 (default port for Caddy)
EXPOSE 8080

# Start Caddy with the configuration to serve static files
CMD ["caddy", "file-server", "--listen", "0.0.0.0:8080"]
