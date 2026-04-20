create table if not exists articles (
  id uuid primary key,
  slug string not null unique,
  title string not null
);
