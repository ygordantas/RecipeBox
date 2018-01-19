import React from 'react';
import Popup from './Popup';
import uuid from 'uuid';

const recipeList = (props) =>  props.recipes.map((el,i)=>(
    <div className="list-group-item list-group-item-action" key={el.id}>
      <h2 onClick={props.toggleShow.bind(this,el, i)}>{el.recipe}</h2>
      <div className="" > 
        <ul onClick={props.toggleShow.bind(this,el,i)}>
          {el.ingredients.filter(e => el.showList === true).map(e =>  <li key={uuid()}>{e}</li>)}       
        </ul>               
        {el.showList ? <button className="btn btn-info" onClick={props.editClicked.bind(this,i)}>Edit <i className="far fa-edit"></i></button> : null}
        {el.showList ? <button className="btn btn-danger" onClick={props.deleteClicked.bind(this, i)}>Delete <i className="far fa-trash-alt"></i></button> : null} 
        {el.edit ? <Popup recipe={el.recipe} index={i} ingredients={el.ingredients} recipes={props.recipes} titleUp={(event)=>props.titleUpdate(event, i)} ingredientsUp={(event)=>props.ingredientsUpdate(event, i)} save={()=>props.saveEdit(i)} cancel={()=>props.cancelChange(i)}/>: null}
      </div>
    </div>
  )
);

export default recipeList