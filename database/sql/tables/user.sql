CREATE TABLE IF NOT EXISTS user (
  userId INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  firstName VARCHAR(125) NOT NULL,
  lastName VARCHAR(125) NOT NULL,
  email VARCHAR(175) NOT NULL,
  passwordHash VARCHAR(255) NOT NULL
);