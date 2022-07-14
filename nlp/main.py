
from lib.extractWithSpacy import description_extract_with_spacy, readme_extract_with_spacy
from lib.extractWithTopicrank import description_extract_with_topicrank, readme_extract_with_topicrank
from lib.extractWithYake import description_extract_with_yake, readme_extract_with_yake


def main():
   readme_extract_with_spacy()
   readme_extract_with_yake()
   readme_extract_with_topicrank()
   description_extract_with_spacy()
   description_extract_with_topicrank()
   description_extract_with_yake()


if __name__ == "__main__":
    main()
