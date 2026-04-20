create table tech_items (
  id integer primary key,
  name text not null,
  category text not null
);

insert into tech_items (name, category)
values ('Svelte', 'framework');
