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
        promptCustomer();
        //connection.end();

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
            name: 'quantity',
            message: 'How many do you want?'
        }
    ]).then(function (input) {
        var item = input.enter_id;
        var quantity = input.quantity;


        connection.query('SELECT * FROM products WHERE ?', {item_id: item}, function (err, res){
          var cost = res[0].price * quantity;
          updatedQuantity = res[0].stock_quantity - quantity;
          if (err) throw err;

          console.log(cost);

          if (res[0].stock_quantity < quantity) {
            console.log("I'm sorry, we do not have enough of that product!");
            connection.end();
          } else if
            (res[0].stock_quantity >= quantity) {
              console.log("Thank you for your purchase!\nOrdering....")

              connection.query('UPDATE products SET ? WHERE ?',[{stock_quantity: updatedQuantity}, {item_id: item}], function (err, res){
                //connection.query('UPDATE products SET ? WHERE ?',[{stock_quantity: quantity}, {item_id: item}])
                if (err) throw err;

                console.log("Your order has been processed. Your total is $" + cost);
                connection.end();
              })
              //console.log(res);
            }



        })


    })
}
