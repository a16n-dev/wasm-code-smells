import yake

from lib.db import get_description_client, get_readme_client

# Extracts keywords from all readmes using yake
def readme_extract_with_yake():

    client = get_readme_client()

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

def description_extract_with_yake():

    client = get_description_client()

    descriptions = client.find()

    kw_extractor = yake.KeywordExtractor()

    for description in descriptions:
         # Skip if 'keywords_yake' already exists
        if 'keywords_yake' in description:
            print("Skipping " + description['_id'])
            continue

        print("Processing " + description['_id'])
        
        keywords = kw_extractor.extract_keywords(description['original'])

        client.update_one(
            {'_id': description['_id']},
            {'$set': {'keywords_yake': keywords}}
        )


