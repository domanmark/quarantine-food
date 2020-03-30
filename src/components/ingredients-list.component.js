import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Ingredient = props => (
    <tr>
        <td>{props.ingredient.ingredient_name}</td>
        <td>{props.ingredient.ingredient_quantity}</td>
        <td>{props.ingredient.ingredient_units}</td>
        <td>
            <Link to={"/edit/"+props.ingredient._id} style={{marginRight: '1em'}}>Edit</Link>
            <Link to={"/delete/"+props.ingredient._id}>Remove</Link>
        </td>
    </tr>
)

export default class IngredientsList extends Component {

    constructor(props) {
        super(props);
        this.state = {ingredients: []};
    }

    componentDidMount() {
        axios.get('http://localhost:4000/ingredients/')
            .then(response => {
                this.setState({ ingredients: response.data });
            })
            .catch(function (error){
                console.log(error);
            })
    }

    ingredientList() {
        return this.state.ingredients.map(function(currentIngredient, i){
            return <Ingredient ingredient={currentIngredient} key={i} />;
        })
    }

    render() {
        return (
            <div>
                <h3>Ingredients List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Quantity</th>
                            <th>Units</th>
                            <th>Edit / Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.ingredientList() }
                    </tbody>
                </table>
            </div>
        )
    }
}