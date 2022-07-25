import yake

from lib.db import get_client

# Extracts keywords from all readmes using yake
def extract_with_yake():

    client = get_client()

    texts = client.find()

    kw_extractor = yake.KeywordExtractor()

    for text in texts:

         # Skip if 'keywords_yake' is not there or is not empty
        if 'keywords_yake' in text and text['keywords_yake']:
            continue

        print("Processing " + text['_id'])
        
        keywords = kw_extractor.extract_keywords(text['plaintext'])

        client.update_one(
            {'_id': text['_id']},
            {'$set': {'keywords_yake': keywords}}
        )

