-- MySQL Script generated by MySQL Workbench
-- 03/30/17 18:20:24
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `mydb` ;

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`permissions`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`permissions` ;

CREATE TABLE IF NOT EXISTS `mydb`.`permissions` (
  `permission_id` INT NOT NULL AUTO_INCREMENT,
  `permission_name` VARCHAR(3) NULL,
  PRIMARY KEY (`permission_id`),
  UNIQUE INDEX `permission_name_UNIQUE` (`permission_name` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`users` ;

CREATE TABLE IF NOT EXISTS `mydb`.`users` (
  `user_id` INT NOT NULL,
  `username` VARCHAR(45) NOT NULL,
  `login_count` INT NULL,
  `last_login` DATETIME NULL,
  `last_ip` VARCHAR(45) NULL,
  `email` VARCHAR(45) NOT NULL,
  `gender` BINARY(1) NULL,
  `permissions` INT(1) NOT NULL,
  PRIMARY KEY (`user_id`, `username`, `email`),
  INDEX `permission_key_idx` (`permissions` ASC),
  CONSTRAINT `permission_key`
    FOREIGN KEY (`permissions`)
    REFERENCES `mydb`.`permissions` (`permission_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`admins`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`admins` ;

CREATE TABLE IF NOT EXISTS `mydb`.`admins` (
  `admin_id` INT NOT NULL,
  `username` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`admin_id`),
  CONSTRAINT `admin_id`
    FOREIGN KEY (`admin_id`)
    REFERENCES `mydb`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`conference`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`conference` ;

CREATE TABLE IF NOT EXISTS `mydb`.`conference` (
  `conference_id` INT NOT NULL,
  `floor_plan` VARCHAR(45) NOT NULL,
  `conference_name` VARCHAR(45) NOT NULL,
  `start_date` DATE NOT NULL,
  `end_date` DATE NOT NULL,
  `location` VARCHAR(45) NOT NULL,
  `logo_url` VARCHAR(45) NULL,
  PRIMARY KEY (`conference_id`, `floor_plan`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`permitted_exhibitors`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`permitted_exhibitors` ;

CREATE TABLE IF NOT EXISTS `mydb`.`permitted_exhibitors` (
  `exhibitor_id` INT NOT NULL,
  `conference` INT NULL,
  `exhibitor_name` VARCHAR(45) NULL,
  `contact_phone` VARCHAR(45) NULL,
  `contact_email` VARCHAR(45) NULL,
  `logo_url` VARCHAR(45) NULL,
  PRIMARY KEY (`exhibitor_id`),
  INDEX `conference_idx` (`conference` ASC),
  CONSTRAINT `p_exhibitor_id`
    FOREIGN KEY (`exhibitor_id`)
    REFERENCES `mydb`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `conference_pexh`
    FOREIGN KEY (`conference`)
    REFERENCES `mydb`.`conference` (`conference_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`exhibitors`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`exhibitors` ;

CREATE TABLE IF NOT EXISTS `mydb`.`exhibitors` (
  `exhibitor_id` INT NOT NULL,
  `exhibitor_name` VARCHAR(45) NULL,
  `contact_phone` VARCHAR(45) NULL,
  `contact_email` VARCHAR(45) NULL,
  `conference` INT NULL,
  `logo_url` VARCHAR(45) NULL,
  PRIMARY KEY (`exhibitor_id`),
  INDEX `conference_idx` (`conference` ASC),
  CONSTRAINT `exhibitor_id`
    FOREIGN KEY (`exhibitor_id`)
    REFERENCES `mydb`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `conference_exh`
    FOREIGN KEY (`conference`)
    REFERENCES `mydb`.`conference` (`conference_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`organizers`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`organizers` ;

CREATE TABLE IF NOT EXISTS `mydb`.`organizers` (
  `organizer_id` INT NOT NULL,
  `conference` INT NULL,
  `organizer_name` VARCHAR(45) NULL,
  `contact_phone` VARCHAR(45) NULL,
  `contact_email` VARCHAR(45) NULL,
  PRIMARY KEY (`organizer_id`),
  INDEX `conference_idx` (`conference` ASC),
  CONSTRAINT `organizer_id`
    FOREIGN KEY (`organizer_id`)
    REFERENCES `mydb`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `conference_org`
    FOREIGN KEY (`conference`)
    REFERENCES `mydb`.`conference` (`conference_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`permitted_organizers`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`permitted_organizers` ;

CREATE TABLE IF NOT EXISTS `mydb`.`permitted_organizers` (
  `organizer_id` INT NOT NULL,
  `conference` INT NULL,
  `exhibitor_name` VARCHAR(45) NULL,
  `contact_phone` VARCHAR(45) NULL,
  `contact_email` VARCHAR(45) NULL,
  PRIMARY KEY (`organizer_id`),
  INDEX `conference_idx` (`conference` ASC),
  CONSTRAINT `p_organizer_id`
    FOREIGN KEY (`organizer_id`)
    REFERENCES `mydb`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `conference_porg`
    FOREIGN KEY (`conference`)
    REFERENCES `mydb`.`conference` (`conference_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`schedule`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`schedule` ;

CREATE TABLE IF NOT EXISTS `mydb`.`schedule` (
  `conference` INT NULL,
  `event_name` VARCHAR(45) NOT NULL,
  `start_time` DATETIME NOT NULL,
  `end_time` DATETIME NOT NULL,
  INDEX `conference_idx` (`conference` ASC),
  CONSTRAINT `conference`
    FOREIGN KEY (`conference`)
    REFERENCES `mydb`.`conference` (`conference_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
