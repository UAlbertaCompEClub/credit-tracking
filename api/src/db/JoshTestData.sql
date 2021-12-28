INSERT INTO users (ccid,isExec,full_name,foip,balance)
VALUES ('cstm',false, 'Customer C',true,20),
('CompEEXEC',true,'larry',true,10),
('ElecEEXEC',true,'Barry',true,10)
('fiaz',true,'M.Fiaz',true,20);

INSERT INTO execs (ccid, password,clubid)
VALUES ('CompEEXEC','execPassword',1),
('ElecEEXEC','execPassword',0);

INSERT INTO clubs(clubid,clubname,amount)
VALUES (0,'ElectricalE',20),
(1,'CompE',20);

INSERT INTO transactions ( clubid, amount, ccid)
VALUES 
('1',-20,'cstm'),
('1',40,'cstm'),
('1',-50,'cstm'),
('1',20,'cstm'),
('0',-40,'cstm');