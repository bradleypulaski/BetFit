USE betfit;

INSERT INTO competitioncategories (`name`, `updatedAt`, `createdAt`) VALUES ('running', '2018-02-02', '2018-02-02');
INSERT INTO competitioncategories (`name`, `updatedAt`, `createdAt`) VALUES ('swimming', '2018-02-02', '2018-02-02');
INSERT INTO competitioncategories (`name`, `updatedAt`, `createdAt`) VALUES ('cycling', '2018-02-02', '2018-02-02');

INSERT INTO users (`password`, `first_name`, `email`, `last_name`, `bio`, `username`, `age`, `sex`, `weight`,  `updatedAt`, `createdAt`) VALUES ("06fcecbba71c5c21d6a956b7648e6fbef430a23e7b3d98405ff6ab02a26a3982e2e56b2037a02873648b92fd91736e3325ab3024ef01349051ea1ce8075c7cf5",'Brad',  'b@gmail.com', "Pulaski", "bio", "link17", 300, "Male",  1377, '2018-02-02', '2018-02-02');

INSERT INTO users (`first_name`,`email`, `last_name`, `bio`, `username`, `age`, `sex`, `weight`,  `updatedAt`, `createdAt`) VALUES ('Mitt','b@gmail.com', "Fardangle", "bio", "Mfar", 22, "Male",  129, '2018-02-02', '2018-02-02');
INSERT INTO users (`first_name`,`email`, `last_name`, `bio`, `username`, `age`, `sex`, `weight`,  `updatedAt`, `createdAt`) VALUES ('Greg','b@gmail.com', "Fardangle", "bio", "Mfar", 27, "Male",  134, '2018-02-02', '2018-02-02');
INSERT INTO users (`first_name`,`email`, `last_name`, `bio`, `username`, `age`, `sex`, `weight`,  `updatedAt`, `createdAt`) VALUES ('Fred','b@gmail.com', "Fardangle", "bio", "Mfar", 18, "Male",  164, '2018-02-02', '2018-02-02');
INSERT INTO users (`first_name`,`email`, `last_name`, `bio`, `username`, `age`, `sex`, `weight`,  `updatedAt`, `createdAt`) VALUES ('Bobby','b@gmail.com', "Fardangle", "bio", "Mfar", 23, "Male",  187, '2018-02-02', '2018-02-02');
INSERT INTO users (`first_name`, `email`,`last_name`, `bio`, `username`, `age`, `sex`, `weight`,  `updatedAt`, `createdAt`) VALUES ('Nappa','b@gmail.com', "N/A", "bio", "Mfar", 44, "Male",  420, '2018-02-02', '2018-02-02');
INSERT INTO users (`first_name`,`email`, `last_name`, `bio`, `username`, `age`, `sex`, `weight`,  `updatedAt`, `createdAt`) VALUES ('Vegeta','b@gmail.com', "N/A", "bio", "Mfar", 38, "Male",  189, '2018-02-02', '2018-02-02');
INSERT INTO users (`first_name`,`email`, `last_name`, `bio`, `username`, `age`, `sex`, `weight`,  `updatedAt`, `createdAt`) VALUES ('Goku','b@gmail.com', "N/A", "bio", "Mfar", 34, "Male",  247, '2018-02-02', '2018-02-02');
INSERT INTO users (`first_name`,`email`, `last_name`, `bio`, `username`, `age`, `sex`, `weight`,  `updatedAt`, `createdAt`) VALUES ('Guts','b@gmail.com', "N/A", "bio", "Mfar", 25, "Male",  329, '2018-02-02', '2018-02-02');
INSERT INTO users (`first_name`,`email`, `last_name`, `bio`, `username`, `age`, `sex`, `weight`,  `updatedAt`, `createdAt`) VALUES ('Griffith','b@gmail.com', "N/A", "bio", "Mfar", 25, "Male",  145, '2018-02-02', '2018-02-02');
INSERT INTO users (`first_name`,`email`, `last_name`, `bio`, `username`, `age`, `sex`, `weight`,  `updatedAt`, `createdAt`) VALUES ('Edward','b@gmail.com', "Elrick", "bio", "Mfar", 17, "Male",  90, '2018-02-02', '2018-02-02');
INSERT INTO users (`first_name`,`email`, `last_name`, `bio`, `username`, `age`, `sex`, `weight`,  `updatedAt`, `createdAt`) VALUES ('Naruto','b@gmail.com', "Uzumaki", "bio", "Mfar", 14, "Male",  89, '2018-02-02', '2018-02-02');
INSERT INTO users (`first_name`,`email`, `last_name`, `bio`, `username`, `age`, `sex`, `weight`,  `updatedAt`, `createdAt`) VALUES ('Donald','b@gmail.com', "Trump", "bio", "Mfar", 69, "Male",  210, '2018-02-02', '2018-02-02');
INSERT INTO users (`first_name`,`email`, `last_name`, `bio`, `username`, `age`, `sex`, `weight`,  `updatedAt`, `createdAt`) VALUES ('Barack','b@gmail.com', "Obama", "bio", "Mfar", 56, "Male",  189, '2018-02-02', '2018-02-02');
INSERT INTO users (`first_name`,`email`, `last_name`, `bio`, `username`, `age`, `sex`, `weight`,  `updatedAt`, `createdAt`) VALUES ('George', 'b@gmail.com',"Bush", "bio", "Mfar", 72, "Male",  167, '2018-02-02', '2018-02-02');
INSERT INTO users (`first_name`,`email`, `last_name`, `bio`, `username`, `age`, `sex`, `weight`,  `updatedAt`, `createdAt`) VALUES ('Amos','b@gmail.com', "Lee", "bio", "Mfar", 22, "Male",  129, '2018-02-02', '2018-02-02');
INSERT INTO users (`first_name`,`email`, `last_name`, `bio`, `username`, `age`, `sex`, `weight`,  `updatedAt`, `createdAt`) VALUES ('U','b@gmail.com', "Knuckles", "bio", "Mfar", 19, "Male",  120, '2018-02-02', '2018-02-02');

