<?php
session_start();
require_once '../database.php'; 


header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");  // * får användas endast för skolprojekt INTE annars för säkerhetens skull.

header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");



// Skapa SQL-fråga för att hämta ALLA rader från tabellen 'behandling'
$sql = "SELECT * FROM behandling";
// Kör SQL-frågan mot databasen och spara resultatet i $result
$result = $conn->query($sql);

// Skapa en tom array som vi ska fylla med behandlingarna
$behandlingar = [];

// Kolla om vi faktiskt fick några rader tillbaka från databasen
if ($result && $result->num_rows > 0) {
    // Så länge det finns fler rader kvar att läsa…
    while ($row = $result->fetch_assoc()) {
        // Lägg till raden i vår array med behandlingar
        $behandlingar[] = $row;
    }
}

// Skicka hela arrayen till frontend som JSON (så React kan läsa den)
echo json_encode($behandlingar);

// Stäng databaskopplingen
$conn->close();
?>


