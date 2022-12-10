#!/usr/bin/env python3
"""Download NLTK data."""
import nltk
target_dir = '/vol/app/nltk_data'

nltk.download('punkt', download_dir=target_dir)
nltk.download('averaged_perceptron_tagger', download_dir=target_dir)
nltk.download('maxent_ne_chunker', download_dir=target_dir)
nltk.download('words', download_dir=target_dir)
nltk.download('vader_lexicon', download_dir=target_dir)
