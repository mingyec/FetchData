/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50717
Source Host           : localhost:3306
Source Database       : fetchdata

Target Server Type    : MYSQL
Target Server Version : 50717
File Encoding         : 65001

Date: 2017-06-03 11:11:03
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for forecast_meteorological
-- ----------------------------
DROP TABLE IF EXISTS `forecast_meteorological`;
CREATE TABLE `forecast_meteorological` (
  `site` varchar(255) COLLATE utf8_unicode_520_ci DEFAULT NULL COMMENT '地区',
  `fetch_time` datetime DEFAULT NULL COMMENT '抓取时间',
  `forecast_day` datetime DEFAULT NULL COMMENT '预测时间',
  `forecast_temp` varchar(255) COLLATE utf8_unicode_520_ci DEFAULT NULL COMMENT '预测温度'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_520_ci;
