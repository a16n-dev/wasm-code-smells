from pymongo import MongoClient

# Reads all readmes from the database and returns the collection of readme entries.
def get_readme_client():

    client = MongoClient("mongodb://localhost:27017")['wasm-github']

    return client['repositorytexts']


def get_description_client():

    client = MongoClient("mongodb://localhost:27017")['wasm-github']

    return client['repositorydescriptions']


