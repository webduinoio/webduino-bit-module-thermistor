var mainUrl = 'https://tutorials.webduino.io/zh-tw/docs/';
var utmUrl = '?utm_source=cloud-blockly&utm_medium=contextMenu&utm_campaign=tutorials';

Blockly.Blocks['thermistor_new'] = {
  init: function () {
    this.appendDummyInput()
        .appendField(Blockly.Msg.WEBDUINO_THERMISTOR);
    this.setOutput(true);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['thermistor_detected'] = {
  init: function () {
    this.appendDummyInput()
        .appendField(new Blockly.FieldVariable('thermistor'), 'name_')
        .appendField(Blockly.Msg.WEBDUINO_THERMISTOR_DETECTED);
    this.appendStatementInput('detected_')
        .appendField(Blockly.Msg.WEBDUINO_THERMISTOR_DO);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(65);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['thermistor_val'] = {
  init: function () {
    this.appendDummyInput()
        .appendField(new Blockly.FieldVariable('thermistor'), 'name_')
        .appendField(Blockly.Msg.WEBDUINO_THERMISTOR_VAL);
    this.setOutput(true);
    this.setColour(35);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['thermistor_stop'] = {
  init: function () {
    this.appendDummyInput()
        .appendField(new Blockly.FieldVariable('thermistor'), 'name_')
        .appendField(Blockly.Msg.WEBDUINO_THERMISTOR_STOP);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(65);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};
