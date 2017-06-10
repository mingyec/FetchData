/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50624
Source Host           : localhost:3306
Source Database       : fetchdata

Target Server Type    : MYSQL
Target Server Version : 50624
File Encoding         : 65001

Date: 2017-06-10 12:43:45
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for forecast_meteo
-- ----------------------------
DROP TABLE IF EXISTS `forecast_meteo`;
CREATE TABLE `forecast_meteo` (
  `local` varchar(255) NOT NULL COMMENT '地区',
  `time` datetime NOT NULL COMMENT '预测时间',
  `temp` float(255,0) DEFAULT NULL COMMENT '预测温度',
  PRIMARY KEY (`local`,`time`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
