# Use official Python 3.8 slim image
FROM python:3.8-slim

# Disable Python writing bytecode and enable unbuffered output
ENV PYTHONDONTWRITEBYTECODE=1 PYTHONUNBUFFERED=1

# Set working directory
WORKDIR /Backend

# Install system dependencies needed for mysqlclient
RUN apt-get update && apt-get install -y \
    gcc \
    libmariadb-dev \
    pkg-config \
    && rm -rf /var/lib/apt/lists/*

# Copy only requirements.txt to take advantage of Docker caching
COPY requirements.txt .

# Upgrade pip and install dependencies
RUN pip install --upgrade pip && pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code to the container
COPY . .

# Command to run the Uvicorn server
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
