FROM python:3.8-alpine

RUN apk update && \
    apk add --no-cache \
    mariadb-dev \
    mariadb-connector-c-dev \
    build-base \
    && rm -rf /var/cache/apk/*

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /Admin

COPY . .

RUN pip install --upgrade pip && \
    pip install -r requirements.txt

EXPOSE 8080

CMD ["python", "manage.py", "runserver", "0.0.0.0:8080"]
