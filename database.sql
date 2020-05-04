
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
    "first_name" varchar(80) NOT NULL,
    "last_name" varchar(80) NOT NULL,
    "email" varchar(50) NOT NULL,
    "address" varchar(200),
    "zipcode" varchar(10) NOT NULL,
    "type_id" int
);

CREATE TABLE "profile_img" (
    "id" SERIAL PRIMARY KEY,
    "user_id" int,
    "img" varchar(1000)
);

CREATE TABLE "work_img" (
    "id" SERIAL PRIMARY KEY,
    "user_id" int,
    "img" varchar(1000)
);

CREATE TABLE "introduction" (
    "id" SERIAL PRIMARY KEY,
    "user_id" int,
    "introduction" varchar(1000)
);

CREATE TABLE "type" (
    "id" SERIAL PRIMARY KEY,
    "type" varchar(20)
);

CREATE TABLE "price_range" (
    "id" SERIAL PRIMARY KEY,
    "user_id" int,
    "min_price" int,
    "max_price" int
);

CREATE TABLE "specialty" (
    "id" SERIAL PRIMARY KEY,
    "specialty" varchar(100)
);

CREATE TABLE "radius" (
    "id" SERIAL PRIMARY KEY,
    "user_id" int,
    "radius" int
);

CREATE TABLE "repairman_specialty" (
    "id" SERIAL PRIMARY KEY,
    "user_id" int,
    "specialty_id" int
);

CREATE TABLE "event" (
    "id" SERIAL PRIMARY KEY,
    "title" varchar(50),
    "time" varchar(50),
    "details" varchar(500)
);

CREATE TABLE "event_user" (
    "id" SERIAL PRIMARY KEY,
    "event_id" int,
    "user_id" int
);