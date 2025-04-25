CREATE TABLE seller_statistics (
    id INT AUTO_INCREMENT PRIMARY KEY,
    statisticName VARCHAR(255),
    isVisible BOOLEAN,
    sellerId INT,
    FOREIGN KEY (sellerId) REFERENCES users(id)
);