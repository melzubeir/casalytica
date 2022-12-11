"""
Update profile metadata from the deso blockchain
"""
from django.core.management.base import BaseCommand
from analytics.creatortasks import CreatorTasks


class Command(BaseCommand):
    help = 'Update profile from blockchain'

    username = ''
    publicKey = ''
    profile_only = False
    fetchnum = 1000
    followers_list = []

    def add_arguments(self, parser):

        # positional arguments
        parser.add_argument('username', type=str)

        parser.add_argument(
            '--username',
            type=str,
            default=self.username,
            help='Username from deso node (case insensitive)'
        )
        parser.add_argument(
            '--profile', '-p',
            action='store_true',
            help='Update profile only'
        )
        parser.add_argument(
            '--fetchnum',
            type=int,
            default=self.fetchnum,
            help='Number of posts to fetch per api call to deso node'
        )

    def handle_update_profile(self):
        """handle the update profile request from the command line"""
        tasks = CreatorTasks(username=self.username)

        if (self.profile_only):
            tasks.update_profile()
            self.stdout.write(self.style.SUCCESS('Profile updated.'))
            return

        tasks.update_follows(follow_type='friends')
        self.stdout.write(self.style.SUCCESS('Profile friends updated.'))
        tasks.update_follows(follow_type='followers')
        self.stdout.write(self.style.SUCCESS('Profile followers updated.'))


    def handle(self, *args, **options):

        if options['username']:
            self.username = options['username']
        else:
            self.stderr.write(self.style.ERROR('Username is required'))
            return False
        if options['fetchnum']:
            self.fetchnum = options['fetchnum']
        if options['profile']:
            self.profile_only = True

        self.stdout.write('Updating profile metadata..')

        self.handle_update_profile()
        self.stdout.write(self.style.SUCCESS('Profile metadata updated!'))
