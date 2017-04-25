DROP DATABASE IF EXISTS lost_runner_api;
CREATE DATABASE lost_runner_api;
\c lost_runner_api;

CREATE TABLE users
(
  id SERIAL PRIMARY KEY,
  username VARCHAR(30)
);

INSERT INTO users
  (username)
VALUES
  ('Curtis'),
  ('Clara'),
  ('Nour');

CREATE TABLE runs
(
  id SERIAL PRIMARY KEY,
  start_time TIMESTAMP DEFAULT NOW(),
  duration bigint NOT NULL,
  destination VARCHAR(50),
  user_id INTEGER,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

INSERT INTO runs
  (duration,destination,user_id)
VALUES
  (1493049644, 'lloyd street', 1),
  (1493049644, 'first street', 2),
  (1493049644, 'oldham street', 3);

CREATE TABLE coordinates
(
  id SERIAL PRIMARY KEY,
  run_id INTEGER,
  FOREIGN KEY (run_id) REFERENCES runs(id),
  coordinate_time TIMESTAMP DEFAULT NOW(),
  latitude FLOAT,
  longitude FLOAT
);

INSERT INTO coordinates
  (run_id,latitude,longitude)
VALUES
  (1, 53.4808, 2.2426),
  (2, 53.4809, 2.2427),
  (3, 53.4800, 2.2428);

CREATE TABLE recipients
(
  id SERIAL PRIMARY KEY,
  run_id INTEGER,
  FOREIGN KEY (run_id) REFERENCES runs(id),
  phone_number bigint,
  name VARCHAR(30)
);

INSERT INTO recipients
  (run_id,phone_number,name)
VALUES( 1, 747445656879, 'sam');

CREATE TABLE messages
(
  id SERIAL PRIMARY KEY,
  body VARCHAR(255),
  recipient_id INTEGER,
  FOREIGN KEY (recipient_id) REFERENCES recipients(id)
);

INSERT INTO messages
  (body, recipient_id)
VALUES('Hi this is my location', 1);

SELECT *
FROM users;
SELECT *
FROM runs;
SELECT *
FROM coordinates;
SELECT *
FROM recipients;
SELECT *
FROM messages;






