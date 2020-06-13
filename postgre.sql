drop table courier,orderitem,orders,comment,rating,shopitem,fertilizer,seedling,warehouse,firm,nursery,userprofile;

CREATE TABLE userprofile (
	id SERIAL UNIQUE PRIMARY KEY,
	firstname VARCHAR(30) NOT NULL,
	lastname VARCHAR(30) NOT NULL,
	username VARCHAR(30) NOT NULL UNIQUE,
	created_at TIMESTAMP DEFAULT now(),
	password TEXT NOT NULL,
	birthday DATE NOT NULL,
	birthlocation VARCHAR(50) NOT NULL,
	phonenumber varchar(20) NOT NULL,
	email varchar(50) NOT NULL UNIQUE,
	isAdmin BOOLEAN DEFAULT false,
	isAccepted VARCHAR(20) DEFAULT 'pending'
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
	available_space INT NOT NULL,
	waterlevel INT DEFAULT 200,
	temeprature INT DEFAULT 18,
	owneremail VARCHAR(100) NOT NULL,
	FOREIGN KEY (owneremail) REFERENCES userprofile (email)
);

CREATE TABLE warehouse(
	id SERIAL UNIQUE,
	owner_id INT REFERENCES userprofile(id),
	PRIMARY KEY (id,owner_id)
);

CREATE TABLE seedling(
	id SERIAL UNIQUE,
	name VARCHAR(50) NOT NULL,
	is_planted boolean default false,
	planted_date timestamp,
	harvest_ready boolean default false,
	harvest_date timestamp,
	transplant_date timestamp,
	nursery_id INT REFERENCES nursery(id),
	warehouse_id INT  REFERENCES warehouse(id),
	PRIMARY KEY(id,warehouse_id)
);

CREATE TABLE fertilizer(
	id SERIAL UNIQUE,
	name VARCHAR(100) NOT NULL,
	firm VARCHAR(100) NOT NULL REFERENCES firm(shortname),
	speedup_time INT,
	warehouse_id INT REFERENCES warehouse(id),
	PRIMARY KEY (id,warehouse_id)
);

CREATE TABLE shopitem(
	id SERIAL UNIQUE,
	name VARCHAR(100) NOT NULL,
	firm INT NOT NULL REFERENCES firm(id),
	type VARCHAR(20) NOT NULL,
	speedup_time INT,
	quantity INT,
	photo_url TEXT,
	PRIMARY KEY (id,firm)
);

CREATE TABLE rating(
	id SERIAL UNIQUE,
	username INT NOT NULL REFERENCES userprofile(id),
	created_at TIMESTAMP DEFAULT now(),
	product INT NOT NULL REFERENCES shopitem(id),
	rating INT NOT NULL,
	PRIMARY KEY(id)
);

CREATE TABLE comment(
	id SERIAL UNIQUE,
	username INT NOT NULL REFERENCES userprofile(id),
	product INT NOT NULL REFERENCES shopitem(id),
	created_at TIMESTAMP DEFAULT now(),
	comment TEXT NOT NULL,
	PRIMARY KEY(id)
);

CREATE TABLE orders(
	id SERIAL UNIQUE,
	buyer_id INT REFERENCES userprofile(id),
	is_acepted BOOLEAN,
	status VARCHAR(20) DEFAULT 'pending',
	delivery_date timestamp,
	created_at TIMESTAMP DEFAULT now(),
	firms VARCHAR(30) [],
	PRIMARY KEY (id,buyer_id)
);

CREATE TABLE orderitem(
	id SERIAL UNIQUE,
	created_at TIMESTAMP DEFAULT now(),
	shopitem_id INT NOT NULL REFERENCES shopitem(id),
	quantity INT DEFAULT 1,
	order_id INT NOT NULL REFERENCES orders(id),
	PRIMARY KEY (id,order_id)
);

CREATE TABLE courier(
	id SERIAL UNIQUE,
	firm_id INT NOT NULL REFERENCES firm(id),
	is_busy BOOLEAN DEFAULT false,
	order_id INT REFERENCES orders(id),
	delivery_time timestamp,
	PRIMARY KEY (id,firm_id)
);