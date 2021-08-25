from app.models import db, Deck, User

demo = User.query.get(1)
marnie = User.query.get(2)
bobbie = User.query.get(3)


def seed_decks():
    french_colors = Deck(
        owner=demo,
        title='French Colors',
        description='Learn colors in French',
        image=None
    )

    french_animals = Deck(
        owner=marnie,
        title='French Animals',
        description="""Learn animals in French.
                    (m) = masculine noun, (f) = feminine noun""",
        image=None
    )

    french_numbers = Deck(
        owner=bobbie,
        title='French Numbers',
        description='Learn to count in French',
        image=None
    )

    db.session.add(french_colors)
    db.session.add(french_animals)
    db.session.add(french_numbers)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the decks table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_decks():
    db.session.execute('TRUNCATE decks RESTART IDENTITY CASCADE;')
    db.session.commit()
