-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 12-09-2020 a las 16:35:21
-- Versión del servidor: 10.4.13-MariaDB
-- Versión de PHP: 7.4.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `uptask`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proyectos`
--

CREATE TABLE `proyectos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `proyectos`
--

INSERT INTO `proyectos` (`id`, `nombre`) VALUES
(1, 'Aplicacion web'),
(2, 'Aplicacion web'),
(3, 'UX/UI'),
(4, 'Xamarin'),
(5, 'PWA'),
(6, 'Ionic'),
(7, 'Angular'),
(8, 'Reat'),
(9, 'Xamarin'),
(10, 'Vue'),
(11, 'Sbeld'),
(12, 'Design'),
(13, 'Ionic'),
(14, 'Figma'),
(15, 'Adobe XD'),
(16, 'Adobe Design');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tareas`
--

CREATE TABLE `tareas` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `estado` int(1) NOT NULL DEFAULT 0,
  `id_proyecto` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tareas`
--

INSERT INTO `tareas` (`id`, `nombre`, `estado`, `id_proyecto`) VALUES
(1, 'Aprender', 1, 3),
(3, 'Probar', 0, 3),
(12, 'tarea', 0, 4),
(13, 'Aprender el framework', 0, 11),
(16, 'tarea nueva', 0, 14),
(17, 'tarea extra', 0, 14),
(20, 'tarea 3', 0, 7),
(23, 'Divir los trabajos', 0, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `usuario` varchar(50) NOT NULL,
  `password` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `usuario`, `password`) VALUES
(1, 'Pedro', '$2y$12$4SCExvNbDpjC09YCKDs9TO3QTt1tDBCgRR4UZwNoLcu3RNu6sGSNq'),
(2, 'Juan', '$2y$12$3/7ljG28NUpxSf8lGuh6lODH1JHI84rhs/gqIntx7gP298LQ5XsCe'),
(3, 'Luis', '$2y$12$RV2h.A25q9KkyHGn0nnDBu8hpaXvcguFN3p/3ixVZsKFUluMNwcIK'),
(4, 'Luis', '$2y$12$alym0iPhFKdKD7zgAv4zmeHvy6/JQCgHMKx/Xu3r5YFPdc5mtZnMq'),
(5, 'Luis', '$2y$12$2.tYTPYZVKgdA62c97B2xukWKdb40AuUMiSQYekNozkwVkMek9pPy'),
(6, 'Miguel', '$2y$12$MNnN6bdjFfS2ygsFIpLDcura02JJlaJic3aL458Uy.ElCPt3Wcil.'),
(7, 'Jason', '$2y$12$gnb/GSvUiS8Wf1GMQmHwPORG0Ov.rXGAVvHIVeI8reWx1xA288kdq'),
(8, 'Jason', '$2y$12$VxQ8Mu3DGVeCnLTftyo7MOLkO.6C5dfYtGE7ukyeyEdahSDV37sJ2'),
(9, 'Jason', '$2y$12$5fZdqn9pSS.95HlgLzFi7edIhoR27hAA5tHugQZXS03w3U13t6lfm'),
(10, 'Alex', '$2y$12$on/KTb9e.lT5U4H8Nys7eetnWxcu4V6KmwOc6022E99Njh1zpIRZy'),
(11, 'Lox', '$2y$12$yhu5OmuslxxTCtuL8nE9KeoRpPp682PmPvMaHrLdHsZDf3J7ATwv2'),
(12, 'Jet', '$2y$12$KTA7zVk8e1Ia5X/kUUbDhO9kg7SJBSOFcqai1Pybzi/WH/y6Zw5ai'),
(13, 'Juan', '$2y$12$6eVAMXHRB4CP73cJpx6jpe1hs.aEe3FGtCndxVj8Qrv5lB8xxsNae'),
(14, 'Jox', '$2y$12$59DE8fQTVrZzSVJQdHQKXuWmJ/BvdBhaBg3/6CRjcJLo6dj5PiYRe');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `proyectos`
--
ALTER TABLE `proyectos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tareas`
--
ALTER TABLE `tareas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_proyecto` (`id_proyecto`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `proyectos`
--
ALTER TABLE `proyectos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `tareas`
--
ALTER TABLE `tareas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `tareas`
--
ALTER TABLE `tareas`
  ADD CONSTRAINT `tareas_ibfk_1` FOREIGN KEY (`id_proyecto`) REFERENCES `proyectos` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
