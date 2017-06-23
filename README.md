## Lost Runners back end
In this project there is the API which built by using [PostgreSQL](https://www.postgresql.org/) and [pg-promise](https://www.npmjs.com/package/pg-promise) with the [Bluebird promise library](http://bluebirdjs.com/docs/getting-started.html) to get the infomation about the run that the user in .
<br />
It is hosted on heroku (https://lost-backend.herokuapp.com) [lost-runner-backend].
<br />
The main aim for this project is to make the runner safe , in case this runner is missing an atomatic text message will be sent with the last location provided by the the route from the beginning. 
When the user start, the run will be able to choose the distiation, duration and recipient/s, when the runner choose to finish the run all the info about this run will be deleted, in case the time past the duration which the user set without ending the run, that means this person is not safe and the message will be sent directly.


### Install dependencies:
```
$ npm install
```
### Run :
```
$ npm start
```
### Test :
```
$ npm test
```

### Schema breakdown

##### Users
```
       id          |   username  |
-------------------+-------------+
SERIAL PRIMARY KEY |   VARCHAR   |
```
##### Runs

```
       id          |  start_time | duration | destination_latitude | destination_longitude |   txt   |   sent  |
-------------------+-------------+----------+----------------------+-----------------------+---------+---------+
SERIAL PRIMARY KEY |  TIMESTAMP  |  bigint  |         FLOAT        |         FLOAT         | VARCHAR | BOOLEAN |
```

##### Coordinates

```
       id          |                 run_id                    | coordinate_time | latitude | longitude |
-------------------+-------------------------------------------+-----------------+----------+-----------+
SERIAL PRIMARY KEY | FOREIGN KEY (run_id) REFERENCES runs (id) |    TIMESTAMP    |   FLOAT  |   FLOAT   |
```

##### Recipients

```
       id          | phone_number |  name   |
-------------------+--------------+---------+
SERIAL PRIMARY KEY |    VARCHAR   | VARCHAR |
```
##### Runs_recipients

```
       id          |                 run_id                    |                   recipient_id                  |
-------------------+-------------------------------------------+-------------------------------------------------+
SERIAL PRIMARY KEY | FOREIGN KEY (run_id) REFERENCES runs (id) | FOREIGN KEY (recipient_id) REFERENCES recipients  (id)    |
```
### API Breakdown

####  API will need the following routes:
1 - ADD run to Runs
```
POST /api/users/:user_id/run
```
2 - ADD coordinates to Coordinates
```
POST /api/runs/:run_id/coordinates
```
3 - GET run from Runs and Coordinates
returns a json object of information about the run by run_id
```
GET /api/runs/:run_id
{
    id: 1,
    start_time: "2017-05-05T14:21:35.600Z",
    duration: "1493049644",
    destination: {
        lat: 10.111111,
        lng: 20.22222,
    },
    path: [
        {
          lat: 53.4808,
          lng: 2.2426,
          time: "2017-05-05T14:21:35.618Z"
        }
    ]
}

```
4 - DELETE run from Runs
```
DELETE /api/runs/:run_id
```
### Route controllers


The controller functions are split into the the following files with the following methods
##### run
&nbsp;&nbsp;&nbsp; **runStart** *POST request to start the run, it will return the run ID*
&nbsp;&nbsp;&nbsp; **runEnd** *DELETE request to finish the run by using the run_id*

##### locationsReceiver
&nbsp;&nbsp;&nbsp; **locationsUpdate** *POST request to keep tracking the runner location frequently*

##### recipientStatus
&nbsp;&nbsp;&nbsp; **selectRunCooByRunId** *GET request to have all the info about run by its id*

##### recipientStatus
&nbsp;&nbsp;&nbsp; **selectRunCooByRunId** *GET request to have all the info about run by its id*


### startMonitoring

This functios is helper one used to get all the late runner to send txt message with the location to recipient/s

&nbsp;&nbsp;&nbsp; **CronJob** *to schedule the execution for monitoring to run it every one minute*
&nbsp;&nbsp;&nbsp; **fetchLateRunners** *returns all the late using sql query*
&nbsp;&nbsp;&nbsp; **getRecipientInfo** *returns all the info about the Recipient/s related to the  by sql query*
&nbsp;&nbsp;&nbsp; **sendRecipientMessage** *to Send an SMS using the Programmable SMS API provided by twilio*
&nbsp;&nbsp;&nbsp; **updateRecipientsSentStatus** *to change the sent status to true to avoid sending the message many times*
