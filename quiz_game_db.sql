-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 24, 2023 at 10:13 AM
-- Server version: 10.4.16-MariaDB
-- PHP Version: 7.4.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `quiz_game_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `friends`
--

CREATE TABLE `friends` (
  `friend_id` int(11) NOT NULL,
  `requestor_id` int(11) NOT NULL,
  `acceptor_id` int(11) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `pending`
--

CREATE TABLE `pending` (
  `pending_id` int(11) NOT NULL,
  `requestor_id` int(11) NOT NULL,
  `acceptor_id` int(11) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `questions`
--

CREATE TABLE `questions` (
  `question_id` int(11) NOT NULL,
  `question` varchar(1000) NOT NULL,
  `option1` varchar(255) NOT NULL,
  `option2` varchar(255) NOT NULL,
  `option3` varchar(255) NOT NULL,
  `option4` varchar(255) NOT NULL,
  `answer` varchar(11) NOT NULL,
  `level` int(11) NOT NULL,
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `questions`
--

INSERT INTO `questions` (`question_id`, `question`, `option1`, `option2`, `option3`, `option4`, `answer`, `level`, `status`) VALUES
(1, 'What is the capital of France?', 'London', 'Berlin', 'Paris', 'Madrid', 'c', 1, 1),
(2, 'Which planet is known as the Red Planet?', 'Earth', 'Mars', 'Venus', 'Jupiter', 'b', 1, 1),
(3, 'Who wrote the play \"Romeo and Juliet\"?', 'Charles Dickens', 'William Shakespeare', 'Jane Austen', 'Mark Twain', 'b', 2, 1),
(4, 'What is the chemical symbol for gold?', 'Au', 'Ag', 'Fe', 'Cu', 'a', 2, 1),
(5, 'Which gas do plants absorb from the atmosphere during photosynthesis?', 'Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Hydrogen', 'b', 3, 1),
(6, 'Which gas makes up the majority of Earth\'s atmosphere?', 'Oxygen', 'Nitrogen', 'Carbon Dioxide', 'Argon', 'b', 1, 1),
(7, 'Who is the author of \"To Kill a Mockingbird\"?', 'J.D. Salinger', 'Harper Lee', 'F. Scott Fitzgerald', 'Mark Twain', 'b', 2, 1),
(8, 'What is the largest mammal in the world?', 'African Elephant', 'Giraffe', 'Blue Whale', 'Hippopotamus', 'c', 2, 1),
(9, 'What is the chemical symbol for water?', 'H2O', 'CO2', 'O2', 'N2', 'a', 1, 1),
(10, 'Which planet is known as the \"Morning Star\" or \"Evening Star\"?', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'b', 1, 1),
(11, 'In which year did Christopher Columbus first arrive in the Americas?', '1492', '1520', '1607', '1776', 'a', 2, 1),
(12, 'What is the smallest prime number?', '0', '1', '2', '3', 'b', 1, 1),
(13, 'Which famous scientist formulated the theory of general relativity?', 'Isaac Newton', 'Galileo Galilei', 'Albert Einstein', 'Stephen Hawking', 'c', 3, 1),
(14, 'What is the largest organ in the human body?', 'Brain', 'Heart', 'Skin', 'Liver', 'c', 1, 1),
(15, 'Which famous river is known as the \"Nile of the West\"?', 'Mississippi River', 'Amazon River', 'Congo River', 'Yangtze River', 'a', 2, 1),
(16, 'Who painted the Mona Lisa?', 'Leonardo da Vinci', 'Vincent van Gogh', 'Pablo Picasso', 'Michelangelo', 'a', 2, 1),
(17, 'Which gas do plants release during photosynthesis?', 'Oxygen', 'Carbon Dioxide', 'Methane', 'Nitrogen', 'a', 2, 1),
(18, 'What is the capital of Japan?', 'Beijing', 'Seoul', 'Shanghai', 'Tokyo', 'd', 1, 1),
(19, 'Who is known as the \"Father of Modern Physics\"?', 'Isaac Newton', 'Galileo Galilei', 'Albert Einstein', 'Stephen Hawking', 'c', 3, 1),
(20, 'Which country is famous for the ancient city of Petra?', 'Greece', 'Italy', 'Jordan', 'Egypt', 'c', 2, 1),
(21, 'What is the largest planet in our solar system?', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'c', 1, 1),
(22, 'Who wrote \"Pride and Prejudice\"?', 'Charles Dickens', 'Emily Bronte', 'Jane Austen', 'Charlotte Bronte', 'c', 2, 1),
(23, 'What is the chemical symbol for silver?', 'Ag', 'Au', 'Si', 'Al', 'a', 1, 1),
(24, 'Which gas do humans primarily exhale during respiration?', 'Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Hydrogen', 'b', 1, 1),
(25, 'What is the largest desert in the world?', 'Sahara Desert', 'Arabian Desert', 'Gobi Desert', 'Antarctica', 'a', 2, 1),
(26, 'Which planet is known as the \"Red Planet\"?', 'Earth', 'Mars', 'Venus', 'Jupiter', 'b', 1, 1),
(27, 'What is the capital of Australia?', 'Sydney', 'Melbourne', 'Canberra', 'Brisbane', 'c', 1, 1),
(28, 'Who painted the \"Starry Night\" masterpiece?', 'Pablo Picasso', 'Claude Monet', 'Vincent van Gogh', 'Leonardo da Vinci', 'c', 2, 1),
(29, 'What is the chemical symbol for iron?', 'Fe', 'Au', 'Ag', 'Hg', 'a', 1, 1),
(30, 'In which year did the Titanic sink?', '1912', '1921', '1907', '1935', 'a', 2, 1),
(31, 'What is the largest ocean on Earth?', 'Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean', 'd', 1, 1),
(32, 'Who wrote \"The Catcher in the Rye\"?', 'J.D. Salinger', 'F. Scott Fitzgerald', 'Ernest Hemingway', 'Harper Lee', 'a', 2, 1),
(33, 'What is the chemical symbol for sodium?', 'S', 'Sa', 'So', 'Na', 'd', 1, 1),
(34, 'Which gas is responsible for the greenhouse effect on Earth?', 'Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Methane', 'b', 2, 1),
(35, 'What is the largest continent in the world?', 'North America', 'South America', 'Europe', 'Asia', 'd', 1, 1),
(36, 'Who was the first woman to fly solo across the Atlantic Ocean?', 'Amelia Earhart', 'Bessie Coleman', 'Harriet Quimby', 'Jacqueline Cochran', 'a', 3, 1),
(37, 'Which famous scientist is known for his theory of evolution by natural selection?', 'Isaac Newton', 'Gregor Mendel', 'Charles Darwin', 'Marie Curie', 'c', 2, 1),
(38, 'What is the tallest mountain in the world?', 'Mount Kilimanjaro', 'Mount Everest', 'Mount Fuji', 'Mount McKinley', 'b', 2, 1),
(39, 'Who is the author of \"1984\"?', 'Aldous Huxley', 'George Orwell', 'Ray Bradbury', 'H.G. Wells', 'b', 2, 1),
(40, 'What is the chemical symbol for potassium?', 'Po', 'K', 'P', 'Pt', 'b', 1, 1),
(41, 'Which gas is known as the \"silent killer\" because it is odorless and colorless?', 'Oxygen', 'Carbon Monoxide', 'Nitrogen', 'Methane', 'b', 2, 1),
(42, 'What is the largest bird in the world?', 'Eagle', 'Ostrich', 'Penguin', 'Flamingo', 'b', 2, 1),
(43, 'Who wrote the play \"Hamlet\"?', 'William Shakespeare', 'Jane Austen', 'Charles Dickens', 'Mark Twain', 'a', 2, 1),
(44, 'What is the chemical symbol for copper?', 'Cu', 'Ag', 'Au', 'Fe', 'a', 1, 1),
(45, 'Which gas do humans breathe in?', 'Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Hydrogen', 'a', 1, 1),
(46, 'What is the smallest prime number?', '0', '1', '2', '3', 'b', 1, 1),
(47, 'Who is the author of \"War and Peace\"?', 'Leo Tolstoy', 'Fyodor Dostoevsky', 'Anton Chekhov', 'Nikolai Gogol', 'a', 2, 1),
(48, 'Which gas is responsible for the \"ozone layer\" in Earth\'s atmosphere?', 'Oxygen', 'Carbon Dioxide', 'Ozone', 'Nitrogen', 'c', 2, 1),
(49, 'What is the chemical symbol for gold?', 'Au', 'Ag', 'Fe', 'Cu', 'a', 2, 1),
(50, 'Which country is known as the \"Land of the Rising Sun\"?', 'China', 'Korea', 'Japan', 'Thailand', 'c', 1, 1),
(51, 'Who is the Greek god of the sea?', 'Zeus', 'Poseidon', 'Hades', 'Apollo', 'b', 1, 1),
(52, 'What is the capital of Brazil?', 'Sao Paulo', 'Brasilia', 'Rio de Janeiro', 'Buenos Aires', 'b', 1, 1),
(53, 'Which famous physicist formulated the theory of special relativity?', 'Isaac Newton', 'Galileo Galilei', 'Albert Einstein', 'Stephen Hawking', 'c', 2, 1),
(54, 'What is the chemical symbol for silver?', 'Ag', 'Au', 'Si', 'Al', 'a', 2, 1),
(55, 'Which gas do plants release during photosynthesis?', 'Oxygen', 'Carbon Dioxide', 'Methane', 'Nitrogen', 'a', 3, 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `age` int(11) NOT NULL,
  `email_id` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` int(11) NOT NULL,
  `gender` int(11) NOT NULL,
  `level` int(11) NOT NULL DEFAULT 1,
  `xp` int(11) NOT NULL DEFAULT 0,
  `is_blocked` int(11) NOT NULL DEFAULT 0,
  `is_admin` int(11) NOT NULL DEFAULT 0,
  `status` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `friends`
--
ALTER TABLE `friends`
  ADD PRIMARY KEY (`friend_id`);

--
-- Indexes for table `pending`
--
ALTER TABLE `pending`
  ADD PRIMARY KEY (`pending_id`);

--
-- Indexes for table `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`question_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `friends`
--
ALTER TABLE `friends`
  MODIFY `friend_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pending`
--
ALTER TABLE `pending`
  MODIFY `pending_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `questions`
--
ALTER TABLE `questions`
  MODIFY `question_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
