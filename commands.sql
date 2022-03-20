CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text,
    url text NOT NULL,
    title text NOT NULL,
    likes integer DEFAULT 0
);

INSERT INTO blogs (author, url, title) VALUES ('Test author 1', 'Test url 1', 'Test title 1');
INSERT INTO blogs (author, url, title) VALUES ('Test author 2', 'Test url 2', 'Test title 2');