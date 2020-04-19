
<?php

	// SESSION

		session_start();
  	ob_start();

  	if (isset($_REQUEST['id']))
			$id_board = $_REQUEST['id'];
		else
			die('Not found argument');

  	// CONNECTION

  $iden = mysql_connect($_SESSION['host_db'], $_SESSION['user_db'], $_SESSION['pass_db']);

	if(!$iden) 	die("ERROR: mysql_connect");

		mysql_query("SET NAMES 'utf8'");
		mysql_select_db("ardubot", $iden) or die("Error: No existe la base de datos");

	// QUERY

		$sentencia = 'DELETE FROM BOARDS WHERE id='.$id_board.' AND userid='.$_SESSION['id'];

		$resultado = mysql_query($sentencia, $iden); 
		if(!$resultado) die("Error: no se pudo realizar la consulta");

	// FREE AND CLOSE

		//mysql_free_result($resultado);
		mysql_close($iden); 

		echo 'Tablero eliminado con éxito';
?>