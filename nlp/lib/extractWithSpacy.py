import spacy

from lib.db import get_description_client, get_readme_client

# Extracts keywords from all readmes using spacy entity extraction
def readme_extract_with_spacy():

    nlp = spacy.load("en_core_web_sm")

    client = get_readme_client()

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

def description_extract_with_spacy():

    nlp = spacy.load("en_core_web_sm")

    client = get_description_client()

    descriptions = client.find()

    for description in descriptions:

        # Skip if 'keywords_spacy' already exists
        if 'keywords_spacy' in description:
            print("Skipping " + description['_id'])
            continue

        print("Processing " + description['_id'])

        doc = nlp(description['original'])

        # Convert ents to list of strings
        ents = [str(ent) for ent in doc.ents]

        client.update_one(
            {'_id': description['_id']},
            {'$set': {'keywords_spacy': list(ents)}}
        )

