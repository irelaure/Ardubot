
<?php

	// SESSION

		session_start();
  	ob_start();

  	if (isset($_REQUEST['id']))
			$id_user = $_REQUEST['id'];
		else
			die('Not found argument');

  // CONNECTION

  $iden = mysql_connect($_SESSION['host_db'], $_SESSION['user_db'], $_SESSION['pass_db']);

	if(!$iden) 	die("ERROR: mysql_connect");

		mysql_query("SET NAMES 'utf8'");
		mysql_select_db("ardubot", $iden) or die("Error: No existe la base de datos");

	// QUERY
		$id_user = substr($id_user, 7);
		$sentencia = 'UPDATE USERS SET id_teacher = null WHERE id='.$id_user.';';

		$resultado = mysql_query($sentencia, $iden); 
		if(!$resultado) die("Error: no se pudo realizar la consulta: ".$sentencia);

	// FREE AND CLOSE

		mysql_close($iden); 

		echo 'Alumno echado de clase con éxito '+$id_user;
?>