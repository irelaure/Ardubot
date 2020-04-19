<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>Ardubot</title>

	<!-- CSS -->
	<link rel="stylesheet" href="../css/general.css" type="text/css"/>
	<link rel="stylesheet" href="../css/lab.css" type="text/css"/>
	<link rel="stylesheet" href="../css/animation.css" type="text/css"/>
	<link href='https://fonts.googleapis.com/css?family=Raleway' rel='stylesheet' type='text/css'>
	<link rel="stylesheet" href="../font-awesome/css/font-awesome.min.css">

	<!-- JS -->
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
	<script src="../js/animation.js" type="text/javascript"></script>
	<script src="../js/general.js" type="text/javascript"></script>
	<script src="../js/dom.js" type="text/javascript"></script>

	<!-- favicon -->
	<link rel="icon" href="img/favicon.ico" />

	<?php 

		// SESION
	  	
		  session_start();
			ob_start();
	?>

</head>

<body>
	
	<?php include('header.php'); ?>

	<article>

		<div id="message">
			<h1>Laboratorio</h1>
			<h2>¡Crea tu propio tablero!</h2>
		</div>

		<div id='lab'>

			<div id='divboard'>
				<script type="text/javascript"> createBoardLab('road'); </script>
			</div>

			<form id="formulario" method="post">

				<fieldset id='options'>

					<legend>Datos del tablero</legend>
					<p>Sigue con cuidado las indicaciones para poder crearlo</p>
					
					<h4>Tipo de mapa</h4>
					<div id="switch" class="onoffswitch">
				   	<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="myonoffswitch" checked>
				    	<label class="onoffswitch-label" for="myonoffswitch">
				      	<span class="onoffswitch-inner"></span>
				      	<span class="onoffswitch-switch"></span>
			    		</label>
					</div>

					<h4>Nivel</h4>
					<select id='level' name="level">
						  <option value="-1" selected="selected">- selecciona -</option>
						  <option value="0">Nivel 1</option>
						  <option value="1">Nivel 2</option>
						  <option value="2">Nivel 3</option>
					</select>
					
					<h4>Tablero</h4>
					<div id='road'>Instrucciones para Recorrido</div>
					<div id='iniEnd'>
						<table>
							<tr>
								<td>></td>
								<td>1</td>
								<td>2</td>
								<td>3</td>
							</tr>
							<tr>
								<td colspan="4">
									<div>
										<p>Seleciona los bloques que formaran tu mapa</p>
										<button type="button" name='zoneCampaign'>Finalizar selección</button>
									</div>
									<div><p>Seleciona Inicio</p></div>
									<div><p>Seleciona Meta</p></div>
									<div><p>¡Finalizado!</p></div>
								</td>
							</tr>
						</table>
					</div>

					<h4>Bloques Recomendados</h4>
					<input type="number" name="blocks" value="0" min='0'/>

					<h4>Dimensión Tablero</h4>
					<input type="number" name="dim_board" value="20" min='0' max='20'/>

				</fieldset>

				<button type="submit" name='submit' class="button button-block" id='saveTable'>
          Guardar Nivel <i class="fa fa-floppy-o" aria-hidden="true"></i>
    		</button>
				<button type="reset" name='reset' class="button button-block" id='deleteTable'>
				  Reset <i class="fa fa-refresh" aria-hidden="true"></i>
				</button>
			</form>

		</div> <!-- /lab -->
	</article>
	
	<footer>
		<p>© Irene Colmenar</p>
	</footer>
</body>
</html>
