
'use strict';

goog.require('Blockly.JavaScript');

Blockly.JavaScript['uparrow'] = function(block) { return 'w'; }

Blockly.JavaScript['downarrow'] = function(block) { return 's'; }

Blockly.JavaScript['leftarrow'] = function(block) { return 'a'; }

Blockly.JavaScript['rightarrow'] = function(block) { return 'd'; }

Blockly.JavaScript['loop'] = function(block) {

  var repeats = String(Number(block.getFieldValue('times')));

  var branch = Blockly.JavaScript.statementToCode(block, 'DO');
  branch = Blockly.JavaScript.addLoopTrap(branch, block.id);
  var code = 'l{';

  for (var count = 0; count < repeats; count++)
  	code += branch.substring(2,branch.length);

  code += '}';

  return code; };


Blockly.JavaScript['conditional'] = function(block) {
  
  // If/elseif/else condition.
  var n = 0;
  
  var argument = String(block.getFieldValue('typeCell'));
  var argument1 = String(block.getFieldValue('direction'));
  var branch = Blockly.JavaScript.statementToCode(block, 'DO' + n);
  var code = 'if(' + argument + '&&' + argument1 +'){' + branch + '}';

  return code; };
