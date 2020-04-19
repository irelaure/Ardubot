
<?php 
	
	$location = basename($_SERVER['PHP_SELF']);

	if ($location == 'index.php') {
		
		$view = 'view/';
		$index = '';
	
	} else {
		
		$index = '../';
		$view = '';
	
	}
	
	echo '
	<header>

		<a id="logo-header" href="' .$index. 'index.php">
			<img src="' .$index. 'img/logo.png" alt="logo">
		</a> <!-- / #logo-header -->';

	if($location == 'levels.php')
		echo ' <div id="location">
					<h2>' .$levelName. '</h2>
				</div>';

	echo '
		<nav>
			<ul>';

	if($location != 'index.php')
		echo	'<li><a href="' .$index. 'index.php">Inicio</a></li>';
		
	if (!isset($_SESSION['name'])) {
	 	
	 	echo '<li><a href="' .$view. 'login-register.php">Sign In</a></li>';
	
	} else {

		echo '<li><a href="' .$view. 'lab.php">Lab</a></li>
		   	<li><a href="' .$view. 'user.php">Hola ' .$_SESSION['name']. '!</a></li> 
		   	<li><a class="signOut" href="' .$index. 'php/log-out.php">Sign Out</a></li>';
	}
				
	
	echo '</ul>
		</nav><!-- / nav -->

	</header><!-- / #main-header -->';