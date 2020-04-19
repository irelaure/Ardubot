<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>Ardubot</title>

	<!-- CSS -->
	<link href='https://fonts.googleapis.com/css?family=Raleway' rel='stylesheet' type='text/css'>
	<link rel="stylesheet" href="../css/general.css" type="text/css"/>
	<link rel="stylesheet" href="../css/levels.css" type="text/css"/>
	<link rel="stylesheet" href="../css/animation.css" type="text/css"/>
	
	<!-- JS -->
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
	<script src="../js/animation.js" type="text/javascript"></script>
	<script src="../js/general.js" type="text/javascript"></script>
	<script src="../js/dom.js" type="text/javascript"></script>

	<!-- favicon -->
	<link rel="icon" href="img/favicon.ico" />

	<?php 

		// IDENTIFICA TIPO

			$type = $_GET['type'];

			if ($type == 'road') 					$levelName = 'Recorridos';
			else if ($type == 'geography') 	$levelName = 'España';
			else 										$levelName = 'Mapas';

		// SESION
	  	
	  	session_start();
			ob_start();

		if($type == 'road' || $type == 'campaign') {
	  
	  	// CONECTA Y SELECCIONA BD

	   	$iden = mysql_connect($_SESSION['host_db'], $_SESSION['user_db'], $_SESSION['pass_db']);

	    if(!$iden) 	die("ERROR en mysql_connect");

	   	mysql_query("SET NAMES 'utf8'");
	   	mysql_select_db("ardubot", $iden) or die("Error: No existe la base de datos");

  		// CONSULTA

	    	if ($type == 'road') {

	    		if ($_SESSION['idTeacher']){

	    			$sentencia = "SELECT * FROM BOARDS WHERE type='road' and (userid=".$_SESSION['id']. " or userid=".$_SESSION['idTeacher'].")";
	    		} else 
	    		$sentencia = "SELECT * FROM BOARDS WHERE type='road' and userid=".$_SESSION['id'];
	    	}

	    	else if ($type == 'campaign')			
	    		if ($_SESSION['idTeacher'])
	    			$sentencia = "SELECT * FROM BOARDS WHERE type='campaign' and (userid=".$_SESSION['id']. " or userid=".$_SESSION['idTeacher'].")";
	    		else{
	    			$sentencia = "SELECT * FROM BOARDS WHERE type='campaign' and userid=".$_SESSION['id'];
	    		}
	    		    	   	
	    	$resultado = mysql_query($sentencia, $iden); 
	    	if(!$resultado) die(" Error: no se pudo realizar la consulta");

	    	if ($type == 'road' || $type == 'campaign') {

		    	echo "<script type='text/javascript'>";

		    	while($fila = mysql_fetch_assoc($resultado)) {

		        echo 'nivel.setBoardByAttr(' . $fila['id'] . ',"' . $fila['type'] . '","'. $fila['board'] . '",' . $fila['level'] . ',' . $fila['blocks'] . ');';
					};

				echo 'progress = new Array();';

				if (isset($_SESSION['progress']))
					foreach ( $_SESSION['progress'] as $value)
				   	echo 'progress.push('.$value.');';

				echo '</script>';
			}

	   // LIBERAR MEMORIA Y CIERRA CONEXION
	   
		   mysql_free_result($resultado);
		   mysql_close($iden); 

		 }
		?> 
</head>

<body>
	
	<?php include('header.php'); ?>

	<article>

		<?php 

			if ($type == 'road') {

				echo "
						<ul id='subType'>
							<li id='1' class='selected'>
								<img src='../img/index/level1.png' alt='Submit' />
								<h2>Nivel 1</h2>
							</li>
							<li id='2'>
								<img src='../img/index/level2.png' alt='Submit' />
								<h2>Nivel 2</h2>
							</li>
							<li id='3'>
								<img src='../img/index/level3.png' alt='Submit' />
								<h2>Nivel 3</h2>
							</li>
						</ul>

						<script> nivel.show('article', 0 ); </script>";
			
			} else if ($type == 'campaign'){

				echo "<script> nivel.show('article', 0 ); </script>";

			} else if ($type == 'geography'){

				echo "
						<ul id='subType_geo'>
							<li id='1'>
								<a href='../view/trivial.php?type=com'>
									<img src='../img/index/mapSpain.png' alt='Submit' />
									<h2>Comunidades</h2>
								</a>
							</li>
							<li id='2'>
								<a href='../view/trivial.php?type=prov'>
									<img src='../img/index/mapSpain.png' alt='Submit' />
									<h2>Provincias</h2>
								</a>
							</li>
						</ul>";
			}

		?>
	</article>

	<footer>
		<p>© Irene Colmenar</p>
	</footer>
</body>
</html>