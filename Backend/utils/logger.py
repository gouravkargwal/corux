import logging

# def setup_logger():
#     logging.basicConfig(
#         level=logging.INFO,
#         format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
#     )
#     logger = logging.getLogger("reta_be")
#     return logimport logging

 
def setup_logger():
    logger = logging.getLogger(__name__)
 
    if not logger.handlers:
        logger.setLevel(logging.DEBUG)
 
        file_handler = logging.FileHandler('corux_be.log')
        file_handler.setLevel(logging.DEBUG)
 
        formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(filename)s:%(lineno)d - %(message)s')
        file_handler.setFormatter(formatter)
 
        logger.addHandler(file_handler)
 
    return logger