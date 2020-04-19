	<?php
			$output = array(); //contendrá cada linea salida desde la aplicación en Python
			$code = $_POST['code'];
			$coma = ',';
			
			$pos = strpos($code, $coma);
			if ($pos!=FALSE)
				$code = substr ($code, 0, $pos);

			$command = 'python ../python/trayectoria.py ';

			$indexFirstCell= $_POST['FirstCell'];
   		$command .= $indexFirstCell;
    	$command .= ' ';

			for ($i = 0; $i < strlen($code); $i++) {
    		$command .= $code[$i];
    		$command .= ' ';
			}
			
			$output = shell_exec($command);

			//echo $command." ".$output;
			echo "Trayectoria generada: ".$output;
	?>