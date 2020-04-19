# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.5.5-10.1.10-MariaDB)
# Database: ardubot
# Generation Time: 2016-04-21 15:43:42 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table BOARDS
# ------------------------------------------------------------

DROP TABLE IF EXISTS `BOARDS`;

CREATE TABLE `BOARDS` (
  `serial` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `level` int(11) DEFAULT NULL,
  `board` varchar(100) DEFAULT '',
  `row` int(11) DEFAULT NULL,
  `col` int(11) DEFAULT NULL,
  UNIQUE KEY `serial` (`serial`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `BOARDS` WRITE;
/*!40000 ALTER TABLE `BOARDS` DISABLE KEYS */;

INSERT INTO `BOARDS` (`serial`, `level`, `board`, `row`, `col`)
VALUES
	(18,NULL,'ruta = [0,2],[1,2],[2,2],',15,NULL),
	(19,NULL,'ruta = [0,3],[1,3],[2,3],',15,15),
	(20,0,'ruta = [0,3],[1,3],[2,3],',15,15),
	(21,1,'ruta = [0,2],[1,2],[2,2],',15,15),
	(22,1,'ruta = [1,4],[2,4],[3,4],',15,15),
	(23,1,'ruta = [1,4],[2,4],[3,4],',15,15),
	(24,1,'ruta = [1,4],[2,4],[3,4],',15,15),
	(25,1,'ruta = [1,4],[2,4],[3,4],',15,15),
	(26,1,'ruta = [1,4],[2,4],[3,4],',15,15),
	(27,1,'ruta = [1,4],[2,4],[3,4],',15,15),
	(28,1,'ruta = [1,4],[2,4],[3,4],',15,15),
	(29,1,'ruta = [1,4],[2,4],[3,4],',15,15),
	(30,NULL,'',NULL,NULL),
	(31,1,'ruta = [0,2],[1,2],[2,2],',15,15),
	(32,2,'ruta = [0,3],[1,3],[2,3],[3,3],[4,3],[5,3],[6,3],[7,3],[8,3],[9,3],[9,4],[8,4],[7,4],[6,4],[5,4],[4,',15,15),
	(33,0,'ruta = [0,3],[1,3],[2,3],',15,15),
	(34,NULL,'',NULL,NULL),
	(35,0,'ruta = [0,3],[1,3],[2,3],[3,3],',15,15),
	(36,1,'ruta = [0,3],[1,3],[2,3],[3,3],[4,3],[5,3],[6,3],[7,3],[8,3],[9,3],[9,4],[8,4],',15,15),
	(37,0,'ruta = [0,3],[1,3],[2,3],[2,4],[2,5],[3,5],',15,15),
	(38,0,'ruta = [0,2],[1,2],[2,2],[2,3],[2,4],[3,4],',15,15);

/*!40000 ALTER TABLE `BOARDS` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table USERS
# ------------------------------------------------------------

DROP TABLE IF EXISTS `USERS`;

CREATE TABLE `USERS` (
  `serial` int(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `surname` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `nickname` varchar(50) NOT NULL,
  `birthday` date NOT NULL,
  `teacher` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`serial`),
  UNIQUE KEY `SERIAL` (`serial`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `USERS` WRITE;
/*!40000 ALTER TABLE `USERS` DISABLE KEYS */;

INSERT INTO `USERS` (`serial`, `name`, `surname`, `email`, `password`, `nickname`, `birthday`, `teacher`)
VALUES
	(4,'Irene','Colmenar','irelaure@gmail.com','9c0fa4f25e21680aaa9f677419a216ba','','0000-00-00',NULL),
	(7,'Guido','Peralta','irelaure@gmail.com','9c0fa4f25e21680aaa9f677419a216ba','','0000-00-00',NULL),
	(8,'Irene','Colmenar','irelaure@gmail.com','9c0fa4f25e21680aaa9f677419a216ba','','0000-00-00',NULL);

/*!40000 ALTER TABLE `USERS` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
