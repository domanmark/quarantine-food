import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import cogoToast from 'cogo-toast';


export default class DeleteIngredient extends Component {


    componentDidMount() {
        axios.delete('http://localhost:4000/ingredients/delete/'+this.props.match.params.id)
            .then(response => {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            })
            cogoToast.success('Ingredient deleted!');
    }

    render() {
        return (
            <div>
                <Link to={"/"} style={{marginRight: '1em'}}>Back to list</Link>
            </div>
        )
    }
}