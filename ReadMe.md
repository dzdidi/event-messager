<h1>This package implements dataabase hosted Pub/Sub Event messaging system based<h1>

*Note:*
> default database is mongoDB (this package includes connector to it)

To initialize it in you Pub(Sub) module require and instantiate it by passing address of event subscriber
```javascript
  var eventer = require('./main.js')("module1:module2:..:moduleN:entityName");
 ```
which will be subscribed to provided unicast address and following broadcast address:
`*`, `module1:*`, `module1:module2:*`, `module1:module2:...:moduleN:*`;

It will return an instance of an object which has following functions:
```javascript
function getConnector();
function setConnector(connector);
function getEvents();
function getAddresses();
function subscribe(address);
function unsubscribe(address);
function addListener(eventName, listener);
function getListeners(eventName);
function removeListener(eventName, index);
function removeEvent(eventName);
function publish(task);
```

* `getEvents()` returns array of events this entity listens to;
* `getAddresses()` returns array of address entity subscribed to;
* `subscribe(address)` subscribes entity to provided address
* `unsubscribe(address)` unsubscribes from provided address;
* `addListener(eventName, listener)` assigns listener function to provided event;
* `getListeners(eventName)` returns array of listeners assigned to provided event;
* `removeListener(eventName, index)` unassigns listener with provided number from event;
* `removeEvent(eventName)` deletes event by name and all assigned listeners;
* `publish(task)` publish task and fires event;

The task object should have following structure:
```javascript
{
  "name": //<Event Name>
  "address": //<Event address>
  "payload": //<Object with parameters for  listener>
  "dateToExecute": //<Date when event should be executed> (Date.now() is default)
}
```

You can change db by calling method `setConnector(connector)` where connector creates schema for message records:
```javascript
name: String,
address: String,
dateToExecute: Date,
payload: Object,
state: String
```
With index over all fields.

And has two functions:
* `read(recordState, callback)` - where first parameter is string by which records should be queried in this function and it should perform callback over each query;
* `write(task, state)` - which has to write new `task` records to db and update if existed. State is a string parameter for `Task.state`

**IMPORTANT:**

>your app should have an initialized connection to database.
