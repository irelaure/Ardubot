<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>Ardubot</title>

	<!-- CSS -->
	<link rel="stylesheet" href="css/general.css" type="text/css"/>
	<link rel="stylesheet" href="css/index.css" type="text/css"/>
	<link href='https://fonts.googleapis.com/css?family=Raleway' rel='stylesheet' type='text/css'>

	<!-- JSS -->
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
	<script src="js/general.js" type="text/javascript"></script>
	<script src="js/dom.js" type="text/javascript"></script>

	<!-- favicon -->
	<link rel="icon" href="img/favicon.ico" />

	<?php 
		// SESION	
		  session_start();
			ob_start();	
			$_SESSION['host_db'] = '127.0.0.1:8000';
			$_SESSION['pass_db'] = '';
			$_SESSION['user_db'] = 'root';
			
			// $_SESSION['host_db'] = '127.0.0.1';
			// $_SESSION['pass_db'] = 'nemex026';
			// $_SESSION['user_db'] = 'nemex';

			// $_SESSION['database'] = "'127.0.0.1', 'nemex', 'nemex026'";
	?>

</head>


<body>
	
	<?php include('view/header.php'); ?>
	

	<article>

		<div id="front">
			<img src="img/index/boy-reading.png" alt="Submit" />
			<img src="img/index/cartel.png" alt="Submit" />
		</div>

		<ul id="levels">
			<h1> ¡Juguemos!</h1>
			<?php if (isset($_SESSION['name'])) { ?>
			<li class="level"><a href="view/levels.php?type=road">
				<img src="img/index/level2.png" alt="Submit" />
				<p>Recorridos</p></a>
			</li>
			<li class="level"><a href="view/level.php">
				<img src="img/index/level1.png" alt="Submit" />
				<p>Robot</p></a>
			</li>
			<li class="level"><a href="view/levels.php?type=campaign">
				<img src="img/index/mapas.png" alt="Submit" />
				<p>Mapas</p></a>
			</li>
			<li class="level"><a href="view/levels.php?type=geography">
				<img src="img/index/mapSpain.png" alt="Submit" />
				<p>Mapa Geográfico</p></a>
			</li>
			<?php }else { ?>
			<li class="level"><a href="#">
				<img src="img/index/level2.png" alt="Submit" />
				<p>Recorridos</p></a>
			</li>
			<li class="level"><a href="#">
				<img src="img/index/level1.png" alt="Submit" />
				<p>Robot</p></a>
			</li>
			<li class="level"><a href="#">
				<img src="img/index/mapas.png" alt="Submit" />
				<p>Mapas</p></a>
			</li>
			<li class="level"><a href="#">
				<img src="img/index/mapSpain.png" alt="Submit" />
				<p>Mapa Geográfico</p></a>
			</li>
			<?php } ?>
		</ul>
	
	</article>

	<footer>
		<p>© Irene Colmenar</p>
	</footer>
</body>
</html>
