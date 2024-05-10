# Use an official Node.js runtime as a parent image
FROM node:alpine

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

# Install dependencies and `serve`
RUN npm install --quiet && npm install -g serve

# Copy the rest of your app's source code
COPY . .

# Build the app
RUN npm run build

# Expose the port `serve` runs on
EXPOSE 5000

# Command to run the app
CMD ["serve", "-s", "build", "-l", "5000"]
