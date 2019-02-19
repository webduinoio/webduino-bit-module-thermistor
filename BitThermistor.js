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

    this._board.enableAnalogPin(this._pinNumber);

    if (typeof callback !== 'function') {
      callback = function () {};
    }

    this._callback = function (val) {
      callback(_this.parserVal(val));
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

  /**
   * https://github.com/BPI-STEAM/BPI-BIT-Arduino-IDE/tree/master/example/Temperature
   */
  proto.parserVal = function (val) {
    var voltagePower = 3.3;
    var Rs = 5.1;           // Sampling Resistance is 5.1K ohm
    var B = 3950;
    var T = 273.15 + 25;    // Normal Temperature Parameters 
    var R1 = 10;            // Normal Temperature Resistance (K ohm)

    var voltageValue = val * voltagePower;
    var Rt = ((voltagePower - voltageValue) * Rs) / voltageValue;
    var newVal = ((T * B) / (B + T * Math.log10(Rt / R1))) - 273.15;
    return Math.round(newVal * 100) / 100;
  };

  scope.module.Thermistor = Thermistor;
}));
