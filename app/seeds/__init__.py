from flask.cli import AppGroup
from .users import seed_users, undo_users
from .decks import seed_decks, undo_decks
from .cards import seed_cards, undo_cards
from .categories import seed_categories, undo_categories
from .deck_categories import seed_deck_categories, undo_deck_categories
from .deck_learners import seed_deck_learners, undo_deck_learners

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_decks()
    seed_cards()
    seed_categories()
    seed_deck_categories()
    seed_deck_learners()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_deck_learners()
    undo_deck_categories()
    undo_categories()
    undo_cards()
    undo_decks()
    undo_users()
    # Add other undo functions here
