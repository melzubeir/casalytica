"""
Update posts metadata from the deso blockchain
"""
import time
from django.core.management.base import BaseCommand
from django.db import transaction
from django.db.models import F
from django.conf import settings
from analytics.models import Post, Node


class Command(BaseCommand):
    help = 'Update posts metadata from the deso blockchain'

    def handle(self, *args, **options):
        self.stdout.write('Updating posts metadata..')
        self.update_posts_metadata()
        self.stdout.write(self.style.SUCCESS('Posts metadata updated!'))

    def update_posts_metadata(self):
        # get the most recent post
        post = Post.objects.order_by('-id').first()
        # get the most recent post from the blockchain
        node = Node.objects.get(id=settings.DESO_NODE_ID)
        url = f'{node.url}/api/v0/get-app-state'
        data = {
            'PublicKeyBase58Check': settings.DESO_PUBLIC_KEY,
            'ReaderPublicKeyBase58Check': settings.DESO_PUBLIC_KEY,
            'GetPostsState': True,
            'PostHashHex': post.post_hash,
        }
        response = requests.post(url, data=data)
        if response.status_code == 200:
            posts = response.json()['PostsFound']
            for post in posts:
                # update the post
                Post.objects.filter(post_hash=post['PostHashHex']).update(
                    impressions_total=F('impressions_total') +
                    post['Impressions'],
                    likes_total=F('likes_total') + post['LikeCount'],
                    diamonds_total=F('diamonds_total') + post['DiamondCount'],
                    comments_total=F('comments_total') + post['CommentCount'],
                    reposts_total=F('reposts_total') + post['RepostCount'],
                )
                time.sleep(1)
        else:
            raise Exception('Error getting posts from the deso blockchain')
