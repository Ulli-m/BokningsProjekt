<?php
session_start();
require_once '../database.php';

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");

//Här hämtas (GET) parametrar från URL:en (det som frontend skickar via API-anropet)
$frisor_id = $_GET['frisor_id'] ?? null;    // ?? null, om parametern inte finns - sätt värdet till null
$behandling_id = $_GET['behandling_id'] ?? null;
$start = $_GET['start'] ?? null;
$slut = $_GET['slut'] ?? null;

if (!$frisor_id || !$behandling_id || !$start || !$slut) {
    http_response_code(400);
    echo json_encode(["error" => "Ogiltiga eller saknade parametrar"]);
    exit; //Om någon saknas - skickas felmeddelande och stoppar koden
}

try {
    // Hämta varaktighet för vald behandling
    $stmt = $conn->prepare("SELECT varaktighet FROM behandling WHERE id = ?");
    $stmt->bind_param("i", $behandling_id);
    $stmt->execute();
    $result = $stmt->get_result(); //Hämtar resultatet från prepared statement
    $row = $result->fetch_assoc(); //Hämtar EN rad från resultatet som en associativ array

    if (!$row) throw new Exception("Behandling hittades inte."); //Om $row inte finns, kastas (throw) ett felmeddelande och PHP stoppar koden.
    $valdVaraktighet = (int)$row['varaktighet']; //(int)gör om värdet till ett heltal(integer) sparar det i variabeln $valdVaraktighet

    // Hämtar alla bokningar för en viss frisör, under ett visst datumintervall, och även hur lång tid behandlingen tar (varaktighet).
    $stmt = $conn->prepare("
        SELECT b.datum, b.tid, bh.varaktighet 
        FROM bokningar b
        JOIN behandling bh ON b.behandling_id = bh.id
        WHERE b.frisor_id = ? AND b.datum BETWEEN ? AND ? AND b.status = 'bokad'
    ");
    $stmt->bind_param("iss", $frisor_id, $start, $slut);
    $stmt->execute();//Skickar iväg frågan till databasen
    $result = $stmt->get_result();//Har svaret från databasen i $result

    // Skapa en lista över ALLA upptagna tidsintervall
    $upptagnaTider = []; // Ex: ['2025-04-18-15:30', '2025-04-18-16:00', ...]
    while ($row = $result->fetch_assoc()) {  //gå igenom alla bokade tider vi hämtat från databasen.
        $datum = $row['datum'];
        $startTid = new DateTime($datum . ' ' . $row['tid']);
        $varaktighet = (int)$row['varaktighet'];

        $slutTid = clone $startTid;
        $slutTid->modify("+$varaktighet minutes"); //räknar ut sluttiden (starttid + behandlingens längd)

        // Lägg till alla 30-minutersintervaller inom denna bokning som upptagna
        for ($tid = clone $startTid; $tid < $slutTid; $tid->modify('+30 minutes')) {
            $nyckel = $tid->format('Y-m-d-H:i');
            $upptagnaTider[$nyckel] = true;
        }
    }

    // Generera lediga tider och sätter start/slut-datum
    $ledigaTider = [];
    $startDate = new DateTime($start);
    $endDate = new DateTime($slut);

    for ($datum = clone $startDate; $datum <= $endDate; $datum->modify('+1 day')) { //Gå igenom en dag i taget.
        $dag = $datum->format("Y-m-d");
        $tider = [];

        for ($h = 9; $h <= 17; $h++) { // Gå igenom varje halvtimme från 09:00 till 17:30
            for ($m = 0; $m < 60; $m += 30) {
                $startTid = new DateTime($dag . sprintf(' %02d:%02d', $h, $m)); //' %02d:%02d' Formatmall – här skapas en text som ser ut så här - " 09:00".
                $slutTid = clone $startTid;
                $slutTid->modify("+$valdVaraktighet minutes"); //räknar ut sluttiden om kunden skulle boka just denna tid.

                // Kontrollera om sluttiden går över 18:00
                if ((int)$slutTid->format('H') > 18 || $slutTid->format('H:i') > '18:00') { //hoppar över tider där behandlingen skulle sluta efter kl 18:00.
                    continue;
                }

                // Kolla om någon del av denna tänkta tid redan upptagen?
                $konflikt = false;
                for ($tid = clone $startTid; $tid < $slutTid; $tid->modify('+30 minutes')) {
                    $nyckel = $tid->format('Y-m-d-H:i');
                    if (isset($upptagnaTider[$nyckel])) {
                        $konflikt = true;
                        break;
                    }
                }

                if (!$konflikt) { //Om tiden är ledig - sparas den i listan.
                    $tider[] = $startTid->format("H:i");
                }
            }
        }

        if (!empty($tider)) { //Sparar alla lediga tider för den dagen.
            $ledigaTider[] = [
                "date" => $dag,
                "times" => $tider
            ];
        }
    }

    echo json_encode($ledigaTider); //Skicka datan till frontend (Json)
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["error" => "Fel: " . $e->getMessage()]);
}
