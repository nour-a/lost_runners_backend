 DROP DATABASE IF EXISTS test;
 CREATE DATABASE test;
 \c test;
-- CREATE TABLE users
-- (
--   id SERIAL PRIMARY KEY,
--   username VARCHAR(30)
-- );
-- INSERT INTO users
--   (username)
-- VALUES
--   ('Curtis'),
--   ('Clara'),
--   ('Nour');
-- CREATE TABLE runs
-- (
--   id SERIAL PRIMARY KEY,
--   start_time TIMESTAMP DEFAULT NOW(),
--   duration bigint NOT NULL,
--   destination VARCHAR(50),
--   user_id INTEGER,
--   FOREIGN KEY (user_id) REFERENCES users(id)
-- );
-- INSERT INTO runs
--   (duration,destination,user_id)
-- VALUES
--   (1493049644, 'lloyd street', 1),
--   (1493049644, 'first street', 2),
--   (1493049644, 'oldham street', 3);
-- 
--   CREATE TABLE recipients
-- (
--   id SERIAL PRIMARY KEY,
--   run_id INTEGER NOT NULL,
--   phone_number bigint,
--   name VARCHAR(30),
--   FOREIGN KEY (run_id) REFERENCES runs (id) ON DELETE CASCADE
-- );
-- INSERT INTO recipients
--   (run_id,phone_number,name)
-- VALUES( 1, 747445656879, 'sam'),( 2, 747445600879, 'joudy'),( 3, 58473234922, 'dave');
-- CREATE TABLE messages
-- (
--   id SERIAL PRIMARY KEY,
--   body VARCHAR(255),
--   recipient_id INTEGER NOT NULL,
--   FOREIGN KEY (recipient_id) REFERENCES recipients (id) ON DELETE CASCADE
-- );
-- INSERT INTO messages
--   (body, recipient_id)
-- VALUES('Hi this is my location', 1),('Hi this is my second location', 2), ('Hi this is my third location', 3);
-- 
-- SELECT * FROM runs 
-- JOIN recipients ON runs.id = recipients.run_id
-- JOIN messages ON recipients.id = messages.recipient_id 
-- WHERE ((EXTRACT(EPOCH FROM NOW()) - runs.duration) < (EXTRACT(EPOCH FROM runs.start_time)));

-- SELECT EXTRACT(EPOCH FROM runs.start_time) FROM runs;

CREATE TABLE sal_emp (
    name            text,
    pay_by_quarter  integer[],
    schedule        text[][]
);
INSERT INTO sal_emp
    VALUES ('Bill',
    '{10000, 10000, 10000, 10000}',
    '{{"meeting", "lunch"}, {"training", "presentation"}}');
SELECT * FROM sal_emp;















