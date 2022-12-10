"""
Creator Tasks class

This is a helper class to manage the creator model and related tasks

Some of the tasks are:
 - update the friends/followers list

"""
from django.utils.timezone import utc
from datetime import (
    datetime,
)
import nltk
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
import operator

from config.settings import (
    logger
)

from .models import (
    Creator
)


class Preprocessor:
    """Preprocessor class"""

    nltk_data_dir = '/vol/app/nltk_data'

    def __init__(
            self,
            text=''):

        self.text = text

        if len(self.text) < 1:
            logger.warning("No text to process")
            return False

        nltk.download('punkt', download_dir=self.nltk_data_dir)
        nltk.download('averaged_perceptron_tagger', download_dir=self.nltk_data_dir)
        nltk.download('maxent_ne_chunker', download_dir=self.nltk_data_dir)
        nltk.download('words', download_dir=self.nltk_data_dir)
        nltk.download('vader_lexicon', download_dir=self.nltk_data_dir)

        nltk.data.path.append(self.nltk_data_dir)
        self.analyzer = SentimentIntensityAnalyzer()
        self.sia = SentimentIntensityAnalyzer()
        self.tokens = nltk.word_tokenize(self.text)
        self.tagged = nltk.pos_tag(self.tokens)
        self.named_entities = nltk.ne_chunk(self.tagged)


    def get_tokens(self):
        return self.tokens

    def get_tagged(self):
        return self.tagged

    def get_entities(self):
        return self.named_entities

    def get_sentiment(self):
        return self.analyzer.polarity_scores(self.text)
