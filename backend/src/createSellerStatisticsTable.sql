CREATE TABLE seller_statistics (
    id INT AUTO_INCREMENT PRIMARY KEY,
    statisticName VARCHAR(255) NOT NULL,
    isVisible BOOLEAN DEFAULT FALSE,
    sellerId INT,
    FOREIGN KEY (sellerId) REFERENCES users(id) ON DELETE CASCADE
);