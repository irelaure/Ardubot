//////////////////////////////////////////
//////////////// BLOCKLY /////////////////
//////////////////////////////////////////

	var workspace, code, instrucciones, generatedCode, order, prevCell;

	/*
	**  Name: 				toolbox                                   
	**  Description:  Genera la toolbox
	*/
	function toolbox(type, level) {
		
		// BOTONES
		var toolbox = '<xml>';
				toolbox += '  <block type="uparrow"></block>';
				toolbox += '  <block type="downarrow"></block>';
			 	toolbox += '	<block type="leftarrow"></block>';
				toolbox += '	<block type="rightarrow"></block>';
				if (type == "road" && level == 1) {
					toolbox += '	<block type="loop"></block>';
				} else if (type == "campaign" || level == 2) {
					toolbox += '	<block type="loop"></block>';
					toolbox += '	<block type="conditional"></block>';
				}
		toolbox += '</xml>';

	  genCustBlocks();
		workspace = Blockly.inject('blocklyDiv',{trashcan: true, scrollbars: true, toolbox: toolbox});
		workspace.addChangeListener(myUpdateFunction);
		reset();
		}


	/*
	**  Name: 				genCustBlocks                                   
	**  Description:  Generate Custome Blocks
	*/
	function genCustBlocks() {
		uparrow();
		block('downarrow');
		block('leftarrow');
		block('rightarrow');
		looparrow();
		conditional(); }

	/*
	**  Name: 				myUpdateFunction                           
	**  Description:  Recarga el código al notar un cambio en la toolbox
	*/
	function myUpdateFunction(event) {
	  //generateCode(true);
	  reset();
		}


	/*
	**  Name: 				generateCode                                   
	**  Description:  Generar Código con Ejercicio Propuesto
	*/
	function generateCode(direct) {

		code = Blockly.JavaScript.workspaceToCode(workspace);
	  Blockly.JavaScript.INFINITE_LOOP_TRAP = null;

	  if (code.indexOf('\n'))
	  	code = code.substr(0,code.indexOf('\n'));

	  var final_code = '', orders = codeToOrder(code), value;
	 	simulation.pos_in_path = 0;

		for (var bloque in orders) {
			if (direct)
				final_code += generateDirectCode(orders, bloque, final_code);
			else {
				f_code = generateSimulCode(orders, bloque, final_code);
				if (f_code==null)
					return;
				else
					final_code += f_code;
			}
		}

		return final_code;
		}

	/*
	**  Name:    			generateDirectCode                     
	**  Description:  Generar Código sin Ejercicio Propuesto
	*/
	function generateDirectCode(orders, bloque, final_code) {
			orders[bloque] = orders[bloque].replace('l','');
			orders[bloque] = orders[bloque].replace('{','');
			orders[bloque] = orders[bloque].replace('}','');
			final_code = orders[bloque];
			return final_code; }


	/*
	**  Name:    			generateSimulCode                     
	**  Description:  Generar Código con Ejercicio Propuesto
	*/
	function generateSimulCode(orders, bloque, final_code) {
		value = tempBoard.simulation(orders[bloque]);
			if (!value) {
				//alert('Tu primer error ha sido en el bloque ' + ++bloque, 'error');
				error = 'Tu primer error ha sido en el bloque ' + ++bloque;
				return;
			}else 
				final_code = value.replace('x','');
		return final_code;
		}

	/*
	**  Name: 				stepByStepDirect                                   
	**  Description:  Ejecuta paso a paso los bloques cuando no hay un ejercicio propuesto
	**/
	function stepByStep (direct){
		if (generatedCode == false){
			code = generateCode(true);
			generatedCode = true;
			if (direct)
				prevCell = new Cell(0,0);
			else
				prevCell = getFirstCell();

			sendCode(prevCell.toString(), null);
		} else {
			sendCode(prevCell.toString(), code[order]);
			calcDirectCell(code[order]);
			order++;

			if (code.length==order){
				reset();
				alert ("Has terminado de emular el recorrido");
			}
		}
		}

	/*
	**  Name: 				calcDirectCell                       
	**  Description:  Calcula la celda de destino en la ejecución directa de bloques
	**	Argument: 		order - orden a evaluar  
	**/
	function calcDirectCell(order) {
		if (order == 'w') 
			prevCell.setY(prevCell.getPrevY());
		else if (order == 'd') 
			prevCell.setX(prevCell.getNextX());
		else if (order == 's')
			prevCell.setY(prevCell.getNextY());
		else 
			prevCell.setX(prevCell.getPrevX());
		}

	/*
	**  Name: 				sendCode                                   
	**  Description:  Envía el código al robot
	**	Argument: 		indexFirstCell - celda de Referencia
	**  							codeToSend: Codigo a enviar    
	**/
	function sendCode(indexFirstCell, codeToSend) {
		try {
			$.blockUI();
			$.ajax ({
				method: "POST",
				url: '../php/remote_control.php ',
				data: {
		 			code: codeToSend,
		 			FirstCell: indexFirstCell }
		 		,timeout: 4000
		 	})
			.done (function(result) {
				console.log(result);
	  		$.unblockUI();
	  	})
	  	.fail (function( jqXHR, textStatus, errorThrown ) {
	  		 if (textStatus=="timeout")
	  		 	alert("Tiempo de espera de conexión agotado", 'error');
	  		 else{
	  		 	console.log(errorThrown);
		     	alert( "error" + textStatus, 'error');
		     }
		    $.unblockUI();
		  });
	  } catch (e) { 	
	  	alert(e, 'error');
	  	$.unblockUI();
	  }
		}

	/*
	**  Name: 				reset                                   
	**  Description:  Reinicia la ejecución paso a paso  
	**/
	function reset () {
		
		generatedCode = false;
		order = 0; }

	/*
	**  Name: 				runCode                                   
	**  Description:  Descarga el código al robot  
	**/
	function runCode(direct) {
	  Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
	  reset();
	 	code = generateCode(direct);
		if (direct){
			prevCell = new Cell(0,0);
			indexFirstCell = prevCell.toString();
		} else{
			indexFirstCell = getFirstCell().toString();
		}
	  sendCode(indexFirstCell, code) ;
		}

	/*
	**  Name: 				simulateCode                                   
	**  Description:  Simula la ejecución de código en la web 
	**/
	function simulateCode() {
		reset();
	  final_code = generateCode(false);

		//console.info('final_code', final_code);
		if(tempBoard.getItinerary().getCell(simulation.pos_in_path).is(tempBoard.getItinerary().lastCell())){
			alert('¡Enhorabuena! Has completado el nivel', "success");
			$.post( '../php/insertProgress.php', { 
	 			name: tempBoard.getName() }, 
	 			function(result) { /*alert(result, 'success');*/ }
		 	);
		}
		else {
			alert('¡Ooohhh No has completado el recorrido correctamente! ' ,'error');
			//error = '';
		}

		return;  
		}

	/*
	**  Name: 				stopCode                                   
	**  Description:  Manda una señal de stop al robot 
	**/
	function stopCode() {
	  code = 0;
	  Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
	  try {
	  	window.location.href = "../php/remote_control.php?code=" + code;
	  } catch (e) {
	    alert(e);
	  }
		}

