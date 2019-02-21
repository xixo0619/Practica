$(function () {
  'use strict'

  $('[data-toggle="offcanvas"]').on('click', function () {
    $('.offcanvas-collapse').toggleClass('open')
  })
})


function modalUsuario() {
  $("#modalUsuario").modal("show");
  
}

function modalCuenta() {
  $("#modalCuenta").modal("show");
}

function modalImagen() {
  $("#modalImagen").modal("show");
}

function modalSecundario(){
  $("#modalSecundario").modal("show");
}


function cerrarSesion() {
	$.ajax({
		url:"/logout",
		method: "POST",
		dataType: "json",
		success: function (response) {
			if(response.isSession)
				console.log('sesion cerrada');
			window.location.href ="index.html";
		}
	}); 
}