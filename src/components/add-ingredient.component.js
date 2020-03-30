import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import cogoToast from 'cogo-toast';

export default class CreateIngredient extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ingredient_name: '',
            ingredient_quantity: '',
            ingredient_units: ''
        }

        this.onChangeIngredientName = this.onChangeIngredientName.bind(this);
        this.onChangeIngredientQuantity = this.onChangeIngredientQuantity.bind(this);
        this.onChangeIngredientUnits = this.onChangeIngredientUnits.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangeIngredientName(e) {
        this.setState({
            ingredient_name: e.target.value
        });
    }

    onChangeIngredientQuantity(e) {
        this.setState({
            ingredient_quantity: e.target.value
        });
    }

    onChangeIngredientUnits(e) {
        this.setState({
            ingredient_units: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        
        console.log(`Form submitted:`);
        console.log(`Ingredient Name: ${this.state.ingredient_name}`);
        console.log(`Ingredient Quantity: ${this.state.ingredient_quantity}`);
        console.log(`Ingredient Units: ${this.state.ingredient_units}`);

     
        const newIngredient = {
            ingredient_name: this.state.ingredient_name,
            ingredient_quantity: this.state.ingredient_quantity,
            ingredient_units: this.state.ingredient_units
        };

        axios.post('http://localhost:4000/ingredients/add', newIngredient)
            .then(res => console.log(res.data));
            cogoToast.success('Ingredient added!');

        this.setState({
            ingredient_name: '',
            ingredient_quantity: '',
            ingredient_units: ''
        })

    }

    render() {
        return (
            <div style={{marginTop: 10}}>
                <h3>Add New Ingredient</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                        <label>Name: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.ingredient_name}
                                onChange={this.onChangeIngredientName}
                                />
                    </div>

                    <div className="form-group"> 
                        <label>Quantity: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.ingredient_quantity}
                                onChange={this.onChangeIngredientQuantity}
                                />
                    </div>

                    <div className="form-group">
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input" 
                                    type="radio" 
                                    name="unitOptions" 
                                    id="unitPounds" 
                                    value="Pounds"
                                    checked={this.state.ingredient_units==='Pounds'} 
                                    onChange={this.onChangeIngredientUnits}
                                    />
                            <label className="form-check-label">Pounds</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input" 
                                    type="radio" 
                                    name="unitOptions" 
                                    id="unitJars" 
                                    value="Jars" 
                                    checked={this.state.ingredient_units==='Jars'} 
                                    onChange={this.onChangeIngredientUnits}
                                    />
                            <label className="form-check-label">Jars</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input" 
                                    type="radio" 
                                    name="unitOptions" 
                                    id="unitBags" 
                                    value="Bags" 
                                    checked={this.state.ingredient_units==='Bags'} 
                                    onChange={this.onChangeIngredientUnits}
                                    />
                            <label className="form-check-label">Bags</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input" 
                                    type="radio" 
                                    name="unitOptions" 
                                    id="unitBoxes" 
                                    value="Boxes" 
                                    checked={this.state.ingredient_units==='Boxes'} 
                                    onChange={this.onChangeIngredientUnits}
                                    />
                            <label className="form-check-label">Boxes</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input" 
                                    type="radio" 
                                    name="unitOptions" 
                                    id="unitCans" 
                                    value="Cans" 
                                    checked={this.state.ingredient_units==='Cans'} 
                                    onChange={this.onChangeIngredientUnits}
                                    />
                            <label className="form-check-label">Cans</label>
                        </div>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Add Ingredient" className="btn btn-primary" />
                    </div>
                    <Link to={"/"} style={{marginRight: '1em'}}>Back to list</Link>
                </form>
            </div>
        )
    }
}