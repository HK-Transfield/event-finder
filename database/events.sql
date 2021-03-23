-- phpMyAdmin SQL Dump
-- version 4.9.7
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Mar 07, 2021 at 12:54 AM
-- Server version: 5.7.32
-- PHP Version: 7.4.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `322`
--

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `name` varchar(40) NOT NULL,
  `category` varchar(20) NOT NULL,
  `month` varchar(12) NOT NULL,
  `day` int(11) NOT NULL,
  `time` time NOT NULL,
  `cost` float NOT NULL,
  `location` varchar(40) NOT NULL,
  `id` int(11) NOT NULL,
  `tagged` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`name`, `category`, `month`, `day`, `time`, `cost`, `location`, `id`, `tagged`) VALUES
('Farmer\'s Market', 'Shopping', 'March', 28, '08:15:00', 0, 'Claudelands car park', 1, 0),
('10K fun run and walk', 'Sport', 'March', 20, '09:45:00', 0, 'Hamilton Lake', 2, 0),
('Knitting circle', 'Craft', 'March', 25, '19:00:00', 0, 'The Link', 3, 0),
('Public Lecture', 'Education', 'March', 23, '18:30:00', 0, 'University of Waikato', 4, 0),
('Rivertones Concert', 'Entertainment', 'March', 26, '19:30:00', 25, 'The Meteor', 5, 0),
('Clarise Dance School Show', 'Entertainment', 'April', 14, '18:45:00', 10, 'Claudelands', 6, 0),
('Food Show', 'Shopping', 'April', 24, '08:30:00', 30, 'Claudelands ', 7, 0),
('Hamilton Cycle Club Road Race', 'Sport', 'April', 11, '08:45:00', 0, 'Cycleworks Frankton', 8, 0),
('Cambridge Ukelele Orchestra', 'Entertainment', 'April', 16, '19:30:00', 25, 'Clarence St Theatre', 9, 0),
('Waikato Sewing Bee', 'Craft', 'April', 12, '14:30:00', 0, 'The Link', 10, 0),
('Bootleg Brewery Sale', 'Shopping', 'April', 28, '19:00:00', 0, 'Bootleg Brewery Matangi', 11, 0),
('The Great Debate', 'Educational', 'May', 12, '19:45:00', 0, 'UoW Performing Arts Centre', 12, 0),
('ParkRun', 'Sport', 'May', 16, '10:00:00', 0, 'Hamilton Lake', 13, 0),
('The Great Poetry Slam', 'Entertainment', 'May', 28, '21:00:00', 15, 'Meteor Theatre', 14, 0),
('Hamilton Barbershop Quarter', 'Entertainment', 'May', 29, '19:30:00', 25, 'Clarence St Theatre', 15, 0),
('Farmer\'s Market', 'Shopping', 'May', 30, '08:00:00', 0, 'Claudelands Car Park', 16, 0),
('June\'s Jugglers', 'Entertainment', 'June', 12, '11:00:00', 0, 'Garden Place', 17, 0),
('Facepainting workshop', 'Craft', 'June', 26, '10:30:00', 15, 'The Link', 18, 0),
('Farmer\'s Market', 'Shopping', 'June', 27, '08:00:00', 0, 'Claudelands car park', 19, 0),
('Billy and the Bagpipes', 'Entertainment', 'June', 21, '19:30:00', 20, 'Meteor Theatre', 20, 0),
('Build a Bear', 'Craft', 'June', 6, '10:00:00', 5, 'The Link', 21, 0),
('Da Vinci Exhibition', 'Entertainment', 'June ', 11, '09:30:00', 15, 'Museum', 22, 0),
('Winter Solstice', 'Entertainment', 'June', 27, '21:30:00', 0, 'Hamilton Gardens', 23, 0),
('Mid Winter Christmas Fair', 'Shopping', 'July', 4, '17:50:00', 0, 'K Mart car park', 24, 0),
('Farmer\'s Market', 'Shopping', 'July', 27, '08:00:00', 0, 'Claudelands Car Park', 25, 0),
('Ski Patrol', 'Educational', 'August', 21, '10:00:00', 15, 'WINTEC', 26, 0),
('Winter Plunge', 'Sport', 'August', 7, '10:00:00', 0, 'Wellington St Beach', 27, 0),
('Cantando Choir', 'Entertainment', 'August', 14, '17:30:00', 25, 'St Peters', 28, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;
