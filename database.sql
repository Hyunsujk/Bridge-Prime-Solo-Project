
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "first_name" varchar(80) NOT NULL,
    "last_name" varchar(80) NOT NULL,
    "email" varchar(50) NOT NULL,
    "address_line1" varchar(100),
    "address_line2" varchar(100),
    "city" varchar(100),
    "state" varchar(2),
    "zip_code" varchar(10) NOT NULL,
    "introduction" varchar(1000),
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

CREATE TABLE "user_price_range" (
  "id" SERIAL PRIMARY KEY,
  "user_id" int,
  "min_price" int,
  "max_price" int
);

CREATE TABLE "specialty" (
    "id" SERIAL PRIMARY KEY,
    "specialty" varchar(100)
);

CREATE TABLE "user_radius" (
  "id" SERIAL PRIMARY KEY,
  "user_id" int,
  "radius_id" int
);

CREATE TABLE "radius" (
  "id" SERIAL PRIMARY KEY,
  "radius" int
);

CREATE TABLE "user_specialty" (
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

-- add data
INSERT INTO "type" ("type")
VALUES ('homeowner'),('repairman');

INSERT INTO "specialty" ("specialty")
VALUES ('Plumbing'),
('Electrical'),
('Painting'),
('Mounting&Wall hanging'),
('Doors'),
('Windows'),
('walls(inside)'),
('walls(outside)'),
('Gutters'),
('Shelving'),
('Cabinets'),
('Molding'),
('Flooring'),
('Tiling'),
('Lighting'),
('Major renovations'),
('Deck, porch or patio'),
('Drywall'),
('Framing'),
('Roofing'),
('Siding'),
('Countertops'),
('Fencing'),
('Heating and cooling'),
('Foundation'),
('Insulation');

INSERT INTO "radius" ("radius")
VALUES (5),
(10),
(15),
(20),
(25),
(30),
(35),
(40);
