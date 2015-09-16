var assert = require('assert');
var mocha = require('mocha');
var sinon = require('sinon');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var main = require('../main.js');
var dbconnector = require('../lib/db-connector.js');

describe("Test coverage of Event-Messager", function(){
  var obj = main("Project:email:fire");
  var stubRead = sinon.stub(obj.getConnector(), "read", function(){});
  var stubWrite = sinon.stub(obj.getConnector(), "write", function(){});
  var obj = main("Project:email:fire");

  it("should read database", function(){
    assert.equal(stubRead.called, true);
  });

  describe("It should return object with: ", function(){
    describe("getAddresses", function(){
      it("should have getAddresses function", function(){
        assert.equal(typeof obj.getAddresses, "function");
      });

      it("should accept 0 parameters", function(){
        assert.equal(obj.getAddresses.length, 0);
      })

      it("should return an array", function(){
        assert.equal(Array.isArray(obj.getAddresses()), true);
      });
    });

    describe("subscribe", function(){
      it("should have subscribe function", function(){
        assert.equal(typeof obj.subscribe, "function");
      });

      it("should accept one parameter", function(){
        assert.equal(obj.subscribe.length, 1);
      });

      it("should subscribe to provided address", function(){
        obj.subscribe("testAddress");
        assert.notEqual(obj.getAddresses().indexOf("testAddress"), -1);
      });
    });

    describe("unsubscribe", function(){
      it("should have unsubscribe function", function(){
        assert.equal(typeof obj.unsubscribe, "function");
      });

      it("should accept one paramerer", function(){
        assert.equal(obj.unsubscribe.length, 1);
      });

      it("should unsubscribe form provided address", function() {
        obj.unsubscribe("testAddress");
        assert.equal(obj.getAddresses().indexOf("testAddress"), -1);
      });
    });

    describe("getListeners", function(){
      it("should have getListeners function", function(){
        assert.equal(typeof obj.getListeners, "function");
      });

      it("should accept one paramerer", function(){
        assert.equal(obj.getListeners.length, 1);
      });

      it("should return array of listenrs for provided event", function(){
        obj.addListener("testEvent1", function(){});

        assert.equal(Array.isArray(obj.getListeners("testEvent1")), true);
      });
    });

    describe("removeListener", function(){
      it("should have removeListener function", function(){
        assert.equal(typeof obj.removeListener, "function");
      });

      it("should accept two parameters", function(){
        assert.equal(obj.removeListener.length, 2);
      });

      it("should delete listener of provided index from provided event", function(){
        obj.addListener("testEvent2", function(){})
        obj.removeListener("testEvent2", 0);
        assert.equal(obj.getListeners("testEvent2").length, 0);
      });
    });

    describe("removeEvent", function(){
      it("should have removeEvent function", function(){
        assert.equal(typeof obj.removeEvent, "function");
      });

      it("should accept one paramerer", function(){
        assert.equal(obj.removeEvent.length, 1);
      });

      it("should remove event from the entity", function(){
        obj.removeEvent("testEvent2");
        assert.equal(Object.keys(obj.getEvents()).indexOf("testEvent2"), -1);
      });
    });

    describe("getEvents", function(){
      it("should have getEvents function", function(){
        assert.equal(typeof obj.getEvents, "function");
      });

      it("should accepts zero parameters", function(){
        assert.equal(obj.getEvents.length, 0);
      });

      it("should return object with keys as events the enity listens to", function(){
        assert.equal(Array.isArray(Object.keys(obj.getEvents)), true);
      });
    });

    describe("addListener", function(){
      it("should have addListener function", function(){
        assert.equal(typeof obj.addListener, "function");
      });

      it("should accept two parameters", function(){
        assert.equal(obj.addListener.length, 2);
      });

      describe("It should assign listener to event", function(){
        obj.addListener("test", function(){});
        it("should create new event if none", function(){
          assert.notEqual(Object.keys(obj.getEvents()).indexOf("test"), -1);
        });

        it("should add listener to existing event", function(){
          assert.equal(obj.getListeners("test").length, 1);
          obj.removeListener("test", 0);
        });
      });
    });

    describe("publish", function(){
      it("should have publish function", function(){
        assert.equal(typeof obj.publish, "function");
      });

      it("should accept one paramerers", function(){
        assert.equal(obj.publish.length, 1);
      });

      it("should wite task to database", function(){
        obj.publish({},"test")
        assert.equal(stubWrite.called, true);
      });
    });

    describe("setConnector", function(){
      it("should have setConnector function", function(){
        assert.equal(typeof obj.setConnector, "function");
      });

      it("should accept one parameter", function(){
        assert.equal(obj.setConnector.length, 1);
      });

      it("should change connector", function(){
        var old = obj.getConnector();
        obj.setConnector({write: function(){}, read: function(){}});
        assert.notEqual(obj.getConnector(), old);
      });
    });
  });
  stubRead.restore();
  stubRead.restore();
});
