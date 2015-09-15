var mocha = require('mocha');
var sinon = require('sinon');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var main = require('../main.js');

// mock db connection
describe("Event-Messager", function(){
  describe("Database connector library", function(){
    describe("connection to Database", function(){

    });

    describe("Schema creation", function(){

    });

    describe("Fields indexing", function(){

    });

    describe("Model creation", function(){

    });

    describe("Returned Object", function(){
      describe("read", function(){

      });

      describe("write", function(){

      });
    });
  });

  describe("External test coverage of Event-Messager", function(){
    it("Should initialize connection to database", function(){
      //var dbConnector = require('./lib/db-connector.js')(mongo_address)
    });

    describe("It should return object with: ", function(){
      describe("getAddresses", function(){
        it("should have getAddresses function", function(){

        });

        it("should return an array", function(){

        });
      });

      describe("subscribe", function(){
        it("should have subscribe function", function(){

        });

        it("should accept one parameter", function(){

        });

        it("should subscribe to provided address", function(){

        });
      });

      describe("unsubscribe", function(){
        it("should have unsubscribe function", function(){

        });

        it("should accept one paramerer", function(){

        });

        it("should unsubscribe form provided address", function() {

        });
      });

      describe("addListener", function(){
        it("should have addListener function", function(){

        });

        it("should accept two parameters", function(){

        });

        describe("It should assign listener to event", function(){
          it("should create new event if none and assign listener to it", function(){

          });
          it("should add listener to existing event", function(){

          });
        });
      });

      describe("getListeners", function(){
        it("should have getListeners function", function(){

        });

        it("should accept one paramerer", function(){

        });

        it("should return array of listenrs for provided event", function(){

        });
      });

      describe("removeListener", function(){
        it("should have removeListener function", function(){

        });

        it("should accept two parameters", function(){

        });

        it("should delete listenr of provided index from provided event", function(){

        });
      });

      describe("removeEvent", function(){
        it("should have removeEvent function", function(){

        });

        it("should accept one paramerer", function(){

        });

        it("should remove event from the entity", function(){

        });
      });

      describe("getEvents", function(){
        it("should have getEvents function", function(){

        });

        it("should accepts zero parameters", function(){

        });

        it("should return list of events the enity listens to", function(){

        });
      });

      describe("emit", function(){
        it("should have emit function", function(){

        });

        it("should accept one paramerer", function(){

        });

        it("should wite task to database", function(){

        });
      });
    })
  });
});
