-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 01-03-2024 a las 08:33:41
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `excel_react`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `asistencias`
--

CREATE TABLE `asistencias` (
  `id` int(11) NOT NULL,
  `apellido` varchar(255) DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `asistencias`
--

INSERT INTO `asistencias` (`id`, `apellido`, `nombre`) VALUES
(1, 'Castañeda Rios', 'Bernardo'),
(2, 'Castro Iturbide', 'Luis Antonio'),
(3, 'Compean Macias', 'Gerardo Daniel'),
(4, 'Contreras Vasquez', 'Juan Pablo'),
(5, 'Davila Barrios', 'David'),
(6, 'Elizalde Barboza', 'Diego Efren'),
(7, 'Frias Aguilar', 'Jared Emiliano'),
(8, 'Galarza Carreño', 'Hector Fernando'),
(9, 'Gonzalez Urrutia', 'Angel Uriel'),
(10, 'Herrera Ruiz', 'Adalid'),
(11, 'Martinez Monarrez', 'Alondra'),
(12, 'Meraz Solis', 'Erick Yahir'),
(13, 'Moran Vasquez', 'Miguel Angel'),
(14, 'Roman Hernandez', 'Hernandez Martha Andrea'),
(15, 'Santillan Ledesma', 'Maria Fernanda');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `asistencias`
--
ALTER TABLE `asistencias`
  ADD PRIMARY KEY (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
