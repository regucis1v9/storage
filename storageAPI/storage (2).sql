-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Jan 04, 2024 at 09:03 PM
-- Server version: 5.7.39
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `storage`
--

-- --------------------------------------------------------

--
-- Table structure for table `applicants`
--

CREATE TABLE `applicants` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `surname` text NOT NULL,
  `email` text NOT NULL,
  `city` text NOT NULL,
  `job` text NOT NULL,
  `birth_date` date NOT NULL,
  `letter` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `experiences`
--

CREATE TABLE `experiences` (
  `id` int(11) NOT NULL,
  `experience` text NOT NULL,
  `applicantID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `sender` varchar(255) NOT NULL,
  `receiver` varchar(255) NOT NULL,
  `title` text NOT NULL,
  `message` text NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `read_status` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`id`, `sender`, `receiver`, `title`, `message`, `timestamp`, `read_status`) VALUES
(1, 'YourSenderValue', 'marcis.jansons', '', 'tava mamma', '2023-12-19 19:29:47', 0),
(2, 'YourSenderValue', '', 'title', '', '2023-12-19 21:16:03', 0),
(3, 'YourSenderValue', 'marcis.jansons', 'title', '321', '2023-12-19 21:16:11', 0),
(5, 'marcis.jansons', '', '', '', '2023-12-19 21:20:15', 0),
(10, 'admin', 'admin', 'Velu veiksmi', 'Velu veiksmi pabeight so darbu :)', '2023-12-19 23:33:47', 0),
(11, 'regnars.klavins', 'admin', '123', '123', '2023-12-20 02:11:29', 0);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `supplier` varchar(50) NOT NULL,
  `color` varchar(20) NOT NULL,
  `size` varchar(3) NOT NULL,
  `type` varchar(20) NOT NULL,
  `amount` int(250) NOT NULL,
  `orderDate` date NOT NULL,
  `deliveryDate` date NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'incoming',
  `shelf` varchar(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `supplier`, `color`, `size`, `type`, `amount`, `orderDate`, `deliveryDate`, `status`, `shelf`) VALUES
(92, 'Zega', 'BLUE', 'XL', 'polo', 2, '2023-12-19', '2023-12-23', 'incoming', ''),
(93, 'Zega', 'RED', 'XL', 'tank', 2, '2023-12-19', '2023-12-23', 'delivered', 'B4'),
(94, 'Zega', 'BLUE', 'XL', 'polo', 22, '2023-12-19', '0000-00-00', 'incoming', ''),
(95, 'Zega', 'BLUE', 'XL', 'polo', 22, '2023-12-19', '2023-12-23', 'incoming', 'B2'),
(96, 'Zega', 'BLUE', 'XL', 'polo', 22, '2023-12-19', '2023-12-23', 'incoming', ''),
(97, 'Zega', 'BLUE', 'XL', 'polo', 22, '2023-12-19', '2023-12-23', 'delivered', 'B2'),
(98, 'Zega', 'BLUE', 'XL', 'polo', 22, '2023-12-19', '2023-12-23', 'delivered', 'B4'),
(99, 'Zega', 'BLUE', 'XL', 'polo', 22, '2023-12-19', '2023-12-23', 'delivered', ''),
(100, 'Onlyteez', 'RED', 'XXL', 'tank', 2, '2023-12-19', '2023-12-24', 'incoming', ''),
(101, 'MadeInChina', 'MAGENTA', 'XXL', 'tank-top', 2, '2023-12-19', '2023-12-29', 'incoming', ''),
(102, 'MadeInChina', 'BLUE', 'XL', 'v-neck', 323, '2023-12-20', '2023-12-30', 'incoming', ''),
(103, 'Appaerify', 'BLUE', 'XXL', 'gamer', 2, '2023-12-20', '2024-01-09', 'incoming', ''),
(104, 'Appaerify', 'RED', 'XL', 'v-neck', 3, '2023-12-20', '2024-01-09', 'incoming', ''),
(105, 'MadeInChina', 'BLUE', 'S', 'v-neck', 2, '2023-12-20', '2023-12-30', 'incoming', ''),
(106, 'MadeInChina', 'BLUE', 'M', 'tank-top', 12, '2023-12-20', '2023-12-30', 'incoming', ''),
(107, 'MadeInChina', 'RED', 'S', 'polo', 130, '2023-12-20', '2023-12-30', 'incoming', '');

-- --------------------------------------------------------

--
-- Table structure for table `suppliers`
--

CREATE TABLE `suppliers` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `image` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `suppliers`
--

INSERT INTO `suppliers` (`id`, `name`, `image`, `location`) VALUES
(1, 'MADE-IN-CHINA', 'china.png', '/Order'),
(2, 'APPAERIFY', 'appa.png', '/Appaerify'),
(3, 'ONLYTEEZ', 'only.png', '/Onlyteez'),
(4, 'ZEGA-APPAREL', 'zega.png', '/Zega');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` text NOT NULL,
  `password` text NOT NULL,
  `email` text NOT NULL,
  `role` text NOT NULL,
  `token` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `email`, `role`, `token`) VALUES
(1, 'admin', '$2y$10$t/0lmBPevy2rac.SgzNNreZHytua.Ri7jsltdw5q/jG3BMAPU4OA6', '', 'admin', 'd2fefb04b7aa945db19a3586b9bfd120d60a18f4f240e37a51b26ca96e8830a0'),
(17, 'martins.lacis', '$2y$10$BsUoiIPxxUPX7LgZu2niE.geMh0EG4/LofE.wEIwvWdI90XuZyxe2', 'regnars.klavins@gmail.com', 'Darbinieks', '4de2263201c3a55d855a00f20b08980f8f386812700edfc3c59bbdadd680a8b1'),
(18, 'reinis.artimovics', '$2y$10$fmrafVcgt1vjP1Ywey7uK.z.3QK/8OeQUr1FE9QsH4xDGyU4v4rra', 'regnars.klavins@gmail.com', 'Plauktu kartotajs', ' ');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `applicants`
--
ALTER TABLE `applicants`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `experiences`
--
ALTER TABLE `experiences`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_applicant_id` (`applicantID`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `suppliers`
--
ALTER TABLE `suppliers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `applicants`
--
ALTER TABLE `applicants`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `experiences`
--
ALTER TABLE `experiences`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=108;

--
-- AUTO_INCREMENT for table `suppliers`
--
ALTER TABLE `suppliers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `experiences`
--
ALTER TABLE `experiences`
  ADD CONSTRAINT `fk_applicant_id` FOREIGN KEY (`applicantID`) REFERENCES `applicants` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
