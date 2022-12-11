"""
Creator Tasks class

This is a helper class to manage the creator model and related tasks

Some of the tasks are:
 - update the friends/followers list

"""
from django.utils.timezone import utc
import nltk
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

from config.settings import (
    logger,
    ENVIRONMENT,
)


class Preprocessor:
    """Preprocessor class"""

    nltk_data_dir = '/vol/app/nltk_data'

    def __init__(
            self,
            text=''):

        self.text = text
        nltk.data.path.append(self.nltk_data_dir)

        if len(self.text) < 1:
            logger.warning("No text to process")
            return False

        # production downloads and stores in /vol/app/nltk_data
        # via /scripts/nltk_download.py script
        if ENVIRONMENT == 'development':
            nltk.download('punkt', download_dir=self.nltk_data_dir)
            nltk.download('averaged_perceptron_tagger',
                          download_dir=self.nltk_data_dir)
            nltk.download('maxent_ne_chunker', download_dir=self.nltk_data_dir)
            nltk.download('words', download_dir=self.nltk_data_dir)
            nltk.download('vader_lexicon', download_dir=self.nltk_data_dir)

        self.analyzer = SentimentIntensityAnalyzer()
        self.tokens = nltk.word_tokenize(self.text)
        self.tagged = nltk.pos_tag(self.tokens)
        # this requires the numpy library which is not installed on the server
        # until we can install it without issue
        #
        # self.named_entities = nltk.ne_chunk(self.tagged)
        self.named_entities = []

    def get_tokens(self):
        """Return the tokens/words from the text"""
        return self.tokens

    def get_tagged(self):
        """Return the tagged words from the text"""
        return self.tagged

    def get_entities(self):
        """Return the named entities from the text"""
        return self.named_entities

    def get_sentiment(self):
        return self.analyzer.polarity_scores(self.text)
