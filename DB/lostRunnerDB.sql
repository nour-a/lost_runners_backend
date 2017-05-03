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
  destination_latitude FLOAT,
  destination_longitude FLOAT,
  txt VARCHAR(255),
  sent BOOLEAN DEFAULT FALSE,
  user_id INTEGER,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
INSERT INTO runs
  (duration,destination_latitude,destination_longitude,txt,user_id)
VALUES
  (1493049644, 10.111111, 20.22222, 'Hi this is my first location', 1),
  (1493049644, 30.111111, 40.22222, 'Hi this is my second location', 2),
  (1493049644, 50.111111, 60.22222, 'Hi this is my third location', 3);
CREATE TABLE coordinates
(
  id SERIAL PRIMARY KEY,
  run_id INTEGER,
  coordinate_time TIMESTAMP DEFAULT NOW(),
  latitude FLOAT,
  longitude FLOAT,
  FOREIGN KEY (run_id) REFERENCES runs (id) ON DELETE CASCADE
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
  phone_number bigint,
  name VARCHAR(30)
);
INSERT INTO recipients
  (phone_number,name)
VALUES( 747445656879, 'sam'),(747445600879, 'joudy'),(123456789, 'joe'),(987654321,'katy');

CREATE TABLE runs_recipients
(
  id SERIAL PRIMARY KEY,
  run_id INTEGER NOT NULL,
  recipient_id INTEGER NOT NULL,
  FOREIGN KEY (run_id) REFERENCES runs (id) ON DELETE CASCADE,
  FOREIGN KEY (recipient_id) REFERENCES recipients (id) ON DELETE CASCADE
);
INSERT INTO runs_recipients
  (run_id, recipient_id)
VALUES(1, 1),(2, 2),(3,3),(1,4);
SELECT recipient_id FROM runs_recipients WHERE run_id=1;
--DELETE FROM recipients WHERE id IN (SELECT recipient_id FROM runs_recipients WHERE run_id=1);
--DELETE FROM runs WHERE id=1;
SELECT * FROM runs;
SELECT * FROM coordinates;
SELECT * FROM recipients;
SELECT * FROM runs_recipients;
