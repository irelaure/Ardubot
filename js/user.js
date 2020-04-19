var num_users, users = [];

$(document).on('submit','#formAddAlum',function(e) {
	e.preventDefault();
	$.post('../php/addAlumn.php', {
		addAlum: $('#formAddAlum select[name=addAlum]').val(), 
		num_users: num_users,
		users: users
		},
		function(e) { 
			document.location.href = document.location.href;
		}
	);
});

/*
** Event: user.php
** Descr: saca un alumno de la clase
*/
$(document).ready(function() {
	$('.delKid').on('click', function() { 
		var id = $(this).attr('id');
		$.post( '../php/delAlumn.php', {
			id: id }, 
			function(result) { document.location.href = document.location.href; }
			);
	});
});