INSERT INTO users (ccid,isExec,full_name,foip,balance,password)
VALUES ('jyw2',true,'Josh',true,20, '$2b$10$87WU0jq76BcNqbAAyev30evZnsC8YRkWUgWaQriOKummAqMWK/eRe');
INSERT INTO users (ccid,isExec,full_name,foip,balance,password)
VALUES ('xuyang4',true,'kevin',true,20, '$2b$10$23QdV.SE55G6/CvYdUbhH.VLcE.unI4ywX4WZGX2Us.erVEQREwSi');

INSERT INTO execs (ccid, clubid)
VALUES ('jyw2',0);
INSERT INTO execs (ccid, clubid)
VALUES ('xuyang4',1);
('ElecEEXEC','execPassword',0);

INSERT INTO clubs(clubid,clubname,amount)
VALUES (0,'CompE',20);
(1,'CompE',20);

INSERT INTO transactions ( clubid, amount, ccid)
VALUES 
('1',-20,'cstm'),
('1',40,'cstm'),
('1',-50,'cstm'),
('1',20,'cstm'),
('0',-40,'cstm');