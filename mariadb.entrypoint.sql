CREATE TABLE `users` (
	`userid` INT NOT NULL AUTO_INCREMENT,
	`username` VARCHAR(255) NOT NULL,
	`password_hash` TEXT(255) NOT NULL,
	`join_date` DATETIME NOT NULL,
	KEY `user_id_index` (`userid`) USING BTREE,
	PRIMARY KEY (`userid`)
);

CREATE TABLE `permissions`(
    `permissionid` INT NOT NULL AUTO_INCREMENT,
    `permission` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`permissionid`)
);

CREATE TABLE `user_permissions` (
    `userid` INT NOT NULL,
    `permissionid` INT NOT NULL,
    FOREIGN KEY (`userid`) REFERENCES `users`(`userid`),
    FOREIGN KEY (`permissionid`) REFERENCES `permissions`(`permissionid`)
);

CREATE TABLE `cards`(
    `cardid` INT NOT NULL AUTO_INCREMENT,
    `card_name` VARCHAR(255) NOT NULL,
    `userid` INT NOT NULL,
    `attribute_points` INT NOT NULL,
    `deleted` BOOLEAN  not null default 0,
    KEY `card_id_index` (`cardid`) USING BTREE,
    PRIMARY KEY (`cardid`),
    FOREIGN KEY (`userid`) REFERENCES `users`(`userid`)
);

CREATE TABLE `card_stats`(
    `cardid` INT NOT NULL,
    `stat` VARCHAR(255) NOT NULL,
    `value` INT NOT NULL,
    FOREIGN KEY (`cardid`) REFERENCES `cards`(`cardid`)
);

CREATE TABLE `card_attributes`(
    `cardid` INT NOT NULL,
    `attribute` VARCHAR(255) NOT NULL,
    `value` INT NOT NULL,
    FOREIGN KEY (`cardid`) REFERENCES `cards`(`cardid`)
);

CREATE TABLE `card_logs` (
    `userid` INT NOT NULL,
    `cardid` INT NOT NULL,
    `action` VARCHAR(255) not null,
    `time` datetime not null,
    FOREIGN KEY (`cardid`) REFERENCES `cards`(`cardid`),
    FOREIGN KEY (`userid`) REFERENCES `users`(`userid`)
);

CREATE TABLE `card_points`(
    `cardid` INT NOT NULL,
    `point_order` INT NOT NULL,
    `point_x` INT NOT NULL,
    `point_y` INT NOT NULL,
    FOREIGN KEY (`cardid`) REFERENCES `cards`(`cardid`)
);

delimiter //
create  procedure get_user_permissions(p_username varchar(255))
begin
    select `permissions`.`permission` from `permissions` left join `user_permissions` on `permissions`.`permissionid` = `user_permissions`.`permissionid` left join `users` on `user_permissions`.`userid` = `users`.`userid` where `users`.`username` = p_username;
end ;
// 
delimiter ;

delimiter //
create procedure add_user_permission(p_username varchar(255), p_permission varchar(255))
begin
    insert into user_permissions select userid,permissionid from users,permissions where username=p_username and permission=p_permission;
end ;
//
delimiter ;


INSERT INTO `permissions` VALUES (null, "READ_CARD");
INSERT INTO `permissions` VALUES (null, "CREATE_CARD");
INSERT INTO `permissions` VALUES (null, "MODIFY_CARD");
INSERT INTO `permissions` VALUES (null, "DELETE_CARD");
