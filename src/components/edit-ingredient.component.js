import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import cogoToast from 'cogo-toast';


export default class EditIngredient extends Component {

    constructor(props) {
        super(props);

        this.state = {
            ingredient_name: '',
            ingredient_quantity: 0
        }

        this.onChangeIngredientName = this.onChangeIngredientName.bind(this);
        this.onChangeIngredientQuantity = this.onChangeIngredientQuantity.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:4000/ingredients/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    ingredient_name: response.data.ingredient_name,
                    ingredient_quantity: response.data.ingredient_quantity
                })   
            })
            .catch(function (error) {
                console.log(error);
            })
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

    onSubmit(e) {
        e.preventDefault();
        const obj = {
            ingredient_name: this.state.ingredient_name,
            ingredient_quantity: this.state.ingredient_quantity,
        };
        console.log(obj);
        axios.post('http://localhost:4000/ingredients/update/'+this.props.match.params.id, obj)
            .then(res => console.log(res.data));
        cogoToast.success('Ingredient updated!');
    }

    render() {
        return (
            <div>
                <h3 align="center">Update Ingredient</h3>
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

                    <br />

                    <div className="form-group">
                        <input type="submit" value="Update Ingredient" className="btn btn-primary" style={{marginRight: 10 + 'px'}}/>
                    </div>
                    <Link to={"/"} style={{marginRight: '1em'}}>Back to list</Link>
                </form>
            </div>
        )
    }
}