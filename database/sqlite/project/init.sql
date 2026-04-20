create table if not exists articles (
  id integer primary key,
  slug text not null unique,
  title text not null,
  level text not null
);

create table if not exists comments (
  id integer primary key,
  article_id integer not null,
  content text not null
);
