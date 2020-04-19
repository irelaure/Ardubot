
<?php

  session_start();
  ob_start();

  $name = $_REQUEST['name'];
  $surn = $_REQUEST['surname'];
  $email = $_REQUEST['email'];
  $pass1 = $_REQUEST['password'];

  if (isset($_REQUEST['onoffswitch']))
    $isTeacher = 0;
  else 
    $isTeacher =1;

  $pass = md5($pass1);

  $iden = mysql_connect($_SESSION['host_db'], $_SESSION['user_db'], $_SESSION['pass_db']);

  
  mysql_query("SET NAMES 'utf8'");
  if(!$iden) die("Error en mysql_connect");
  mysql_select_db("ardubot", $iden) or die("Error: No existe la base de datos");


  //Comprueba si el mail ya está registrado
  $sentencia = "SELECT * FROM USERS WHERE email='".$email."';";
  $resultado = mysql_query($sentencia, $iden);
  $resDB = mysql_fetch_assoc($resultado);

  if($resDB)
    echo "<script> window.location='../view/login-register.php'; </script>";
  else {
    // CONSULTA
    $sentencia = "INSERT INTO USERS (name, surname, email, password, isTeacher) VALUES ('".$name."', '".$surn."', '".$email."', '".$pass."',".$isTeacher.")";
    $resultado = mysql_query($sentencia, $iden);
    if(!$resultado) {
  		echo "<script> window.location='../view/login-register.php'; </script>";
    }else{
      $sentencia = "SELECT * FROM USERS WHERE email='".$email."';";
      $resultado = mysql_query($sentencia, $iden);
      
      $resDB = mysql_fetch_assoc($resultado);
      
      $_SESSION['id'] = $resDB['id'];
      $_SESSION['name'] = $resDB['name'];
      $_SESSION['surname'] = $resDB['surname'];
      $_SESSION['email'] = $resDB['email'];
      $_SESSION['isTeacher'] = $resDB['isTeacher'];

      echo "<script> window.location='../index.php'; </script>";
    }
  }
  mysql_close($iden); 
?>
