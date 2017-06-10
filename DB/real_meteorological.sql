/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50624
Source Host           : localhost:3306
Source Database       : fetchdata

Target Server Type    : MYSQL
Target Server Version : 50624
File Encoding         : 65001

Date: 2017-06-10 12:43:34
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for real_meteorological
-- ----------------------------
DROP TABLE IF EXISTS `real_meteorological`;
CREATE TABLE `real_meteorological` (
  `date_time` datetime NOT NULL COMMENT '时间',
  `local` varchar(255) COLLATE utf8_unicode_520_ci NOT NULL COMMENT '地区',
  `temp` float(255,0) DEFAULT NULL COMMENT '温度',
  `hum` float(255,0) DEFAULT NULL COMMENT '湿度',
  `dew` float(255,0) DEFAULT NULL COMMENT '露点',
  `wind_speed` float(255,0) DEFAULT NULL COMMENT '风速(米/秒)',
  `wind_direction` varchar(255) COLLATE utf8_unicode_520_ci DEFAULT NULL COMMENT '风向',
  `real_feel` float(255,0) DEFAULT NULL COMMENT '体感温度',
  PRIMARY KEY (`local`,`date_time`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_520_ci;
