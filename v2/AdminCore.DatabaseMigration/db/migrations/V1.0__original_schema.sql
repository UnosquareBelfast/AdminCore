-- -- Database: AdminCore
--  DROP DATABASE "AdminCore";
--
-- CREATE DATABASE "AdminCore"
-- WITH
-- OWNER = postgres
-- ENCODING = 'UTF8'
-- LC_COLLATE = 'English_United Kingdom.1252'
-- LC_CTYPE = 'English_United Kingdom.1252'
-- TABLESPACE = pg_default
-- CONNECTION LIMIT = -1;


  ----------------------------------------------------------------------------------------

/*
                                   COUNTRY TABLE
*/

  ----------------------------------------------------------------------------------------

CREATE SEQUENCE IF NOT EXISTS public.country_country_id_seq;
CREATE TABLE IF NOT EXISTS public.country
(
    country_id integer NOT NULL DEFAULT nextval('country_country_id_seq'::regclass),
    description character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT country_pkey PRIMARY KEY (country_id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER SEQUENCE country_country_id_seq
    OWNED BY country.country_id;


  ----------------------------------------------------------------------------------------

/*
                                   EMPLOYEE STATUS TABLE
*/

  ----------------------------------------------------------------------------------------

CREATE SEQUENCE IF NOT EXISTS public.employee_status_employee_status_id_seq;
CREATE TABLE IF NOT EXISTS public.employee_status
(
    employee_status_id integer NOT NULL DEFAULT nextval('employee_status_employee_status_id_seq'::regclass),
    description character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT employee_status_pkey PRIMARY KEY (employee_status_id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER SEQUENCE employee_status_employee_status_id_seq
    OWNED BY employee_status.employee_status_id;


  ----------------------------------------------------------------------------------------

/*
                                   EMPLOYEE TABLE
*/

  ----------------------------------------------------------------------------------------

CREATE SEQUENCE IF NOT EXISTS public.employee_role_employee_role_id_seq;
CREATE TABLE IF NOT EXISTS public.employee_role
(
    employee_role_id integer NOT NULL DEFAULT nextval('employee_role_employee_role_id_seq'::regclass),
    description character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT employee_role_pkey PRIMARY KEY (employee_role_id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER SEQUENCE employee_role_employee_role_id_seq
    OWNED BY employee_role.employee_role_id;

  ----------------------------------------------------------------------------------------

/*
                                   EVENT STATUS TABLE
*/

  ----------------------------------------------------------------------------------------

CREATE SEQUENCE IF NOT EXISTS public.event_status_event_status_id_seq;
CREATE TABLE IF NOT EXISTS public.event_status
(
    event_status_id integer NOT NULL DEFAULT nextval('event_status_event_status_id_seq'::regclass),
    description character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT event_status_pkey PRIMARY KEY (event_status_id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER SEQUENCE event_status_event_status_id_seq
    OWNED BY event_status.event_status_id;

  ----------------------------------------------------------------------------------------

/*
                                   EVENT TYPE TABLE
*/

  ----------------------------------------------------------------------------------------

CREATE SEQUENCE IF NOT EXISTS public.event_type_event_type_id_seq;
CREATE TABLE IF NOT EXISTS public.event_type
(
    event_type_id        integer NOT NULL DEFAULT nextval('event_type_event_type_id_seq' :: regclass),
    description character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT event_type_pkey PRIMARY KEY (event_type_id)
)
WITH (
OIDS = FALSE
)
TABLESPACE pg_default;

ALTER SEQUENCE event_type_event_type_id_seq
    OWNED BY event_type.event_type_id;

  ----------------------------------------------------------------------------------------

/*
                                   EMPLOYEE TABLE
*/

  ----------------------------------------------------------------------------------------
CREATE SEQUENCE IF NOT EXISTS public.employee_employee_id_seq;
CREATE TABLE IF NOT EXISTS public.employee
(
    employee_id integer NOT NULL DEFAULT nextval('employee_employee_id_seq'::regclass),
    country_id integer NOT NULL,
    email character varying(255) COLLATE pg_catalog."default",
    employee_role_id integer NOT NULL,
    employee_status_id integer NOT NULL,
    forename character varying(255) COLLATE pg_catalog."default",
    password character varying(255) COLLATE pg_catalog."default",
    start_date date NOT NULL,
    surname character varying(255) COLLATE pg_catalog."default",
    total_holidays integer NOT NULL,
    CONSTRAINT employee_pkey PRIMARY KEY (employee_id),
    CONSTRAINT employee_country_id_fkey FOREIGN KEY (country_id)
        REFERENCES public.country (country_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT employee_employee_role_id_fkey FOREIGN KEY (employee_role_id)
        REFERENCES public.employee_role (employee_role_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT employee_status_id_fkey FOREIGN KEY (employee_status_id)
        REFERENCES public.employee_status (employee_status_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER SEQUENCE employee_employee_id_seq
    OWNED BY employee.employee_id;

  ----------------------------------------------------------------------------------------

/*
                                   CLIENT TABLE
*/

  ----------------------------------------------------------------------------------------

CREATE SEQUENCE IF NOT EXISTS public.client_client_id_seq;
CREATE TABLE IF NOT EXISTS public.client
(
  client_id                  integer  NOT NULL DEFAULT nextval('client_client_id_seq' :: regclass),
  client_name                character varying(255) COLLATE pg_catalog."default",
  CONSTRAINT client_pkey PRIMARY KEY (client_id)
)
WITH (
OIDS = FALSE
)
TABLESPACE pg_default;

ALTER SEQUENCE client_client_id_seq
    OWNED BY client.client_id;

  ----------------------------------------------------------------------------------------

/*
                                  TEAM TABLE
*/

  ----------------------------------------------------------------------------------------

CREATE SEQUENCE IF NOT EXISTS public.team_team_id_seq;
CREATE TABLE IF NOT EXISTS public.team
(
  team_id                    integer  NOT NULL DEFAULT nextval('team_team_id_seq' :: regclass),
  client_id                  integer NOT NULL,
  team_name                  character varying(255) COLLATE pg_catalog."default",
  contact_email              character varying(255) COLLATE pg_catalog."default",
  contact_name               character varying(255) COLLATE pg_catalog."default",
  CONSTRAINT team_pkey PRIMARY KEY (team_id),
  CONSTRAINT team_client_id_fkey FOREIGN KEY (client_id)
        REFERENCES public.client (client_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (
OIDS = FALSE
)
TABLESPACE pg_default;

ALTER SEQUENCE team_team_id_seq
    OWNED BY team.team_id;

  ----------------------------------------------------------------------------------------

/*
                                  CONTRACT TABLE
*/

  ----------------------------------------------------------------------------------------

CREATE SEQUENCE IF NOT EXISTS public.contract_contract_id_seq;
CREATE TABLE IF NOT EXISTS public.contract
(
  contract_id        integer  NOT NULL DEFAULT nextval('contract_contract_id_seq' :: regclass),
  team_id            integer NOT NULL,
  employee_id        integer NOT NULL,
  start_date         date NOT NULL,
  end_date         date NULL,
  CONSTRAINT contract_pkey PRIMARY KEY (contract_id),
  CONSTRAINT contract_team_id_fkey FOREIGN KEY (team_id)
        REFERENCES public.team (team_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
  CONSTRAINT contract_employee_id FOREIGN KEY (employee_id)
        REFERENCES public.employee (employee_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (
OIDS = FALSE
)
TABLESPACE pg_default;


  ----------------------------------------------------------------------------------------

/*
                                  EVENT TABLE
*/

  ----------------------------------------------------------------------------------------

CREATE SEQUENCE IF NOT EXISTS public.event_event_id_seq;
CREATE TABLE IF NOT EXISTS public.event
(
  event_id        integer NOT NULL  nextval('event_event_id_seq' :: regclass),
  employee_id       integer,
  date_created      timestamp ,
  event_status_id integer,
  event_type_id integer,
  last_modified     timestamp ,
  CONSTRAINT event_pkey PRIMARY KEY (event_id),
  CONSTRAINT event_employee_id_fkey FOREIGN KEY (employee_id)
        REFERENCES public.employee (employee_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
  CONSTRAINT event_event_status_id_fkey FOREIGN KEY (event_status_id)
        REFERENCES public.event_status (event_status_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT event_event_type_id_fkey FOREIGN KEY (event_type_id)
        REFERENCES public.event_type (event_type_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION

)
WITH (
OIDS = FALSE
)
TABLESPACE pg_default;

ALTER SEQUENCE event_event_id_seq
    OWNED BY event.event_id;

  ----------------------------------------------------------------------------------------

/*
                                  EVENT DATE TABLE
*/

  ----------------------------------------------------------------------------------------


CREATE SEQUENCE IF NOT EXISTS public.event_dates_event_dates_id_seq;
CREATE TABLE public.event_dates
(
    event_dates_id integer NOT NULL DEFAULT nextval('event_dates_event_dates_id_seq' :: regclass),
    event_id integer NOT NULL,
    start_date timestamp NOT NULL,
    end_date timestamp NOT NULL,
    is_half_day       boolean NOT NULL,
    CONSTRAINT event_dates_pkey PRIMARY KEY (event_dates_id),
	  CONSTRAINT event_id_fkey FOREIGN KEY (event_id)
        REFERENCES public.event (event_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER SEQUENCE event_dates_event_dates_id_seq
    OWNED BY event_dates.event_dates_id;


  ----------------------------------------------------------------------------------------

/*
                                  EVENT MESSAGE TYPE TABLE
*/

  ----------------------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.event_message_type
(
    event_message_type_id        integer,
    description character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT event_message_type_pkey PRIMARY KEY (event_message_type_id)
)
WITH (
OIDS = FALSE
)
TABLESPACE pg_default;

  ----------------------------------------------------------------------------------------

/*
                                  EVENT MESSAGE TABLE
*/

  ----------------------------------------------------------------------------------------

CREATE SEQUENCE IF NOT EXISTS public.event_message_event_message_id_seq;
CREATE TABLE public.event_message
(
    event_message_id integer NOT NULL DEFAULT nextval('event_message_event_message_id_seq' :: regclass),
    event_id integer NOT NULL,
    message text NOT NULL,
    last_modified timestamp NOT NULL,
    employee_id integer NOT NULL,
    event_message_type_id integer NOT NULL,
    CONSTRAINT event_message_pkey PRIMARY KEY (event_message_id),
	  CONSTRAINT event_id_fkey FOREIGN KEY (event_id)
        REFERENCES public.event (event_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
	  CONSTRAINT event_message_employee_id_fkey FOREIGN KEY (employee_id)
        REFERENCES public.employee (employee_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
	  CONSTRAINT event_message_type_event_message_type_id_fkey FOREIGN KEY (event_message_type_id)
        REFERENCES public.event_message_type (event_message_type_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER SEQUENCE event_message_event_message_id_seq
    OWNED BY event_message.event_message_id;
