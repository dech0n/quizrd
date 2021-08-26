from app.models import db
from .decks import french_colors, french_animals, french_numbers
from .categories import foreign_language, french, nature, basic, advanced, math, colors


def seed_deck_categories():
    french_colors.categories.append(colors)
    french_colors.categories.append(french)
    french_colors.categories.append(foreign_language)
    french_colors.categories.append(basic)

    french_animals.categories.append(nature)
    french_animals.categories.append(french)
    french_animals.categories.append(foreign_language)
    french_animals.categories.append(basic)

    french_numbers.categories.append(math)
    french_numbers.categories.append(french)
    french_numbers.categories.append(foreign_language)
    french_numbers.categories.append(basic)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
def undo_deck_categories():
    # CASCADE deletes any dependent entities
    db.session.execute('TRUNCATE deck_categories RESTART IDENTITY CASCADE;')
    db.session.commit()
