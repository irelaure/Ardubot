
<?php

	// SESSION

		session_start();
		ob_start();

	// CONNECTION

	  $iden = mysql_connect($_SESSION['host_db'], $_SESSION['user_db'], $_SESSION['pass_db']);
		if(!$iden) 	die("ERROR en mysql_connect");

		mysql_query("SET NAMES 'utf8'");
		mysql_select_db("ardubot", $iden) or die("Error: No existe la base de datos");

	// QUERY

		$type = $_REQUEST['type'];
		$board = $_REQUEST['board'];
		$level = $_REQUEST['level'];
		$blocks = $_REQUEST['blocks'];

		$userid = $_SESSION['id'];

		$sentencia = "INSERT INTO BOARDS (level, type, userid, board, blocks) VALUES (".$level.",'".$type."',".$userid.",'".$board."',".$blocks.");";

		$resultado = mysql_query($sentencia, $iden); 
		if(!$resultado) die("Error: no se pudo realizar la consulta");

		echo 'Tablero añadido con éxito';

	// FREE AND CLOSE

		mysql_close($iden); 
?>
