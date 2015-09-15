var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function(mongo_address){
  mongoose.connect(mongo_address);

  var schemaTask = new Schema({
    name: String,
    address: String,
    dateToExecute: Date,
    payload: Object,
    state: String
  });
  schemaTask.index({name: 1, address: 1, payload: 1, dateToExecute: 1, done: 1}, {unique: true});

  var Task = mongoose.model('Task', schemaTask);

  return {
    // looking for free tasks, if logic for cleanup will be required tasks should be filtered in memory
    read: function(taskCB){
      Task.find({state: "free"},{
        tailable:true,
        awaitdata:true,
        numberOfRetries:-1
      }).exec(function(err, data){
        if(err){
          console.log(err);
          return;
        };
        data.forEach(function(id){
          Task.findById(id).exec(taskCB);
        });
      });
    },

    // cleanup: function(){

    // },

    write: function(task, state){
      if(task._id){
        Task.findById(task._id, function(err, data){
          data.state = state;
          data.save();
        });
      }else{
        task.state = state;
        task.dateToExecute = (task.dateToExecute === undefined) ? new Date() : task.dateToExecute;
        var record = new Task(task);
        try{
          record.save();
        } catch(err){
          return;
        }
      }
    }
  }
}
