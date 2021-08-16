<?php

require "conn.php";

//$rows = $conn->query("SELECT title FROM posts p");


/*  Mostrar datos con WHILE
while ($row = $rows->fetch()) 
{
    echo $row["title"] . "<br>";
}
*/



/*  Mostrar datos con  FOREACH
foreach( $rows as $row )
{
    echo $row["title"] . "<br>";
} */


$data = $conn->query("SELECT * FROM posts");

$all = $data->fetchAll(PDO::FETCH_ASSOC); // FETCH_OBJ

$conn = null;
echo json_encode($all);



