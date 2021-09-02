from app.models import db, Deck
from .users import demo, bobbie, marnie

french_colors = Deck(
    owner=demo,
    # owner_id=1,
    title='French Colors',
    description='Learn colors in French',
    image=None
)

french_animals = Deck(
    owner=marnie,
    # owner_id=2,
    title='French Animals',
    description="""Learn animals in French.
    (m) = masculine noun, (f) = feminine noun""",
    image=None
)

french_numbers = Deck(
    owner=bobbie,
    # owner_id=3,
    title='French Numbers',
    description='Learn to count in French',
    image=None
)


def seed_decks():
    db.session.add(french_colors)
    db.session.add(french_animals)
    db.session.add(french_numbers)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the decks table.
# SQLAlchemy doesn't have a built in function to do this
def undo_decks():
    db.session.execute('TRUNCATE decks RESTART IDENTITY CASCADE;')
    db.session.commit()
