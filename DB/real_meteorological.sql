/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50717
Source Host           : localhost:3306
Source Database       : fetchdata

Target Server Type    : MYSQL
Target Server Version : 50717
File Encoding         : 65001

Date: 2017-06-03 11:10:53
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for real_meteorological
-- ----------------------------
DROP TABLE IF EXISTS `real_meteorological`;
CREATE TABLE `real_meteorological` (
  `date_time` datetime DEFAULT NULL COMMENT '时间',
  `local` varchar(255) COLLATE utf8_unicode_520_ci DEFAULT NULL COMMENT '地区',
  `temp` varchar(255) COLLATE utf8_unicode_520_ci DEFAULT NULL COMMENT '温度',
  `hum` varchar(255) COLLATE utf8_unicode_520_ci DEFAULT NULL COMMENT '湿度',
  `dew` varchar(255) COLLATE utf8_unicode_520_ci DEFAULT NULL COMMENT '露点',
  `wind_speed` varchar(255) CHARACTER SET utf8mb4 DEFAULT NULL COMMENT '风速',
  `wind_direction` varchar(255) COLLATE utf8_unicode_520_ci DEFAULT NULL COMMENT '风向',
  `real_feel` varchar(255) COLLATE utf8_unicode_520_ci DEFAULT NULL COMMENT '体感温度'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_520_ci;
