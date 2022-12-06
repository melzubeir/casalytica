"""
Update posts metadata from the deso blockchain
"""
from datetime import (
    datetime,
    timedelta,
)
from django.core.management.base import BaseCommand

from django.db.models import F, Q
from analytics.models import Creator
import json
import deso


class Command(BaseCommand):
    help = 'Update profile from blockchain'

    desoUser = deso.User()
    username = ''
    publicKey = ''
    fetchnum = 50
    followers_list = []

    def add_arguments(self, parser):
        parser.add_argument(
            '--username',
            type=str,
            default=self.username,
        )
        parser.add_argument(
            '--fetchnum',
            type=int,
            default=self.fetchnum,
        )

    def handle(self, *args, **options):

        if options['username']:
            self.username = options['username']
        if options['fetchnum']:
            self.fetchnum = options['fetchnum']
        else:
            self.stderr.write(self.style.ERROR('Username is required'))
            return

        self.stdout.write('Updating profile metadata..')

        self.handle_update_profile_metadata()
        self.stdout.write(self.style.SUCCESS('Profile metadata updated!'))

    def update_followers(self, f):
        """update profile in database"""
        obj, created = Creator.objects.update_or_create(
            public_key_base58=f.get('PublicKeyBase58Check'))

        obj.username = f.get('Username')
        obj.description=f.get('Description')
        obj.last_sync=datetime.now()
        obj.save()
        self.followers_list.append(obj.pk)

    def update_profiles(self, profiles):
        """update profile in database"""

        for p in profiles:
            try:
                username = p.get('ProfileEntryResponse').get('Username')
            except:
                raise Exception("Username not found")
            try:
                featured_url = p.get('ProfileEntryResponse').get('ExtraData').get('FeaturedImageURL')
            except:
                featured_url = ''
            try:
                image_url = p.get('ProfileEntryResponse').get('ExtraData').get('LargeProfilePicURL')
            except:
                image_url = ''
            try:
                description = p.get('ProfileEntryResponse').get('Description')
            except:
                description = ''

            obj, created = Creator.objects.update_or_create(
                public_key_base58=p.get('PublicKeyBase58Check'))

            obj.username = username
            obj.description = description
            obj.profile_image = image_url
            obj.featured_image = featured_url
            obj.last_sync = datetime.now()
            obj.save()

    def handle_update_profile_metadata(self):
        """handle update profile options"""

        followers = self.desoUser.getFollowsStateless(
            username=self.username,
            getFollowing=False,
            numToFetch=self.fetchnum,
        ).json()
        lastPublicKey = ''
        pages = int(followers.get('NumFollowers') / self.fetchnum)

        Creator.objects.filter(
            username=self.username).update(
                follower_count=followers.get('NumFollowers'),
                last_sync=datetime.now()
        )
        creator_list = []

        for follower in followers.get('PublicKeyToProfileEntry').keys():
            f = followers.get('PublicKeyToProfileEntry').get(follower)
            lastPublicKey = f.get('PublicKeyBase58Check')
            creator_list.append(lastPublicKey)
            self.update_followers(f)

        if pages > 0:
            for i in range(1, pages):
                followers = self.desoUser.getFollowsStateless(
                    username=self.username,
                    getFollowing=False,
                    numToFetch=self.fetchnum,
                    lastPublicKey=lastPublicKey,
                ).json()
                for follower in followers.get('PublicKeyToProfileEntry').keys():
                    f = followers.get('PublicKeyToProfileEntry').get(follower)
                    lastPublicKey = f.get('PublicKeyBase58Check')
                    creator_list.append(lastPublicKey)
                    self.update_followers(f)
        pages = 0

        # done w/ pages above, resetting
        pages = int(len(creator_list) / self.fetchnum)

        if pages > 0:
            for i in range(0, pages):
                creators = self.desoUser.getUsersStateless(
                    listOfPublicKeys=creator_list[i*self.fetchnum:(i+1)*self.fetchnum]
                ).json()
                self.update_profiles(creators.get('UserList'))

        obj = Creator.objects.get(username=self.username)

        if obj:
            obj.follower.remove(*obj.follower.all())
            for cf in self.followers_list:
                obj.follower.add(cf)
            obj.save()
