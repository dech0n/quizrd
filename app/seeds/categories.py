from app.models import categories, db, Category

foreign_language = Category(name='Foreign Language')
french = Category(name='French')
basic = Category(name='Basic')
advanced = Category(name='Advanced')
nature = Category(name='Nature')
colors = Category(name='Colors')
math = Category(name='Math')


def seed_categories():

    category_seeds = [
        foreign_language,
        french,
        basic,
        advanced,
        nature,
        colors,
        math
    ]

    db.session.add_all(category_seeds)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
def undo_categories():
    # CASCADE deletes any dependent entities
    db.session.execute('TRUNCATE categories RESTART IDENTITY CASCADE;')
    db.session.commit()
