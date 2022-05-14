import React, {useEffect,useState} from 'react';
import axios from 'axios';
// import {useState} from 'react';
import './App.css';
// import {  
//   Redirect,
// } from "react-router-dom";


// class App extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {apiResponse: ""}
  
//   }
  
//   callAPI(){
//     fetch("http://localhost:3000/api/item")
//     .then(res => res.text())
//     .then(res => this.setState({apiResponse: res}));
//   }
  
//   componentWillMount(){
//     this.callAPI();
//   }
// }



function App() {
  const [itemText, setItemText] = useState('')
  const [todos,setTodos] = useState([])
  const [listItems, setListItems] = useState([]);
  const [isUpdating, setIsUpdating] = useState('');
  const [updateItemText, setNewItemText] = useState('');


  function refreshPage() {
    window.location.reload(false);
  }

   const addItem = async() => {
    //  e.preventDefault();
     console.log('dfsdfds')
     try {
       const res = await axios.post('http://localhost:2000/api/item',{item: itemText})
      //  console.log(res);
      setListItems(prev => [...prev, res.data])
     } catch (error) {
       console.error(error);
     }
   }

   const getItems = async ()=> {
     const res = await axios.get('http://localhost:2000/api/item')
      const items = res.data
      setTodos(items)
      setListItems(items)
      console.log('render')
    
   };

  
   const deleteItem = async(id) => {
     try { 
       const res = await axios.delete(`http://localhost:2000/api/item/${id}`)

      //  const newListItem = listItems.filter(item => item._id !== id);
        const newListItem = listItems.filter(item => item._id !== id);
        setListItems(newListItem);
     } catch (error) {
       console.log(error);
     }
   };

  // //  const updateItem = async(id) => {
  // //   try { 
  // //     const res = await axios.put(`http://localhost:2000/api/item/${id}`)
  // //     console.log(res);

  // //    //  const newListItem = listItems.filter(item => item._id !== id);
  // //      const newListItem = listItems.filter(item => item._id !== id);
  // //      setListItems(newListItem);
  // //   } catch (error) {
  // //     console.log(error);
  // //   }
  // // };

  const updateItem = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`http://localhost:2000/api/item/${isUpdating}`, {item: updateItemText})
      
      console.log(res.data);
      setNewItemText('');
      setIsUpdating('');
    } catch (error) {
      console.log(error);
    }
  }

  const renderUpdateForm = () => {
    

    return <form className = "update-form" onSubmit={(e)=>{updateItem(e)}}>
      <input className = "update-new-input" type="text" placeholder = "New Item" onChange={e => {setNewItemText(e.target.value)}} value={updateItemText}/>
      <button className = "update-new-btn" type="submit" onClick={refreshPage}>Update</button>
    </form>
    
  }

  //  const updateItem = async (e) =>{
  //    e.preventDefault();
  //    try {
  //      const res = await axios.put(`http://localhost:2000/api/item/${isUpdating}`,{item: updateItemText});
  //      setUpdateItemText('');
  //      setIsUpdating('');
  //      console.log(res.data);
       
  //    } catch (error) {
  //      console.log(error);
  //    }
  //  }
  //  const renderUpdateForm = () => {
  //    <form className="update-form" onSubmit={(e)=>{updateItemText(e)}}>
  //      <input className = "update-new-input" type = "text" placeholder = "New Item" onChange={e =>{setUpdateItemText(e.target.value)}} value = {updateItemText} />
  //      <button className ="update-new-btn"type = "submit">Update</button>
  //    </form>
  //  }

   useEffect(() =>{
      getItems();
    },[]);
  return (
    <div className="App">
      <h1>To-Do List</h1>
      {/* <form className = "form" onSubmit ={e => addItem(e)}>
        <input type="text" placeholder = "Add-To-Do-Item" onChange={e => {setItemText(e.target.value)}} value = {itemText}/>
        
        <button type="submit">Add To-Do Item</button>
      </form> */}
      {/* <form action="/" method="post"> */}
      <div className="top">
      <input className = "form-input" type="text" name="item" onChange={(e)=>{
        setItemText(e.target.value)}
      }/>
      <button className = "form-button" type="submit" onClick={e => {
        addItem()}}
>submit</button>
</div>

      <div className="todolistItems">
          {
            listItems.map(item => (
              <div className="todo-item">
                {/* {console.log(isUpdating)}
                {console.log(setIsUpdating)} */}
                {
                  
                  isUpdating === item._id ? renderUpdateForm():
                  
                  <>
                    < p className="item-body">{item.item}</p>
                    <button className ="update-item" onClick = {() => {setIsUpdating(item._id)}} >Update</button>
                    <button className="delete-item" onClick={()=>{deleteItem(item._id)}}>Delete</button>
                  </>

                }
                

                  
              </div>
            ))     
            }
      </div>
      {/* <div>
      <p> Made By Mayank Srivastava</p>
    </div> */}
      
    </div>
    
    
  );
}

export default App;
