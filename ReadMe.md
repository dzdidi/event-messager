This package implements Pub/Sub messaging system based no mongodb tailable coursors.

To initialize it in you Pub(Sub) module require and instantiate it by passing address of mongodb server and address of event Subscriber
``` var eventer = require('./main.js')("mongodb://localhost:27017", "module1:module2:..:moduleN:eventName"); ``` which will be subscribed to provided unicast address and following broadcast address:
`*`, `module1`, `module1:module2`, `module1:module2:...:moduleN`

It will return an instance of an object which has following functions:
```
  functions getEvents();
  function getAddresses();
  function subscribe(address);
  function unsubscribe(address);
  function addListener(eventName, listener);
  function getListeners(eventName);
  function removeListener(eventName, index);
  function removeEvent(eventName);
  function publish(task);
```

`getEvents()` returns array of events this entity listens to;
`getAddresses()` returns array of address entity subscribed to;
`subscribe(address)` subscribes entity to provided address
`unsubscribe(address)` unsubscribes from provided address;
`addListener(eventName, listener)` assigns listener function to provided event;
`getListeners(eventName)` returns array of listeners assigned to provided event;
`removeListener(eventName, index)` unassigns listener with provided number from event;
`removeEvent(eventName)` deletes event by name and all assigned listeners;
`publish(task)` publish task and fires event;

The task object should have following structure:
```
{
  "name": <Event Name>,
  "address": <Event address>,
  "payload": <Object with parameters for  listener>,
  "dateToExecute": <Date when event should be executed> // if undefined or Date.now() (preferable)it will be executed on next iteration of event loop (including after app shotdown); 
}
```
