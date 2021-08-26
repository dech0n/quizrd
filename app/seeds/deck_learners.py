from app.models import db
from .decks import french_colors, french_animals, french_numbers
from .users import demo, marnie, bobbie


def seed_deck_learners():
    french_colors.learners.append(demo)
    french_colors.learners.append(bobbie)

    french_animals.learners.append(marnie)
    french_animals.learners.append(bobbie)

    french_numbers.learners.append(demo)
    french_numbers.learners.append(bobbie)
    french_numbers.learners.append(marnie)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
def undo_deck_learners():
    # CASCADE deletes any dependent entities
    db.session.execute('TRUNCATE deck_learners RESTART IDENTITY CASCADE;')
    db.session.commit()
