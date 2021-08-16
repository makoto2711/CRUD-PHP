<?php

if ( isset($_POST) ) 
{
        require "conn.php";

        $title = $_POST["title"];
        $body = $_POST["body"];

        $test = null;
        
       if (empty($title) || empty($body))  echo json_encode("empty");
       else
       {
                try {
                        $conn->beginTransaction();
                        $insert = $conn->prepare("INSERT INTO posts (title, body) VALUES (?, ?)");
                        $insert->execute([ $title,  $body ]);
                        $conn->commit();
                        $test = "good"; 
                }
                catch (Exception $e) {
                        $conn->rollback();
                        $test = $e->getMessage();
                }
                finally {
                        // CIERE DE LA CONEXION
                        $conn = null;
                        echo json_encode($test);
                }
       }
}

 
/* El TRANSACTION es para cancelar el proceso en caso de errores
  Me da las funciones beginTransaction(), commit() y el rollback() */
 