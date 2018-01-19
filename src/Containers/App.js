import React, { Component } from 'react';
import './App.css';
import AddRecipeForm from './AddRecipeForm';
import RecipeList from '../Components/RecipeList';

import uuid from 'uuid';

// Custom setup for user first access 

const localStorageState = {
  recipes: [
    {recipe: "Eggnog",
    ingredients: ["6 egg yolks", "3/4 cup sugar","2 cups of milk",
    "2 whole cloves", "pinch of cinnamon","1 cup heavy cream","1 teaspoon freshly grated nutmeg (lightly packed)",
    "1 1/2 teaspoons vanilla extract","2 Tbsp each of bourbon and rum, or to taste","4 egg whites (optional)"],
    showList: false,
    edit: false,
    id: uuid()
    },
    {recipe: "Pork Stir Fry with Green Onion",
    ingredients: ["1 pound pork loin or boneless pork chops", "2 Tbsp soy sauce (use gluten-free soy sauce if cooking gluten-free)","1 teaspoon sugar",
    "1 teaspoon cornstarch", "4 Tbsp peanut oil or other high smoke point oil (canola, rice bran, or grape seed)","5 cloves garlic, thinly sliced","8-12 scallions/green onions, sliced diagonally into 1 to 2-inch pieces, green and white parts included",
    "1/2 teaspoon sesame oil (optional)"],
    showList: false,
    edit: false,
    id: uuid()
    },
  ],
  addRecipe: false,
};

if(localStorage.length === 0){
  localStorage.setItem('state', JSON.stringify(localStorageState));
}

class App extends Component {

  state = JSON.parse(localStorage.getItem('state'));

  onTitleChangeHandler = (event, index) => {
    const recipe = {...this.state.recipes[index]};

    recipe.recipe = event.target.value;

    const recipes = [...this.state.recipes];

    recipes[index] = recipe;

    this.setState({ recipes })
  }

  onIngredientsChangeHandler = (event, index) => {
    const recipe = {...this.state.recipes[index]};

    let ingredientsList = recipe.ingredients.join();

    ingredientsList = event.target.value;

    recipe.ingredients = ingredientsList.split(",");

    const recipes = [...this.state.recipes];

    recipes[index] = recipe;

    this.setState({ recipes })
  }

  toggleShowHandler = (el, index) => {

    const recipes = [...this.state.recipes];

    const show = this.state.recipes[index].showList;

    recipes[index].showList = !show;

    this.setState({ recipes })

  }

  editClickHandler = (index) => {

    const recipes = [...this.state.recipes];

    const showEdit = this.state.recipes[index].edit;

    recipes[index].edit = !showEdit;

    recipes[index].showList = false;

    this.setState({ recipes })
    
    
  }

  deleteRecipeHandler = (index) => {

    const recipes = [...this.state.recipes];
    
    recipes.splice(index ,1);

    recipes.forEach(el=> {
      el.showList = false;
      el.edit = false;
    });

    this.setState({ recipes },
      ()=> localStorage.setItem('state', JSON.stringify(this.state)));

  }

  addRecipeHandler = (title, ingredients) => {

    if(title !== "" && ingredients.length > 0){
      const recipes = [...this.state.recipes];

      recipes.push(
        {
          recipe: title,
          ingredients: ingredients,
          showList: false,
          edit: false,
          id: uuid()
        }
      );

      recipes.forEach(el=> {
        el.showList = false;
        el.edit = false;
      });

      this.setState({ 
        recipes: recipes,
        addRecipe: !this.state.addRecipe
      },()=> localStorage.setItem('state', JSON.stringify(this.state)));
    } else {
      alert("Please fill out all the fields")
    }
  };

  cancelEditClicked = (index) => {
    const prevState = JSON.parse(localStorage.getItem('state'));

    const recipes = [...prevState.recipes];

    recipes.forEach(el=> {
      el.showList = false;
      el.edit = false;
    });

    this.setState({ recipes },
      ()=>localStorage.setItem('state', JSON.stringify(this.state)));
  }

  saveChangesHandler = (index) => {
    if(this.state.recipes[index].recipe !== "" && this.state.recipes[index].ingredients.length > 0){
      const recipes = [...this.state.recipes];

      recipes[index].edit = false;
  
      recipes[index].showList = false;

      recipes.forEach(el=> {
        el.showList = false;
        el.edit = false;
      });
  
      this.setState({ recipes }, 
        ()=>localStorage.setItem('state', JSON.stringify(this.state)));
    }
    else {
      alert("Please fill out all the fields")
    }
  }

  showAddForm = () => {
    this.setState({
      addRecipe: true
    })
  }

  closeForm = () => {
    this.setState({
      addRecipe: false
    })
  }


  render() {
    return (
      <div className="container">
      <div className="row justify-content-center">
        <div className="col-xs-12">
          <h1 className="title">Your's Recipe Book</h1>
        </div>
      </div>
        
        <div className="list-group">
          <RecipeList 
            titleUpdate={this.onTitleChangeHandler}
            ingredientsUpdate={this.onIngredientsChangeHandler}
            recipes={this.state.recipes} 
            toggleShow={this.toggleShowHandler}
            editClicked={this.editClickHandler}
            deleteClicked={this.deleteRecipeHandler}
            saveEdit={this.saveChangesHandler}
            cancelChange={this.cancelEditClicked}
          />
        </div>
        
        <hr/>
        <button className="btn btn-success" onClick={this.showAddForm.bind(this)}>Add Recipe  <i className="fas fa-plus"></i></button>
        {this.state.addRecipe ? <AddRecipeForm add={this.addRecipeHandler} back={this.closeForm}/> : null }

      </div>
    );
  }
}

export default App;
