
/**********************
** VARIABLES GLOBALES 
***********************/

	var 	tempBoard, err,
				isDelete = false,
				nivel = new Level(), 
				id=0,
				progress = null,
				build_campaign = 0;

	var simulation = new Array();
			simulation.pos_in_path = 0;

	var dim_TableCreate = 8;

	var firstCell=[];

	var lab_lastDim = 20;

/*************************
**  FUNCIONES
**************************/

 	function createBoardLab(type) {

 		/*Reiniciar Board*/
 		if (tempBoard)
			$("#board").remove();

		tempBoard = new Board('userBoard', type, new Itinerary(), -1, dim_TableCreate, dim_TableCreate);
		tempBoard.show('#divboard', 'builder'); 

		if(type = 'campaign')
			resetBuild_Campaign();
		}

	function newCellItinerary(cell, document, thisCell, prevCell) {

		//Casilla erronea
		if (tempBoard.getItinerary().validCell('road', cell) == false && isDelete == false) { 
				alert(err, 'error');
				return; 
		}

		if (isDelete) { //Borrar casilla

			tempBoard.getItinerary().path.pop();
			pos = tempBoard.getItinerary().positionCells(-1, -1, cell);
			if (!pos) thisCell.removeClass('selected first last');
			else {

				thisCell.removeClass('selected last');
				thisCell.removeClass(pos[1]);

				var lastCell = tempBoard.getItinerary().lastCell().toString();
				document.getElementById(lastCell).classList.remove(pos[0]);
				document.getElementById(lastCell).classList.add('last');

			}	

			isDelete = false;

		} else { //Insertar Casilla

			pos = tempBoard.getItinerary().positionCells(-1, -1, cell);
			if (!pos) thisCell.addClass('selected first'); 
			else {

				thisCell.addClass('selected last ' + pos[1]);

				var elem = prevCell.toString();
				document.getElementById(elem).classList.remove('last');
				document.getElementById(elem).classList.toggle(pos[0]);
			}
			tempBoard.getItinerary().setCell(cell);
		} }

	function newCellCampaign(cell, document, thisCell, prevCell) {

		//Casilla erronea
		if (tempBoard.getItinerary().validCell('campaign', cell) == false && isDelete == false) { 
				alert(err, 'error');
				return; 
		}

		if (isDelete) { //Borro casilla

			isDelete = false;

			if(build_campaign < 3)
				tempBoard.getItinerary().removeCell(cell);
			else {
				alert('Tablero ya terminado', 'error');
				return;
			}

			if(build_campaign == 1) {

					build_campaign = 2;
					thisCell.addClass('first');
					tempBoard.getItinerary().path.unshift(cell);
					$('#iniEnd tr:last-child td div:nth-child(2)').css('right', '100%');
					$('#iniEnd tr:last-child td div:nth-child(3)').css('right', '0');
					$('#iniEnd tr:first-child td:first-child').css('right', '33%');
					

			} else if( build_campaign == 2) {

					build_campaign = 3;
					thisCell.addClass('last');
					tempBoard.getItinerary().setCell(cell);
					$('#iniEnd tr:last-child td div:nth-child(3)').css('bottom', '-7em');
					$('#iniEnd tr:last-child td div:last-child').css('bottom', '0');
					$('#iniEnd tr:first-child td:first-child').css('right', '-1%');
			
			} else 
				thisCell.removeClass('selected');

		} else { //Insertar Casilla

			if (build_campaign != 0) {
				alert('Etapa de construccion finalizada', 'error');
				return;
			} 

			thisCell.addClass('selected');
			tempBoard.getItinerary().setCell(cell);

		} }

	function resetBuild_Campaign() {

		build_campaign = 0;

		$('#iniEnd tr:first-child td:first-child').css('right','98.5%');
		$('#iniEnd tr:last-child td div:first-child').css('bottom', '0em');
		$('#iniEnd tr:last-child td div:nth-child(2)').css('bottom', '-7em');

		$('#iniEnd tr:last-child td div:nth-child(3)').css('right', '-100%');
		$('#iniEnd tr:last-child td div:nth-child(3)').css('bottom', '0em');
		
		$('#iniEnd tr:last-child td div:last-child').css('bottom', '7em'); }

	function getFirstCell () {
		return new Cell(firstCell.getX(), firstCell.getY());
		}

	/* SIMULATION */

		function codeToOrder(code) {

			var orders = new Array(),
					validOne = false;

			//console.info('Entrada', code);

			while (code.length>0 && validOne==false) {
				if (code.length == 1)
					validOne = true;

				if (code[0] == 'a' || code[0] == 'd' || code[0] == 'w' || code[0] == 's' ) {

					orders.push(code[0]);
					code = code.substr(1);
				
				} else if (code[0] == 'l' || code[0] == 'i') {

					var corchetes = 0, limit, ct = 0;

					while(ct < code.length) {

						if(code[ct] == '{') {

							corchetes++;
							//console.info('{ ', corchetes);
						} else if (code[ct] == '}' && corchetes == 1) {
							limit = ct;
							//console.info('} X ', limit);
							ct = code.length;
						} else if (code[ct] == '}' && corchetes > 0) {
							corchetes--;
							//console.info('} ', corchetes);
						} 
						ct++;
					}
					//console.info(limit);
					orders.push(code.substr(0, limit + 1));
					code = code.substr(limit + 1); 
				}
			}

			//console.info('Salida',orders);
			
			return orders; }

		function simulationSimple(order) { // a d w s
			//console.log('simulationSimple');
			//console.log(tempBoard.getItinerary().path.toString());
			var cell = tempBoard.getItinerary().getCell(simulation.pos_in_path),
					nextCell = tempBoard.getItinerary().path[++simulation.pos_in_path],
					cell_after_the_order = tempBoard.getItinerary().go(order, cell);

					simulation.pos_in_path--;

					//console.log("Cell: " + cell + " nextCell: "+ nextCell + " cell_after_the_order "+cell_after_the_order);

			//console.info('hsimulationSimple: ' + order , 'pos: ' + simulation.pos_in_path, 'cell ' + cell,'nextCell ' + nextCell,'cell_after_the_order ' + cell_after_the_order);
			if (tempBoard.getType() == 'road') {
				if (nextCell){
					if (nextCell.is(cell_after_the_order, null)) {
						simulation.pos_in_path++;
						mov_emoji(order, nextCell);
						return order;
					}
				}else
					return order;

				
			}

			if (tempBoard.getType() == 'campaign') {

				var new_pos = tempBoard.getItinerary().find(cell_after_the_order, null);
				if (new_pos != -1) {
					simulation.pos_in_path = new_pos;
					return order;
				}
			}
			return null; }

		function simulationLoop(order) {

			var fin = order.length - 3,
					ordersLoop = order.substr(2, fin),
					final_code = '';

			//console.info('simulaLoop: ',ordersLoop);

			var ordersLp = codeToOrder(ordersLoop);

			for (var i in ordersLp) {
				//console.log("ENTRO A .simulation(");
				value = tempBoard.simulation(ordersLp[i]);
				if (!value) return null;
				else final_code += value;
			}

			return final_code;
			}

		function simulationIf(order) {

			var valuesIf = getCodeIf(order),
					cell = tempBoard.getItinerary().getCell(simulation.pos_in_path),
					nextCell = tempBoard.getItinerary().go(valuesIf['cond2'], cell),
					final_code = '';

			//console.info('valuesIF: ', valuesIf);
			
			if (valuesIf['cond1'] == "water") {

				if (tempBoard.getItinerary().find(nextCell, null) == -1) { //Se cumple la condicion de agua y posicion
					for(var i in valuesIf['bloque']){
						value = tempBoard.simulation(valuesIf['bloque'][i]);
						if (!value) return null;
						else final_code += value;
					}
				} else {
					final_code += "x";
				}
				
			} else { // Tierra

				if (tempBoard.getItinerary().find(nextCell, null) != -1) { //Se cumple la condicion de tierra y posicion
					for(var i in valuesIf['bloque']){
						value = tempBoard.simulation(valuesIf['bloque'][i]);
						if (!value) return null;
						else final_code += value;
					}
				}else {
					final_code += "x";
				}
			}
			//console.info('retorn IF: ', final_code);
			return final_code;
			}
		
		/*
		** Name: 		getCodeIf
		** Desc: 		Extrae condiciones y codigo del if
		** Arg: 		code - codigo correspondiente al if,
		** return: 	result[] = ['cond1', 'cond2', 'bloque']  
		**/
		function getCodeIf(code) {
			
			var result = new Array();

			//console.info('code: ', code); 
			var indexIniArg1 = code.indexOf('(')+1,
				 	indexEndArg1 = code.indexOf('&'),
				 	indexIniArg2 = indexEndArg1+2,
				 	indexEndArg2 = code.indexOf(')'),
				 	indexIniBloq = code.indexOf('{')+1,
				 	indexEndBloq = code.indexOf('}');


			result['cond1'] = code.substring(indexIniArg1, indexEndArg1);
			result['cond2'] = code.substring(indexIniArg2, indexEndArg2);
			result['bloque'] = code.substring(indexIniBloq, indexEndBloq).trim();

			//console.info('result: ',result);
			return result; }

