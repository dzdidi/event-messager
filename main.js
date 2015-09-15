module.exports = function(mongo_address, eventAddress){
  var dbConnector = require('./lib/db-connector.js')(mongo_address);

  var events = {};
  var addresses = [];

  // ADDRESS
  addresses.push(eventAddress);
  for(var i = 1; i < eventAddress.split(":").length; i++){
    addresses.push(eventAddress.split(":").slice(0, eventAddress.split(":").length - i).join(":"));
  }
  addresses.push("*");

  //LOOKUP
  dbConnector.read(function(err, task){
    if(err){
      console.log(err);
      return;
    }
    if(addresses.indexOf(task.address) <= -1) return;
    if(Object.keys(events).indexOf(task.name) <= -1) return;
    console.log(task);
    if((task.dateToExecute <= new Date()) || !(task.dateToExecute)){
      events[task.name].forEach(function(act){
        dbConnector.write(task, "taken");
        act(task.payload);
        dbConnector.write(task, "done");
        return;
      });
    };
  });

  //CLEANUP
  // delete taken but not done tasks

  // delete old done tasks

  return{
    getAddresses: function(){
      return addresses;
    },

    getEvents: function(){
      return events;
    },

    subscribe: function(adr){
      addresses.push(adr);
    },

    unsubscribe: function(addr){
      addresses.splice(addresses.indexOf(addr), 1);
    },

    addListener: function(eventName, listener){
      if(!events[eventName]){
        events[eventName] = [];
        events[eventName].push(listener);
      } else {
        events[eventName].push(listener);
      }
    },

    getListeners: function(eventName){
      return events[eventName];
    },

    removeListener: function(eventName, index){
        events[eventName].splice(index, 1);
    },

    removeEvent: function(eventName){
      delete events[eventName];
    },

    publish: function(task){
      dbConnector.write(task, "free");
    }
  };
}
