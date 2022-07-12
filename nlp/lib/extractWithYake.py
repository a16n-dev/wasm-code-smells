import yake

from lib.db import get_db_client

# Extracts keywords from all readmes using yake
def extract_with_yake():

    client = get_db_client()

    readmes = client.find()

    kw_extractor = yake.KeywordExtractor()

    for readme in readmes:
         # Skip if 'keywords_yake' already exists
        if 'keywords_yake' in readme:
            print("Skipping " + readme['_id'])
            continue

        print("Processing " + readme['_id'])
        
        keywords = kw_extractor.extract_keywords(readme['plaintext'])

        client.update_one(
            {'_id': readme['_id']},
            {'$set': {'keywords_yake': keywords}}
        )



