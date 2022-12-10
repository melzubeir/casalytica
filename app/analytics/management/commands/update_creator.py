"""
Update profile metadata from the deso blockchain
"""
from django.core.management.base import BaseCommand
from analytics.creators import CreatorTasks


class Command(BaseCommand):
    help = 'Update profile from blockchain'

    username = ''
    publicKey = ''
    fetchnum = 1000
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

    def handle_update_profile(self):

        obj = CreatorTasks(username=self.username)

        obj.update_follows(follow_type='friends')
        self.stdout.write(self.style.SUCCESS('Profile friends updated.'))
        obj.update_follows(follow_type='followers')
        self.stdout.write(self.style.SUCCESS('Profile followers updated.'))


    def handle(self, *args, **options):

        if options['username']:
            self.username = options['username']
        if options['fetchnum']:
            self.fetchnum = options['fetchnum']
        else:
            self.stderr.write(self.style.ERROR('Username is required'))
            return

        self.stdout.write('Updating profile metadata..')

        self.handle_update_profile()
        self.stdout.write(self.style.SUCCESS('Profile metadata updated!'))
