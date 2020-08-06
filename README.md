# WonderQ_challenge

WonderQ is a broker that allows multiple producers to write to it, and multiple consumers to read from it. It runs on a single server. Whenever a producer writes to WonderQ, a message ID is generated and returned as confirmation. Whenever a consumer polls WonderQ for new messages, it gets those messages which are NOT processed by any other consumer that may be concurrently accessing WonderQ.
## App

To start the app run npm start

---
## Broker

### Endpoints

##### `POST /messages/produce`

_Create a message_

Parameters:

- `message`: message to be saved in queue (string, required)

Returns: Object with the message message, statusCode, status and ID

---

##### `GET /messages/consume`

_Retrieve messages from the queue_

Parameters:

- `visibility_timeout`: time until a polled message will become visible again in the queue, in seconds. Default 30 (int)

Returns: Array of message model objects

---

##### `DELETE /messages/:message_id`

_Delete a message_

Parameters: none

Returns: Object with a success boolean

---


##### `UPDATE /messages/:message_id`

_Update a message_

Parameters: none

Returns: Object with a success boolean
---

## Dev Tools

### Endpoints

##### `GET /dev/messages`

Parameters: none

Returns: Array of all messages in the queue.

---

##### `GET /dev/messages/status?status=processing`

Parameters:

- `status`: The status of the messages to be fetched

Returns: Array of messages in processing state

---

##### `GET /dev/messages/status?status=unprocessed`

Parameters:

- `status`: The status of the messages to be fetched

Returns: Array of messages in unprocessed state

---

##### `GET /dev/messages/count?status=processing`

Parameters:

- `status`: The count of the messages with status processing

Returns: Count of processing messages

---

##### `GET /dev/messages/count?status=unprocessed`

Parameters:

- `status`: The count of the messages with status unprocessed

Returns: Count of processed messages

---


## Tests

To run tests, use `npm run test`

## Lint

To run linter, use `npm run lint`


#### In writing, discuss: how to scale this system to meet high-volume requests? What infrastructure / stack would I use and why?

To scale this system to meet high-volume requests, I would introduce the use of Amazon EC2 clusters which helps in scaling an application as much as needed to accomodate more user requests. This would be a great choice because of its auto scaling capabilities when user throughput increases per time.

Secondly, the database currently being used is a great choice as it can handle high volume of data, but in a case where the volume increases, the database could be scaled horizontally and the memory size increased.
