create table if not exists users(email text primary key);
create table if not exists projects(id serial primary key, code text unique not null, name text not null);
create table if not exists access(email text references users(email) on delete cascade, project_id int references projects(id) on delete cascade, primary key(email,project_id));
create table if not exists reports(id serial primary key, project_id int references projects(id) on delete cascade, title text not null, type text, updated bigint);
create table if not exists locks(report_id int primary key references reports(id) on delete cascade, email text not null, expires bigint not null);
create table if not exists login_codes(email text primary key, code_hash text not null, exp bigint not null, tries int not null default 0);
