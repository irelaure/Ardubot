
<?php
	echo"<script> num_users ='', users = [], alumnsAvailable = []; </script>";
	if (!$_SESSION['isTeacher']){   
   	//Errores Comunidades
   	$sentencia = "SELECT * FROM MAPPROGRESS WHERE type='com' and id_user=".$_SESSION['id'];
   	$resultado = mysql_query($sentencia, $iden); 
		if(!$resultado) die(" Error: no se pudo realizar la consulta");

		echo "<script> var err_com = []; err_com.push('comunidades');</script>";
		while($fila = mysql_fetch_assoc($resultado)) {
			echo "<script> err_com.push(".$fila['mistakes'].") ;</script>";
		}
		//Errores Provincias
		$sentencia = "SELECT * FROM MAPPROGRESS WHERE type='prov' and id_user=".$_SESSION['id'];
   	$resultado = mysql_query($sentencia, $iden); 
		if(!$resultado) die(" Error: no se pudo realizar la consulta");

		echo "<script> var err_prov = []; err_prov.push('provincias');</script>";
		while($fila = mysql_fetch_assoc($resultado)) {
			echo "<script> err_prov.push(".$fila['mistakes'].") ;</script>";
		}
	} else {
		//Alumnos disponibles
		$sentencia = "SELECT id, name, surname FROM USERS WHERE id_teacher IS NULL AND isTeacher=0 ORDER BY id";
		$resultado = mysql_query($sentencia, $iden); 
		if(!$resultado) die(" Error: no se pudo realizar la consulta ".$sentencia);
		$alumnsAvailable = [];
		while($fila = mysql_fetch_assoc($resultado)){
			$alumn[0] = $fila['id'];
			$alumn[1] = $fila['name']." ".$fila['surname'];
			array_push($alumnsAvailable, $alumn);
			echo "<script>alumnsAvailable.push('".$alumn[1]."');</script>";
		}

	//Comunidades
		//ID ALUMNOS
		$sentencia = "SELECT DISTINCT id, name, surname FROM USERS WHERE id_teacher=".$_SESSION['id']." ORDER BY id";
		$resultado = mysql_query($sentencia, $iden); 
		if(!$resultado) die(" Error: no se pudo realizar la consulta ".$sentencia);

		$_SESSION['users'] = [];
		$i = 0;
		while($fila = mysql_fetch_assoc($resultado)){
			$name = $fila['name']." ".$fila['surname'];
			array_push($_SESSION['users'], [$fila['id'],$name]);
			echo "<script>users.push([".$fila['id'].",'".$name."']);</script>";
			$_SESSION['alumnsMistakesCom'][$i] = [];
			$_SESSION['alumnsMistakesProv'][$i] = [];
			array_push($_SESSION['alumnsMistakesCom'][$i], $name);
			array_push($_SESSION['alumnsMistakesProv'][$i], $name);
			$i++;
		}
		$_SESSION['num_users'] = $i;
		echo "<script>num_users = ".$i.";</script>";
		
		//Errores Alumnos Comunidades
   	$sentencia = "SELECT alumnos.id as id, mistakes FROM MAPPROGRESS, (SELECT id FROM USERS WHERE id_teacher=".$_SESSION['id'].") as alumnos WHERE type='com' and id_user = alumnos.id ORDER BY alumnos.id, MAPPROGRESS.id";
   	$resultado = mysql_query($sentencia, $iden); 
		if(!$resultado) die(" Error: no se pudo realizar la consulta".$sentencia);

		$i = 0;
		$end = false;

		while($fila = mysql_fetch_assoc($resultado)) {

				while ($end == false){
					if ($fila['id']==$_SESSION['users'][$i][0]){
						array_push($_SESSION['alumnsMistakesCom'][$i], $fila['mistakes']);
						$end = true;
					} else {
						$i++;
						$end = false;
					}
				}
				$end = false;
		}

		//Errores Alumnos Provincias
   	$sentencia = "SELECT alumnos.id as id, mistakes FROM MAPPROGRESS, (SELECT id FROM USERS WHERE id_teacher=".$_SESSION['id'].") as alumnos WHERE type='prov' and id_user = alumnos.id ORDER BY alumnos.id, MAPPROGRESS.id";
   	$resultado = mysql_query($sentencia, $iden); 
		if(!$resultado) die(" Error: no se pudo realizar la consulta".$sentencia);

		$i = 0;
		$end = false;

		while($fila = mysql_fetch_assoc($resultado)) {

				while ($end == false){
					if ($fila['id']==$_SESSION['users'][$i][0]){
						array_push($_SESSION['alumnsMistakesProv'][$i], $fila['mistakes']);
						$end = true;
					} else {
						$i++;
						$end = false;
					}
				}
				$end = false;
		}
	}
?>
