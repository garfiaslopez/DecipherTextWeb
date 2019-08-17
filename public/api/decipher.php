<?php
    header("Access-Control-Allow-Origin: *");
    
    $originalText = isset($_GET['text']) ? $_GET['text'] : '';

    http_response_code(200);
    echo json_encode(
        array(
            "success" => true,
            "message" => "ESTE ES EL RESULTADO DEL MENSAJE",
            "originalText" => $originalText
        )
    );

?>