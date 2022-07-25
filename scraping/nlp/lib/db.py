from pymongo import MongoClient

# Reads all readmes from the database and returns the collection of readme entries.
def get_client(collection: str):

    client = MongoClient("mongodb://localhost:27017")['wasm-github2']

    return client['repository-texts-'+collection]



