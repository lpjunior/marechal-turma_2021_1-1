<?php

    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers: *');
    header('Content-Type: application/json');
    header('Access-Control-Max-Age: 1000');
    header('Access-Control-Allow-Methods: POST, GET, PUT, PATCH, DELETE');

/**
 * $_SERVER['REQUEST_METHOD'] -> Qual o método/verbo HTTP que está sendo requisitado
 */

    if($_SERVER['REQUEST_METHOD'] === 'GET') {

        // executa a lógica..

        if(isset($_GET['id'])) {
            $pessoa = Array("nome" => "Luis");
            echo json_encode($pessoa, JSON_UNESCAPED_UNICODE); // retornando um json
        } else {
            http_response_code(500);
            echo "id não informado"; // retornando um json
        }
        die();
    } 
    if($_SERVER['REQUEST_METHOD'] === 'POST') {
        // recebendo o json
        $pessoa = json_decode(file_get_contents('php://input'), true);

        // executa a lógica..

        if(isset($pessoa['nome'])) {
            http_response_code(201);
        } else {
            http_response_code(500);
            echo "nome não informado"; // retornando um json
        }
        die();
    } 
    if($_SERVER['REQUEST_METHOD'] === 'PUT') {
        $pessoa = json_decode(file_get_contents('php://input'), true);
        
        // executa a lógica..
        
        if(isset($pessoa['nome'])) {
            http_response_code(204);
        } else {
            http_response_code(500);
            echo "nome não informado"; // retornando um json
        }
        die();
    } 
    if($_SERVER['REQUEST_METHOD'] === 'PATCH') {
        $pessoa = json_decode(file_get_contents('php://input'), true);
        
        // executa a lógica..
        
        if(isset($pessoa['nome'])) {
            http_response_code(204);
        } else {
            http_response_code(500);
            echo "nome não informado"; // retornando um json
        }
        die();
    } 
    if($_SERVER['REQUEST_METHOD'] === 'DELETE') {

        $pessoa = json_decode(file_get_contents('php://input'), true);
        
        // executa a lógica..
        
        if(!empty($_SERVER['QUERY_STRING'])) {
            http_response_code(204);
        } else {
            http_response_code(500);
            echo "id não informado";
        }
        die();
    }
    echo "Method not allowed";