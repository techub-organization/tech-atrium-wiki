create table if not exists articles (
  id bigint primary key auto_increment,
  slug varchar(255) not null unique,
  title varchar(255) not null
);
