CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  pass_word VARCHAR(255) NOT NULL,
  socket_id VARCHAR(255) NOT NULL UNIQUE
);

INSERT INTO users (username, password) VALUES ($1, $2);
```