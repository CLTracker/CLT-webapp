#THIS FILE WILL BE FOR ALL SAMPLE DATA GENERATION


INSERT INTO conference(conference_id, floor_plan, conference_name, start_date, end_date, location, logo_url) VALUES(1, "https://lol.com", "Senior Design Competition", "2017-03-19", "2017-03-20", "4580 Maryland Pkwy", "https://lol2.com");

INSERT INTO permissions(permission_name) VALUES("xhb");
INSERT INTO permissions(permission_name) VALUES("adm");
INSERT INTO permissions(permission_name) VALUES("org");



INSERT INTO users(user_id, name, login_count, last_login, last_ip, email, gender, permissions) VALUES(1, "Steven Brooks", 0, "2017-03-28 00:00:00", "0.0.0.0", "brooks@unlv.nevada.edu", 1, 2);
INSERT INTO users(user_id, name, login_count, last_login, last_ip, email, gender, permissions) VALUES(2, "Lily Lei", 0, "2017-03-28 00:00:00", "0.0.0.0", "leil1@unlv.nevada.edu", 0, 2);
INSERT INTO users(user_id, name, login_count, last_login, last_ip, email, gender, permissions) VALUES(3, "Arjee M", 0, "2017-11-03 00:00:00", "0.0.0.0", "mendej2@unlv.nevada.edu", 1, 2);
INSERT INTO users(user_id, name, login_count, last_login, last_ip, email, gender, permissions) VALUES(4, "Exhib1", 0, "2017-03-28 00:00:00", "0.0.0.0", "exhb1@email.com", 0, 1);
INSERT INTO users(user_id, name, login_count, last_login, last_ip, email, gender, permissions) VALUES(5, "Org1", 0, "2017-03-28 00:00:00", "0.0.0.0", "org1@email.com", 0, 3);
INSERT INTO users(email, user_id, name, permissions) VALUES("org2@email.com", 6, "Org2", 3);
INSERT INTO users(email, user_id, name, permissions) VALUES("org3@email.com", 7, "Org3", 3);
INSERT INTO users(email, user_id, name, permissions) VALUES("org4@email.com", 8, "Org4", 3);
INSERT INTO users(email, user_id, name, permissions) VALUES("org5@email.com", 9, "Org5", 3);
INSERT INTO users(email, user_id, name, permissions) VALUES("xhb2@email.com", 10, "Xhb2", 1);
INSERT INTO users(email, user_id, name, permissions) VALUES("xhb3@email.com", 11, "Xhb3", 1);
INSERT INTO users(email, user_id, name, permissions) VALUES("xhb4@email.com", 12, "Xhb4", 1);
INSERT INTO users(email, user_id, name, permissions) VALUES("xhb5@email.com", 13, "Xhb5", 1);

INSERT INTO permitted_organizers(organizer_email) VALUES("org1@email.com");
INSERT INTO permitted_exhibitors(exhibitor_email) VALUES("exhb1@email.com");

INSERT INTO organizers(organizer_email, conference) VALUES("org1@email.com", 1);
INSERT INTO exhibitors(exhibitor_email, conference, company_name, logo_url) VALUES("exhb1@email.com", 1, "Exxon Mobile", "https://hasdhfkasdjf.com");

INSERT INTO schedule(conference, event_name, start_time, end_time) VALUES(1, "EVENT 1", "2017-03-28 00:00:00", "2017-03-28 00:00:00");
INSERT INTO schedule(conference, event_name, start_time, end_time) VALUES(1, "EVENT 2", "2017-03-28 00:00:00", "2017-03-28 00:00:00");
INSERT INTO schedule(conference, event_name, start_time, end_time) VALUES(1, "EVENT 3", "2017-03-28 00:00:00", "2017-03-28 00:00:00");