/************
**  OBJETOS
*************/

	/*************************
	**  LEVEL
	**************************/

	function Level () {

		this.boards = new Array();

		this.setBoard = function(board) { this.boards.push(board); }

		this.setBoardByAttr = function(name, type, stringPath, level, blocks) {

			var route = new Itinerary();
			route.setPathByString( stringPath );

			var board = new Board(name, type, route, level, blocks);
			this.boards.push(board); }

		this.show = function(box, level) {

			var 	numboard,
					list = document.createElement("ul");

			list.setAttribute('id', 'level_'+level);

			for (i in nivel.boards) {

				if(nivel.boards[i].getType() == "campaign" || nivel.boards[i].getLevel() == level ) {

					var name = nivel.boards[i].getName();
					var 	li = document.createElement("li"),
							a = document.createElement("a"),
							p = document.createElement("p");
							// text = document.createTextNode( name );

					// p.appendChild( text );
					a.appendChild( p );

					a.setAttribute('href', 'level.php?name=' + name );

					this.boards[i].show(a, 'preview');
					li.appendChild( a );

					li.setAttribute('class', 'level');
					if (progress)
						if (progress.indexOf(name) != -1)
							li.classList.toggle('done');

					list.appendChild( li );
				}}

			$(box).append( list ); }

		this.toString = function() {
		
			var retorno = 'level:\n';

			for (i in this.boards)
				retorno = retorno + this.boards[i].toString();
			return retorno; }

		}

	/*************************
	**  BOARD
	*************************/

	function Board(name, type, itinerary, level, blocks) {

		this.name = name;
		this.type = type;
		this.level = level;
		this.blocks = blocks;
		this.itinerary = itinerary;

  	this.getName = function() { return this.name; }
  	this.getType = function() { return this.type; }
  	this.getItinerary = function() { return this.itinerary; }
  	this.getLevel = function() { return this.level; }
  	this.getBlocks = function() { return this.blocks; }

		this.setItinerary = function(itinerary) { this.itinerary = itinerary; }
		this.setLevel = function(x) { this.level = level; }

		this.validBlock = function(position, block) {

			err ='ini\n\n';

			if (this.itinerary.validBlock(0, itinerary, this.type, true))
				return true;
			else 
				return false; }

	  this.show = function(box, type) {

			var row, col, err = ''
					table = document.createElement("table");

			if (type == 'builder')
				table.setAttribute('id', 'board');

			table.setAttribute('class', 'board ' + type);

			for (row = 0; row < dim_TableCreate; row++) {

				var rowCell = document.createElement("tr");

				for (col = 0; col < dim_TableCreate; col++) {

					var square = document.createElement("td");
					square.setAttribute('id', '['+col+','+row+']');
					
					if (type == 'preview' || type == 'view') {
						var indexCell = this.itinerary.find(col, row);

						if (indexCell != -1) {

							// colour

								var type_class = 'selected ';

								if ( indexCell == 0 ) {
									type_class += 'first ';
									firstCell = this.itinerary.getCell(0);
								}
								else if ( indexCell == ( this.itinerary.path.length - 1 ) )
									type_class += 'last ';

							// margin
							if (this.type!="campaign"){
								var positionPrev = this.itinerary.positionCells(indexCell, (indexCell - 1), null );;
								if (positionPrev)
									type_class += positionPrev[1] + ' ';

								var positionNext = this.itinerary.positionCells(indexCell, ++indexCell, null );
								if (positionNext)
									type_class += positionNext[1];
							}
							// result 

								square.setAttribute('class',  type_class);
						}
					} rowCell.appendChild(square);
				} table.appendChild(rowCell);
			} $(box).append(table); }

		this.toString = function () {

			var str = 	'name: ' + this.name + '\n' +
						'type: ' + this.type + '\n' + 
						'level: ' + this.level + '\n' + 
						'itinerary : ' + this.itinerary.toString();

			return str; }

		this.simulation = function (order) {

			var value;
			//console.log('Order[0]: '+order[0]);
			if (order[0] == 'a' || order[0] == 'd' || order[0] == 'w' || order[0] == 's' )
				value = simulationSimple(order);

			if(order[0] == 'l')
				value = simulationLoop(order);

			if(order[0] == 'i')
				value = simulationIf(order);

			if (!value) {
				simulation.pos_in_path = 0;
				return null; }

			return value; }

		} // FIN DEL CONSTRUCTOR "BOARD"

	/*************************
	**  ITINERARY
	**************************/

	function Itinerary() {

	 	this.path = new Array();

	 	/*
	 	** DATOS 
	 	*/

		 	/* 	Name: 		 	setItinerary
			** 	Descripcion: 	almacena una path completa
			**  Argument: 		itinerary - cadena de casillas 
			*/
		 	this.setItinerary = function(itinerary) {

		 		for (var x = 0; x < itinerary.length; x++) {
		 			var cell = new Cell(0,0);
		 			cell.setCoord(itinerary[x]);
		 			this.path.push(cell);
		 		} }

		 	/*
			** 	Name:  			setPathByString
			** 	Description:  	almacena un path en formatro String "[x,y]|..."
			** 	Argument: 		stringPath - string con el path
			*/
			this.setPathByString = function(stringPath) {

				var stringCell = stringPath.toString().slice(0,-1).split('|');

				for (i in stringCell ) {

					var tempCell = new Cell(0,0);
					tempCell.setCoordByString( stringCell[i] );

					this.path.push( tempCell );
				} }
					
		 	/* 	Name: 			setCell
			** 	Descripcion: 	añade una celda
			**  Argument: 		casilla - casilla a añadir
			*/
		 	this.setCell = function(cell) { this.path.push(cell); }

		 	this.getCell = function(index) { return this.path[index]; }

		 	this.getPath = function() { return this.path; }

		 	/* 	Name: 			removeCell
			** 	Descripcion: 	elimina una casilla si cumple con las reglas
			**  Argument: 		casilla - casilla a eliminar
			*/
		 	this.removeCell = function(cell) {
		 		
		 		var index = this.find(cell, null);
		 		this.path.splice(index, 1); }

		 	this.lastCell = function () { return this.path[ this.path.length - 1 ]; }

		 	/*
			** 	Name: 			calcLevel
			** 	Descripcion:  	Calcula el nivel del tablero en función del número de casillas
			**/
			this.calcLevel = function () {
			
				length = this.path.length;

				if (length <= 10) return 0;
				else if (length <= 20) return 1;
				else return 2;	}
		 	
		 	/* 	Name: 		 	setItinerary
			** 	Descripcion: 	almacena una path completa
			**  Argument: 		itinerary - cadena de casillas 
			*/
		 	this.getPathLength = function () { this.path.length; }

		/*
		** POSITIONS
		*/

			/*
			**  Name: 				positionCells                                     
			**  Description: 	Indica la posición de la celda[INDEX] respecto a la celda[INDEX2]
			**  Argument:  		index  - posicion de la primera celda
			**  							index2 - posicion de la segunda celda
			**								cell 	 - IMPORTANTE : si esta casilla NO es null, comprobara la posicion de dicha cell con la ultima del Array ignorando index e index2
			**  Return: 			positions[] => 	[0] = posicion de index / cell
			**																[1] = posicion de index2 / ultima celda
			**/
			this.positionCells = function(index, index2, cell) {

				var cell1, cell2, positions = new Array();

				if (cell) {
					cell1 = cell;
					cell2 = this.lastCell();
				} else {		
				 	cell1 = this.path[index];
				 	cell2 = this.path[index2];
				} 

				if (!cell1 || !cell2)
					return null;

				if (cell1.getX() == cell2.getX()) {

					if (cell1.getY() - cell2.getY() == 1) {

						positions[0] = 'bottom';
						positions[1] = 'top';

					} else if (cell1.getY() - cell2.getY() == -1) {

						positions[0] = 'top';
						positions[1] = 'bottom';
					
					} else return null;

				} else if (cell1.getY() == cell2.getY()) {

					if (cell1.getX() - cell2.getX() == 1) {

						positions[0] = 'right';
						positions[1] = 'left';
					
					} else if (cell1.getX() - cell2.getX() == -1) {

						positions[0] = 'left';
						positions[1] = 'right';
					
					} else return null; 

				} else return null;

				return positions; }

			/*
			**  Name: 				positionAllCell                                   
			**  Description: 	Indica la posición de todas las celdas cercanas a la celda
			**	Argument: 		cell - casilla sin identificar [no dentro del array]
			**  Return: 			positions[] => 	[0] = posicion de index / cell
			**																[1] = posicion del resto        
			**/
			this.positionAllCell = function(cell) {

				var positions = {0: '', 1: ''},
						valid = false;

				this.setCell(cell);
					for (i in this.path) {
						var pos = this.positionCells((this.path.length -1), i, null);
						if(pos) {
							valid = true;
							positions[0] += pos[0] + ' ';
							positions[1] += pos[1] + ' '; }}
				this.removeCell(cell);

				if(valid)
					return positions;
				else
					return null;
				}

		/*
		** DE VALIDACION [GAME]
		*/

		  /*
			** 	Name: 				validCellItinerary
			** 	Description: 	comprueba si una casilla cumple las reglas de creacion [BUILDER]
			** 	Argument: 		type = tipo de tablero 'road' o 'campaign'
			**								cell = casilla a validar 
			** 	Return: 			false / true
			*/
		 	this.validCell = function(type, cell) {

		 		var prevCell = this.lastCell();

		 		if (!prevCell) // PRIMERA CASILLA
		 			return true;

		 		if (type == 'road') {

		 			if (cell.toString() == prevCell.toString()) isDelete = true;
		 			else if (this.find(cell, null) >= 0)  err = 'Casilla ya seleccionada';
		 			else if (!this.positionCells(-1, -1, cell)) err = 'Casilla no consecutiva';
		 			else return true;

		 			return false; }

		 		else if (type ='campaign') {

		 			if (this.find(cell, null) != -1) isDelete = true;
		 			else if (!this.positionAllCell(cell)) err = 'Casilla no continua el mapa';
		 			else return true;

		 			return false; } }

			this.evalCodeIf = function(currentCell, valuesIf) {

				err += 'entrada en evalCodeIf\n';

				if (valuesIf['cond1'] == "water") {

					nextCell = this.go(valuesIf['cond2'], currentCell);
					if (this.find(nextCell, null) < 0)
						return true;
					
				} else {

					nextCell = this.go(valuesIf['cond2'], currentCell);
					if (this.find(nextCell, null) != -1)
						return true; 
				}
				
				err += '	evaluado sin éxito\n';
				return false; }

		/*
		** OTROS
		*/

			/*
			** Name: 		go
			** Desc:  	calculates the next cell, after the order
			** Arg: 		order - [a,s,d,w]
			**					cell 	- base cell
			** return:  the next cell (other cell), 
			**/
			this.go = function(order, cell) {

					var x = cell.getX(),
						 	y = cell.getY();

					var nextCell = null;

					if (order == 'w') 
						nextCell = new Cell(x, --y);
					else if (order == 'd') 
						nextCell = new Cell(++x, y);
					else if (order == 's')
						nextCell = new Cell(x, ++y);
					else 
						nextCell = new Cell(--x, y);

					return nextCell; }

		} /* END ITINERARY */

	Itinerary.prototype.toString = function() {

		var str = '';
		for (var x = 0; x < this.path.length; x++)
			str = str + this.path[x].toString() + "|";

		return str; } 

	Itinerary.prototype.find = function(cell_or_x, y) {
		
		for (i in this.path) {
			print+="\n"+i+this.path[i]+cell_or_x+y;
			if (y==null) {
				if ( this.path[i].is(cell_or_x, null) ) return i;
			}	else{
				if ( this.path[i].is(cell_or_x, y))  
					return i; 
			}
		}
		return -1; }

	/*************************
	**  CELL
	**************************/

	function Cell(x, y) {

		this.x = parseInt(x);
		this.y = parseInt(y);

		this.setCoordByString = function(stringCoord) { // valor que entra [x,y]
			
			var str = stringCoord.slice(1,-1).split(',');
		
			this.x = str[0];
			this.y = str[1]; }

		this.getX = function() { return this.x; }
		this.getY = function() { return this.y; }

		this.getNextX = function() { next = parseInt(this.x)+1; return next; }
		this.getNextY = function() { next = parseInt(this.y)+1; return next; }

		this.getPrevX = function() { next = parseInt(this.x)-1; return next; }
		this.getPrevY = function() { next = parseInt(this.y)-1; return next; }


		this.setX = function(x) { this.x = x; }
		this.setY = function(y) { this.y = y; }

		this.is = function(cell_or_x, y) {
			if (y==null) {
				if (this.x == cell_or_x.x && this.y == cell_or_x.y ) return true;
			} else
				if (this.x == cell_or_x && this.y == y) return true;
			
			return false; }

		this.toString = function () {

			var str = '[' + this.x + ',' + this.y + ']';
			return  str; }	

		} /* END "CELL" */
		
	