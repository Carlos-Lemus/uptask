<?php 

    $SERVER = "localhost";
    $USER = "root";
    $PASS = "";
    $NAME = "uptask";

    $conn = new mysqli($SERVER, $USER, $PASS, $NAME);

    if($conn->connect_error) {
        echo $conn->connect_error;
    }

    $conn->set_charset("utf8");

?>