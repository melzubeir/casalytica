"""
Update posts metadata from the deso blockchain
"""
from datetime import (
    datetime,
)
from django.core.management.base import BaseCommand
from django.utils.timezone import utc
from os import environ
import re
import deso

from analytics.models import (
    Node,
    Post,
    Creator)
from config.settings import (
    logger,
    ENVIRONMENT,
    CASABOT,
    CASAPUBLICKEY,
    CASABOTSEEDHEX,
)


class Command(BaseCommand):
    help = 'CasaBot - a deso bot'

    desoUser = deso.User()
    desoPosts = deso.Posts()
    response_limit = 500
    botname = CASABOT
    trigger_term = 'hey @'+CASABOT
    run_count = 1

    def add_arguments(self, parser):
        parser.add_argument(
            '--response-limit',
            type=int,
            default=self.response_limit,
        )
        parser.add_argument(
            '--botname',
            type=str,
            default=self.botname
        )
        parser.add_argument(
            '--trigger-term',
            type=str,
            default=self.trigger_term
        )
        parser.add_argument(
            '--run-count',
            type=int,
            default=self.run_count  # run once
        )

    def handle_post(self, post):
        """process a post"""
        url_regex = r"(?i)\b((?:https?://|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'\".,<>?«»“”‘’]))"

        s = post.get('Body')
        url = re.findall(url_regex, s)
        if url:
            post['has_link'] = True

        if post.get('VideoURL'):
            post['has_video'] = True

        if post.get('Body').startswith(self.trigger_term):
            logger.info("trigger post found: " + post.get('PostHashHex'))
            post['is_bot_trigger'] = True

        featured_image = post.get('ProfileEntryResponse').get(
            'ExtraData').get('FeaturedImage')

        creator_obj, created = Creator.objects.update_or_create(
            public_key_base58=post.get('ProfileEntryResponse').get(
                'PublicKeyBase58Check'),
            username=post.get('ProfileEntryResponse').get('Username'))

        creator_obj.description = post.get(
            'ProfileEntryResponse').get('Description')
        creator_obj.is_verified = post.get(
            'ProfileEntryResponse').get('IsVerified')
        creator_obj.profile_image = self.desoUser.getProfilePicURL(
            post.get('ProfileEntryResponse').get('PublicKeyBase58Check'))
        creator_obj.featured_image = featured_image
        creator_obj.last_sync = datetime.utcnow().replace(tzinfo=utc)
        creator_obj.save()

        if post.get('PostExtraData') and post.get('PostExtraData').get('Node'):
            id = post.get('PostExtraData').get('Node')
            try:
                node_obj = Node.objects.get(id=id)
                post['node'] = node_obj
            except Node.DoesNotExist:
                post['node'] = None
        else:
            post['node'] = None

        post['creator'] = creator_obj

        return post

    def get_mentions(self, mentions_list=[]):
        """get mentions feed"""

        logger.info('Getting mentions feed')

        triggered_mentions = []

        mentions = self.desoPosts.getHotFeed(
            readerPublicKey=CASAPUBLICKEY,
            taggedUsername=CASABOT,
            # pr to fix spelling response (desopy)
            responeLimit=self.response_limit,
        ).json()

        try:
            mentions = mentions.get('HotFeedPage')
        except:
            raise Exception('Could not get mentions feed')

        if mentions:
            for mention in mentions:
                post_obj, created = Post.objects.update_or_create(
                    post_hash=mention.get('PostHashHex'))
                if post_obj.is_bot_processed:
                    logger.info('Mention already processed')
                    continue
                mention = self.handle_post(mention)
                post_obj.creator = mention.get('creator')
                post_obj.has_image = mention.get('ImageURLs') is not None
                post_obj.has_text = mention.get('Body') is not None
                post_obj.has_video = mention.get('has_video') is not None
                post_obj.has_link = mention.get('has_link') is not None
                post_obj.is_bot_trigger = mention.get(
                    'is_bot_trigger') is not None
                post_obj.likes_total = mention.get('LikeCount')
                post_obj.diamonds_total = mention.get('DiamondCount')
                post_obj.reposts_total = mention.get('RepostCount')

                if mention.get('node'):
                    post_obj.node = mention.get('node')
                post_obj.last_sync = datetime.utcnow().replace(tzinfo=utc)

                if mention.get('is_bot_trigger'):
                    res = self.handle_mention(mention)
                    logger.info(res)
                    triggered_mentions.append(mention.get('PostHashHex'))

                post_obj.is_bot_processed = True
                post_obj.save()

                mentions_list.append(mention.get("PostHashHex"))

        return (triggered_mentions, mentions_list)

    def handle_mention(self, mention):
        desoSocial = deso.Social(CASAPUBLICKEY, CASABOTSEEDHEX)
        s = mention.get('Body')

        match = re.search('is @([a-z]*) a bot', s)
        if match:
            reply = 'yeah.... probably.'
            return desoSocial.submitPost(
                postExtraData={"App": "CasaBot"},
                parentStakeID=mention.get('PostHashHex'),
                body=reply
            )
        if re.search('quit playing', s):
            reply = 'ok, i\'ll stop playing'
            return desoSocial.submitPost(
                postExtraData={"App": "CasaBot"},
                parentStakeID=mention.get('PostHashHex'),
                body=reply
            )

        logger.info(reply)
        return False

    def handle(self, *args, **options):

        if options.get('response-limit'):
            self.response_limit = options['response-limit']
        if options.get('botname'):
            self.botname = options['botname']
        if options.get('trigger_term'):
            self.trigger_term = options['trigger_term']
        if options.get('run_count'):
            self.run_count = options['run_count']

        self.stdout.write(self.style.NOTICE(
            'Bot starting! \nconfigs: ' + str(options)))
        # get mentions feed
        (mentions, mentions_list) = self.get_mentions()

        for i in range(self.run_count):
            (mentions, mentions_list) = self.get_mentions(mentions_list)

        self.stdout.write(self.style.NOTICE('Bot exiting!'))
