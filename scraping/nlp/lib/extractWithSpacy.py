import spacy


# Extracts keywords from all readmes using spacy entity extraction
def extract_with_spacy():

    nlp = spacy.load("en_core_web_sm")

    client = get_client()

    texts = client.find()

    for text in texts:

        # Skip if 'keywords_spacy' already exists
        if 'keywords_spacy' in text:
            continue

        print("Processing " + text['_id'])

        doc = nlp(text['plaintext'])

        # Convert ents to list of strings
        ents = [str(ent) for ent in doc.ents]

        client.update_one(
            {'_id': text['_id']},
            {'$set': {'keywords_spacy': list(ents)}}
        )
