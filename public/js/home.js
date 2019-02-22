function modalGuardar(){
    $("#archivoHtml").modal("show");
}

function modalCss() {
    $("#archivoCss").modal("show");
    
}

function modalJava() {
    $("#archivoJs").modal("show");
} 

$("#boton-archivo").click(function() {
   data = `nombre=${$('#txt-archivo').val()}`;
   $.ajax({
       url: "/agregar-archivo",
       data: data,
       datatype: "JSON",
       method: "POST",
       sucess: function (res) {
           console.log(res);
       }
   });   
});