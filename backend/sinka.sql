DROP DATABASE IF EXISTS sinka;
CREATE DATABASE sinka;

USE sinka;

CREATE TABLE sport
(
	id INT UNSIGNED AUTO_INCREMENT NOT NULL,
	title VARCHAR(32) NOT NULL,
    mui_icon VARCHAR(32),

	PRIMARY KEY(id)
);

CREATE TABLE persontype
(
	id INT UNSIGNED AUTO_INCREMENT NOT NULL,
	title VARCHAR(32) NOT NULL,
    mui_icon VARCHAR(32),

	PRIMARY KEY(id)
);

CREATE TABLE person
(
	id INT UNSIGNED AUTO_INCREMENT NOT NULL,
    email VARCHAR(255) NOT NULL,
	pass VARCHAR(255) NOT NULL,
	creation DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
	gender CHAR NOT NULL,
	birth DATE NOT NULL,
	full_name VARCHAR(64) NOT NULL,
	biography VARCHAR(1024) DEFAULT NULL,
    
	PRIMARY KEY(id)
);

CREATE TABLE team
(
	id INT UNSIGNED AUTO_INCREMENT NOT NULL,
	id_creator INT UNSIGNED NOT NULL,
	id_sport INT UNSIGNED NOT NULL,
	creation DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
	title VARCHAR(64) NOT NULL,
	gender CHAR NOT NULL,
	about VARCHAR(1024) DEFAULT NULL,

	FOREIGN KEY(id_creator) REFERENCES person(id),
	FOREIGN KEY(id_sport) REFERENCES sport(id),
    
	PRIMARY KEY(id)
);

CREATE TABLE person_team
(
	id_person INT UNSIGNED NOT NULL,
	id_team INT UNSIGNED NOT NULL,
	joined DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
	coach BIT DEFAULT 0 NOT NULL,

	FOREIGN KEY(id_person) REFERENCES person(id),
	FOREIGN KEY(id_team) REFERENCES team(id),
    
	PRIMARY KEY(id_person, id_team)
);

CREATE TABLE person_sport
(
	id_person INT UNSIGNED NOT NULL,
	id_sport INT UNSIGNED NOT NULL,

	FOREIGN KEY(id_person) REFERENCES person(id),
	FOREIGN KEY(id_sport) REFERENCES sport(id),
    
	PRIMARY KEY(id_person, id_sport)
);

CREATE TABLE person_persontype
(
	id_person INT UNSIGNED NOT NULL,
	id_persontype INT UNSIGNED NOT NULL,

	FOREIGN KEY(id_person) REFERENCES person(id),
	FOREIGN KEY(id_persontype) REFERENCES persontype(id),
    
	PRIMARY KEY(id_person, id_persontype)
);