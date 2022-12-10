"""
Update posts metadata from the deso blockchain
"""

from datetime import (
    datetime,
    timedelta,
)
from django.core.management.base import BaseCommand
from django.db.models import F, Q
import deso

from analytics.models import Post
from analytics.preprocessor import Preprocessor
from config.settings import logger

class Command(BaseCommand):
    help = 'Update posts metadata from the deso blockchain'

    desoPost = deso.Posts()
    num_days = 1

    def add_arguments(self, parser):
        parser.add_argument(
            '--days',
            type=int,
            default=self.num_days,
            help='age of posts to update'
        )

    def handle(self, *args, **options):

        if options['days']:
            self.num_days = options['days']
        else:
            self.num_days = 1

        self.stdout.write('Updating posts metadata..')
        self.update_posts_metadata()
        self.stdout.write(self.style.SUCCESS('Posts metadata updated!'))


    def update_posts_metadata(self):
        # get the most recent post
        posts = Post.objects.filter(
            Q(last_sync__lte=datetime.now() + timedelta(days=self.num_days)) |  Q(last_sync__isnull=True)
            )


        for post in posts:
            try:
                myPost = self.desoPost.getSinglePost(post.post_hash).json()['PostFound']
            except Exception as e:
                logger.error(e)
                continue

            pp = Preprocessor(text=myPost['Body'])
            sentiment = pp.get_sentiment()

            Post.objects.filter(post_hash=myPost['PostHashHex']).update(
                likes_total=F('likes_total') + myPost['LikeCount'],
                diamonds_total=F('diamonds_total') + myPost['DiamondCount'],
                comments_total=F('comments_total') + myPost['CommentCount'],
                reposts_total=F('reposts_total') + myPost['RepostCount'],
                sentiment_score=sentiment,
                last_sync=datetime.now()
            )
            print("Updating post: " + myPost['PostHashHex'])
