#!/bin/bash

# Reset the database
echo "Resetting database..."
npx supabase db reset

echo "Database reset and seeded successfully!"
