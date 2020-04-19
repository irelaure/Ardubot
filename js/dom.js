
/*
** DOM - funciones activas 
*/

 $(document).ready(function() { 

 	/*****************
 	** FIRST EVENT
 	******************/

 		// GENERAL

	 		article_minheight(0);
	 		$('#status .board td').height( $('#status .board td').width() ); 

 		// LEVEL PHP

 			if (window.location.pathname == '/ardubot/view/level.php') {
 				dim_emoji();
 				pos_emoji();
 			}

	/*****************
 	** WINDOWS RESIZE
 	******************/

 		$(window).resize(function() {

 			// GENERAL

				messageRespons();
			  $('#status .board td').height( $('#status .board td').width() );
			  // alert('entre');

		  // LEVEL PHP

			  if (window.location.pathname == '/ardubot/view/level.php')
			  	dim_emoji();

		});

 	/*****************
 	** EVENTS
 	******************/

 		//
 		// LEVEL PHP
 		//

 		$('#controles').on('click','#resetExec', function(){
 			dim_emoji();
 			pos_emoji();
		});

 		//
 		// LAB PHP
 		//

			/*
			** Borra la tabla anterior y vuelve a crear otra
			*/
			$('input[name=onoffswitch]').change( function(e) {
				
				if ($('#switch :input[name="onoffswitch"]').is(':checked')) 
					createBoardLab('road');
				else
					createBoardLab('campaign');
			
				$('#lab form #iniEnd').slideToggle();
				$('#lab form #road').slideToggle();
				});

			/*
			** Borra la tabla anterior y vuelve a crear otra
			*/
			$(document).on('reset','#formulario',function(e) { 

				e.preventDefault();
				if ($('#switch :input[name="onoffswitch"]').is(':checked'))
					createBoardLab('road');
				else
					createBoardLab('campaign');

				$('#level').val('-1');
				$('input[name=blocks]').val('0');
				});

			/*
			** Comprueba si la casilla sigue las reglas, en caso correcto la añade y pinta
			*/
			$('#divboard').on('click','#board tr td', function() {
				
				var 	pos, prevCell,
							cell = new Cell(0,0); 
				
				cell.setCoordByString($(this).attr('id'));
				prevCell = tempBoard.getItinerary().lastCell();
				
				if (tempBoard.getType() == 'road') 
					newCellItinerary(cell, document, $(this), prevCell);
				else
					newCellCampaign(cell, document, $(this), prevCell);
				
				// alert(tempBoard.toString());
				});

			/*
			** Guarda el tablero
			*/
			$(document).on('submit','#formulario',function(e) {

				e.preventDefault();

				if(tempBoard.getType() == 'campaign' && build_campaign!=3)
					alert('Falta terminar el tablero', 'error');

				else if ($('#formulario select[name=level]').val() == -1)
					alert('Selecciona un nivel', 'error');

				else if ($('#formulario input[name=blocks]').val() < 0 || !$.isNumeric($('#formulario input[name=blocks]').val()))
					alert('valor de "Bloques" no valido', 'error');

				else if (tempBoard.getItinerary().toString().length>10) {

					$.post( 
						'../php/insertDB.php', 
						{	board: tempBoard.getItinerary().toString(),
							type: tempBoard.getType(),
							level: $('#formulario select[name=level]').val(),
							blocks: $('#formulario input[name=blocks]').val() }, 
						function(e) { alert(e, 'success'); }
						);

				} else
					alert ("Tablero demasiado corto");

				});
			
			// $('input[name=dim_board]').change( function() { 

			// 	var value = parseInt($('input[name=dim_board]').val());

			// 	if (lab_lastDim > value) {

			// 		console.info(lab_lastDim, value);
			// 		var dim_cell = $('.board td').height() + 2;
			// 		$('#divboard').height( $('#divboard').height() - dim_cell);
			// 		$('#divboard').width( $('#divboard').width() - dim_cell);
			// 		lab_lastDim = value;
			// 	}


			// 	});

			$('#iniEnd button[name=zoneCampaign]').on('click', function() { 

				build_campaign = 1;
				$('#iniEnd tr:last-child td div:first-child').css('bottom', '10em');
				$('#iniEnd tr:last-child td div:nth-child(2)').css('bottom', '0em');
				$('#iniEnd tr:first-child td:first-child').css('right', '66%'); });

		//
		// LEVELS PHP
		//

			/*
			** Event: levels.php
			** Descr: cambia los tableros segun el nivel
			*/
			$('#subType li').on('click', function() {

			
				$('#subType li').removeClass('selected');
			
				$(this).addClass('selected');
						
				$('article').find('ul:last-child').remove();
				nivel.show('article', this.getAttribute('id') - 1 );

				article_minheight(0);
				});

		//
		// USER PHP
		//
		
			/*
			** Event: user.php
			** Descr: elimina una tabla del usuario 
			*/
			$('#tableros div a').on('click', function() { 

				var id = $(this).attr('id');

				$.post( '../php/deleteBoard.php', { 
					id: id }, 
					function(result) { alert(result, 'success'); }
					);

				$('#id_' + id).remove(); });

		

 	});

