<?php
session_start();
require_once '../database.php'; 

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");




$sql = "SELECT * FROM bokningar";
$result = $conn->query($sql);

$bokningar = [];

if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $bokningar[] = $row;
    }
    echo json_encode($bokningar);
} else {
    echo json_encode([]);
}

$conn->close();
?>
