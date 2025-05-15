<?php
session_start();
require_once '../database.php'; 

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");

header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");



// SQL-fråga för att hämta alla frisörer
$sql = "SELECT id, namn FROM frisor";
$result = $conn->query($sql);

// Kolla om vi fick några rader
if ($result->num_rows > 0) {
    $frisorer = [];

    while ($row = $result->fetch_assoc()) {
        $frisorer[] = $row;
    }

    echo json_encode($frisorer);
} else {
    echo json_encode([]);
}

$conn->close();
?>

