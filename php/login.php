
<?php

  // SESSION

    session_start();
    ob_start();

    $email = $_REQUEST['email'];
    $pass = md5($_REQUEST['password']);
  
  // CONNETION

    $iden = mysql_connect($_SESSION['host_db'], $_SESSION['user_db'], $_SESSION['pass_db']);

    if(!$iden)  die("ERROR mysql_connect");
    mysql_select_db("ardubot", $iden) or die("Error: No existe la base de datos");
  
  // CONSULTA

    $sentencia = "SELECT * FROM USERS WHERE email = ('".$email."')";
    $resultado = mysql_query($sentencia, $iden); 
    if(!$resultado) die("Error: no se pudo realizar la consulta");

    $resDB = mysql_fetch_assoc($resultado);

  	if ($resDB['password'] != $pass) { 

      // FREE AND CLOSE
        mysql_free_result($resultado);
        mysql_close($iden);

      echo "<script> window.location='../view/login-register.php'; </script>";
    
    } else {

      $_SESSION['id'] = $resDB['id'];
      $_SESSION['name'] = $resDB['name'];
      $_SESSION['surname'] = $resDB['surname'];
    	$_SESSION['email'] = $resDB['email'];
      $_SESSION['isTeacher'] = $resDB['isTeacher'];
      $_SESSION['idTeacher'] = $resDB['id_teacher'];

      $sentencia = "SELECT id_board FROM PROGRESS WHERE id_user=" .$_SESSION['id'];
      $resultado = mysql_query($sentencia, $iden); 
      if(!$resultado) die("Error: no se pudo realizar la consulta");

      $i = 0;

      while($fila = mysql_fetch_assoc($resultado)) {

          $_SESSION['progress'][$i] = $fila['id_board'];
          $i++; 
        }

      // FREE AND CLOSE
        mysql_free_result($resultado);
        mysql_close($iden);

  		echo "<script> window.location='../index.php'; </script>";
    }
  
?>