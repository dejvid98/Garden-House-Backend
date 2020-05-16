CREATE TABLE farmer(
	id SERIAL,
	firstName VARCHAR(30) NOT NULL,
	lastName VARCHAR(30) NOT NULL,
	username VARCHAR(30) NOT NULL UNIQUE,
	password VARCHAR(30) NOT NULL,
	birthday DATE NOT NULL,
	birthLocation VARCHAR(50) NOT NULL,
	phoneNumber BIGINT NOT NULL,
	email varchar(50) NOT NULL
);

CREATE TABLE firm(
	id SERIAL,
	fullName VARCHAR(100) NOT NULL,
	shortName VARCHAR(10) NOT NULL UNIQUE,
	password VARCHAR(30) NOT NULL,
	foundedDate DATE NOT NULL,
	location VARCHAR(50) NOT NULL,
	email varchar(50) NOT NULL
);