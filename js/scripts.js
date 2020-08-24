eventListener();

var listaProyectos = document.querySelector("ul#proyectos");

function eventListener() {

    document.addEventListener("DOMContentLoaded", actualizarBarraProgreso);

    let crearProyecto = document.querySelector(".crear-proyecto a");
    let crearTarea = document.querySelector(".nueva-tarea");
    let listadoPendientes = document.querySelector(".listado-pendientes");

    crearProyecto.addEventListener("click", nuevoProyecto);
    if(crearTarea) {
        crearTarea.addEventListener("click", nuevaTarea);
        listadoPendientes.addEventListener("click", accionesTarea);
    } 
}

function nuevoProyecto(e) {
    e.preventDefault();
    
    // crea un input para el nombre del nuevo proyecto
    let proyectoNuevo = document.createElement("li");
    proyectoNuevo.innerHTML = "<input type='text' id='nuevo-proyecto'>";
    listaProyectos.appendChild(proyectoNuevo);

    var inputNuevoProyecto = document.querySelector("#nuevo-proyecto");

    inputNuevoProyecto.addEventListener("keypress", e => {
        let tecla = e.which || e.KeyCode;

        if(tecla == 13) {
            guardarProyectoDB(inputNuevoProyecto.value);
            listaProyectos.removeChild(proyectoNuevo);
        }
    });

}

function guardarProyectoDB(nombreProyecto) {

    // llamado a ajax

    // creamos el objeto
    let xhr = new XMLHttpRequest();

    // enviar datos por FormData
    let datos = new FormData();
    datos.append("proyecto", nombreProyecto);
    datos.append("accion", "crear");


    // abrimos la conexion
    xhr.open("POST", "includes/modelos/modelo-proyecto.php", true);

    xhr.onload = function() {

        if(xhr.status === 200) {

            let resultado = JSON.parse(xhr.responseText);

            let proyecto = resultado.nombre_proyecto;
            let id_proyecto = resultado.id_insertado;
            let tipo = resultado.tipo;
            let respuesta = resultado.respuesta;

            if(respuesta === "correcto") {
                if(tipo === "crear") {

                    let proyectoNuevo = document.createElement("li");
                    proyectoNuevo.innerHTML = `<a href="index.php?id_proyecto=${id_proyecto}" id="proyecto:${id_proyecto}">
                    ${proyecto}
                    </a>`;
                    listaProyectos.appendChild(proyectoNuevo);

                    swal({
                        type: 'success',
                        title: 'Exito',
                        text: 'Se creo el nuevo proyecto',
                      })

                    .then(respuesta => {
                      if(respuesta.value){
                          window.location.href = `index.php?id_proyecto=${id_proyecto}`;
                      }
                    })

                } else {
                    swal({
                        type: 'success',
                        title: 'Exito',
                        text: 'Se elimino el proyecto',
                      })
                }
            } else {
                swal({
                    type: 'error',
                    title: 'Error',
                    text: 'Ha ocurrido un error',
                  })
            }

        }

    }

    xhr.send(datos);

}

function nuevaTarea(e) {

    e.preventDefault();

    let nombreTarea = document.querySelector(".nombre-tarea").value;

    if(nombreTarea === "") {
        swal({
            type: 'error',
            title: 'Error',
            text: 'La tarea no tiene que estar vacia',
          })
    } else {

        // Creando el llamado a ajax

        // creamos el objeto
        let xhr = new XMLHttpRequest();

        let idProyecto = document.querySelector("#id_proyecto").value;
        
        // enpaquetamos los datos
        let datos = new FormData();
        datos.append("tarea", nombreTarea);
        datos.append("accion", "crear");
        datos.append("id_proyecto", idProyecto);

        // abrimos la conexion
        xhr.open("POST", "includes/modelos/modelo-tareas.php", true);

        // leemos la informacion
        xhr.onload = function() {
            if(xhr.status === 200) {
                let respuesta = JSON.parse(xhr.responseText);     
                
                let resultado = respuesta.respuesta;
                let tipo = respuesta.tipo;
                let tarea = respuesta.tarea;
                let  id_insertado = respuesta.id_insertado;

                if(resultado === "correcto") {

                    if(tipo === "crear") {

                        swal({
                            type: 'success',
                            title: 'Exito',
                            text: 'Se creo la tarea de forma exitosa'
                          });

                          let parrafoTarreaVacio = document.querySelectorAll(".tareas-vacio");
                          if(parrafoTarreaVacio.length > 0) {
                            document.querySelector(".tareas-vacio").remove();
                          }

                        // crear el template
                        let nuevaTarea = document.createElement("li");
                        nuevaTarea.id = "tarea:"+id_insertado;
                        nuevaTarea.classList.add("tarea");

                        nuevaTarea.innerHTML = `
                          <p>${tarea}</p>
                          <div class="acciones">
                            <i class="fas fa-check-circle"></i>
                            <i class="fas fa-trash"></i>
                          </div>
                        `;

                        //  agregamos al html

                        let listado = document.querySelector(".listado-pendientes ul");
                        listado.appendChild(nuevaTarea);

                        document.querySelector(".agregar-tarea").reset();

                    } else {
                        swal({
                            type: 'Tarea',
                            title: 'Exito',
                            text: 'Se elimino la tarea',
                          })
                    }

                } else {

                }
            } else {
                swal({
                    type: 'error',
                    title: 'Error',
                    text: 'Ha ocurrido un error',
                  })
            }

            actualizarBarraProgreso();

        }

        // enviamos los datos
        xhr.send(datos);

    }

}