INSERT INTO competitions (`name`, `status`, `fee`, `distance`,  `ownerId`, `weight_min`, `weight_max`, `sex`, `age_min`, `age_max`, `start`, `end`, `active`, `createdAt`, `updatedAt`, `categoryId`) VALUES ('Brads Open Running Tourney', "Open", 2000, 30000, 1, 0, 10000, "Male", 0, 10000, "2011-01-01", "2022-01-01", 1, '2018-02-02', '2018-02-02', 1);
INSERT INTO competitions (`name`, `status`, `fee`, `distance`,  `ownerId`, `weight_min`, `weight_max`, `sex`, `age_min`, `age_max`, `start`, `end`, `active`, `createdAt`, `updatedAt`, `categoryId`) VALUES ('Leets Open Running Tourney', "Open", 2000, 30000, 1, 0, 10000, "Male", 0, 10000, "2011-01-01", "2022-01-01", 1, '2018-02-02', '2018-02-02', 1);

INSERT INTO competitionusers (`userId`, `competitionId`, `time`, `isbet`, `winnings`, `distance`, `createdAt`, `updatedAt`) VALUES(1, 1, 10.00, 1, 0, 30000.00, '2018-02-02', '2018-02-02');
INSERT INTO competitionusers (`userId`, `competitionId`, `time`, `isbet`, `winnings`, `distance`, `createdAt`, `updatedAt`) VALUES(2, 1, 120.00, 1, 0, 30000.00, '2018-02-02', '2018-02-02');
INSERT INTO competitionusers (`userId`, `competitionId`, `time`, `isbet`, `winnings`, `distance`, `createdAt`, `updatedAt`) VALUES(3, 1, 110.00, 1, 0, 30000.00, '2018-02-02', '2018-02-02');
INSERT INTO competitionusers (`userId`, `competitionId`, `time`, `isbet`, `winnings`, `distance`, `createdAt`, `updatedAt`) VALUES(4, 1, 170.00, 1, 0, 30000.00, '2018-02-02', '2018-02-02');
INSERT INTO competitionusers (`userId`, `competitionId`, `time`, `isbet`, `winnings`, `distance`, `createdAt`, `updatedAt`) VALUES(5, 1, 180.00, 1, 0, 30000.00, '2018-02-02', '2018-02-02');
INSERT INTO competitionusers (`userId`, `competitionId`, `time`, `isbet`, `winnings`, `distance`, `createdAt`, `updatedAt`) VALUES(6, 1, 190.00, 1, 0, 30000.00, '2018-02-02', '2018-02-02');
INSERT INTO competitionusers (`userId`, `competitionId`, `time`, `isbet`, `winnings`, `distance`, `createdAt`, `updatedAt`) VALUES(7, 1, 210.00, 1, 0, 30000.00, '2018-02-02', '2018-02-02');
INSERT INTO competitionusers (`userId`, `competitionId`, `time`, `isbet`, `winnings`, `distance`, `createdAt`, `updatedAt`) VALUES(8, 1, 3310.00, 1, 0, 30000.00, '2018-02-02', '2018-02-02');
INSERT INTO competitionusers (`userId`, `competitionId`, `time`, `isbet`, `winnings`, `distance`, `createdAt`, `updatedAt`) VALUES(9, 1, 2210.00, 1, 0, 30000.00, '2018-02-02', '2018-02-02');
INSERT INTO competitionusers (`userId`, `competitionId`, `time`, `isbet`, `winnings`, `distance`, `createdAt`, `updatedAt`) VALUES(10, 1, 1110.00, 1, 0, 30000.00, '2018-02-02', '2018-02-02');
INSERT INTO competitionusers (`userId`, `competitionId`, `time`, `isbet`, `winnings`, `distance`, `createdAt`, `updatedAt`) VALUES(11, 1, 1110.00, 1, 0, 30000.00, '2018-02-02', '2018-02-02');