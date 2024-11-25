"""create ponies table

Revision ID: 92f7e0391d4e
Revises: 50b4ec3aaf98
Create Date: 2024-11-25 10:03:17.555408

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '92f7e0391d4e'
down_revision: Union[str, None] = '50b4ec3aaf98'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "ponies",
        sa.Column("id", sa.Integer, primary_key=True),
        sa.Column("name", sa.String(100), nullable=False),
        sa.Column("breed", sa.String(20), nullable=False),
        sa.Column("birth_year", sa.Integer, nullable=False),
        sa.Column("owner_id",
                  sa.Integer,
                  sa.ForeignKey("owners.id"),
                  nullable=False)
    )


def downgrade() -> None:
    op.drop_table("ponies")
