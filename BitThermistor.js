+(function (factory) {
  if (typeof exports === 'undefined') {
    factory(webduino || {});
  } else {
    module.exports = factory;
  }
}(function (scope) {
  'use strict';

  var Module = scope.Module;
  var BoardEvent = scope.BoardEvent;
  var proto;
  var ThermistorEvent = {
    MESSAGE: 'message'
  };

  function Thermistor(board, analogPinNumber) {
    Module.call(this);
    this._board = board;
    this._pinNumber = Number(analogPinNumber);
    this._messageHandler = onMessage.bind(this);
  }

  function onMessage(event) {
    var pin = event.pin;

    if (this._pinNumber !== pin.analogNumber) {
      return false;
    }
    this.emit(ThermistorEvent.MESSAGE, pin.value);
  }

  Thermistor.prototype = proto = Object.create(Module.prototype, {
    constructor: {
      value: Thermistor
    },
    state: {
      get: function () {
        return this._state;
      },
      set: function (val) {
        this._state = val;
      }
    }
  });

  proto.measure = function (callback) {
    var _this = this;
    var minTemperature = -10;
    var maxTemperature = 120;
    var minRawData = 0;
    var maxRawData = 1;
    var diffData = maxTemperature - minTemperature;

    this._board.enableAnalogPin(this._pinNumber);

    if (typeof callback !== 'function') {
      callback = function () {};
    }

    this._callback = function (val) {
      var ratio = val / (maxRawData - minRawData);
      callback(diffData * ratio);
    };

    this._state = 'on';
    this._board.on(BoardEvent.ANALOG_DATA, this._messageHandler);
    this.addListener(ThermistorEvent.MESSAGE, this._callback);
  };

  proto.off = function () {
    this._state = 'off';
    this._board.disableAnalogPin(this._pinNumber);
    this._board.removeListener(BoardEvent.ANALOG_DATA, this._messageHandler);
    this.removeListener(ThermistorEvent.MESSAGE, this._callback || function () { });
    this._callback = null;
  };

  scope.module.Thermistor = Thermistor;
}));
