CREATE TABLE tb_users (
    id           INT            NOT NULL AUTO_INCREMENT,
    name         VARCHAR(32)    NOT NULL,
    email        VARCHAR(255)   NOT NULL,
    password     CHAR(32)       NOT NULL,
    created_at   DATETIME(3)    NOT NULL,
    updated_at   DATETIME(3)    NOT NULL,
    PRIMARY KEY (id),
	UNIQUE INDEX uq_email_01 (email)
)
ENGINE=InnoDB
;
INSERT INTO tb_users (name, email, password, created_at, updated_at) VALUES ('C.Ronald', 'ronald@xloud.com', md5('cronald07'), now(3), now(3));
INSERT INTO tb_users (name, email, password, created_at, updated_at) VALUES ('L.Messi', 'messi@xloud.com', md5('rmessi10'), now(3), now(3));
INSERT INTO tb_users (name, email, password, created_at, updated_at) VALUES ('D.Beckham', 'beckham@xloud.com', md5('dbeckham07'), now(3), now(3));
INSERT INTO tb_users (name, email, password, created_at, updated_at) VALUES ('F.Totti', 'totti@xloud.com', md5('ftotti10'), now(3), now(3));
INSERT INTO tb_users (name, email, password, created_at, updated_at) VALUES ('Z.Zidane', 'zidane@xloud.com', md5('zyzidane10'), now(3), now(3));
INSERT INTO tb_users (name, email, password, created_at, updated_at) VALUES ('L.Figo', 'figo@xloud.com', md5('luisfigo10'), now(3), now(3));
INSERT INTO tb_users (name, email, password, created_at, updated_at) VALUES ('Ronaldo', 'fenomeno@xloud.com', md5('fenomeno09'), now(3), now(3));
