const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const ingredientRoutes = express.Router();
const PORT = 4000;

let Ingredient = require('./ingredient.model');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/ingredients', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

ingredientRoutes.route('/').get(function(req, res) {
    Ingredient.find(function(err, ingredients) {
        if (err) {
            console.log(err);
        } else {
            res.json(ingredients);
        }
    });
});

ingredientRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Ingredient.findById(id, function(err, ingredient) {
        res.json(ingredient);
    });
});

ingredientRoutes.route('/update/:id').post(function(req, res) {
    Ingredient.findById(req.params.id, function(err, ingredient) {
        if (!ingredient)
            res.status(404).send("data is not found");
        else
            ingredient.ingredient_name = req.body.ingredient_name;
            ingredient.ingredient_quantity = req.body.ingredient_quantity;

            ingredient.save().then(ingredient => {
                res.json('Ingredient updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

ingredientRoutes.route('/delete/:id').delete(function(req, res) {
    Ingredient.findByIdAndRemove(req.params.id, function(err, ingredient) {
        if (!ingredient)
            res.status(404).send("data is not found");
    });
});

ingredientRoutes.route('/add').post(function(req, res) {
    let ingredient = new Ingredient(req.body);
    ingredient.save()
        .then(ingredient => {
            res.status(200).json({'ingredient': 'ingredient added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new ingredient failed');
        });
});

app.use('/ingredients', ingredientRoutes);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});