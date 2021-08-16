<?php

if (isset($_POST)) 
{
    require "conn.php";

    $id = trim(file_get_contents("php://input"));
    $test = null;

    try {
        $delete = $conn->prepare("DELETE FROM posts WHERE id = ?");
        $delete->execute([ $id ]);
        $test = "good";
    } 
    catch (Exception $e) 
    { 
        $test = $e->getMessage();
    }
    finally
    {
        $conn = null;
        echo json_encode($test);
    }
}
