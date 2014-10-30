-- phpMyAdmin SQL Dump
-- version 4.2.3
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Oct 30, 2014 at 02:39 PM
-- Server version: 5.6.19
-- PHP Version: 5.4.24

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
-- Table structure for table `constituency`
--

CREATE TABLE IF NOT EXISTS `constituency` (
`idconstituency` int(11) NOT NULL,
  `constituency_id` int(11) NOT NULL,
  `constituency_name` varchar(300) COLLATE utf8_unicode_ci NOT NULL,
  `constituency_name_ar` varchar(300) COLLATE utf8_unicode_ci DEFAULT NULL,
  `creation_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modify_date` date DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '1'
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=14 ;

--
-- Dumping data for table `constituency`
--

INSERT INTO `constituency` (`idconstituency`, `constituency_id`, `constituency_name`, `constituency_name_ar`, `creation_date`, `modify_date`, `status`) VALUES
(1, 1, 'first', NULL, '2014-10-30 13:20:08', NULL, 1),
(2, 2, 'second', NULL, '2014-10-30 13:20:08', NULL, 1),
(3, 3, 'third', NULL, '2014-10-30 13:20:08', NULL, 1),
(4, 4, 'fourth', NULL, '2014-10-30 13:20:08', NULL, 1),
(5, 5, 'fifth', NULL, '2014-10-30 13:20:08', NULL, 1),
(6, 6, 'sixth', NULL, '2014-10-30 13:20:08', NULL, 1),
(7, 7, 'seventh', NULL, '2014-10-30 13:20:08', NULL, 1),
(8, 8, 'eighth', NULL, '2014-10-30 13:20:08', NULL, 1),
(9, 9, 'ninth', NULL, '2014-10-30 13:20:08', NULL, 1),
(10, 10, 'tenth', NULL, '2014-10-30 13:20:08', NULL, 1),
(11, 11, 'eleventh', NULL, '2014-10-30 13:20:08', NULL, 1),
(12, 12, 'twelfth', NULL, '2014-10-30 13:20:08', NULL, 1),
(13, 13, 'thirteenth', NULL, '2014-10-30 13:20:08', NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `office`
--

CREATE TABLE IF NOT EXISTS `office` (
`idoffice` int(11) NOT NULL,
  `office_id` int(11) NOT NULL,
  `office_name` text COLLATE utf8_unicode_ci NOT NULL,
  `office_name_ar` varchar(300) COLLATE utf8_unicode_ci DEFAULT NULL,
  `region_name` enum('East','West','South','') COLLATE utf8_unicode_ci NOT NULL,
  `creation_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modify_date` datetime DEFAULT NULL,
  `status` tinyint(4) DEFAULT '1'
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=18 ;

--
-- Dumping data for table `office`
--

INSERT INTO `office` (`idoffice`, `office_id`, `office_name`, `office_name_ar`, `region_name`, `creation_date`, `modify_date`, `status`) VALUES
(1, 1, 'Sirt', NULL, 'West', '2014-10-30 11:06:35', NULL, 1),
(2, 2, 'Musrata', NULL, 'West', '2014-10-30 11:06:35', NULL, 1),
(3, 3, 'Al Khoms', NULL, 'West', '2014-10-30 11:06:35', NULL, 1),
(4, 4, 'Tripoli', NULL, 'West', '2014-10-30 11:06:35', NULL, 1),
(5, 5, 'Al Azizya', NULL, 'West', '2014-10-30 11:06:35', NULL, 1),
(6, 6, 'Al Zawyia', NULL, 'West', '2014-10-30 11:06:35', NULL, 1),
(7, 7, 'Al Jabal 1', NULL, 'West', '2014-10-30 11:06:35', NULL, 1),
(8, 8, 'Al Jabal 2', NULL, 'West', '2014-10-30 11:06:35', NULL, 1),
(9, 9, 'Sabha', NULL, 'South', '2014-10-30 11:06:35', NULL, 1),
(10, 10, 'Aubari', NULL, 'South', '2014-10-30 11:06:35', NULL, 1),
(11, 11, 'Ghadames', NULL, 'South', '2014-10-30 11:06:35', NULL, 1),
(12, 12, 'Tubruq', NULL, 'East', '2014-10-30 11:06:35', NULL, 1),
(13, 13, 'Derna', NULL, 'East', '2014-10-30 11:06:35', NULL, 1),
(14, 14, 'Al Baida', NULL, 'East', '2014-10-30 11:06:35', NULL, 1),
(15, 15, 'Benghazi', NULL, 'East', '2014-10-30 11:06:35', NULL, 1),
(16, 16, 'Ajdabia', NULL, 'East', '2014-10-30 11:06:35', NULL, 1),
(17, 17, 'Al Kufra', NULL, 'East', '2014-10-30 11:06:35', NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `subconstituency`
--

CREATE TABLE IF NOT EXISTS `subconstituency` (
`idsubconstituency` int(11) NOT NULL,
  `subconstituency_id` int(11) NOT NULL,
  `subconstituency_name` varchar(500) COLLATE utf8_unicode_ci NOT NULL,
  `subconstituency_name_ar` varchar(500) COLLATE utf8_unicode_ci NOT NULL,
  `creation_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modify_date` date DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '1'
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=76 ;

--
-- Dumping data for table `subconstituency`
--

INSERT INTO `subconstituency` (`idsubconstituency`, `subconstituency_id`, `subconstituency_name`, `subconstituency_name_ar`, `creation_date`, `modify_date`, `status`) VALUES
(1, 1, 'Tobruk', '', '2014-10-30 14:13:01', NULL, 1),
(2, 2, 'Algubba', '', '2014-10-30 14:13:01', NULL, 1),
(3, 3, 'Derna', '', '2014-10-30 14:13:01', NULL, 1),
(4, 4, 'Shahhat', '', '2014-10-30 14:13:01', NULL, 1),
(5, 5, 'Al-Bayda', '', '2014-10-30 14:13:01', NULL, 1),
(6, 6, 'Al-Marj', '', '2014-10-30 14:13:01', NULL, 1),
(7, 7, 'Gasr Libya', '', '2014-10-30 14:13:01', NULL, 1),
(8, 8, 'Benghazi', '', '2014-10-30 14:13:01', NULL, 1),
(9, 9, 'Tokra', '', '2014-10-30 14:13:01', NULL, 1),
(10, 10, 'Alabyar', '', '2014-10-30 14:13:01', NULL, 1),
(11, 11, 'Gmeinis', '', '2014-10-30 14:13:01', NULL, 1),
(12, 12, 'Sloog', '', '2014-10-30 14:13:01', NULL, 1),
(13, 13, 'Ajdabya', '', '2014-10-30 14:13:01', NULL, 1),
(14, 14, 'Albreiga', '', '2014-10-30 14:13:01', NULL, 1),
(15, 15, 'Ojala', '', '2014-10-30 14:13:01', NULL, 1),
(16, 16, 'Jalo and Jakhra', '', '2014-10-30 14:13:01', NULL, 1),
(17, 17, 'Tazerbu', '', '2014-10-30 14:13:01', NULL, 1),
(18, 18, 'Alkofra', '', '2014-10-30 14:13:01', NULL, 1),
(19, 19, 'Assidra', '', '2014-10-30 14:13:01', NULL, 1),
(20, 20, 'Sirt', '', '2014-10-30 14:13:01', NULL, 1),
(21, 21, 'Aljufra', '', '2014-10-30 14:13:01', NULL, 1),
(22, 22, 'Sebha', '', '2014-10-30 14:13:01', NULL, 1),
(23, 23, 'Wadi Ashatei', '', '2014-10-30 14:13:01', NULL, 1),
(24, 24, 'Obari', '', '2014-10-30 14:13:01', NULL, 1),
(25, 25, 'Ghat', '', '2014-10-30 14:13:01', NULL, 1),
(26, 26, 'Wadi Ataba', '', '2014-10-30 14:13:01', NULL, 1),
(27, 27, 'Murzug - Gezaw – Murzug centre', '', '2014-10-30 14:13:01', NULL, 1),
(28, 28, 'Fungle - Traghen - Meghwa', '', '2014-10-30 14:13:01', NULL, 1),
(29, 29, 'Om Alaraneb - Toyoy - Hmera - Lebdeer - Mesgween', '', '2014-10-30 14:13:01', NULL, 1),
(30, 30, 'Zwela - Temsa - Mgedwel - Om Zwair - Terbo', '', '2014-10-30 14:13:01', NULL, 1),
(31, 31, 'AlGatroun - Tgerhi - Gaser Masoud - Albakhi - Madrousa - Nager Ketma', '', '2014-10-30 14:13:01', NULL, 1),
(32, 32, 'Gharyan', '', '2014-10-30 14:13:01', NULL, 1),
(33, 33, 'Alasabaa', '', '2014-10-30 14:13:01', NULL, 1),
(34, 34, 'Kekla + Algalaa', '', '2014-10-30 14:13:01', NULL, 1),
(35, 35, 'Yefren', '', '2014-10-30 14:13:01', NULL, 1),
(36, 36, 'Arrayaniya', '', '2014-10-30 14:13:01', NULL, 1),
(37, 37, 'Arriheibat', '', '2014-10-30 14:13:01', NULL, 1),
(38, 38, 'Arrajban', '', '2014-10-30 14:13:01', NULL, 1),
(39, 39, 'Jado', '', '2014-10-30 14:13:01', NULL, 1),
(40, 40, 'Azzintan', '', '2014-10-30 14:13:01', NULL, 1),
(41, 41, 'Mezda', '', '2014-10-30 14:13:01', NULL, 1),
(42, 42, 'Nalut', '', '2014-10-30 14:13:01', NULL, 1),
(43, 43, 'Baten Aljabal', '', '2014-10-30 14:13:01', NULL, 1),
(44, 44, 'Kabaw', '', '2014-10-30 14:13:01', NULL, 1),
(45, 45, 'Ghdames', '', '2014-10-30 14:13:01', NULL, 1),
(46, 46, 'Tawerga', '', '2014-10-30 14:13:01', NULL, 1),
(47, 47, 'Misrata', '', '2014-10-30 14:13:01', NULL, 1),
(48, 48, 'Beni Walid', '', '2014-10-30 14:13:01', NULL, 1),
(49, 49, 'Zlitin', '', '2014-10-30 14:13:01', NULL, 1),
(50, 50, 'Terhouna', '', '2014-10-30 14:13:01', NULL, 1),
(51, 51, 'Meslata', '', '2014-10-30 14:13:01', NULL, 1),
(52, 52, 'Alkhoms Assahel', '', '2014-10-30 14:13:01', NULL, 1),
(53, 53, 'Alkhoms Almadina', '', '2014-10-30 14:13:01', NULL, 1),
(54, 54, 'Gasr Al-Akhyar', '', '2014-10-30 14:13:01', NULL, 1),
(55, 55, 'Algarabulali', '', '2014-10-30 14:13:01', NULL, 1),
(56, 56, 'Tajoura', '', '2014-10-30 14:13:01', NULL, 1),
(57, 57, 'Soug Aljumaa', '', '2014-10-30 14:13:01', NULL, 1),
(58, 58, 'Tripoli Central', '', '2014-10-30 14:13:01', NULL, 1),
(59, 59, 'Hay Al-Andalus', '', '2014-10-30 14:13:01', NULL, 1),
(60, 60, 'Janzour', '', '2014-10-30 14:13:01', NULL, 1),
(61, 61, 'Bousleem', '', '2014-10-30 14:13:01', NULL, 1),
(62, 62, 'Ain Zara', '', '2014-10-30 14:13:01', NULL, 1),
(63, 63, 'Al-Maya', '', '2014-10-30 14:13:01', NULL, 1),
(64, 64, 'Annasiriya', '', '2014-10-30 14:13:01', NULL, 1),
(65, 65, 'Al-Aziziya', '', '2014-10-30 14:13:01', NULL, 1),
(66, 66, 'Swani Beni Yaddam', '', '2014-10-30 14:13:01', NULL, 1),
(67, 67, 'Gasr Bin Ghasheer (Akkara)', '', '2014-10-30 14:13:01', NULL, 1),
(68, 68, 'Emseihel + Assayeh + Esbeia', '', '2014-10-30 14:13:01', NULL, 1),
(69, 69, 'Azzawiya', '', '2014-10-30 14:13:01', NULL, 1),
(70, 70, 'Sabratha', '', '2014-10-30 14:13:01', NULL, 1),
(71, 71, 'Alajailat', '', '2014-10-30 14:13:01', NULL, 1),
(72, 72, 'Saraman', '', '2014-10-30 14:13:01', NULL, 1),
(73, 73, 'Zuwara', '', '2014-10-30 14:13:01', NULL, 1),
(74, 74, 'Aljamail', '', '2014-10-30 14:13:01', NULL, 1),
(75, 75, 'Ragdalein- Zultin', '', '2014-10-30 14:13:01', NULL, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `constituency`
--
ALTER TABLE `constituency`
 ADD PRIMARY KEY (`idconstituency`);

--
-- Indexes for table `office`
--
ALTER TABLE `office`
 ADD PRIMARY KEY (`idoffice`);

--
-- Indexes for table `subconstituency`
--
ALTER TABLE `subconstituency`
 ADD PRIMARY KEY (`idsubconstituency`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `constituency`
--
ALTER TABLE `constituency`
MODIFY `idconstituency` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT for table `office`
--
ALTER TABLE `office`
MODIFY `idoffice` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=18;
--
-- AUTO_INCREMENT for table `subconstituency`
--
ALTER TABLE `subconstituency`
MODIFY `idsubconstituency` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=76;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
