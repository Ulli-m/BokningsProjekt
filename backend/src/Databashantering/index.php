<?php
session_start();
require_once '../database.php'; // Justera sökvägen om det behövs

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");



if ($conn->connect_error) {
    die(" Anslutningen misslyckades: " . $conn->connect_error);
} else {
    echo " Ansluten till databasen!";
}
?>

