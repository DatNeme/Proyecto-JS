$(() => {
  ///////////////////CONSTRUCTOR INICIAL DEL OBJETO///////////////////////
  class Auto {
    constructor(marca, modelo, year, color) {
      this.marca = marca;
      this.modelo = modelo;
      this.year = year;
      this.color = color;
    }
  }
  


  ///////////////////CONSTRUCTOR DE LA LISTA DE OBJETOS///////////////////
  class Pantalla {
    nuevoItem(nuevoAuto) {
      const listaPartes = document.getElementById("lista");

      const elemento = document.createElement("div");
      elemento.innerHTML = `
   <div class="card text-center mb-4">
      <div class="card-body">
          <strong>Marca</strong>: ${nuevoAuto.marca}
          <strong>Modelo</strong>: ${nuevoAuto.modelo}
          <strong>Año</strong>: ${nuevoAuto.year}
          <strong>Color</strong>: ${nuevoAuto.color}
        <a href="#" class="btn btn-danger" name="borrar">Quitar</a>
      </div>
   </div>
   `;
      listaPartes.appendChild(elemento);
    }

    limpiarForm() {
      document.getElementById("formulario").reset();
    }

    eliminarItem(eliminar) {
      if (eliminar.name === "borrar") {
        eliminar.parentElement.parentElement.remove();
        Swal.fire({
          text: "Elemento eliminado",
          icon: "info",
          backdrop: "true",
          timer: 2500,
          timerProgressBar: "true",
          position: "top",
          width: "40%",
        });
      }
    }
  }



  ///////////////////RECOLECCIÓN Y COMPROBACIÓN DE DATOS//////////////////
  document
    .getElementById("formulario")
    .addEventListener("submit", function (e) {
      const marca = document.getElementById("marca").value;
      const modelo = document.getElementById("modelo").value;
      const year = document.getElementById("year").value;
      const color = document.getElementById("color").value;

      if (marca == "" || modelo == "" || year == "" || color == "") {
        return Swal.fire({
          title: "Error",
          text: "Revise que los valores ingresados sean correctos",
          icon: "error",
          backdrop: "true",
          timer: 2500,
          timerProgressBar: "true",
          position: "top",
          width: "40%",
        });
      }

      nuevoAuto = new Auto(marca, modelo, year, color);
      

      const nuevosDatos = new Pantalla();
      nuevosDatos.nuevoItem(nuevoAuto);
      nuevosDatos.limpiarForm();
      agregar();      

      e.preventDefault();
    });
  
  

  ///////////////////ARRAY DE AUTOS AGREGADOS/////////////////////////////
  var arrayAutos = [];
  function agregar(){
    arrayAutos.push(nuevoAuto);
    console.log(arrayAutos);
  };
  


  ///////////////////CAPTURA DEL EVENTO PARA ELIMINAR OBJETOS/////////////
  document.getElementById("lista").addEventListener("click", function (e) {
    const eliminar = new Pantalla();
    eliminar.eliminarItem(e.target);
  });
  


  ///////////////////JQUERY, AJAX, API Y JSON/////////////////////////////
  $("h1").css("color", "#ffffff");
  $("input.btn").css({ "background-color": "#73C3D9", color: "black" });
  $("#boton").click(() => {
    Swal.fire({
      text: "Elemento agregado al stock",
      icon: "success",
      backdrop: "true",
      timer: 2500,
      timerProgressBar: "true",
      position: "top",
      width: "40%",
    });
  });

  $("#elemAnim").append(
    `<button id="btnAnim" class="btn btn-outline-dark">Mostrar/Ocultar</button>`
  );
  $("#btnAnim").click(() => {
    $("#lista").slideToggle();
    Swal.fire({
      text: "Se cambió el estado de la lista",
      icon: "info",
      timer: 1250,
      timerProgressBar: "true",
      position: "top-end",
      toast: "true",
    });
  });

  $("#personas").hide();
  $("#import").click(function () {
    $.ajax({
      type: "GET",
      url: "https://randomuser.me/api/?nat=es",
      dataType: "json",
    }).done((data) => {
      let personas = data.results;
      $.each(personas, function (indice, persona) {
        let fila = $("<tr>");
        fila.append($(`<td> ${persona.name.first} </td>`));
        fila.append($(`<td> ${persona.name.last} </td>`));
        fila.append($(`<td> ${persona.location.state} </td>`));
        $("#personas tbody").append(fila);
      });
      $('#personas').show();
    });
  });
});
