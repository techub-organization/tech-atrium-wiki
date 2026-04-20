create table if not exists articles (
  id serial primary key,
  slug text not null unique,
  title text not null
);
