<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>Ardubot</title>

	<!-- CSS -->
	<link href='http://fonts.googleapis.com/css?family=Titillium+Web:400,300,600' rel='stylesheet' type='text/css'>
	<link rel="stylesheet" href="../css/general.css" type="text/css"/>
	<link rel="stylesheet" href="../css/login-register.css" type="text/css">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.10.0/css/bootstrap-select.min.css">


	<!-- JS -->
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
	<script src="../js/animation.js" type="text/javascript"></script>
	<script src="../js/general.js" type="text/javascript"></script>
	<script src="../js/dom.js" type="text/javascript"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.10.0/js/bootstrap-select.min.js"></script>

	<!-- favicon -->
	<link rel="icon" href="../img/favicon.ico" />

</head>

<body>

	<header>
		<a id="logo-header" href="../index.php">
			<img src="../img/logo.png" alt="logo">
		</a> <!-- / #logo-header -->
		<nav>
			<ul>
				<li><a href="../index.php">Inicio</a></li>
				<li><a href="#">Contacto</a></li>
			</ul>
		</nav><!-- / nav -->
	</header><!-- / #main-header -->

	<article>

		<div id="message">
			<h1>Registro</h1>
			<h2></h2>
		</div>

		<div class="form">
			
			<ul class="tab-group">
				<li class="tab active"><a href="#signup">Sign Up</a></li>
				<li class="tab"><a href="#login">Log In</a></li>
			</ul>

			<div class="tab-content">

				<div id="signup">   
					<h1>¿Eres nuevo?<br> ¡Bienvenido!</h1>
					<form action="../php/register.php" method="post">
						
						<div class="top-row">
							
							<div class="field-wrap">
								<label for="name">
									Nombre<span class="req">*</span>
								</label>
								<input type="text" required autocomplete="off" name="name" id="name"/>
							</div>
						
							<div class="field-wrap">
								<label for="surname">
									Apellido<span class="req">*</span>
								</label>
								<input type="text"required autocomplete="off" name="surname" id="surname"/>
							</div>
						</div>
						
						<div class="second-row">

								<div id="switch" class="onoffswitch">
							   	<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="onoffswitch" checked>
							    	<label class="onoffswitch-label" for="onoffswitch">
							      	<span class="onoffswitch-inner"></span>
							      	<span class="onoffswitch-switch"></span>
						    		</label>
								</div>
								

								<!-- <label for="isTeacher">
									Profesor<span class="req">*</span>
								</label>
								<input type="checkbox" name="isTeacher" id ="isTeacher" value="isTeacher"/> -->
						</div>

						<div class="field-wrap">
							<label for ="email">
								Correo electrónico<span class="req">*</span>
							</label>
							<input type="email"required autocomplete="off" name="email" id="email"/>
						</div>
						<div class="field-wrap">
							<label for ="password">
								Contraseña<span class="req">*</span>
							</label>
							<input type="password"required autocomplete="off" name="password" id="password"/>
						</div>
						
						<button type="submit" class="button button-block">Empecemos</button>
					</form>
				</div>

				<div id="login">   
					<h1>¡Cuanto tiempo!</h1>
					<form action="../php/login.php" method="post">
						<div class="field-wrap">
							<label>
								Correo electrónico<span class="req">*</span>
							</label>
							<input type="email"required autocomplete="off" name="email"/>
						</div>
						<div class="field-wrap">
							<label>
								Contraseña<span class="req">*</span>
							</label>
							<input type="password"required autocomplete="off" name="password"/>
						</div>

						<!-- <p class="forgot"><a href="#">Forgot Password?</a></p> -->
						<button class="button button-block">Entrar</button>
					</form>
				</div>
			</div><!-- tab-content -->
		</div> <!-- /form -->
		
		<script src='http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js'></script>
		<script src="../js/login-register.js"></script>
	</article>

	<footer>
		<p>© Irene Colmenar</p>
	</footer>
</body>
</html>