// cambia el estado de la tarea o la elimina 
function accionesTarea(e) {
    e.preventDefault();

    if(e.target.classList.contains("fa-check-circle")) {
        
        if(e.target.classList.contains("completo")) {
            e.target.classList.remove("completo");
            cambiarEstadoTarea(e.target, 0);
        } else {
            e.target.classList.add("completo");
            cambiarEstadoTarea(e.target, 1);
        }

        actualizarBarraProgreso();

    } 
    else if(e.target.classList.contains("fa-trash")) {
        swal({
            title: 'Advertencia',
            text: "¿Estas seguro que quieres eliminar la tarea?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar',
          }).then((result) => {
            if (result.value) {

                let tarea = e.target.parentElement.parentElement;

                // eliminados de la BD
                eliminarTareaBD(tarea);

                // eliminamos del HTML
                tarea.remove();

                actualizarBarraProgreso();

              swal(
                'Exito',
                'La tarea se ha eliminado de forma exitosa',
                'success'
              )
            }
          })


        // let parrafoTarreaVacio = document.querySelector(".tareas-vacio");
        // parrafoTarreaVacio.remove();
    }

}

// completo o descomplenta una tarea
function cambiarEstadoTarea(tarea, estado) {

    id = tarea.parentElement.parentElement.id.split(":");
    idTarea = id[1];

    // llamado a ajax

    // enpaquetamos los datos
    let datos = new FormData();
    datos.append("id", idTarea);
    datos.append("estado", estado);
    datos.append("accion", "actualizar");

    // creamos el objeto
    let xhr = new XMLHttpRequest();

    // abrimos la conexion
    xhr.open("POST", "includes/modelos/modelo-tareas.php", true);

    // leemos el resultado
    xhr.onload = function() {
        if(xhr.status === 200) {
            let respuesta = JSON.parse(xhr.responseText);
            console.log(respuesta);
        }
    }
    
    // enviamos los datos
    xhr.send(datos);

}

function eliminarTareaBD(tarea) {
    id = tarea.id.split(":");
    idTarea = id[1];

    // llamado a ajax

    // enpaquetamos los datos
    let datos = new FormData();
    datos.append("id", idTarea);
    datos.append("accion", "eliminar");

    // creamos el objeto
    let xhr = new XMLHttpRequest();

    // abrimos la conexion
    xhr.open("POST", "includes/modelos/modelo-tareas.php", true);

    // leemos el resultado
    xhr.onload = function() {
        if(xhr.status === 200) {
            let respuesta = JSON.parse(xhr.responseText);
            console.log(respuesta);

            // comprobar que no hay tareas restantes
            let listadoTareaRestantes = document.querySelectorAll('.tarea');

            if(listadoTareaRestantes.length === 0) {
                document.querySelector(".listado-pendientes ul").innerHTML = "<p class='tareas-vacio'>No hay ninguna tarea en este proyecto</p>";
            }

        }
    }
    
    // enviamos los datos
    xhr.send(datos);
}

function actualizarBarraProgreso() {
    const tareas = document.querySelectorAll("li.tarea");
    const tareasCompletadas = document.querySelectorAll(".completo");

    const avance = Math.round((tareasCompletadas.length / tareas.length) * 100);

    let barraProgreso = document.querySelector(".porcentaje");
    barraProgreso.style.width = avance + "%";

}