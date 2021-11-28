INSERT INTO users (ccid,full_name,foip,balance)
VALUES ('cstm', 'Customer C',true,20);

INSERT INTO execs (ccid, program)
VALUES ('CompEEXEC','CompE'),
('ElecEEXEC','ElectricalE');

INSERT INTO clubs(name,amount)
VALUES ('ElectricalE',20),
('CompE',20);

INSERT INTO transactions ( club, amount, ccid)
VALUES 
('CompE',-20,'cstm'),
('CompE',40,'cstm'),
('CompE',-50,'cstm'),
('CompE',20,'cstm'),
        ('ElectricalE',-40,'cstm');