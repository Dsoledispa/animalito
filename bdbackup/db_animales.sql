-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 04-03-2022 a las 13:34:21
-- Versión del servidor: 10.4.21-MariaDB
-- Versión de PHP: 7.4.24

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `db_animales`
--
CREATE DATABASE IF NOT EXISTS `db_animales` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `db_animales`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_animales`
--

CREATE TABLE `tbl_animales` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `peso` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tbl_animales`
--

INSERT INTO `tbl_animales` (`id`, `nombre`, `peso`) VALUES
(1, 'perro', '15'),
(2, 'gato', '12'),
(4, 'lobo', '25'),
(7, 'Puercoespin', '19'),
(17, 'dfv', '19'),
(18, 'r34g', '45');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_chip`
--

CREATE TABLE `tbl_chip` (
  `id` int(11) NOT NULL,
  `id_animal` int(11) NOT NULL,
  `num_serie` int(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tbl_chip`
--

INSERT INTO `tbl_chip` (`id`, `id_animal`, `num_serie`) VALUES
(1, 1, 2452),
(2, 2, 5789),
(4, 4, 5869),
(7, 7, 4568),
(17, 17, 2341);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `tbl_animales`
--
ALTER TABLE `tbl_animales`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tbl_chip`
--
ALTER TABLE `tbl_chip`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_chip_animales` (`id_animal`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `tbl_animales`
--
ALTER TABLE `tbl_animales`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `tbl_chip`
--
ALTER TABLE `tbl_chip`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `tbl_chip`
--
ALTER TABLE `tbl_chip`
  ADD CONSTRAINT `fk_chip_animales` FOREIGN KEY (`id_animal`) REFERENCES `tbl_animales` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
