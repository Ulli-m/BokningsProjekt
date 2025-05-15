-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Värd: mysql
-- Tid vid skapande: 15 maj 2025 kl 13:50
-- Serverversion: 8.0.42
-- PHP-version: 8.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Databas: `Booking`
--

-- --------------------------------------------------------

--
-- Tabellstruktur `behandling`
--

CREATE TABLE `behandling` (
  `id` int NOT NULL,
  `namn` varchar(255) NOT NULL,
  `varaktighet` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumpning av Data i tabell `behandling`
--

INSERT INTO `behandling` (`id`, `namn`, `varaktighet`) VALUES
(1, 'Klippning', 60),
(2, 'Fargning', 90),
(3, 'Slingning', 120);

-- --------------------------------------------------------

--
-- Tabellstruktur `bokningar`
--

CREATE TABLE `bokningar` (
  `id` int NOT NULL,
  `frisor_id` int DEFAULT NULL,
  `behandling_id` int DEFAULT NULL,
  `datum` date DEFAULT NULL,
  `tid` time DEFAULT NULL,
  `status` enum('ledig','bokad') DEFAULT 'ledig',
  `kund_fornamn` varchar(255) DEFAULT NULL,
  `kund_efternamn` varchar(255) DEFAULT NULL,
  `kund_email` varchar(255) DEFAULT NULL,
  `kund_mobilnummer` varchar(20) DEFAULT NULL,
  `kund_meddelande` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumpning av Data i tabell `bokningar`
--

INSERT INTO `bokningar` (`id`, `frisor_id`, `behandling_id`, `datum`, `tid`, `status`, `kund_fornamn`, `kund_efternamn`, `kund_email`, `kund_mobilnummer`, `kund_meddelande`) VALUES
(1, 2, 3, '2025-04-27', '09:00:00', 'bokad', 'Anna', 'Alm', 'a.hotmail@com', '0706231245', 'hej'),
(2, 2, 2, '2025-05-01', '12:00:00', 'bokad', 'Lis', 'Larsson', 'Lis@hotmail.com', '0706125648', 'Hello'),
(3, 2, 1, '2025-04-25', '09:00:00', 'bokad', 'nevs', 'nevsson', 'n.mentori@hotmail.com', '070856888', ''),
(4, 2, 3, '2025-05-04', '09:00:00', 'bokad', 'Ed', 'Edsson', 'e@hotmail.com', '0701568923', 'Hi'),
(5, 3, 3, '2025-04-14', '09:00:00', 'bokad', 'Sanna', 'Sunesson', 's@hotmail.com', '0701478521', 'Hej hej'),
(6, 2, 3, '2025-04-27', '16:00:00', 'bokad', 'Le', 'Le', 'L@hotmail.com', '0709062356', 'Hi'),
(7, 2, 3, '2025-04-27', '15:30:00', 'bokad', 'Ce', 'Ce', 'C@hotmail.com', '0704124578', 'Hello'),
(8, 2, 3, '2025-04-26', '16:00:00', 'bokad', 'Ed', 'Edsson', 'e@hotmail.com', '0706231245', 'hej'),
(9, 1, 1, '2025-04-27', '09:00:00', 'bokad', 'Anna', 'Alm', 'a.hotmail@com', '0701478521', 'hej'),
(10, 1, 1, '2025-04-27', '10:00:00', 'bokad', 'Sanna', 'Sunesson', 's@hotmail.com', '0706231245', ''),
(11, 1, 1, '2025-04-27', '11:00:00', 'bokad', 'v', 'v', 'v@hotmail.com', '0701568923', ''),
(12, 1, 1, '2025-04-26', '17:00:00', 'bokad', 'H', 'H', 'H@hotmail.com', '0707777777', ''),
(13, 1, 1, '2025-04-24', '17:00:00', 'bokad', 'Anna', 'Alm', 'a.hotmail@com', '0709062356', ''),
(14, 1, 1, '2025-04-24', '16:00:00', 'bokad', 'Lis', 'Alm', 'a.hotmail@com', '0706231245', ''),
(15, 1, 1, '2025-04-25', '17:00:00', 'bokad', 'Anna', 'Edsson', 'a.hotmail@com', '0706231245', ''),
(16, 1, 1, '2025-04-23', '17:00:00', 'bokad', 'Sanna', 'Sunesson', 'a.hotmail@com', '0706231245', ''),
(17, 1, 1, '2025-04-22', '17:00:00', 'bokad', 'Ed', 'Alm', 'a.hotmail@com', '0706231245', ''),
(18, 2, 3, '2025-04-28', '09:00:00', 'bokad', 'Lis', 'Sunesson', 'a.hotmail@com', '0706231245', ''),
(19, 1, 1, '2025-04-25', '16:00:00', 'bokad', 'jkhkhkh', 'kjilp', 'lkjlkj@hotmail.com', '0701568923', ''),
(20, 3, 2, '2025-04-27', '10:00:00', 'bokad', 'Sanna', 'Sunesson', 's@hotmail.com', '0704124578', ''),
(21, 3, 1, '2025-04-26', '17:00:00', 'bokad', 'Anna', 'Alm', 'a.hotmail@com', '0706231245', ''),
(22, 3, 3, '2025-04-27', '12:30:00', 'bokad', 'a', 'a', 'a.hotmail@com', '0701568923', ''),
(23, 2, 2, '2025-05-04', '16:30:00', 'bokad', 'Anna', 'Sunesson', 'a.hotmail@com', '0704124578', 'hej'),
(24, 1, 1, '2025-05-02', '15:00:00', 'bokad', 'E4', 'll', 'abc@xn--gg-fka.vom', '123123953', 'vf'),
(25, 1, 1, '2025-05-02', '16:00:00', 'bokad', 'Sanna', 'fsef', 'u.mentori@hotmail.com', '134235443', ''),
(26, 1, 2, '2025-05-03', '10:30:00', 'bokad', 'Ed', 'sfes', 'info@edmondhairshop.com', '3453453463', ''),
(27, 1, 1, '2025-05-03', '12:00:00', 'bokad', 'cissy', 'mentori', 'premium@live.se', '0707103294', 'hej '),
(28, 1, 3, '2025-05-08', '12:30:00', 'bokad', 'Leila', 'Mentori', 'L.mentori@hotmail.com', '0704124578', 'Hej allihopa :)'),
(29, 3, 1, '2025-05-11', '09:00:00', 'bokad', 'Anna', 'Alm', 'a.hotmail@com', '0706231245', 'hej'),
(30, 3, 3, '2025-05-09', '16:00:00', 'bokad', 's', 's', 'se@hotmail.com', '0703124578', 'Hej'),
(31, 3, 1, '2025-05-09', '15:00:00', 'bokad', 'Anna', 'Alm', 'a.hotmail@com', '0706231245', ''),
(32, 3, 1, '2025-05-09', '15:00:00', 'bokad', 'Anna', 'Alm', 'a.hotmail@com', '0706231245', ''),
(33, 3, 1, '2025-05-09', '15:00:00', 'bokad', 'Anna', 'Alm', 'a.hotmail@com', '0706231245', ''),
(34, 3, 1, '2025-05-09', '15:00:00', 'bokad', 'Anna', 'Alm', 'a.hotmail@com', '0706231245', ''),
(35, 3, 1, '2025-05-10', '17:00:00', 'bokad', 'nevs', 'nevsson', 'n.mentori@hotmail.com', '0706231245', ''),
(36, 3, 1, '2025-05-10', '16:00:00', 'bokad', 'Ed', 'Edsson', 'e@hotmail.com', '0701568923', ''),
(37, 3, 1, '2025-05-12', '09:00:00', 'bokad', 'Anna', 'Alm', 'a.hotmail@com', '0706231245', ''),
(38, 2, 1, '2025-05-12', '13:00:00', 'bokad', 'filip', 'rosqvist', 'f@hotmail.com', '0706125648', ''),
(39, 2, 3, '2025-05-12', '16:00:00', 'bokad', 'martin', 'haagen', 'H@hotmail.com', '0706231245', ''),
(40, 2, 1, '2025-05-16', '17:00:00', 'bokad', 'Anna', 'Alm', 'a.hotmail@com', '0701478521', '');

-- --------------------------------------------------------

--
-- Tabellstruktur `frisor`
--

CREATE TABLE `frisor` (
  `id` int NOT NULL,
  `namn` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumpning av Data i tabell `frisor`
--

INSERT INTO `frisor` (`id`, `namn`) VALUES
(1, 'Cissy'),
(2, 'Ulli'),
(3, 'Sanna');

--
-- Index för dumpade tabeller
--

--
-- Index för tabell `behandling`
--
ALTER TABLE `behandling`
  ADD PRIMARY KEY (`id`);

--
-- Index för tabell `bokningar`
--
ALTER TABLE `bokningar`
  ADD PRIMARY KEY (`id`),
  ADD KEY `frisor_id` (`frisor_id`),
  ADD KEY `behandling_id` (`behandling_id`);

--
-- Index för tabell `frisor`
--
ALTER TABLE `frisor`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT för dumpade tabeller
--

--
-- AUTO_INCREMENT för tabell `behandling`
--
ALTER TABLE `behandling`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT för tabell `bokningar`
--
ALTER TABLE `bokningar`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT för tabell `frisor`
--
ALTER TABLE `frisor`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restriktioner för dumpade tabeller
--

--
-- Restriktioner för tabell `bokningar`
--
ALTER TABLE `bokningar`
  ADD CONSTRAINT `bokningar_ibfk_1` FOREIGN KEY (`frisor_id`) REFERENCES `frisor` (`id`),
  ADD CONSTRAINT `bokningar_ibfk_2` FOREIGN KEY (`behandling_id`) REFERENCES `behandling` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
