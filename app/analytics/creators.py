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
import deso

from config.settings import (
    logger
)

from .models import (
    Creator
)


class CreatorTasks:
    """Creator Tasks class"""

    def __init__(
            self,
            fetchnum=1000,
            username=''):
        self.desoUser = deso.User()
        self.username = username
        self.fetchnum = fetchnum
        self.created = None

        p = self.desoUser.getSingleProfile(username=self.username).json()
        p = self.normalize_profile(p)

        try:
            self.public_key_base58 = p.get('PublicKeyBase58Check')
        except:
            logger.error(p)

        self.creator_obj, self.created = Creator.objects.get_or_create(
            username=self.username,
            public_key_base58=self.public_key_base58,)

    def normalize_profile(self, profile):
        """normalize profile data"""
        if profile.get('ProfileEntryResponse'):
            # this came from the getUsersStateless endpoint
            profile = profile.get('ProfileEntryResponse')
        if profile.get('Profile'):
            # this came from the getSingleProfile endpoint
            # nothing needed here
            profile = profile.get('Profile')
        if profile.get('PublicKeyToProfileEntry'):
            # this came from the getFollowsStateless endpoint
            # not gonna accept lists of profiles
            return None
        return profile

    def _update_or_create_profile(self, f):
        """update profile in database and return a tuple of (obj, created)"""

        try:
            obj, created = Creator.objects.get_or_create(
                username=f.get('Username'),
                public_key_base58=f.get('PublicKeyBase58Check'),
            )
        except Exception as e:
            logger.error(e)
            return None

        try:
            obj.featured_image = f.get(
                'ExtraData', {}).get('FeaturedImageURL')
        except:
            pass
        try:
            obj.coin_hodlers_num = f.get(
                'CoinEntry', {}).get('NumberOfHolders')
        except:
            pass
        try:
            obj.dao_hodlers_num = f.get(
                'DAOCoinEntry', {}).get('NumberOfHolders')
        except:
            pass
        obj.username = f.get('Username')
        obj.description = f.get('Description')
        obj.profile_image = self.desoUser.getProfilePicURL(
            f.get('PublicKeyBase58Check'))
        obj.is_verified = f.get('IsVerified')
        obj.deso_balance = f.get('DESOBalanceNanos')
        obj.coin_price = f.get('CoinPriceDeSoNanos')
        obj.last_sync = datetime.utcnow().replace(tzinfo=utc)
        obj.save()

        return obj

    def update_follows(self, follow_type='followers'):
        """update followers/friends in database"""

        if not self.creator_obj:
            logger.error("Creator does not exist")
            return False

        if follow_type == 'followers':
            getFollowing = False
        else:
            getFollowing = True

        follows = self.desoUser.getFollowsStateless(
            username=self.username,
            getFollowing=getFollowing,
            numToFetch=self.fetchnum,
        ).json()

        pages = int(follows.get('NumFollowers') / self.fetchnum) + 1
        logger.info("pages: %s" % pages)
        last_public_key = None
        follows_list = []

        # loop through the pages
        for page in range(pages):
            logger.info(page)
            if page == 0:
                # first page query has already been made above
                pass
            else:
                follows = self.desoUser.getFollowsStateless(
                    publicKey=self.public_key_base58,
                    getFollowing=getFollowing,
                    numToFetch=self.fetchnum,
                    lastPublicKey=last_public_key
                ).json()

            # loop through the followers of on page

            for follow in follows.get('PublicKeyToProfileEntry').keys():
                # drill down to the profile entry
                logger.info("for follows loop: %s", follow)
                skip = False
                last_public_key = follow
                try:
                    f = follows.get('PublicKeyToProfileEntry').get(follow)
                except Exception as e:
                    logger.error(e)
                    skip = True
                    continue
                if not skip:
                    # append followers_list with creator objects
                    obj = self._update_or_create_profile(f)
                    follows_list.append(obj)

            # after each page, update the creator object
            if follow_type == 'followers':
                self.creator_obj.followers.set(follows_list)
                self.creator_obj.follower_count = len(follows_list)
            else:
                self.creator_obj.friends.set(follows_list)
                self.creator_obj.friends_count = len(follows_list)
            self.creator_obj.save()
