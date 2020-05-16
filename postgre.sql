CREATE TABLE userProfile (
	id SERIAL,
	firstname VARCHAR(30) NOT NULL,
	lastname VARCHAR(30) NOT NULL,
	username VARCHAR(30) NOT NULL UNIQUE,
	password TEXT NOT NULL,
	birthday DATE NOT NULL,
	birthlocation VARCHAR(50) NOT NULL,
	phonenumber varchar(20) NOT NULL,
	email varchar(50) NOT NULL UNIQUE,
	isAdmin BOOLEAN
);

CREATE TABLE firm(
	id SERIAL,
	fullname VARCHAR(100) NOT NULL,
	shortName VARCHAR(10) NOT NULL UNIQUE,
	password TEXT NOT NULL,
	foundeddate DATE NOT NULL,
	location VARCHAR(50) NOT NULL,
	email varchar(50) NOT NULL UNIQUE
);