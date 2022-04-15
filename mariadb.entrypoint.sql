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
