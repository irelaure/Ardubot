<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>Ardubot</title>

		<!-- CSS -->
		<link rel="stylesheet" href="../css/general.css" type="text/css"/>
		<link rel="stylesheet" href="../css/level.css" type="text/css"/>
		<link rel="stylesheet" href="../css/animation.css" type="text/css"/>
		<!-- <link rel="stylesheet" href="../css/lab.css" type="text/css"/> -->
		<link rel="stylesheet" href="../font-awesome/css/font-awesome.min.css">


		<!-- Blockly -->
		<!-- Compressed mode 
		<script src="../blockly/blockly-master/blockly_compressed.js"></script>
		<script src="../blockly/blockly-master/blocks_compressed.js"></script>
		<script src="../blockly/blockly-master/msg/js/es.js"></script>
		<script src="../blockly/blockly-master/javascript_compressed.js"></script>
		<script src="../blockly/blockly-master/generators/javascript/arduino.js"></script> -->

		<!-- Uncompressed mode -->
		<script src="../blockly/blockly-master/blockly_uncompressed.js"></script>
		<script src="../blockly/blockly-master/blocks/logic.js"></script>
		<script src="../blockly/blockly-master/blocks/loops.js"></script>
		<script src="../blockly/blockly-master/blocks/math.js"></script>
		<script src="../blockly/blockly-master/blocks/text.js"></script>
		<script src="../blockly/blockly-master/blocks/lists.js"></script>
		<script src="../blockly/blockly-master/blocks/colour.js"></script>
		<script src="../blockly/blockly-master/blocks/variables.js"></script>
		<script src="../blockly/blockly-master/blocks/procedures.js"></script>
		<script src="../blockly/blockly-master/generators/javascript.js"></script>
		<script src="../blockly/blockly-master/generators/javascript/logic.js"></script>
		<script src="../blockly/blockly-master/generators/javascript/loops.js"></script>
		<script src="../blockly/blockly-master/generators/javascript/math.js"></script>
		<script src="../blockly/blockly-master/generators/javascript/text.js"></script>
		<script src="../blockly/blockly-master/generators/javascript/lists.js"></script>
		<script src="../blockly/blockly-master/generators/javascript/colour.js"></script>
		<script src="../blockly/blockly-master/generators/javascript/variables.js"></script>
		<script src="../blockly/blockly-master/generators/javascript/procedures.js"></script>
		<script src="../blockly/blockly-master/generators/javascript/arduino.js"></script>
		<script src="../blockly/blockly-master/msg/js/en.js"></script>
		<script src="../blockly/blockly-master/demos/interpreter/acorn_interpreter.js"></script>

		<!-- JSS -->
		<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
		<script src="../blockui-master/jquery.blockUI.js" type="text/javascript"></script>
		<script src="../js/level.js" type="text/javascript"></script>
		<script src="../js/animation.js" type="text/javascript"></script>
		<script src="../js/general.js" type="text/javascript"></script>
		<script src="../js/dom.js" type="text/javascript"></script>

		<!-- favicon -->
		<link rel="icon" href="../img/favicon.ico" />

		<?php 

			session_start();
			ob_start();

			if (isset($_GET['name'])){
				$id = $_GET["name"];

				$iden = mysql_connect($_SESSION['host_db'], $_SESSION['user_db'], $_SESSION['pass_db']);

		   	if(!$iden) 	die("ERROR en mysql_connect");

		   	mysql_query("SET NAMES 'utf8'");
			  mysql_select_db("ardubot", $iden) or die("Error: No existe la base de datos");

				// CONSULTA
				$query = "SELECT * FROM BOARDS WHERE id=".$id;
				$results = mysql_query($query, $iden); 
				if(!$results) die("Error: no se pudo realizar la consulta");

				$row = mysql_fetch_assoc($results);

				echo '<script type="text/javascript">

						var path = new Itinerary();
						path.setPathByString("' . $row['board'] .'");

						tempBoard = new Board(' . $row['id'] . ',"'
														. $row['type'] . '",'  
					     								. 'path,'
					     			   				. $row['level'] . ',' 
					     			   				. $row['blocks'] . ');';
				echo '</script>';

		    // LIBERAR MEMORIA Y CIERRA CONEXION
		    mysql_free_result($results);
		    mysql_close($iden); 
		  }
		?>
	</head>
	<body>
		
		<?php include('header.php'); ?>
		
		<article>

			<div id="message">
				<h1>Juego</h1>
				<h2>¡A programar!</h2>
			</div>

			<div id="blocklyDiv">
			<?php if (isset($_GET['name'])){ ?>
				<script type="text/javascript"> 
					toolbox( "<?php echo $row['type']?>", <?php echo $row['level']?>); 
				</script>
			<?php }else{ ?>
				<script type="text/javascript"> 
					toolbox("road", 1); 
				</script>
			<?php	}	?>	
			</div> <!-- blocklyDiv -->	

			<div id="status">
				<?php if (isset($_GET['name'])){ ?>
					<h2>tablero</h2>

	      	<div id="lab">
	      		<div id='emoji'> 
	      			<img src="../img/favicon.ico" alt="logo">
	      		</div>
						<script type="text/javascript"> tempBoard.show('#lab', 'view'); </script>
					</div>
				<?php } ?>
    		<div id="controles">
    			<?php if (isset($_GET['name'])){ ?>
	     			<i onclick="simulateCode()" alt="Submit" class="fa fa-play" aria-hidden="true"></i>
	     			<i onclick="stepByStep(false)" alt="Submit" class="fa fa-step-forward" aria-hidden="true"></i>
	     			<i onclick="runCode(false)" alt="Submit" class="fa fa-cloud-download" aria-hidden="true"></i>
	     		<?php } else {?>
	     			<i onclick="stepByStep(true)" alt="Submit" class="fa fa-step-forward" aria-hidden="true"></i>
	     			<i onclick="runCode(true)" alt="Submit" class="fa fa-cloud-download" aria-hidden="true"></i>
	     			<?php }?>

     				<i onclick="reset()" class="fa fa-refresh" aria-hidden="true" id="resetExec"></i>
    		</div><!-- controles -->
			</div><!-- status -->
		</article>
		<footer>
			<p>© Irene Colmenar</p>
		</footer>
	</body>
</html>
