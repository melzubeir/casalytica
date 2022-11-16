""""
deso helper functions
"""
import logging
from deso import Posts
from config import settings

logger = logging.getLogger(__name__)

def get_post_data(post_hash, skip_deso=True):
    """get post data from deso"""
    logger.info('get_post_data() ----> ENTRY <----')
    p = {
        'post_hash': post_hash,
        'likes_total': 0,
        'diamonds_total': 0,
        'comments_total': 0,
        'reposts_total': 0,
        'creator': {
            'username': 'unknown',
            'key': 'unknown'
        },
        'node': 1
    }
    if skip_deso:
        logger.info(
            'get_post_data() skip_deso True p: %s', p)
        return p

    desoPost = Posts(nodeURL=settings.nodeURL)

    try:
        sPost = desoPost.getSinglePost(postHashHex=post_hash,
                                       readerPublicKey=settings.casalyticaPublicKey).json()
    except:
        logger.critical("Error getting post data from deso")
        return p

    try:
        if 'PostFound' in sPost:
            if 'Node' in sPost['PostFound']['PostExtraData']:
                n = sPost['PostFound']['PostExtraData']['Node']
            else:
                n = 1
            p = {
                'post_hash': post_hash,
                'likes_total': sPost['PostFound']['LikeCount'],
                'diamonds_total': sPost['PostFound']['DiamondCount'],
                'comments_total': sPost['PostFound']['CommentCount'],
                'reposts_total': sPost['PostFound']['RepostCount'],
                'creator': {
                    'username': sPost['PostFound']['ProfileEntryResponse']['Username'],
                    'key': sPost['PostFound']['ProfileEntryResponse']['PublicKeyBase58Check']
                },
                'node': n
            }
    except:
        logger.error('error getting post from deso')

    logger.info('post data from deso: %s', p)
    return p
