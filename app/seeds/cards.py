from app.models import db, Card

# french_colors = Deck.query.get(1)
# french_animals = Deck.query.get(2)
# french_numbers = Deck.query.get(3)

color_cards = [
    Card(
        # deck=french_colors,
        deck_id=1,
        front_text='Red',
        back_text='Rouge',
        front_image=None,
        back_image=None
    ),
    Card(
        # deck=french_colors,
        deck_id=1,
        front_text='Blue',
        back_text='Bleu',
        front_image=None,
        back_image=None
    ),
    Card(
        # deck=french_colors,
        deck_id=1,
        front_text='Green',
        back_text='Vert',
        front_image=None,
        back_image=None
    )
]

animal_cards = [
    Card(
        # deck=french_animals,
        deck_id=2,
        front_text='Monkey',
        back_text='Le singe (m)',
        front_image=None,
        back_image=None
    ),
    Card(
        # deck=french_animals,
        deck_id=2,
        front_text='Cow',
        back_text='La vache (f)',
        front_image=None,
        back_image=None
    ),
    Card(
        # deck=french_animals,
        deck_id=2,
        front_text='Bird',
        back_text='L\'Oiseau (m)',
        front_image=None,
        back_image=None
    )
]

number_cards = [
    Card(
        # deck=french_numbers,
        deck_id=3,
        front_text='One',
        back_text='Un',
        front_image=None,
        back_image=None
    ),
    Card(
        # deck=french_numbers,
        deck_id=3,
        front_text='Two',
        back_text='Deux',
        front_image=None,
        back_image=None
    ),
    Card(
        # deck=french_numbers,
        deck_id=3,
        front_text='Three',
        back_text='Trois',
        front_image=None,
        back_image=None
    ),
]


def seed_cards():

    db.session.add_all(color_cards)
    db.session.add_all(animal_cards)
    db.session.add_all(number_cards)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
def undo_cards():
    # CASCADE deletes any dependent entities
    db.session.execute('TRUNCATE cards RESTART IDENTITY CASCADE;')
    db.session.commit()
