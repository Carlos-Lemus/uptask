eventListener();

function eventListener() {
    formulario = document.querySelector("#formulario");

    formulario.addEventListener("submit", validarRegistro);
}

function validarRegistro(e) {
    e.preventDefault();

    let usuario = document.querySelector("#usuario").value;
    let password = document.querySelector("#password").value;
    let tipo = document.querySelector("#tipo").value;

    if(usuario === '' || password === '') {
        swal({
            type: 'error',
            title: 'Error',
            text: 'Todos los campos son obligatorios',
          })
    }

    else {
        // datos que se envia al servidor
        let datos = new FormData();

        datos.append("usuario", usuario);
        datos.append("password", password);
        datos.append("tipo", tipo);

        // creo el objeto
        let xhr = new XMLHttpRequest();

        // abro la conexion
        xhr.open("POST", "includes/modelos/modelo-admin.php", true);

        // esperamos la respuesta
        xhr.onload = function() {

            if(xhr.status === 200) {
                let resultado = JSON.parse(xhr.responseText);
                
                if(resultado.respuesta === "correcto") {

                    // si es un nuevo usuario
                    if(resultado.tipo === "crear") {
                        swal({
                          type: 'success',
                          title: 'Exito',
                          text: 'Se creo el nuevo usuario',
                        })
                    } 
                    else if(resultado.tipo === "login") {
                        swal({
                            type: 'success',
                            title: 'Login correcto',
                            text: 'Presiona ok para ir al dashboard',
                          })

                        .then(resultado => {
                            if(resultado.value){
                                window.location.href = "index.php";
                            }
                        })

                    }

                }
                else {
                    swal({
                        type: 'error',
                        title: 'Error',
                        text: 'Ocurrio un error',
                      })
                }
            }

        }

        // enviamos los datos
        xhr.send(datos);
    }

}