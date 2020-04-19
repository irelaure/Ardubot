<!DOCTYPE html>
<html lang="en">

<head>

	<meta charset="utf-8">
	<title>Ardubot - User</title>

	<!-- CSS -->
	<link href='https://fonts.googleapis.com/css?family=Raleway' rel='stylesheet' type='text/css'>
	<link rel="stylesheet" href="../css/general.css" type="text/css"/>
	<link rel="stylesheet" href="../css/animation.css" type="text/css"/>
	<link rel="stylesheet" href="../css/user.css" type="text/css"/>
		<link rel="stylesheet" href="../font-awesome/css/font-awesome.min.css">
	<link href="../c3/c3.css" rel="stylesheet" type="text/css">

	<!-- JS -->
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
	<script src="../js/user.js" type="text/javascript"></script>
	<script src="../js/animation.js" type="text/javascript"></script>
	<script src="../js/general.js" type="text/javascript"></script>
	<script src="../js/dom.js" type="text/javascript"></script>
	<script src="http://d3js.org/d3.v3.min.js" charset="utf-8"></script>
	<script src="../c3/c3.min.js"></script>

	<!-- favicon -->
	<link rel="icon" href="../img/favicon.ico" />

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

			$sentencia = "SELECT * FROM BOARDS WHERE userid=" .$_SESSION['id'];
			
			$resultado = mysql_query($sentencia, $iden); 
 			if(!$resultado) die(" Error: no se pudo realizar la consulta");

 			echo '<script>';
 			while($fila = mysql_fetch_assoc($resultado)) {

 				echo 'nivel.setBoardByAttr(' 	. $fila['id'] . ','
  									 					. '"' . $fila['type'] . '",' 
        							 					. '"' . $fila['board'] . '",' 
			        			   					. $fila['level'] . ',' 
			        			   					. $fila['blocks'] . ');';
 			}
 			echo '</script>';

 			mysql_free_result($resultado);
 			include('../php/userProgress.php');
	?>
<?php if ($_SESSION['isTeacher']){
	echo "<script>
	var alumnsMistakesCom = ".json_encode( $_SESSION['alumnsMistakesCom']).";
	var alumnsMistakesProv = ".json_encode( $_SESSION['alumnsMistakesProv'] ) .";
</script>"; } ?>
</head>

<body>

	<?php include('header.php'); ?>

	<article>
		<div id="message">
			<h1>Perfil</h1>
			<h2>Información de usuario</h2>
		</div>

		<div id='container'>
			
			<div id='datos'>
				<div id='misdatos' class='content'>
					<h3>Datos de Usuario</h3>
					<table>
						<tr>
							<td>Nombre :</td>
							<td><?php echo $_SESSION['name'] ?></td>
						</tr>	
						<tr>
							<td>Apellido :</td>
							<td><?php echo $_SESSION['surname'] ?></td>
						</tr>	
						<tr>
							<td>E-mail :</td>
							<td><?php echo $_SESSION['email'] ?></td>
						</tr>	
						<tr>
							<td>Estado :</td>
							<td id='isTeacher'><?php 
								if ($_SESSION['isTeacher'] == 1)
									echo 'Profesor';
								else 
									echo 'Alumno'; ?></td>
						</tr>	
					</table>
				</div>
			<?php if($_SESSION['isTeacher'] == 1) { ?>
				<div id='addKids' class='content'>
					<form role ="form" id="formAddAlum">
						<h3>Añadir Alumno<h3>
						<select name="addAlum" id ="addAlumn" class = "form-control">
							<?php
							echo "<option id = 0>Selecciona un alumno</option>";
							while ($alumn=array_pop($alumnsAvailable))
								echo "<option id = alumn_".$alumn[0]." value=".$alumn[0].">".$alumn[1]."</option>";
							?>
						</select>
					<input type="submit" value="Añadir" class="buttonSubmit">
					</form>
				</div> <!-- addKids -->
				<div id='kids' class='content'>
					<h3>Alumnos</h3>
					<?php
						echo '<table>';
						for ($i=0;$i<$_SESSION['num_users'];$i++) {
			 				echo '<tr id=kid_'.$_SESSION['users'][$i][0].'><td>'.$_SESSION['users'][$i][1].'</td>';
			 				echo'<td class="alumn" ><i class="fa fa-times delKid" aria-hidden="true" id=delKid_'.$_SESSION['users'][$i][0].'></i></td></tr>';
			 			}
			 			echo '</table>';
					?>
				</div> <!--kids -->
				<?php } ?> 
			</div> <!-- datos -->

			<div id='progresoCom' class='content'>
				<h3>Progreso Geografía Comunidades</h3>
				<div id="chart">
				<?php
				if (!$_SESSION['isTeacher']){ 
					echo "<script>
						var chart = c3.generate({
					    bindto: '#chart',
					    data: {
					      columns: [
					        err_com,
					        err_prov
					      ]
					    }
						});
				 </script>";
				} else {
					echo "<script> 
						var chart = c3.generate({
					    bindto: '#chart',
					    data: {
					      columns: alumnsMistakesCom
					    }
						});
				 </script>";
				}
				 ?>
				</div>
			</div> <!-- progresoCom -->
		<div id='progresoProv' class='content'>
				<div id="chart2">
				<?php
				if ($_SESSION['isTeacher']){ 
					echo "			<h3>Progreso Geografía Provincias</h3>";
				 echo "<script> 
						var chart = c3.generate({
					    bindto: '#chart2',
					    data: {
					      columns: alumnsMistakesProv
					    }
						});
				 </script>";
				 }?>
				</div>
			</div> <!-- progresoProv -->
		

			<div id='tableros' class='content'>
				<h3>Mis tableros</h3>
	    		<script> 
	    			for (i in nivel.boards) {

	    				var id = nivel.boards[i].getName(),
	    					 type;

	    					if(nivel.boards[i].getType() == 'road')
	    					 	type = 'Recorrido';
	    					else
	    						type = 'Mapa';

	    				var myboard = $('<div/>', {
						    'class' : 'myboards',
						    'id'    : 'id_' + id
						});
	    				
						$('#tableros').append( myboard );
	    				nivel.boards[i].show('#id_' + id, 'preview');
	    				$('#id_' + id).append('<p>Tipo: ' + type +'</p>');
	    				$('#id_' + id).append('<a href="#" id="'+id+'"><i class="fa fa-times" aria-hidden="true"></i></a>');
	    			}
	    		</script>
			</div> <!-- tableros -->
		</div> <!-- container -->

		
	</article>

	<?php

		// FREE AND CLOSE
		   mysql_free_result($resultado);
		   mysql_close($iden); 
   ?>

	<footer>
		<p>© Irene Colmenar</p>
	</footer>
</body>
</html>