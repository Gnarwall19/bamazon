DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products(
item_id INT NOT NULL AUTO_INCREMENT,
product_name VARCHAR(50) NOT NULL,
department_name VARCHAR(50) NOT NULL,
price DECIMAL(10,2) NOT NULL,
stock_quantity INT NOT NULL,
PRIMARY KEY (item_id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Unicorn Wine Holder", "Home & Kitchen", 19.95, 12),
				("Dungeons & Dragons Player's Handbook", "Books", 29.97, 53),
                ("Squatty Potty", "Home & Kitchen", 23.74, 127),
                ("Dash Rapid Egg Cooker", "Home & Kitchen", 22.99, 72),
                ("Korean Sheet Masks", "Cosmetics", 9.22, 88),
                ("Shark Cat Bed", "Pet", 19.99, 6),
                ("Foot Hammock", "Home & Kitchen", 8.80, 24),
                ("Star Wars Droid Inventor Kit", "Toys & Games", 99.00, 32),
                ("FURemover Broom", "Home & Kitchen", 18.50, 54),
                ("Battleship Game", "Toys & Games", 12.79, 112);