var mysql = require('mysql');
var inquirer = require('inquirer');
var Table = require('cli-table');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "delilah",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;

    start();
})

function start() {
    connection.query('SELECT * FROM products', function (err, res) {
        if (err) throw err;

        var table = new Table({
            head: ['ID', 'PRODUCT', 'DEPARTMENT', 'PRICE', 'STOCK']

        })

        for (i = 0; i < res.length; i++) {
            table.push([res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]);
        }


        console.log(table.toString());

        connection.end();

    });
};

function promptCustomer() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'enter_id',
            message: 'Please input the ID of the desired PRODUCT',

        },
        {
            type: 'input',
            name: 'enter_quantity',
            message: 'How many do you want?'
        }
    ]).then(function (input) {
        var item = input.enter_id;
        var quantity = input.quantity;


    })
}