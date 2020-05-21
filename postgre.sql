CREATE TABLE userprofile (
	id SERIAL UNIQUE PRIMARY KEY,
	firstname VARCHAR(30) NOT NULL,
	lastname VARCHAR(30) NOT NULL,
	username VARCHAR(30) NOT NULL UNIQUE,
	password TEXT NOT NULL,
	birthday DATE NOT NULL,
	birthlocation VARCHAR(50) NOT NULL,
	phonenumber varchar(20) NOT NULL,
	email varchar(50) NOT NULL UNIQUE,
	isAdmin BOOLEAN,
	isAcepted BOOLEAN DEFAULT false
);

CREATE TABLE firm(
	id SERIAL UNIQUE PRIMARY KEY,
	fullname VARCHAR(100) NOT NULL,
	shortName VARCHAR(10) NOT NULL UNIQUE,
	password TEXT NOT NULL,
	foundeddate DATE NOT NULL,
	location VARCHAR(50) NOT NULL,
	email varchar(50) NOT NULL UNIQUE
);

CREATE TABLE nursery(
	id SERIAL UNIQUE PRIMARY KEY,
	length INT NOT NULL,
	width INT NOT NULL,
	name VARCHAR(100) NOT NULL,
	address VARCHAR(100) NOT NULL,
	waterlevel INT DEFAULT 200,
	temeprature INT DEFAULT 18,
	owneremail VARCHAR(100) NOT NULL,
	FOREIGN KEY (owneremail) REFERENCES userprofile (email)
)

CREATE TABLE seedling(
	id SERIAL UNIQUE PRIMARY KEY,
	name VARCHAR(50) NOT NULL,
	is_planted boolean default false,
	planted_date DATE NOT NULL,
	harvest_ready boolean default false,
	harvest_date DATE,
	nursery_id INT,
	owner_id INT,
	FOREIGN KEY (nursery_id) REFERENCES nursery(id),
	FOREIGN KEY (owner_id) REFERENCES userprofile(id)
)

CREATE TABLE fertilizer(
	id SERIAL UNIQUE PRIMARY KEY,
	name VARCHAR(100) NOT NULL,
	firm VARCHAR(100) NOT NULL,
	owner_id INT,
	FOREIGN KEY (owner_id) REFERENCES userprofile(id)
)

CREATE TABLE shopitem(
	id SERIAL UNIQUE PRIMARY KEY,
	name VARCHAR(100) NOT NULL,
	firm VARCHAR(100) NOT NULL,
	type VARCHAR(20) NOT NULL,
	FOREIGN KEY (firm) REFERENCES firm(fullname)
)

CREATE TABLE ratings(
	id SERIAL UNIQUE PRIMARY KEY,
	username VARCHAR(100) NOT NULL,
	rating INT NOT NULL,
	FOREIGN KEY (username) REFERENCES userprofile(username)
)

CREATE TABLE oderders(
	id SERIAL UNIQUE PRIMARY KEY,
	orderedAt DATE NOT NULL,
	is_acepted BOOLEAN,
)