module.exports = function(eventAddress){

  var dbConnector = (dbConnector === undefined) ? require('./lib/db-connector.js') : dbConnector;
  var events = {};
  var addresses = [];

  // ADDRESS
  addresses.push(eventAddress);
  var ea = eventAddress.split(":");
  for(var i = 1; i < ea.length; i++){
    addresses.push(ea.slice(0, ea.length - i).join(":").concat(":*"));
  }
  addresses.push("*");

  //LOOKUP
  dbConnector.read("free", function(err, task){
    if(err){
      console.log(err);
      return;
    }
    if(addresses.indexOf(task.address) <= -1) return;
    if(Object.keys(events).indexOf(task.name) <= -1) return;
    if((task.dateToExecute <= new Date()) || !(task.dateToExecute)){
      events[task.name].forEach(function(act){
        dbConnector.write(task, "taken");
        act(task.payload);
        dbConnector.write(task, "done");
        return;
      });
    };
  });

  return {
    setConnector: function(connector) {
      dbConnector = connector;
    },

    getConnector: function(){
      return dbConnector
    },

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
      task.dateToExecute = (task.dateToExecute === undefined) ? new Date() : task.dateToExecute;
      dbConnector.write(task, "free");
    }
  };
}
