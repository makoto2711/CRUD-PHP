<?php
if (isset($_POST))
{
        require "conn.php";
        $datos = trim(file_get_contents("php://input"),true);
        $parseado = json_decode($datos);

        $id = $parseado->id_edit;
        $title = $parseado->update_title;
        $body = $parseado->update_body;

        $text = null;

        try {
                $update = $conn->prepare("UPDATE posts SET title = ?, body = ? WHERE id = ?");
                $update->execute([ $title, $body, $id ]);
                $text = "actualizado";
        } 
        catch (PDOException $e) 
        {
                $text = $e->getMessage();       
        }
        finally
        {
                $conn = null;
                echo json_encode($text);
        }
}
