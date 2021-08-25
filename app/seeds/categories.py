from app.models import categories, db, Category


def seed_categories():
    category_seeds = [
        Category(
            name='Foreign Language'
        ),
        Category(
            name='Math'
        ),
        Category(
            name='Science'
        ),
        Category(
            name='Basic'
        ),
        Category(
            name='Advanced'
        ),
        Category(
            name='French'
        ),
        Category(
            name='Spanish'
        ),
        Category(
            name='German'
        ),
    ]

    db.session.add_all(category_seeds)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
def undo_categories():
    # CASCADE deletes any dependent entities
    db.session.execute('TRUNCATE categories RESTART IDENTITY CASCADE;')
    db.session.commit()
