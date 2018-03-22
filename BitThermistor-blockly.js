+(function (window, webduino) {

  'use strict';
  
  window.getThermistor = function (board, analogpin) {
    return new webduino.module.Thermistor(board, analogpin);
  }

}(window, window.webduino));
