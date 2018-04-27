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
-- Table: public.employee

-- DROP TABLE public.employee;
CREATE SEQUENCE IF NOT EXISTS employee_employee_id_seq1;

CREATE TABLE IF NOT EXISTS public.employee
(
    employee_id integer NOT NULL DEFAULT nextval('employee_employee_id_seq1'::regclass),
    country_id smallint,
    email character varying(255) COLLATE pg_catalog."default",
    employee_role_id smallint,
    employee_status_id smallint,
    forename character varying(255) COLLATE pg_catalog."default",
    password character varying(255) COLLATE pg_catalog."default",
    start_date date,
    surname character varying(255) COLLATE pg_catalog."default",
    total_holidays smallint NOT NULL,
    CONSTRAINT employee_pkey PRIMARY KEY (employee_id)
)
WITH (
OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.employee
    OWNER to postgres;

--decrypted password un05qu@r3_@dm1n
INSERT INTO public.employee(
    employee_id, country_id, email, employee_role_id, employee_status_id, forename, password, start_date, surname, total_holidays)
VALUES (1, 1, 'superuser@unosquare.com', 1, 1 , 'super', '$2a$10$v3qpm5f2Y45AeUbV2Wjiz.hMrUNVpmKcYuXJrRXHouOTNkTB26B9q', '2018-01-01', 'user', 28)
ON CONFLICT (employee_id) DO NOTHING;

----------------------------------------------------------------------------------------

-- Table: public.client

-- DROP TABLE public.client;
CREATE SEQUENCE IF NOT EXISTS client_client_id_seq1;
CREATE TABLE IF NOT EXISTS public.client
(
    client_id integer NOT NULL DEFAULT nextval('client_client_id_seq1'::regclass),
    client_name character varying(255) COLLATE pg_catalog."default",
    client_status_id smallint,
    contact_email character varying(255) COLLATE pg_catalog."default",
    contact_name character varying(255) COLLATE pg_catalog."default",
    minimum_employees_for_team smallint NOT NULL,
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
    contract_status_id smallint,
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
CREATE SEQUENCE IF NOT EXISTS holiday_holiday_id_seq1;
CREATE TABLE IF NOT EXISTS public.holiday
(
    holiday_id integer NOT NULL DEFAULT nextval('holiday_holiday_id_seq1'::regclass),
    date date,
    date_created date,
    holiday_status_id smallint,
    is_half_day boolean NOT NULL,
    last_modified date,
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
CREATE SEQUENCE IF NOT EXISTS mandatory_holiday_mandatory_holiday_id_seq1;
CREATE TABLE IF NOT EXISTS public.mandatory_holiday
(
    mandatory_holiday_id integer NOT NULL DEFAULT nextval('mandatory_holiday_mandatory_holiday_id_seq1'::regclass),
    country_id smallint,
    date date,
    CONSTRAINT mandatory_holiday_pkey PRIMARY KEY (mandatory_holiday_id)
)
WITH (
OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.mandatory_holiday
    OWNER to postgres;



