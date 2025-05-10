create table if not exists users (
  id integer primary key autoincrement,
  username text unique not null,
  password text not null,
  disabled integer not null default 0
);
