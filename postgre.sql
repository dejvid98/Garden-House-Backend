drop table userprofile,firm,nursery,seedling,fertilizer,shopitem,rating,comment,orders,orderitem;

CREATE TABLE userprofile (
	id SERIAL UNIQUE PRIMARY KEY,
	firstname VARCHAR(30) NOT NULL,
	lastname VARCHAR(30) NOT NULL,
	username VARCHAR(30) NOT NULL UNIQUE,
	created_at TIMESTAMP,
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
	email varchar(50) NOT NULL UNIQUE,
	courier INT DEFAULT 5
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
);

CREATE TABLE seedling(
	id SERIAL UNIQUE,
	name VARCHAR(50) NOT NULL,
	is_planted boolean default false,
	planted_date DATE NOT NULL,
	harvest_ready boolean default false,
	harvest_date DATE,
	nursery_id INT REFERENCES nursery(id),
	owner_id INT  REFERENCES userprofile(id),
	PRIMARY KEY(id,nursery_id,owner_id)
);

CREATE TABLE fertilizer(
	id SERIAL UNIQUE PRIMARY KEY,
	name VARCHAR(100) NOT NULL,
	firm VARCHAR(100) NOT NULL,
	speedup_time INT,
	owner_id INT,
	FOREIGN KEY (owner_id) REFERENCES userprofile(id)
);

CREATE TABLE shopitem(
	id SERIAL UNIQUE PRIMARY KEY,
	name VARCHAR(100) NOT NULL,
	firm INT NOT NULL,
	type VARCHAR(20) NOT NULL,
	FOREIGN KEY (firm) REFERENCES firm(id)
);

CREATE TABLE rating(
	id SERIAL UNIQUE,
	username VARCHAR(100) NOT NULL REFERENCES userprofile(username),
	product INT NOT NULL REFERENCES shopitem(id),
	rating INT NOT NULL,
	PRIMARY KEY(id,username,product)
);

CREATE TABLE comment(
	id SERIAL UNIQUE,
	username VARCHAR(100) NOT NULL REFERENCES userprofile(username),
	product INT NOT NULL REFERENCES shopitem(id),
	comment TEXT NOT NULL,
	PRIMARY KEY(id,username,product)
);

CREATE TABLE orders(
	id SERIAL UNIQUE PRIMARY KEY,
	orderedAt DATE NOT NULL,
	is_acepted BOOLEAN,
	status VARCHAR(20) DEFAULT 'pending',
	quantity INT,
	item_id INT,
	FOREIGN KEY (item_id) REFERENCES shopitem(id)
);

CREATE TABLE orderitem(
	id SERIAL UNIQUE PRIMARY KEY,

)