var regions = ["La Coruña","Álava","Albacete","Alicante","Almería","Asturias","Ávila","Badajoz","Islas Baleares","Barcelona","Burgos","Cáceres","Cádiz","Cantabria","Castellón","Ciudad Real","Córdoba","Cuenca","Girona","Granada","Guadalajara","Guipuzcoa","Huelva","Huesca","Jaén","La Rioja","Las Palmas","León","Lérida","Lugo","Madrid","Málaga","Murcia","Navarra","Orense","Palencia","Pontevedra","Salamanca","Segovia","Sevilla","Soria","Tarragona","Santa Cruz de Tenerife","Teruel","Toledo","Valencia","Valladolid","Vizcaya","Zamora","Zaragoza","Ceuta","Melilla"];

//var regions = ["La Coruña","Álava","Albacete","Alicante"];
var communities = ["Galicia","Asturias","Cantabria","País Vasco", "Navarra", "La Rioja","Aragón","Cataluña","Comunidad Valenciana","Islas Baleares","Murcia","Andalucía","Extremadura","Castilla La Mancha", "Ceuta","Melilla","Castilla y León","Madrid","Islas Canarias"];
//var communities = ["Galicia","Asturias"];

var randRegions;
var index, correct, mistake = 0, it = 0, robot;

	$(document).ready(function() {

		$('input[name=onoffswitch]').change( function(e) {
			
			if ($('#switch :input[name="onoffswitch"]').is(':checked'))
				robot = false;
			else
				robot = true;
		});
	});


function ini (type){
	index=0;
	correct = 0; 
	if (type == "prov"){
		randRegions = randomizeArray (regions);
	}
	else 
		randRegions = randomizeArray (communities);
	return randRegions;
}


function randomizeArray (listOriginal){
	var list = listOriginal.slice();
	var Total = list.length; 
	var newList = [];
	for (i=0; i<Total; i++) { 
		rand = Math.floor(Math.random()*(list.length)); 
		newList[i] = list[rand];
		list.splice(rand, 1);
	}
	return newList;
}


function createDiv (randRegions, type){
	if (!randRegions){
		randRegions = ini (type);
	}
	if (randRegions.length == index){
		$.post( '../php/insertMapProgress.php', { 
					map: type,
					mistakes: mistake }, 
					function(result) { alert(result, 'success');}
		);
		mistake = 0;
		alert ("¡Enhorabuena! Has completado el mapa entero", "reload");
	}

	var listGroup = document.createElement("div");
	listGroup.setAttribute('id', 'info');
	
		var list = document.createElement("div");
			list.setAttribute('id', 'questions');
			
			var p = document.createElement("p");
			p.setAttribute('id', 'pregunta');
			var text = document.createTextNode("¿Dónde está " + randRegions[index] + "?" );
			p.appendChild(text);
			list.appendChild(p);
			
		listGroup.appendChild(list);

		list = document.createElement("div");
			list.setAttribute('id', 'punctuation');
			
			p = document.createElement("p");
			p.setAttribute('id', 'correctas');
			text = document.createTextNode("Correctas " + correct);
			p.appendChild(text);
			list.appendChild(p);
			
			p = document.createElement("p");
			p.setAttribute('id', 'incorrectas');
			text = document.createTextNode("Incorrectas " + mistake);
			p.appendChild(text);
			list.appendChild(p);

		listGroup.appendChild(list);
	$("article").append(listGroup);
}

function evalAnswer (province, type) {

	if (randRegions[index]==province.name){
  		index++;
   	 	correct++;
   	 	if (robot){
   	 		alert("Sending to robot");
   	 	}
  	}	else {
  		mistake++;
  		if (robot){
   	 		alert("Sending to robot");
   	 	}
   		alert('Ooooh, ¡inténtalo otra vez! ', 'mistake');
  	}
  	$('article').find('#questions').remove();
  	$('article').find('#info').remove();
   	createDiv(randRegions, type);
}