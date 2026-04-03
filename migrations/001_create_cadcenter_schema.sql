-- Migration 001: Create cadcenter schema and migrate cad__resource table

-- 1. Create schema
CREATE SCHEMA IF NOT EXISTS cadcenter;

-- 2. Create table inside schema
CREATE TABLE IF NOT EXISTS cadcenter.cad__resource (
  id_resource  SERIAL        PRIMARY KEY,
  resource_type VARCHAR(100) NOT NULL,
  name          VARCHAR(200) NOT NULL,
  remark        TEXT         NOT NULL DEFAULT '',
  resource      JSONB        NOT NULL DEFAULT '{}'
);

-- 3. Migrate existing data from public schema (if any)
INSERT INTO cadcenter.cad__resource (id_resource, resource_type, name, remark, resource)
SELECT id_resource, resource_type, name, remark, resource
FROM public.cad__resource
ON CONFLICT (id_resource) DO NOTHING;

-- 4. Sync sequence to avoid id collision after manual insert
SELECT setval(
  pg_get_serial_sequence('cadcenter.cad__resource', 'id_resource'),
  COALESCE((SELECT MAX(id_resource) FROM cadcenter.cad__resource), 0) + 1,
  false
);

-- NOTE: Drop the old public table only after verifying data is migrated.
-- Run this manually when ready:
-- DROP TABLE IF EXISTS public.cad__resource;
