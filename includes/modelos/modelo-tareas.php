<?php 
$accion = $_POST["accion"];

if($accion === "crear") {
    
    // codigo para crear tareas

    $tarea = $_POST["tarea"];
    $id_proyecto = (int) $_POST["id_proyecto"];

    try {

        // insertamos la tarea a la base de datos

        require_once("../funciones/conexion.php");

        $sql = "INSERT INTO tareas(nombre, id_proyecto) VALUES(?, ?)";

        if($stmt = $conn->prepare($sql)) {

            $stmt->bind_param("si", $tarea, $id_proyecto);

            $stmt->execute();

            if($stmt->affected_rows > 0) {
                $respuesta = array(
                    "respuesta" => "correcto",
                    "id_insertado" => $stmt->insert_id,
                    "tipo" => $accion,
                    "tarea" => $tarea
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

if($accion === "actualizar") {

    // codigo para modificar el estado de una tarea
    $id = (int) $_POST["id"];
    $estado = (int) $_POST["estado"];

    try {

        // modificamos el estado en la base de datos

        require_once("../funciones/conexion.php");

        $sql = "UPDATE tareas SET estado = ? WHERE id = ?";

        if($stmt = $conn->prepare($sql)) {

            $stmt->bind_param("ii", $estado, $id);

            $stmt->execute();

            if($stmt->affected_rows > 0) {
                $respuesta = array(
                    "respuesta" => "correcto",
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

if($accion === "eliminar") {

    // codigo para modificar el estado de una tarea
    $id = (int) $_POST["id"];

    try {

        // modificamos el estado en la base de datos

        require_once("../funciones/conexion.php");

        $sql = "DELETE FROM tareas WHERE id = ?";

        if($stmt = $conn->prepare($sql)) {

            $stmt->bind_param("i", $id);

            $stmt->execute();

            if($stmt->affected_rows > 0) {
                $respuesta = array(
                    "respuesta" => "correcto",
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