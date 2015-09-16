var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schemaTask = new Schema({
  name: String,
  address: String,
  dateToExecute: Date,
  payload: Object,
  state: String
});
schemaTask.index({name: 1, address: 1, payload: 1, dateToExecute: 1, done: 1, state: 1}, {unique: true});
var Task = mongoose.model('Task', schemaTask);

module.exports = {
  read: function(recordState, taskCB){
    Task.find({state: recordState},{
      tailable:true,
      awaitdata:true,
      numberOfRetries:-1
    }, function(err, data){
      if(err){
        console.log("Error: "+err);
        return;
      };
      data.forEach(function(id){
        Task.findById(id).exec(taskCB);
      });
    });
  },

  write: function(task, state){
    if(task._id){
      Task.findById(task._id, function(err, data){
        data.state = state;
        data.save();
      });
    }else{
      task.state = state;
      var record = new Task(task);
      try{
        record.save();
      } catch(err){
        console.log(err);
        return;
      }
    }
  }

}
