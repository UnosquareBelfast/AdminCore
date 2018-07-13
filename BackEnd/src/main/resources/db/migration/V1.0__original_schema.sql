-- -- Database: HrManager
--  DROP DATABASE "HrManager";
--
-- CREATE DATABASE "HrManager"
-- WITH
-- OWNER = postgres
-- ENCODING = 'UTF8'
-- LC_COLLATE = 'English_United Kingdom.1252'
-- LC_CTYPE = 'English_United Kingdom.1252'
-- TABLESPACE = pg_default
-- CONNECTION LIMIT = -1;

----------------------------------------------------------------------------------------

-- Table: public.country
-- DROP TABLE public.country;

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

ALTER TABLE public.country
    OWNER to postgres;

----------------------------------------------------------------------------------------

-- Table: public.client_status
-- DROP TABLE public.client_status;

CREATE SEQUENCE IF NOT EXISTS public.client_status_client_status_id_seq;
CREATE TABLE IF NOT EXISTS public.client_status
(
    client_status_id integer NOT NULL DEFAULT nextval('client_status_client_status_id_seq'::regclass),
    description character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT client_status_pkey PRIMARY KEY (client_status_id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER SEQUENCE client_status_client_status_id_seq
    OWNED BY client_status.client_status_id;

ALTER TABLE public.client_status
    OWNER to postgres;

----------------------------------------------------------------------------------------

-- Table: public.contract_status
-- DROP TABLE public.contract_status;

CREATE SEQUENCE IF NOT EXISTS public.contract_status_contract_status_id_seq;
CREATE TABLE IF NOT EXISTS public.contract_status
(
    contract_status_id integer NOT NULL DEFAULT nextval('contract_status_contract_status_id_seq'::regclass),
    description character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT contract_status_pkey PRIMARY KEY (contract_status_id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER SEQUENCE contract_status_contract_status_id_seq
    OWNED BY contract_status.contract_status_id;

ALTER TABLE public.contract_status
    OWNER to postgres;

----------------------------------------------------------------------------------------

-- Table: public.employee_status
-- DROP TABLE public.employee_status;

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

ALTER TABLE public.employee_status
    OWNER to postgres;

----------------------------------------------------------------------------------------

-- Table: public.employee_role
-- DROP TABLE public.employee_role;

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

ALTER TABLE public.employee_role
    OWNER to postgres;

----------------------------------------------------------------------------------------

-- Table: public.holiday_status
-- DROP TABLE public.holiday_status;

CREATE SEQUENCE IF NOT EXISTS public.holiday_status_holiday_status_id_seq;
CREATE TABLE IF NOT EXISTS public.holiday_status
(
    holiday_status_id integer NOT NULL DEFAULT nextval('holiday_status_holiday_status_id_seq'::regclass),
    description character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT holiday_status_pkey PRIMARY KEY (holiday_status_id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER SEQUENCE holiday_status_holiday_status_id_seq
    OWNED BY holiday_status.holiday_status_id;

ALTER TABLE public.holiday_status
    OWNER to postgres;

----------------------------------------------------------------------------------------
-- Table: public.employee
-- DROP TABLE public.employee;
CREATE SEQUENCE IF NOT EXISTS public.employee_employee_id_seq1;

-- Table: public.employee
-- DROP TABLE public.employee CASCADE;

CREATE TABLE IF NOT EXISTS public.employee
(
    employee_id integer NOT NULL DEFAULT nextval('employee_employee_id_seq1'::regclass),
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

ALTER SEQUENCE employee_employee_id_seq1
    OWNED BY employee.employee_id;

ALTER TABLE public.employee
    OWNER to postgres;

----------------------------------------------------------------------------------------

-- Table: public.client
-- DROP TABLE public.client;

CREATE SEQUENCE IF NOT EXISTS public.client_client_id_seq1;
CREATE TABLE IF NOT EXISTS public.client
(
  client_id                  integer  NOT NULL DEFAULT nextval('client_client_id_seq1' :: regclass),
  client_name                character varying(255) COLLATE pg_catalog."default",
  client_status_id           integer,
  contact_email              character varying(255) COLLATE pg_catalog."default",
  contact_name               character varying(255) COLLATE pg_catalog."default",
  minimum_employees_for_team integer NOT NULL,
  team_name                  character varying(255) COLLATE pg_catalog."default",
  CONSTRAINT client_pkey PRIMARY KEY (client_id),
  CONSTRAINT client_client_status_id_fkey FOREIGN KEY (client_status_id)
        REFERENCES public.client_status (client_status_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (
OIDS = FALSE
)
TABLESPACE pg_default;

ALTER SEQUENCE client_client_id_seq1
    OWNED BY client.client_id;

ALTER TABLE public.client
    OWNER to postgres;

----------------------------------------------------------------------------------------

-- Table: public.contract
-- DROP TABLE public.contract;

CREATE TABLE IF NOT EXISTS public.contract
(
  client_id          integer NOT NULL,
  employee_id        integer NOT NULL,
  contract_status_id integer,
  CONSTRAINT contract_pkey PRIMARY KEY (client_id, employee_id),
  CONSTRAINT fklhq3p3xl25vvnfvyfc51ica0j FOREIGN KEY (client_id)
        REFERENCES public.client (client_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
  CONSTRAINT fkr2iw6grixlkbx43q2svdrhbb9 FOREIGN KEY (employee_id)
        REFERENCES public.employee (employee_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
  CONSTRAINT contract_contract_status_id_fkey FOREIGN KEY (contract_status_id)
        REFERENCES public.contract_status (contract_status_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (
OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.contract
  OWNER to postgres;

----------------------------------------------------------------------------------------

-- Table: public.holiday
-- DROP TABLE public.holiday;

CREATE SEQUENCE IF NOT EXISTS public.holiday_holiday_id_seq1;
CREATE TABLE IF NOT EXISTS public.holiday
(
  holiday_id        integer NOT NULL DEFAULT nextval('holiday_holiday_id_seq1' :: regclass),
  start_date         date,
  end_date           date,
  date_created      date,
  holiday_status_id integer,
  is_half_day       boolean NOT NULL,
  last_modified     date,
  employee_id       integer,
  CONSTRAINT holiday_pkey PRIMARY KEY (holiday_id),
  CONSTRAINT fkfcn4ebwwpcrk1dbvjqr760hyg FOREIGN KEY (employee_id)
        REFERENCES public.employee (employee_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
  CONSTRAINT holiday_holiday_status_id_fkey FOREIGN KEY (holiday_status_id)
        REFERENCES public.holiday_status (holiday_status_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (
OIDS = FALSE
)
TABLESPACE pg_default;

ALTER SEQUENCE holiday_holiday_id_seq1
    OWNED BY holiday.holiday_id;

ALTER TABLE public.holiday
  OWNER to postgres;