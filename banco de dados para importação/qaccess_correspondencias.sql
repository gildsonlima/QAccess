-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: qaccess
-- ------------------------------------------------------
-- Server version	8.0.29

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `correspondencias`
--

DROP TABLE IF EXISTS `correspondencias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `correspondencias` (
  `idCorrespondencia` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8_unicode_ci NOT NULL,
  `remetente` varchar(250) CHARACTER SET utf8mb3 COLLATE utf8_unicode_ci DEFAULT NULL,
  `idUnidade` varchar(250) CHARACTER SET utf8mb3 COLLATE utf8_unicode_ci DEFAULT NULL,
  `status` varchar(250) CHARACTER SET utf8mb3 COLLATE utf8_unicode_ci DEFAULT NULL,
  `idFuncionarioRecepcao` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8_unicode_ci DEFAULT NULL,
  `idFuncionarioRetirada` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8_unicode_ci DEFAULT NULL,
  `dataRecepcaoCondominio` datetime DEFAULT NULL,
  `dataRecepcaoCondomino` datetime DEFAULT NULL,
  `idCondominoRetirada` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8_unicode_ci DEFAULT NULL,
  `tipoDeEncomenda` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `indentificacaoEncomenda` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `destinatario` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`idCorrespondencia`),
  UNIQUE KEY `idCorrespondencia_UNIQUE` (`idCorrespondencia`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `correspondencias`
--

LOCK TABLES `correspondencias` WRITE;
/*!40000 ALTER TABLE `correspondencias` DISABLE KEYS */;
INSERT INTO `correspondencias` VALUES ('9b5350b1-b3fd-4cb4-98f7-1f223abc0c98','AMAZON','101','Pendente','jose',NULL,'2022-06-20 16:01:34',NULL,NULL,'caixa','dasdasda','daltro');
/*!40000 ALTER TABLE `correspondencias` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-06-20 16:02:40
