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