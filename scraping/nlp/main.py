from calendar import c
import spacy
import pytextrank
import yake
import sys
from pymongo import MongoClient

spacy_nlp = spacy.load("en_core_web_sm")

topic_rank = spacy.load("en_core_web_sm")
topic_rank.add_pipe("topicrank")

kw_extractor = yake.KeywordExtractor()

mongo_client = MongoClient("mongodb://localhost:27017")['wasm-github2']

def main():
   # extract_with_spacy()
   # extract_with_yake()
   # extract_with_topicrank()

   print(sys.argv[1])
   client = mongo_client['repository-text-'+sys.argv[1]]

   while True:
      # Find text
      text = client.find_one({
            'processed': False
         })

      # If no text, exit
      if text is None:
         break

      print('[Start] Processing: ' + text['_id'])

      # Process spacy
      print('Run Spacy')
      spacy_doc = spacy_nlp(text['text'])

      # Convert ents to list of strings
      spacy_keywords = list([str(ent) for ent in spacy_doc.ents])

      client.update_one(
         {'_id': text['_id']},
         {'$set': {'keywords_spacy': spacy_keywords}}
      )

      # Process yake
      print('Run Yake')
      yake_keywords = kw_extractor.extract_keywords(text['text'])

      # Process TopicRank
      print('Run TopicRank')
      topicrank_keywords = []
      try:
         topicrank_doc = topic_rank(text['text'])

         # map phrases to text and rank
         topicrank_keywords = [(phrase.text, phrase.rank) for phrase in topicrank_doc._.phrases]
      except:
         print('Error')
         
      # Save Result
      client.update_one(
            {'_id': text['_id']},
            {'$set': {
               'keywords_topicrank': topicrank_keywords, 
               'keywords_spacy':spacy_keywords, 
               'keywords_yake': yake_keywords,
               'processed': True
               }})

      print('[Done] Processing: ' + text['_id'])

if __name__ == "__main__":
    main()
