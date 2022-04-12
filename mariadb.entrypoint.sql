CREATE TABLE `users` (
	`userid` INT NOT NULL AUTO_INCREMENT,
	`username` VARCHAR(255) NOT NULL,
	`password_hash` TEXT(255) NOT NULL,
	`join_date` DATETIME NOT NULL,
	KEY `user_id_index` (`userid`) USING BTREE,
	PRIMARY KEY (`userid`)
);
