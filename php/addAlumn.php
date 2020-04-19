
<?php

	// SESSION

		session_start();
		ob_start();

		$idAlumn = $_REQUEST['addAlum'];
		if ($idAlumn[0]!='S'){

		// CONNECTION

		  $iden = mysql_connect($_SESSION['host_db'], $_SESSION['user_db'], $_SESSION['pass_db']);
			if(!$iden) 	die("ERROR en mysql_connect");

			mysql_query("SET NAMES 'utf8'");
			mysql_select_db("ardubot", $iden) or die("Error: No existe la base de datos");

		// QUERY

			
			$userid = $_SESSION['id'];

			$sentencia = "UPDATE USERS SET id_teacher =$userid WHERE id=$idAlumn";

			$resultado = mysql_query($sentencia, $iden); 
			if(!$resultado) die("Error: no se pudo realizar la consulta ".$sentencia);

			echo "Alumno añadido";

			include('userProgress.php');
	}

	// FREE AND CLOSE
?>
