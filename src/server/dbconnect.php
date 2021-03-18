<?php
    try {
        $con = new PDO('mysql:host=localhost; dbname=zaradev', 'root', '');

    } catch(PDOException $e) {
        echo "Database connection error ". $e->getMessage();
    }