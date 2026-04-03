-- Migration 003: Create articles table in cadcenter schema

CREATE TABLE IF NOT EXISTS cadcenter.articles (
  id_article   SERIAL        PRIMARY KEY,
  title        TEXT          NOT NULL,
  description  TEXT          NOT NULL DEFAULT '',
  content      TEXT          NOT NULL DEFAULT '',
  created_at   TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);
