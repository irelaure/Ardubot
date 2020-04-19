
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

		if (isset($_REQUEST['name']))
			$id_board = $_REQUEST['name'];
		else
			echo 'not value name';

		$id_user = $_SESSION['id'];

		$sentencia = "SELECT * FROM PROGRESS WHERE id_user=".$id_user." AND id_board=".$id_board.";";

		$resultado = mysql_query($sentencia, $iden); 
		if(!$resultado) die("Error: no se pudo realizar la consulta");

		$row = mysql_fetch_assoc($resultado);
		if( !$row ) {

			$sentencia = "INSERT INTO PROGRESS VALUES (".$id_user.",".$id_board.");";

			$resultado = mysql_query($sentencia, $iden); 
			if(!$resultado) die("Error: no se pudo realizar la consulta");

			echo 'Almacenado progreso con éxito';

			array_push($_SESSION['progress'], $id_board);

		} else { }

	// FREE AND CLOSE

		mysql_close($iden); 
?>