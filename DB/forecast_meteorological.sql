/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50717
Source Host           : localhost:3306
Source Database       : fetchdata

Target Server Type    : MYSQL
Target Server Version : 50717
File Encoding         : 65001

Date: 2017-06-04 21:25:51
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for forecast_meteorological
-- ----------------------------
DROP TABLE IF EXISTS `forecast_meteorological`;
CREATE TABLE `forecast_meteorological` (
  `local` varchar(255) COLLATE utf8_unicode_520_ci DEFAULT NULL COMMENT '地区',
  `forecast_day` datetime DEFAULT NULL COMMENT '预测时间',
  `temp_00` varchar(255) COLLATE utf8_unicode_520_ci DEFAULT NULL COMMENT '预测温度00:00',
  `temp_01` varchar(255) COLLATE utf8_unicode_520_ci DEFAULT NULL COMMENT '预测温度01:00',
  `temp_02` varchar(255) COLLATE utf8_unicode_520_ci DEFAULT NULL COMMENT '预测温度02:00',
  `temp_03` varchar(255) COLLATE utf8_unicode_520_ci DEFAULT NULL COMMENT '预测温度03:00',
  `temp_04` varchar(255) COLLATE utf8_unicode_520_ci DEFAULT NULL COMMENT '预测温度04:00',
  `temp_05` varchar(255) COLLATE utf8_unicode_520_ci DEFAULT NULL,
  `temp_06` varchar(255) COLLATE utf8_unicode_520_ci DEFAULT NULL,
  `temp_07` varchar(255) COLLATE utf8_unicode_520_ci DEFAULT NULL,
  `temp_08` varchar(255) COLLATE utf8_unicode_520_ci DEFAULT NULL,
  `temp_09` varchar(255) COLLATE utf8_unicode_520_ci DEFAULT NULL,
  `temp_10` varchar(255) COLLATE utf8_unicode_520_ci DEFAULT NULL,
  `temp_11` varchar(255) COLLATE utf8_unicode_520_ci DEFAULT NULL,
  `temp_12` varchar(255) COLLATE utf8_unicode_520_ci DEFAULT NULL,
  `temp_13` varchar(255) COLLATE utf8_unicode_520_ci DEFAULT NULL,
  `temp_14` varchar(255) COLLATE utf8_unicode_520_ci DEFAULT NULL,
  `temp_15` varchar(255) COLLATE utf8_unicode_520_ci DEFAULT NULL,
  `temp_16` varchar(255) COLLATE utf8_unicode_520_ci DEFAULT NULL,
  `temp_17` varchar(255) COLLATE utf8_unicode_520_ci DEFAULT NULL,
  `temp_18` varchar(255) COLLATE utf8_unicode_520_ci DEFAULT NULL,
  `temp_19` varchar(255) COLLATE utf8_unicode_520_ci DEFAULT NULL,
  `temp_20` varchar(255) COLLATE utf8_unicode_520_ci DEFAULT NULL,
  `temp_21` varchar(255) COLLATE utf8_unicode_520_ci DEFAULT NULL,
  `temp_22` varchar(255) COLLATE utf8_unicode_520_ci DEFAULT NULL,
  `temp_23` varchar(255) COLLATE utf8_unicode_520_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_520_ci;
