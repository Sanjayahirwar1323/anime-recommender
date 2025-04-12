import os
import pandas as pd
from google.cloud import storage ## to import the GCP CLOUD storage
from src.logger import get_logger
from src.custom_exception import CustomException
from config.paths_config import *
from utils.common_functions import read_yaml

logger = get_logger(__name__)

class DataIngestion:
    def __init__(self,config):
        self.config = config["data_ingestion"] ##  This pulls out the part of the config related to data ingestion and saves it in self.config.
        self.bucket_name = self.config["bucket_name"] ## It gets the name of the cloud bucket where data is stored (probably in Google Cloud Storage) and stores it in self.bucket_name.
        self.file_names = self.config["bucket_file_names"] ## It gets the names of the files in the cloud bucket and stores them in self.file_names.

        os.makedirs(RAW_DIR,exist_ok=True)

        logger.info("Data Ingestion Started....")

    def download_csv_from_gcp(self):
        try:

            client  = storage.Client() ## initiaze the GCP client 
            bucket = client.bucket(self.bucket_name)

            for file_name in self.file_names: ## loop through the file names in the bucket and download them one by one.
                file_path = os.path.join(RAW_DIR,file_name) ## It creates a file path for each file by joining the RAW_DIR and the file name.

                if file_name=="animelist.csv": ##  size is too big there fore we are downloading only 5M rows
                    blob = bucket.blob(file_name) ## Blob represents a file (object) stored in a bucket.creates a reference to a file (not the file itself yet).
                    blob.download_to_filename(file_path)  ## downloads the file from the bucket to the local path specified by file_path.

                    data = pd.read_csv(file_path,nrows=5000000)
                    data.to_csv(file_path,index=False) ## save 
                    logger.info("Large file detected Only downloading 5M rows")
                else: 
                    blob = bucket.blob(file_name)
                    blob.download_to_filename(file_path)

                    logger.info("Downloading Smaller Files ie anime and anime_with synopsis")
        
        except Exception as e:
            logger.error("Error while downloading data from GCP")
            raise CustomException("Failed to download data",e)
        
    def run(self):
        try:
            logger.info("Starting Data Ingestion Process....")
            self.download_csv_from_gcp()
            logger.info("Data Ingestion Completed...")
        except CustomException as ce:
            logger.error(f"CustomException : {str(ce)}")
        finally:
            logger.info("Data Ingestion DONE...")


if __name__=="__main__": ## when we run dataingestion.py using terminal only this block will executed
    data_ingestion = DataIngestion(read_yaml(CONFIG_PATH))
    data_ingestion.run()
    ##It reads the config, creates a DataIngestion object, and runs the GCP data download process.