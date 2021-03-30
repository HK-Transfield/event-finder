<?php
    /**
     * Harmon Transfield
     * 1317381
     * 
     * COMPX322, Assignment 1
     */
    
    try {
        $con = new PDO('mysql:host=mysql.cms.waikato.ac.nz; dbname=hkt10', 'hkt10', 'my11467377sql'); 
    } catch (PDOException $e) {
        echo "Database connection error ". $e->getMessage();
    }