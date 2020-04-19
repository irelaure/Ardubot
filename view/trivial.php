<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>Ardubot</title>

	<!-- CSS -->
	<link rel="stylesheet" href="../css/general.css" type="text/css"/>
	<link rel="stylesheet" href="../css/index.css" type="text/css"/>
	<link rel="stylesheet" href="../css/trivial.css" type="text/css"/>
	<link href='https://fonts.googleapis.com/css?family=Raleway' rel='stylesheet' type='text/css'>
	<link rel="stylesheet" href="../font-awesome/css/font-awesome.min.css">


	<!-- JSS -->
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
	<script src="../js/general.js" 		 type="text/javascript"></script>
	<script src="../js/dom.js" 				 type="text/javascript"></script>
	<script src="../js/trivial.js" 				 type="text/javascript">ini("<?php echo $_REQUEST['type']?>");</script>
	<script src="../spain-map/raphael-min.js" type="text/javascript"></script>
  <script src="../spain-map/spain-map-prov.js"   type="text/javascript"></script>
  <script src="../spain-map/spain-map-com.js"   type="text/javascript"></script>

	<!-- favicon -->
	<link rel="icon" href="../img/favicon.ico" />

	<?php 

		// SESION
		  	
		  session_start();
			ob_start();	

	?>

</head>


<body>

	<?php include('header.php'); ?>

	<article>

		<div id="message">
			<?php 
				if ($_REQUEST["type"] == "com")
					echo '<h1>Comunidades</h1>';
				else
					echo '<h1>Provincias</h1>';
			?>
			
			<h2>¡A Jugar!</h2>
		</div>

		<div id="switch-front">
			<div id="switch" class="onoffswitch">
		    <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="myonoffswitch" checked>
		    <label class="onoffswitch-label" for="myonoffswitch">
		      <span class="onoffswitch-inner"></span>
		      <span class="onoffswitch-switch"></span>
	    	</label>
			</div>
		</div>

	  <div id="map"></div>
		  <script type="text/javascript">
		  	if ("<?php echo $_REQUEST["type"] ?>"=="com"){
			    new SpainMapCom({
			      id: 'map',
			      width: 700,
			      height: 500,
			      fillColor: "#1783C6",
			      strokeColor: "#ECB71E",
			      strokeWidth: 1.3,
			      selectedColor: "#CD3E27",
			      animationDuration: 1,
			      onClick: function(province, event) {
			      	evalAnswer (province, "<?php echo $_REQUEST["type"] ?>");
			      }
		    });}
			    else {
			    	new SpainMapProv({
				      id: 'map',
				      width: 700,
				      height: 500,
				      fillColor: "#1783C6",
				      strokeColor: "#ECB71E",
				      strokeWidth: 1.3,
				      selectedColor: "#CD3E27",
				      animationDuration: 1,
				      onClick: function(province, event) {
				      	evalAnswer (province, "<?php echo $_REQUEST["type"] ?>");
				      }
		    		});
			    }
		  </script>
		</div>

		<script> createDiv(randRegions,  "<?php echo $_REQUEST["type"] ?>");</script>
	</article>

	<footer>
		<p>© Irene Colmenar</p>
	</footer>
</body>
</html>
