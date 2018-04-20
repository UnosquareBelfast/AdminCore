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

-- Table: public.employee_user_role

-- DROP TABLE public.employee_user_role;

CREATE SEQUENCE IF NOT EXISTS employee_user_role_employee_user_role_id_seq;
CREATE TABLE IF NOT EXISTS public.employee_user_role
(
    employee_user_role_id integer NOT NULL DEFAULT nextval('employee_user_role_employee_user_role_id_seq'::regclass),
    role_description character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT employee_user_role_pkey PRIMARY KEY (employee_user_role_id)
)
WITH (
OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.employee_user_role
    OWNER to postgres;

INSERT INTO public.employee_user_role(
    employee_user_role_id, role_description)
VALUES (1, 'Team Leader');

INSERT INTO public.employee_user_role(
    employee_user_role_id, role_description)
VALUES (2, 'System Admin');

INSERT INTO public.employee_user_role(
    employee_user_role_id, role_description)
VALUES (3, 'User');

----------------------------------------------------------------------------------------

-- Table: public.employee

-- DROP TABLE public.employee;

CREATE SEQUENCE IF NOT EXISTS employee_employee_id_seq;
CREATE TABLE IF NOT EXISTS public.employee
(
    employee_id integer NOT NULL DEFAULT nextval('employee_employee_id_seq'::regclass),
    country character varying(255) COLLATE pg_catalog."default",
    email character varying(255) COLLATE pg_catalog."default",
    forename character varying(255) COLLATE pg_catalog."default",
    is_active boolean NOT NULL,
    password character varying(255) COLLATE pg_catalog."default",
    start_date date,
    surname character varying(255) COLLATE pg_catalog."default",
    total_holidays smallint NOT NULL,
    employee_user_role_id integer NOT NULL,
    CONSTRAINT employee_pkey PRIMARY KEY (employee_id),
    CONSTRAINT fk9baesme7h7qf13xsa4ado0epi FOREIGN KEY (employee_user_role_id)
    REFERENCES public.employee_user_role (employee_user_role_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
)
WITH (
OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.employee
    OWNER to postgres;

--decrypted password un05qu@r3_@dm1n
INSERT INTO public.employee(
employee_id, country, email, forename, is_active, password, start_date, surname, total_holidays, employee_user_role_id)
VALUES (1, 'Northern Ireland', 'superuser@unosquare.com', 'super', TRUE , '$2a$10$v3qpm5f2Y45AeUbV2Wjiz.hMrUNVpmKcYuXJrRXHouOTNkTB26B9q', '2018-01-01', 'user', 28, 2);

----------------------------------------------------------------------------------------

-- Table: public.client

-- DROP TABLE public.client;

CREATE SEQUENCE IF NOT EXISTS client_client_id_seq;
CREATE TABLE IF NOT EXISTS public.client
(
    client_id integer NOT NULL DEFAULT nextval('client_client_id_seq'::regclass),
    client_name character varying(255) COLLATE pg_catalog."default",
    contact_email character varying(255) COLLATE pg_catalog."default",
    contact_name character varying(255) COLLATE pg_catalog."default",
    minimum_employees_for_team smallint NOT NULL,
    status character varying(255) COLLATE pg_catalog."default",
    team_name character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT client_pkey PRIMARY KEY (client_id)
)
WITH (
OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.client
    OWNER to postgres;

----------------------------------------------------------------------------------------

-- Table: public.contract

-- DROP TABLE public.contract;

CREATE TABLE IF NOT EXISTS public.contract
(
    client_id integer NOT NULL,
    employee_id integer NOT NULL,
    status character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT contract_pkey PRIMARY KEY (client_id, employee_id),
    CONSTRAINT fklhq3p3xl25vvnfvyfc51ica0j FOREIGN KEY (client_id)
    REFERENCES public.client (client_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION,
    CONSTRAINT fkr2iw6grixlkbx43q2svdrhbb9 FOREIGN KEY (employee_id)
    REFERENCES public.employee (employee_id) MATCH SIMPLE
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

CREATE SEQUENCE IF NOT EXISTS holiday_holiday_id_seq;
CREATE TABLE IF NOT EXISTS public.holiday
(
    holiday_id integer NOT NULL DEFAULT nextval('holiday_holiday_id_seq'::regclass),
    date date,
    date_created date,
    is_half_day boolean NOT NULL,
    last_modified date,
    status character varying(255) COLLATE pg_catalog."default",
    employee_id integer,
    CONSTRAINT holiday_pkey PRIMARY KEY (holiday_id),
    CONSTRAINT fkfcn4ebwwpcrk1dbvjqr760hyg FOREIGN KEY (employee_id)
    REFERENCES public.employee (employee_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
)
WITH (
OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.holiday
    OWNER to postgres;

----------------------------------------------------------------------------------------

-- Table: public.mandatory_holiday

-- DROP TABLE public.mandatory_holiday;

CREATE SEQUENCE IF NOT EXISTS mandatory_holiday_mandatory_holiday_id_seq;
CREATE TABLE IF NOT EXISTS public.mandatory_holiday
(
    mandatory_holiday_id integer NOT NULL DEFAULT nextval('mandatory_holiday_mandatory_holiday_id_seq'::regclass),
    country character varying(255) COLLATE pg_catalog."default",
    date date,
    CONSTRAINT mandatory_holiday_pkey PRIMARY KEY (mandatory_holiday_id)
)
WITH (
OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.mandatory_holiday
    OWNER to postgres;