/********************/
/***Custom Blocks***/
/********************/

	/* UP */
	function uparrow(){
		Blockly.Blocks['uparrow'] = {
		  init: function() {
		    this.appendDummyInput()
		        .appendField(new Blockly.FieldImage("../img/uparrow.png", 50, 50, "*"));
		    this.setPreviousStatement(true);
		    this.setNextStatement(true);
		    this.setColour(210);
		  }
		};
	}

	/* DOWN / LEFT / RIGHT */
	function block(type) {
		Blockly.Blocks[type] = {
		  init: function() {
		    this.appendDummyInput()
		        .appendField(new Blockly.FieldImage("../img/"+type+".png", 50, 50, "*"));
		    this.setPreviousStatement(true);
		    this.setNextStatement(true);
		    this.setColour(210);
		    this.setTooltip('');
		  }
		};
	}

  /**
   * Block for repeat n times (external number).
   * @this Blockly.Block
   */
	function looparrow(){
		Blockly.Blocks['loop'] = {
		  init: function() {
		  	this.appendDummyInput()
		      .appendField(new Blockly.FieldImage("../img/arrow-loop.png", 50, 50, "*"));
		    this.appendDummyInput("times").appendField(new Blockly.FieldDropdown([["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"], ["12", "12"], ["13", "13"], ["14", "14"], ["15", "15"], ["16", "16"], ["17", "17"], ["18", "18"], ["19", "19"], ["20", "20"]]), "times");
				this.setInputsInline(true);
				this.setColour(120);
				this.setPreviousStatement(true);
				this.setNextStatement(true);
		    this.appendStatementInput('DO');
		  }
		};
	}

	/**
   * Block for if/elseif/else condition.
   * @this Blockly.Block
   */
	function conditional(){
		
		Blockly.Blocks['conditional'] = {
		  init: function() {
		    this.setColour(120);
		     
		    this.appendDummyInput("IF0")
		   			.appendField(new Blockly.FieldImage("../img/condicional.png", 50, 30, "*"))
		        .appendField(new Blockly.FieldDropdown([["\uD83C\uDF0A", "water"],["\uD83C\uDFC3", "earth"]]), "typeCell")
		        .appendField(new Blockly.FieldDropdown([["\u25C4", "a"],["\u25BA", "d"],["\u25B2", "w"],["\u25BC", "s"]]), "direction");

		    this.appendStatementInput('DO0')
		        .appendField(Blockly.Msg.CONTROLS_IF_MSG_THEN);
		    this.setPreviousStatement(true);
		    this.setNextStatement(true);
		    // Assign 'this' to a variable for use in the tooltip closure below.

		    this.elseifCount_ = 0;
		    this.elseCount_ = 0;
			},
		};
	}

	/*********************/
	/*** Custom Blocks ***/
	/*********************/

		/* UP */
		function uparrow(){
			Blockly.Blocks['uparrow'] = {
			  init: function() {
			    this.appendDummyInput()
			        .appendField(new Blockly.FieldImage("../img/uparrow.png", 50, 50, "*"));
			    this.setPreviousStatement(true);
			    this.setNextStatement(true);
			    this.setColour(210);
			  }
			}; }

		/* DOWN / LEFT / RIGHT */
		function block(type) {
			Blockly.Blocks[type] = {
			  init: function() {
			    this.appendDummyInput()
			        .appendField(new Blockly.FieldImage("../img/"+type+".png", 50, 50, "*"));
			    this.setPreviousStatement(true);
			    this.setNextStatement(true);
			    this.setColour(210);
			    this.setTooltip('');
			  }
			}; }

	  /**
	   * Block for repeat n times (external number).
	   * @this Blockly.Block
	   */
		function looparrow(){
			Blockly.Blocks['loop'] = {
			  init: function() {
			  	this.appendDummyInput()
			      .appendField(new Blockly.FieldImage("../img/arrow-loop.png", 50, 50, "*"));
			    this.appendDummyInput("times").appendField(new Blockly.FieldDropdown([["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"], ["12", "12"], ["13", "13"], ["14", "14"], ["15", "15"], ["16", "16"], ["17", "17"], ["18", "18"], ["19", "19"], ["20", "20"]]), "times");
					this.setInputsInline(true);
					this.setColour(120);
					this.setPreviousStatement(true);
					this.setNextStatement(true);
			    this.appendStatementInput('DO');
			  }
			}; }

		/**
	   * Block for if/elseif/else condition.
	   * @this Blockly.Block
	   */
		function conditional(){
			
			Blockly.Blocks['conditional'] = {
			  init: function() {
			    this.setColour(120);
			     
			    this.appendDummyInput("IF0")
			   			.appendField(new Blockly.FieldImage("../img/condicional.png", 50, 30, "*"))
			        .appendField(new Blockly.FieldDropdown([["\uD83C\uDF0A", "water"],["\uD83C\uDFC3", "earth"]]), "typeCell")
			        .appendField(new Blockly.FieldDropdown([["\u25C4", "a"],["\u25BA", "d"],["\u25B2", "w"],["\u25BC", "s"]]), "direction");

			    this.appendStatementInput('DO0')
			        .appendField(Blockly.Msg.CONTROLS_IF_MSG_THEN);
			    this.setPreviousStatement(true);
			    this.setNextStatement(true);
			    // Assign 'this' to a variable for use in the tooltip closure below.

			    this.elseifCount_ = 0;
			    this.elseCount_ = 0;
				},
			}; }

/////////////////////////////
/////  ANIMATION ICO  ///////
/////////////////////////////

	function dim_emoji() {

		var dim = $('.board td').outerHeight(true);
		dim = dim + "px";
		$('#status #emoji img').height(dim);
		$('#status #emoji img').width(dim);
		}

	function pos_emoji() {

		var part1 = $('.board td').outerHeight(true) * 100,
				porc = part1 / $('.board').width(),

				firstcell = tempBoard.getItinerary().getCell(0);

		$('#status #emoji img').css({
    	"margin-top" : firstcell.getY()*porc+'%',
    	"margin-left" : firstcell.getX()*porc+'%'
  	})
		}

	function mov_emoji(order, cell) {

		console.info(order);
		var part1 = $('.board td').outerHeight(true) * 100,
				porc = part1 / $('.board').width();

		console.info(order, cell);

		$('#status #emoji img').animate({
    	"margin-top" : cell.getY()*porc+'%',
    	"margin-left" : cell.getX()*porc+'%'
  	}, 500);

		return;
		}

