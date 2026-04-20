create table if not exists tags (
  id bigint primary key auto_increment,
  name varchar(255) not null unique
);
