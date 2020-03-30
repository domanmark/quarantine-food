const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Ingredient = new Schema({
    ingredient_name: {
        type: String
    },
    ingredient_quantity: {
        type: Number
    },
    ingredient_meals: {
        type: Array
    },
    ingredient_units: {
        type: String
    }
    
});

module.exports = mongoose.model('Ingredient', Ingredient);