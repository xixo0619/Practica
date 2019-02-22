function modalRegistro() {
  $("#modalRegistro").modal("show");
}
 

$('#boton-guardar').click(function () {
  data = `nombre=${$('#txt-nombre').val()}&apellido=${$('#txt-apellido').val()}&usuario=${$('#txt-usuario').val()}&correo=${$('#txt-correo').val()}&contrasena=${$('#txt-contrasena').val()}`
  // alert(data);
$.ajax({
  url: "/crear-usuario",
      data: data,
      method:"POST",
  dataType: "json",
  success: function (response) {
          console.log(response);
          alert('Usuario insertado sastifactoriamente');
  }
 });
});

$('#boton-login').click(function() {
  data = `usuario=${$('#txt-usuario').val()}&contrasena=${$('#txt-contrasena').val()}`;
	$.ajax({
        url:"/login",
        data: data,
        method:"POST",
        dataType:"json",
        success:function(response){
			console.log(response);
            if (response.estatus == 0 ){
                // alert("Credenciales correctas");    
                window.location.href ="home.html";
			}
            else
                alert("Credenciales incorrectas");
            console.log(response);
        }
  
    });
});

