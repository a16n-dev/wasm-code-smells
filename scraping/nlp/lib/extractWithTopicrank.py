import spacy
import pytextrank


# Extracts keywords from all readmes using spacy and topicrank pipeline from pytextrank
def extract_with_topicrank():

    client = get_client()

    texts = client.find()

    nlp = spacy.load("en_core_web_sm")
    nlp.add_pipe("topicrank")


    for text in texts:
         # Skip if 'keywords_yake' already exists
        if 'keywords_topicrank' in text:
            continue

        print("Processing " + text['_id'])
        
        try:
            doc = nlp(text['plaintext'])

            # map phrases to text and rank
            phrases = [(phrase.text, phrase.rank) for phrase in doc._.phrases]

            client.update_one(
                {'_id': text['_id']},
                {'$set': {'keywords_topicrank': phrases}}
            )
        except:
            print("Error processing " + text['_id'])
            client.update_one(
                {'_id': text['_id']},
                {'$set': {'keywords_topicrank': []}}
            )
