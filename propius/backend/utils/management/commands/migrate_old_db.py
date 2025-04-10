import os
import json
import sqlite3
from django.core.management.base import BaseCommand
from django.conf import settings
from django.db import connection
from django.apps import apps
from pathlib import Path


class Command(BaseCommand):
    help = """
    Migrates data from an old SQLite database to the current database.
    
    Example:
    python manage.py migrate_old_db --old-db /path/to/old/db.sqlite3 --output /path/to/output/fixtures.json
    """

    def add_arguments(self, parser):
        parser.add_argument(
            "--old-db",
            type=str,
            required=True,
            help="Path to the old SQLite database file",
        )
        parser.add_argument(
            "--output",
            type=str,
            default="fixtures.json",
            help="Output file path for the fixtures (default: fixtures.json)",
        )
        parser.add_argument(
            "--apps",
            type=str,
            nargs="+",
            default=None,
            help="List of apps to migrate (default: all installed apps)",
        )

    def handle(self, *args, **options):
        old_db_path = options["old_db"]
        output_file = options["output"]
        apps_to_migrate = options["apps"]

        if not os.path.exists(old_db_path):
            self.stderr.write(
                self.style.ERROR(f"Old database file not found: {old_db_path}")
            )
            return

        self.stdout.write(f"Connecting to old database: {old_db_path}")
        old_conn = sqlite3.connect(old_db_path)
        old_conn.row_factory = sqlite3.Row

        # Get all tables from the old database
        cursor = old_conn.cursor()
        cursor.execute(
            "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' AND name NOT LIKE 'django_%'"
        )
        tables = [row[0] for row in cursor.fetchall()]

        # Filter tables by app if specified
        if apps_to_migrate:
            filtered_tables = []
            for table in tables:
                for app in apps_to_migrate:
                    if table.startswith(f"{app}_"):
                        filtered_tables.append(table)
                        break
            tables = filtered_tables

        self.stdout.write(f"Found {len(tables)} tables to migrate")

        # Create a dictionary to store the fixtures
        fixtures = {}

        # For each table, get all rows and create fixtures
        for table in tables:
            self.stdout.write(f"Migrating table: {table}")
            cursor.execute(f"SELECT * FROM {table}")
            rows = cursor.fetchall()

            if not rows:
                self.stdout.write(f"  No data found in table {table}")
                continue

            # Convert rows to dictionaries
            table_data = []
            for row in rows:
                row_dict = dict(row)
                # Convert any binary data to base64
                for key, value in row_dict.items():
                    if isinstance(value, bytes):
                        import base64

                        row_dict[key] = base64.b64encode(value).decode("utf-8")
                table_data.append(row_dict)

            fixtures[table] = table_data
            self.stdout.write(f"  Migrated {len(table_data)} rows from {table}")

        # Close the old database connection
        old_conn.close()

        # Write the fixtures to a file
        with open(output_file, "w") as f:
            json.dump(fixtures, f, indent=2)

        self.stdout.write(
            self.style.SUCCESS(f"Successfully migrated data to {output_file}")
        )

        # Option to load the fixtures into the current database
        self.stdout.write("To load the fixtures into the current database, run:")
        self.stdout.write(f"python manage.py loaddata {output_file}")
