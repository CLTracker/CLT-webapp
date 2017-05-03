#THIS FILE WILL BE FOR ALL SAMPLE DATA GENERATION


INSERT INTO conference(conference_id, floor_plan, conference_name, start_date, end_date, location, logo_url) VALUES(1, "https://lol.com", "Senior Design Competition", "2017-03-19", "2017-03-20", "4580 Maryland Pkwy", "http://i.imgur.com/3TLT7QN.png");

INSERT INTO permissions(permission_name) VALUES("xhb");
INSERT INTO permissions(permission_name) VALUES("adm");
INSERT INTO permissions(permission_name) VALUES("org");



INSERT INTO users(user_id, name, login_count, last_login, last_ip, email, gender, permissions) VALUES("1", "Steven Brooks", 0, "2017-03-28 00:00:00", "0.0.0.0", "brooks@unlv.nevada.edu", 1, 2);
INSERT INTO users(user_id, name, login_count, last_login, last_ip, email, gender, permissions) VALUES("2", "Lily Lei", 0, "2017-03-28 00:00:00", "0.0.0.0", "leil1@unlv.nevada.edu", 0, 3);
INSERT INTO users(user_id, name, login_count, last_login, last_ip, email, gender, permissions) VALUES("3", "Arjee M", 0, "2017-11-03 00:00:00", "0.0.0.0", "mendej2@unlv.nevada.edu", 1, 2);
INSERT INTO users(user_id, name, login_count, last_login, last_ip, email, gender, permissions) VALUES("4", "HP", 0, "2017-03-28 00:00:00", "0.0.0.0", "hpexample@email.com", 0, 1);
INSERT INTO users(user_id, name, login_count, last_login, last_ip, email, gender, permissions) VALUES("5", "Apple", 0, "2017-03-28 00:00:00", "0.0.0.0", "appleexample@email.com", 0, 1);
INSERT INTO users(user_id, name, login_count, last_login, last_ip, email, gender, permissions) VALUES("6", "Tesla", 0, "2017-03-28 00:00:00", "0.0.0.0", "teslaexample@email.com", 0, 1);
INSERT INTO users(user_id, name, login_count, last_login, last_ip, email, gender, permissions) VALUES("7", "AT&T", 0, "2017-03-28 00:00:00", "0.0.0.0", "attexample@email.com", 0, 1);
INSERT INTO users(user_id, name, login_count, last_login, last_ip, email, gender, permissions) VALUES("google-oauth2|105950922553210130192", "Grant Organizer", 0, "2017-03-28 00:00:00", "0.0.0.0", "gmercer015@gmail.com", 0, 3);
INSERT INTO users(user_id, name, login_count, last_login, last_ip, email, gender, permissions) VALUES("8", "Grant Exhibitor", 0, "2017-03-28 00:00:00", "0.0.0.0", "mercerg2@unlv.nevada.edu", 0, 1);

INSERT INTO permitted_organizers(organizer_email, conference_id) VALUES("gmercer015@gmail.com",1 );
INSERT INTO permitted_organizers(organizer_email, conference_id) VALUES("leil1@unlv.nevada.edu",1 );
INSERT INTO permitted_organizers(organizer_email, conference_id) VALUES("conventionlogisticstracker@gmail.com",1 );
INSERT INTO permitted_exhibitors(exhibitor_email, conference_id) VALUES("hpexample@email.com",1);
INSERT INTO permitted_exhibitors(exhibitor_email, conference_id) VALUES("appleexample@email.com",1);
INSERT INTO permitted_exhibitors(exhibitor_email, conference_id) VALUES("teslaexample@email.com",1);
INSERT INTO permitted_exhibitors(exhibitor_email, conference_id) VALUES("attexample@email.com",1);
INSERT INTO permitted_exhibitors(exhibitor_email, conference_id) VALUES("mercerg2@unlv.nevada.edu",1);

INSERT INTO organizers(organizer_email, conference) VALUES("gmercer015@gmail.com", 1);
INSERT INTO exhibitors(exhibitor_email, conference, company_name, logo_url) VALUES("hpexample@email.com", 1, "HP", "http://i.imgur.com/qtDcA1z.png?1");
INSERT INTO exhibitors(exhibitor_email, conference, company_name, logo_url) VALUES("appleexample@email.com", 1, "Apple", "http://i.imgur.com/3Vhuu59.jpg?1");
INSERT INTO exhibitors(exhibitor_email, conference, company_name, logo_url) VALUES("teslaexample@email.com", 1, "Tesla", "http://i.imgur.com/TV171o1.png?1");
INSERT INTO exhibitors(exhibitor_email, conference, company_name, logo_url) VALUES("attexample@email.com", 1, "AT&T", "http://i.imgur.com/s7YTXDu.png?1");
INSERT INTO exhibitors(exhibitor_email, conference, company_name, logo_url) VALUES("mercerg2@unlv.nevada.edu", 1, "Grant Exhibitor", "http://i.imgur.com/3TLT7QN.png");

INSERT INTO schedule(conference, event_name, start_time, end_time,primary_color,secondary_color) VALUES(1, "AT&T Giveaway", "2017-04-28 08:00:00", "2017-04-29 00:00:00", "#ffffff", "#FAE3E3");
INSERT INTO schedule(conference, event_name, start_time, end_time,primary_color,secondary_color) VALUES(1, "Tesla Keynote Speech", "2017-04-28 09:00:00", "2017-04-28 11:00:00", "#ffffff", "#FAE3E3");
INSERT INTO schedule(conference, event_name, start_time, end_time,primary_color,secondary_color) VALUES(1, "Apple Design Experience", "2017-04-28 00:00:00", "2017-05-03 04:00:00", "#ffffff", "#FAE3E3");
INSERT INTO schedule(conference, event_name, start_time, end_time,primary_color,secondary_color) VALUES(1, "HP Future Product Plan", "2017-04-28 00:00:00", "2017-04-29 00:00:00", "#ffffff", "#FAE3E3");
INSERT INTO schedule(conference, event_name, start_time, end_time,primary_color,secondary_color) VALUES(1, "Conference Raffle Drawing", "2017-05-01 09:00:00", "2017-05-01 10:00:00", "#ffffff", "#FAE3E3");

INSERT INTO news(conference, title, logo_url, text, author) VALUES (1, "Senior Design Kicks Off!", "http://i.imgur.com/3TLT7QN.png", "Check out all the projects of this year's teams!", "UNLV");
INSERT INTO news(conference, title, logo_url, text, author) VALUES (1, "Swag Giveaway", "http://i.imgur.com/s7YTXDu.png?1", "Stop by the AT&T booth for free swag!", "AT&T");
INSERT INTO news(conference, title, logo_url, text, author) VALUES (1, "Guest Speaker", "http://i.imgur.com/TV171o1.png?1", "Come listen to our head of AI devlopment speak on his work process.", "Tesla");
INSERT INTO news(conference, title, logo_url, text, author) VALUES (1, "New Product Unveiling", "http://i.imgur.com/qtDcA1z.png?1", "See the new product we have been working on for the last year!", "HP");
INSERT INTO news(conference, title, logo_url, text, author) VALUES (1, "UX Team Panel", "http://i.imgur.com/3Vhuu59.jpg?1", "Ask a few members of our User Experience team any questions you may have!", "Apple");