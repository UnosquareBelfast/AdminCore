-- Table: public.event_type
-- DROP TABLE public.event_type;

CREATE SEQUENCE IF NOT EXISTS public.event_type_event_type_id_seq1;
CREATE TABLE IF NOT EXISTS public.event_type
(
  event_type_id        integer NOT NULL DEFAULT nextval('event_type_event_type_id_seq1' :: regclass),
  description character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT event_type_pkey PRIMARY KEY (event_type_id)
)
WITH (
OIDS = FALSE
)
TABLESPACE pg_default;

ALTER SEQUENCE event_type_event_type_id_seq1
    OWNED BY event_type.event_type_id;

ALTER TABLE public.event_type
  OWNER to postgres;
-----------------------------------------------------

INSERT INTO public.event_type (event_type_id, description)
VALUES (1, 'Annual Leave'),
       (2, 'Working From Home'),
       (3, 'Sick Leave'),
       (4, 'Work Related Travel')
ON CONFLICT (event_type_id)
  DO NOTHING;