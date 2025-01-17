#!/bin/bash

# Apply the RLS policies to pillar_6_data table
psql -h localhost -p 54322 -U postgres -d postgres -f supabase/migrations/20250117020003_add_pillar_6_rls.sql
