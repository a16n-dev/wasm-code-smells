import spacy
import pytextrank

from lib.db import get_db_client

# Extracts keywords from all readmes using spacy and topicrank pipeline from pytextrank
def extract_with_topicrank():

    client = get_db_client()

    readmes = client.find()

    nlp = spacy.load("en_core_web_sm")
    nlp.add_pipe("topicrank")


    for readme in readmes:
         # Skip if 'keywords_yake' already exists
        if 'keywords_topicrank' in readme:
            print("Skipping " + readme['_id'])
            continue

        print("Processing " + readme['_id'])
        
        try:
            doc = nlp(readme['plaintext'])

            # map phrases to text and rank
            phrases = [(phrase.text, phrase.rank) for phrase in doc._.phrases]

            client.update_one(
                {'_id': readme['_id']},
                {'$set': {'keywords_topicrank': phrases}}
            )
        except:
            print("Error processing " + readme['_id'])
            client.update_one(
                {'_id': readme['_id']},
                {'$set': {'keywords_topicrank': []}}
            )



