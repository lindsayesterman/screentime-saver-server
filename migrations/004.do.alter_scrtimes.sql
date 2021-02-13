ALTER TABLE scrtimes
    ADD COLUMN
    date_created TIMESTAMPTZ NOT NULL DEFAULT now()
