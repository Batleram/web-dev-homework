-- DO NOT RUN THIS FILE IN PRODUCTION, IT WILL CAUSE UNDOCUMENTED BEHAVIOUR IF THERE ARE DUPLICATES, WE DO NOT CHECK FOR THIS AT THE MOMENT
-- IT WILL ALSO NOT WORK IF THERE IS PREVIOUS DATA IN THE DATABASE, AS WE HARCODE PRIMARY KEYS
insert into users values (
    1,
    "other", 
    "$argon2id$v=19$m=65536,t=4,p=1$Z0VzVHpwZkRDaDAzMmU5Yw$c9J+PQ4ubVdWPHEaR0RU7MrLFzD3O83mA5D9zZUaBFE",
    now()
);

call add_user_permission("other", "READ_CARD");
call add_user_permission("other", "DELETE_CARD");
call add_user_permission("other", "CREATE_CARD");
call add_user_permission("other", "MODIFY_CARD");

insert into cards values(
    null,
    1,
    3,
    0
);

insert into card_stats VALUES(
    1,
    "ATTACK",
    10
);

insert into card_stats VALUES(
    1,
    "DEFENSE",
    9
);

insert into card_attributes VALUES(
    1,
    "FIRE",
    2
);

insert into card_attributes VALUES(
    1,
    "OTHER",
    2
);

insert into card_logs VALUES(
    1,
    1,
    "CREATE",
    now()
);

