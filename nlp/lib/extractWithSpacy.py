import spacy

from lib.db import get_db_client

# Extracts keywords from all readmes using spacy entity extraction
def extract_with_spacy():

    nlp = spacy.load("en_core_web_sm")

    client = get_db_client()

    readmes = client.find()

    for readme in readmes:

        # Skip if 'keywords_spacy' already exists
        if 'keywords_spacy' in readme:
            print("Skipping " + readme['_id'])
            continue

        print("Processing " + readme['_id'])

        doc = nlp(readme['plaintext'])

        # Convert ents to list of strings
        ents = [str(ent) for ent in doc.ents]

        client.update_one(
            {'_id': readme['_id']},
            {'$set': {'keywords_spacy': list(ents)}}
        )

