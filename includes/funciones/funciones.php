<?php 

    function obtenerPaginaActual() {

        $archivo = basename($_SERVER['PHP_SELF']);
        $pagina = str_replace(".php", "", $archivo);

        return $pagina;
    }

    function obtenerProyectos() {

        try {

            require("conexion.php");

            $sql = "SELECT * FROM proyectos";

            return $conn->query($sql);

        } catch(Exception $ex) {
            echo $ex->getMessage();
            return false;
        }

    }

    function obtenerNombreProyecto($id = null) {

        try {

            require("conexion.php");

            $sql = "SELECT nombre FROM proyectos WHERE id = {$id}";

            return $conn->query($sql);

        } catch(Exception $ex) {
            echo $ex->getMessage();
            echo $conn->errno." ".$conn->error;
            return false;
        }

    }
    function obtenerTareas($id = null) {

        try {

            require("conexion.php");

            $sql = "SELECT id, nombre, estado FROM tareas WHERE id_proyecto = {$id}";

            return $conn->query($sql);

        } catch(Exception $ex) {
            echo $ex->getMessage();
            echo $conn->errno." ".$conn->error;
            return false;
        }

    }

    obtenerPaginaActual();
?>