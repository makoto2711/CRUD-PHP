<?php 

try 
{    
 $host = "docker_mysql_1";
 $dbname = "pdo";
 $user = "root";
 $password = "strong_password";

 $conn = new PDO("mysql:host=$host;dbname=$dbname","$user","$password");

 $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
} 
catch (PDOException $e)
{
    echo "Error is: " . $e->getMessage(); 
}

 