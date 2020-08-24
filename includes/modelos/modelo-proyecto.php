<?php  

    $proyecto = $_POST["proyecto"];
    $accion = $_POST["accion"];

    if($accion === "crear") {
        
        // codigo para crear administradores

        try {

            // insertamos el usuario a la base de datos

            require_once("../funciones/conexion.php");

            $sql = "INSERT INTO proyectos (nombre) VALUES (?)";

            if($stmt = $conn->prepare($sql)) {

                $stmt->bind_param("s", $proyecto);

                $stmt->execute();

                if($stmt->affected_rows > 0) {
                    $respuesta = array(
                        "respuesta" => "correcto",
                        "id_insertado" => $stmt->insert_id,
                        "tipo" => $accion,
                        "nombre_proyecto" => $proyecto
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