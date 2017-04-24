DROP DATABASE IF EXISTS lost_runner_api;
CREATE DATABASE lost_runner_api;
\c lost_runner_api;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(30)
);

INSERT INTO users (username)
  VALUES ('Curtis'),('Clara'),('Nour');

  CREATE TABLE runs (
  id SERIAL PRIMARY KEY,
  start_time TIMESTAMP DEFAULT NOW(),
  duration  TIMESTAMP NOT NULL,
  destination VARCHAR(50),
  user_id INTEGER,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

INSERT INTO runs (duration,destination,user_id)
  VALUES ('1970-01-01 00:00:01','lloyd street',1), ('1970-01-01 00:00:01','first street',2), ('1970-01-01 00:00:01','oldham street',3);

CREATE TABLE coordinates (
    id  SERIAL PRIMARY KEY,
    run_id INTEGER,
    FOREIGN KEY (run_id) REFERENCES runs(id),
    coordinate_time TIMESTAMP DEFAULT NOW(),
    latitude FLOAT,
    longitude FLOAT  
);
  
INSERT INTO coordinates (run_id,latitude,longitude)
  VALUES (1,53.4808,2.2426),(2,53.4809,2.2427),(3,53.4800,2.2428);

SELECT * FROM users;
SELECT * FROM runs;
SELECT * FROM coordinates;







