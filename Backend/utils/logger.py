import logging


def setup_logger():
    logger = logging.getLogger(__name__)

    if not logger.handlers:
        logger.setLevel(logging.DEBUG)

        file_handler = logging.FileHandler("corux_be.log")
        file_handler.setLevel(logging.DEBUG)

        formatter = logging.Formatter(
            "%(asctime)s - %(levelname)s - %(filename)s:%(lineno)d - %(message)s"
        )
        file_handler.setFormatter(formatter)

        logger.addHandler(file_handler)

    return logger  # Return the initialized logger object


# Example usage:
if __name__ == "__main__":
    logger = setup_logger()
    logger.info("Logging initialized successfully")


# return logger

# from google.cloud import logging as google_logging
# import logging
# import os


# def setup_logger():
#     # Create a Cloud Logging client.
#     # GOOGLE_APPLICATION_CREDENTIALS = os.getenv(
#     #     'GOOGLE_APPLICATION_CREDENTIALS')
#     client = google_logging.Client()

#     # Retrieves a Cloud Logging handler based on the environment
#     # you're running in and integrates the handler with the
#     # Python logging module.
#     cloud_logging_handler = client.get_default_handler()
#     cloud_logging_handler.setLevel(logging.DEBUG)

#     logger = logging.getLogger(__name__)
#     logger.setLevel(logging.DEBUG)
#     logger.addHandler(cloud_logging_handler)

#     # Optionally add a file handler if needed
#     file_handler = logging.FileHandler('corux_be.log')
#     file_handler.setLevel(logging.DEBUG)
#     formatter = logging.Formatter(
#         '%(asctime)s - %(levelname)s - %(filename)s:%(lineno)d - %(message)s')
#     file_handler.setFormatter(formatter)
#     logger.addHandler(file_handler)

#     return logger


# Initialize the logger
# logger = setup_logger()
