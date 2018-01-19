import React, { Component } from 'react';

class AddRecipeForm extends Component {

    state = {
      title: '',
      ingredientsList: []
    }
  
    onTitleChange =(e)=> {
      this.setState({
          title: e.target.value
      });
    }
  
    onIngredientsListChange =(e)=> {
      this.setState({
        ingredientsList: e.target.value.split(",")
      });
    }
  
    render(){
      return(
        <div className="overlay" >
          <div className="container">
            <div className="form-group">
                <label htmlFor="recipeTitle">Recipe's Name</label>
                <input 
                  type="text" 
                  className="form-control" 
                  id="recipeTitle" 
                  placeholder="Recipe's Name"
                  value={this.state.title}
                  onChange={this.onTitleChange.bind(this)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="recipeIngredients">Ingredients</label>
                <textarea className="form-control" 
                  id="recipeIngredients" 
                  rows="3" 
                  placeholder='Ingredients...'
                  value={this.state.ingredientsList}
                  onChange={this.onIngredientsListChange.bind(this)}
                />
              </div>
            <button className="btn btn-success" onClick={()=> this.props.add(this.state.title, this.state.ingredientsList)}>Create</button>
            <button className="btn btn-warning" onClick={()=>this.props.back()}>Cancel</button>   
          </div>   
        </div>
      );
    }
  };

  export default AddRecipeForm;