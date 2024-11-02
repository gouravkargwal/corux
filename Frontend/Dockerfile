# Use a Node.js runtime as a parent image for building
FROM node:18-alpine AS build

# Set the working directory
WORKDIR /app

# Define build-time environment variables
ARG REACT_APP_BASE_URL
ARG REACT_APP_URL

# Set the build-time environment variables as actual environment variables in the image
ENV REACT_APP_BASE_URL=$REACT_APP_BASE_URL
ENV REACT_APP_URL=$REACT_APP_URL

# Copy the package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm install --production --silent

# Copy the rest of your app's source code
COPY . .

# Build the app
RUN npm run build

# Use a lighter image for serving the app
FROM node:18-alpine AS production

# Set the working directory
WORKDIR /app

# Install serve
RUN npm install -g serve

# Copy built files from the build stage
COPY --from=build /app/build ./build

# Expose the port `serve` runs on
EXPOSE 1000

# Command to run the app
CMD ["serve", "-s", "build", "-l", "1000"]
