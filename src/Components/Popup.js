import React from 'react';

const popup = (props) =>  { 

    return (
      <div className="overlay" >
        <div className="container">
        <div className="form-group">
            <label htmlFor="recipeTitle">Recipe's Name</label>
            <input 
              type="text" 
              className="form-control" 
              id="recipeTitle" 
              value={props.recipe}
              onChange={props.titleUp}
            />
          </div>
          <div className="form-group">
            <label htmlFor="recipeIngredients">Ingredients</label>
            <textarea className="form-control" 
              id="recipeIngredients" 
              rows="3" 
              value={props.ingredients}
              onChange={props.ingredientsUp}
            >
            </textarea>
          </div>
          <button className="btn btn-success" onClick={props.save}>Save</button>
          <button className="btn btn-warning" onClick={props.cancel}>Cancel</button>  
        </div>
            
      </div>
    );
  }

  export default popup