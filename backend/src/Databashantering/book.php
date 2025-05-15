<?php
session_start();

// Koppla upp mot databasen
require_once '../database.php'; 

// SÄG TILL WEBBLÄSAREN ATT JAG SKICKAR JSON-DATA
header("Content-Type: application/json");
// TILLÅT CORS (så React/JavaScript kan skicka förfrågningar till mitt API)
header("Access-Control-Allow-Origin: *"); // Tillåt anrop från alla domäner
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");// Tillåt dessa metoder
header("Access-Control-Allow-Headers: Content-Type, Authorization");// Tillåt dessa headers


//Om webbläsaren skickar en OPTIONS-förfrågan (en koll om CORS är OK) — svara och avsluta 
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0); // Om det är en OPTIONS-request, svara och avsluta
}

// Läs in JSON-data som skickats från frontend
$data_raw = file_get_contents("php://input");// Läs in rådata
error_log("Mottagen data: " . $data_raw); // Logga den råa datan (bra för felsökning)
$data = json_decode($data_raw, true); // Gör om JSON till PHP-array


//Om det inte fanns någon data, skicka felmeddelande och avsluta 
if (!$data) {
    http_response_code(400);
    echo json_encode(["message" => "Ingen data mottagen"]);
    exit;
}

// Plocka ut datan från arrayen
$frisor_id = $data['frisor_id'];
$behandling_id = $data['behandling_id'];
$datum = $data['datum'];
$tid = $data['tid'];
$status = $data['status'];
$kund_fornamn = $data['kund_fornamn'];
$kund_efternamn = $data['kund_efternamn'];
$kund_email = $data['kund_email'];
$kund_mobilnummer = $data['kund_mobilnummer'];
$kund_meddelande = $data['kund_meddelande'] ?? null; // valfritt

// Förbered och kör SQL-insert (för att spara bokningen)
$sql = "INSERT INTO bokningar (
    frisor_id, behandling_id, datum, tid, status, 
    kund_fornamn, kund_efternamn, kund_email, kund_mobilnummer, kund_meddelande
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";


// Förbered och bind variablerna 
$stmt = $conn->prepare($sql);
$stmt->bind_param(
    "iissssssss", //2 st integer, sedan 8 st string
    $frisor_id,
    $behandling_id,
    $datum,
    $tid,
    $status,
    $kund_fornamn,
    $kund_efternamn,
    $kund_email,
    $kund_mobilnummer,
    $kund_meddelande
);

//  Kör SQL och svara frontend om det gick bra eller inte 
if ($stmt->execute()) {
    echo json_encode(["message" => "Bokning sparad"]);
} else {
    http_response_code(500);// Serverfel
    echo json_encode(["message" => "Fel vid sparning: " . $stmt->error]);
}

//  Stäng anslutningar 
$stmt->close();
$conn->close();



/*
$sql = "INSERT INTO bokningar (frisor_id, behandling_id, datum, tid) 
        VALUES ($frisor_id, $behandling_id, '$datum', '$tid')";

if ($conn->query($sql) === TRUE) {
    echo "Bokningen sparades!";
} else {
    echo "Fel: " . $conn->error;
}

annat sätt med $conn->query() istället för prepare + bind_param + execute()
*/