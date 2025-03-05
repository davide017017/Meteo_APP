<?php
// weather-api.php

// Origini consentite
$allowedOrigins = ['http://localhost:3000'];

// Ottieni l'origine della richiesta
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

// Verifica se l'origine è consentita
if (in_array($origin, $allowedOrigins)) {
    header("Access-Control-Allow-Origin: " . $origin);
}

// Chiave API di OpenWeatherMap
$apiKey = getenv('OPENWEATHERMAP_API_KEY');

// Verifica se la chiave API è stata fornita
if (empty($apiKey)) {
    http_response_code(500); // Internal Server Error
    echo json_encode(['error' => 'Chiave API non configurata']);
    exit;
}

// Ottieni la città dalla query string
$city = $_GET['city'] ?? '';

// Verifica se la città è stata fornita
if (empty($city)) {
    http_response_code(400); // Bad Request
    echo json_encode(['error' => 'Città non fornita']);
    exit;
}

// Costruisci l'URL per la richiesta all'API OpenWeatherMap
$url = "http://api.openweathermap.org/data/2.5/weather?q=" . urlencode($city) . "&appid=" . $apiKey . "&units=metric";

// Inizializza curl
$ch = curl_init();

// Imposta le opzioni di curl
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

// Esegui la richiesta
$response = curl_exec($ch);

// Verifica se ci sono stati errori curl
if (curl_errno($ch)) {
    http_response_code(500); // Internal Server Error
    echo json_encode(['error' => 'Errore curl: ' . curl_error($ch)]);
} else {
    // Decodifica la risposta JSON
    $responseData = json_decode($response, true);

    // Verifica se la città è stata trovata
    if ($responseData && $responseData['cod'] == '404') {
        http_response_code(404); // Not Found
        echo json_encode(['error' => 'Città non trovata']);
    } else {
        // Imposta l'header per indicare che la risposta è JSON
        header('Content-Type: application/json');

        // Restituisci la risposta dell'API
        echo $response;
    }
}

// Chiudi la sessione curl
curl_close($ch);
?>