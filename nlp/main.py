
from lib.extractWithSpacy import extract_with_spacy
from lib.extractWithTopicrank import extract_with_topicrank
from lib.extractWithYake import extract_with_yake


def main():
   extract_with_spacy()
   extract_with_yake()
   extract_with_topicrank()


if __name__ == "__main__":
    main()
