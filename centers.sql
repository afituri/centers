-- phpMyAdmin SQL Dump
-- version 4.0.10deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Oct 24, 2014 at 11:20 PM
-- Server version: 5.5.40-0ubuntu0.14.04.1
-- PHP Version: 5.5.9-1ubuntu4.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `centers`
--

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `iduser` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(300) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(500) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'inactive',
  `level` tinyint(4) NOT NULL COMMENT '0:root,1:admin,2:manager',
  `phone` varchar(250) COLLATE utf8_unicode_ci DEFAULT NULL,
  `creation_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modify_date` datetime DEFAULT NULL,
  `salt` varchar(500) COLLATE utf8_unicode_ci DEFAULT 'inactive',
  `status` tinyint(4) NOT NULL DEFAULT '1' COMMENT '1:active,0:deleted',
  PRIMARY KEY (`iduser`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=16 ;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`iduser`, `name`, `email`, `password`, `level`, `phone`, `creation_date`, `modify_date`, `salt`, `status`) VALUES
(10, 'Ahmed Fituri', 'ahmed.elfituri@gmail.com', 'ChMuLQv7EeVRKs0qCqWDEsxNVGtGcQjXDTvvuZLrmTiM2iaOaNHgSAEZoD+CifASE9uj+zY2BTiSv7/3x4LkXKFoRXrwGxKEfjjgS5r9izExpepumlIsQmgR6vKX7wRN6oq7TKNPq9M96o1gYVPhbAESZB4jpYt75Vf+2zMZzEwod2QArgtEbJQ8mBtKBPIC4n701xxTnuKWoYKKoC4uPTK8/kq5GWoU/lL3pfT17zWIrMnanZga0vNPqNNz788ep6u4jsKbcwOz611HpgUy2xHJuYZFfvCkLaR2wVlX3FQ80mlf2famh+S7GdPOX0M0lf90V9IDGNRjqbZ9Q4JzBw==', 0, '0925032654', '2014-10-24 14:26:57', NULL, '200.SoXJGAwSIZQZIBlRQ414l0TH+QaR9Of4SYyH/2KZ+4k=', 1),
(11, 'Ahmed Fituri', 'ahmed.elfituri@gmail.com', '1/JhUR5bY4+ry97yXGbPY9uO3m0PBo6zbUOZmr7diXYsJxDW6BUekW+jSC4SL3VMECFOffbesTtMsxV3m5w4sWVrnkgMftGl7J2SWTGaBj0U9hD1cFKB8lARaU3q78TYzSRpDAuo3seijv0uWDhipU0pNJiGBe8CNWWMcFMe5sw8c5vpZfsgVBnHbRhkjQXLFaH3IkOZwycgtLNXL7k3wgkDeb87XZaAqn0WHt9GcPrHHuy4aVVb4n/58RjXnJPNtsjo3yn+vljiOhgIH7esLO+4289veOW56VghH66uVVmDzIr5G1Zod0Fmkl3TQrwjRaVL7zEDEne/c5ZB4mevbg==', 0, '0925023322', '2014-10-24 16:24:05', NULL, '200.bGV8POVndJAqkMX8JMDAu8bV6OkEQYqNgIuQF4hFSG4=', 1),
(12, 'Ahmed Fituri', 'ahmed.elfituri@gmail.com', 'h28oyzksxS3VZZrhX2ikM8vc47g9ZwzLU7V9PCZOU6Bswlz+GEjuoEIQYfdNDT0ofTo5mfd8VzHcjWF94+VXb98qJLSIqIYJxN+9taX56uQnzaC31viCU5h3zutqtESJAnjDMwZGRHvBB+aZRBxyiV/Ns+XkX7EHXxlkPYismQDhDV7RTXXK3MtM9yiEKaph20HcVcyrCaVy5kcLuBC+gsc4gZNjLoARQ+EUkS1n+nzo7icLEdAlMjnSNMaJ1IOA6mz5Y2CkZRkrmXaPaT1jILbMWLCipjTIzRcT26C1JqUEYKsympLFvKFhGqUL4+fETtoYQ2T54wGQkM5FiKOepg==', 0, '0925032654', '2014-10-24 16:37:35', NULL, '200.IQ6NTpO7C9M3L/cOvbbatq6hOCwLcl1HrBMqkQYfjdM=', 1),
(13, 'احمد الفيتوري', 'ahmed.elfituri@gmail.com', '+5AtO9EalNK/FHDIzn1fErrKj6FcbHhRBVdoL3aXCkB3CP++b3wfHbmf1pWZ0NatwVpA8HohBPhFospQjSVqrnRwumH8YzoO2o8TdomuppnknAmggfnqHwapOOKnDnlRNk1/e7GRULCbbEaWyRBY9GKMfMS5oHSGsjTx8ogo9m/x0HcQJbLddAnxJRsGBxL66+Y/6Vk1Gk4DX+dnv099BI4f2ksaeUYMG59L734T0R8kBydzFVhrwoDSyBMGWJ+Z+JTZj1VvWdGJK6nkVAsRSB3UBnZwSqd/JaQTqgnUFZXiB70JO+ZnHUo4tdsyGgkbop9DIokshfaYMlp4XTKmBA==', 0, '0925023322', '2014-10-24 16:41:38', NULL, '200.4bo3kLZkLwKq6Zysy5w2yjWs/NthjC8WftisCST94o4=', 1),
(14, 'demo user', 'ahmed.elfituri@gmail.com', 'Ta0nyQGeKEc493Ig+CJ9x6bkpkJ5GWnuEsddacu1bRQpL342HiRAiZw9465g1ADykItgnDv3gJoHOMwaS5oX0D2Qy+buJrPWIToYZWD4Pa4e7aQ/nF4u90Q9w+qwG2A/k9CY+SAJfUPEYZtcY9gDv6rmqBl0HeqRp3eTJtQfWre8xT3NQLG0DdPnjuHZtD+8V32yB8XUALEfJ9RcGHiSyh41vFgshHl7U/gaX+sMHmBiPd8bchxRD8b7D6q3CKPx3EJxqVQtS5oWmmTh7iRAkcpIE5yskBEQMveIo5qBefR+RRohjEbuwui/1sVNcMBPsd+A+I3KX6XpWHcdNkhrNA==', 1, '0911111111', '2014-10-24 16:43:57', NULL, '200.mj9qrmLx5y5JoLiGFjtDB8BgaS6aQwx0mvdmyh9WNk4=', 1),
(15, 'احمد الفيتوري', 'ahmed.elfituri+2@gmail.com', 'XLIO4RbCd5VWLQmXcV7jCsIVRy/9rb+ZKGcvh657f9Dt9stxgO3F33xMMAcYzRv+/yY/3KL0Lx6zSzyCRaIvxz/z3CTKcTyyc7KomZdJmm5HMzZxenvFi17s43LZEI3ipuuhln6ctjgoK6CgfCnmf0jd34wONuCbxKjceW8A/k7yxDVhmUvQssHsthppOZWMmvV5xgIqr5OwkxcoputUsc/s6gMPtQA5b375vTljnUq4xxQhU8qOFN7Es8kf0jRbg3L1Hw/XsyMruWPCPlgimSSv7h02qr708F3csoFpLQ8+vhEwZaGXGejrp8ZVvE4vonBZzdyrCNaLMx+6haO98w==', 0, '0925032654', '2014-10-24 17:28:17', NULL, '200./TcnyjMVxEZ8P4YOkitYafAv2Lglsomb+dRoWiXWYzI=', 1);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

