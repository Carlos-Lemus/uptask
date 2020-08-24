<?php 

    $accion = $_POST["tipo"];
    $usuario = $_POST["usuario"];
    $password = $_POST["password"];

    if($accion === "crear") {
        
        // codigo para crear administradores

        try {

            // hashear el password

            $opciones = array(
                "cost" => 12
            );

            $hash_password = password_hash($password, PASSWORD_BCRYPT, $opciones);

            // insertamos el usuario a la base de datos

            require_once("../funciones/conexion.php");

            $sql = "INSERT INTO usuarios(usuario, password) VALUES(?, ?)";

            if($stmt = $conn->prepare($sql)) {

                $stmt->bind_param("ss", $usuario, $hash_password);

                $stmt->execute();

                if($stmt->affected_rows > 0) {
                    $respuesta = array(
                        "respuesta" => "correcto",
                        "id_insertado" => $stmt->insert_id,
                        "tipo" => $accion
                    );
                }

                $stmt->close();

                $conn->close();

            } else {
                $respuesta = array(
                    "respuesta" => $conn->errno." ".$conn->error
                );
            }

        } catch(Exception $ex) {
            $respuesta = array(
                "respuesta" => $ex.getMessage()
            );
        }

        echo json_encode($respuesta);

    }
    else if($accion === "login") {

        // codigo para logear un administrador

        try {
            // insertamos el usuario a la base de datos

            require_once("../funciones/conexion.php");

            $sql = "SELECT * FROM usuarios WHERE usuario = ?";

            if($stmt = $conn->prepare($sql)) {

                $stmt->bind_param("s", $usuario);

                $stmt->execute();

                $stmt->bind_result($id_usuario, $nombre_usuario, $password_usuario);

                $stmt->fetch();

                if($nombre_usuario) {

                    // el usuario existe verificamos el password

                    if(password_verify($password, $password_usuario)) {
                        // iniciamos sesion
                        session_start();
                        $_SESSION["nombre"] = $usuario;
                        $_SESSION["id"] = $id_usuario;
                        $_SESSION["login"] = true;

                        $respuesta = array(
                            "respuesta" => "correcto",
                            "nombre" => $nombre_usuario,
                            "tipo" => $accion
                        );
                    } else {
                        $respuesta = array(
                            "respuesta" => "Password incorrecto"
                        );
                    }
                    
                } else {
                    $respuesta = array(
                        "error" => "El usuario no existe"
                    );
                }

                $stmt->close();

                $conn->close();

            } else {
                $respuesta = array(
                    "respuesta" => $conn->errno." ".$conn->error
                );
            }

        } catch(Exception $ex) {
            $respuesta = array(
                "respuesta" => $ex.getMessage()
            );
        }

        echo json_encode($respuesta);

    }

?>