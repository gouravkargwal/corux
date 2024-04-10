# Use the official Python 3.8 slim image as the base image
FROM python:3.8-slim

# Prevent Python from writing pyc files to disc
ENV PYTHONDONTWRITEBYTECODE 1
# Prevent Python from buffering stdout and stderr
ENV PYTHONUNBUFFERED 1

# Set the working directory in the Docker container
WORKDIR /Backend

# First, copy only the requirements.txt file to take advantage of Docker's cache
# This will prevent re-installing all packages every time any source file changes
COPY requirements.txt .

# Upgrade pip and install required Python packages
RUN pip install --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Now copy the rest of your application's code to the container
COPY . .

# Command to run the Uvicorn server
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
