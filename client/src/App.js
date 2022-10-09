import React,{useState,useEffect, Fragment} from 'react';
import axios from 'axios'
import './App.css'
function App() {
  const[quantity, setQuantity]=useState([])
  const[product,setProduct]=useState({
    item:'',
    price:''
  })
  const[newItem,setNewItem]=useState('')
  const[newPrice,setNewPrice]=useState('')
const[value,setValue]=useState(null)
const getData=async()=>{
await axios.get('http://localhost:3001/read')
.then((res)=>{setQuantity(res.data)})
.catch((err)=>console.log(err))
 
}

  useEffect(()=>{
   getData()
  },[quantity])

  const inputSubmit=(e)=>{
    e.preventDefault()
    const Name=e.target.getAttribute('name')
    const Value=e.target.value
    const NewIndex={...product}
    NewIndex[Name]=Value
    setProduct(NewIndex)
    console.log(NewIndex)
  }

  const formSubmit=async(e)=>{
    e.preventDefault()
    const req={
      item:product.item,
      price:product.price,
      value:product.value
    }
    const res=await axios.post('http://localhost:3001/insert',req)
    const newIndex=[...quantity,res.data]
    
    setQuantity(newIndex)
    console.log(newIndex)
  }
 const updateItem=(id)=>{


  axios.put("http://localhost:3001/update",{
    id:id,
    newItem:newItem,
    newPrice:newPrice
  })
  setValue(id._id)

 } 
 const deleteItem=(id)=>{
  const test=window.confirm("if u want to delete this item?")
  if(test===true){
  axios.delete(`http://localhost:3001/delete/${id}`)
}
}
const update=(x)=>{
  setValue(x._id)

}
  return (
    <div className="crud" style={{display:"flex"}}>
      <section>
        <form onSubmit={formSubmit} className='border border-dark p-2'>
          <input type='text' className="w-100" name="item" onChange={inputSubmit} placeholder="Enter Item"/><br/>
          <input type='number' className='my-2 w-100' name="price" onChange={inputSubmit} placeholder="Enter Price"/><br/>
          <button type='submit' className="btn btn-danger w-100">Submit</button>
        </form>
      </section>
      <section className="crud_child">
      {quantity.map((x)=>{return(
        <div key={x._id} className="border border-dark  my-2" id="crud_child1">
          {value===x._id?(
          <Fragment>
            <div className="my-2" style={{display:'grid',gridTemplateColumns:"45% 10% 45%"}}>
              <input type='text' className="w-100" required="required" onChange={(e)=>setNewItem(e.target.value)} placeholder="Enter Item"/>
              <span>:</span>
              <input type='number' className="w-100" required="required" onChange={(e)=>setNewPrice(e.target.value)} placeholder="Enter Price"/>
             </div>
             <button className="btn btn-danger w-100" onClick={()=>updateItem(x._id)}>Submit</button>
          </Fragment>):(
       
       <Fragment>
       <section className="my-2" style={{display:'flex',justifyContent:'space-around'}}>
            <span>{x.item}</span>
            <span>:</span>
            <span>{x.price}$</span>    
        </section>
          
      <section>
           <div style={{display:"flex",width:"100%"}}>
           <button className="btn btn-primary w-100" onClick={()=>update(x)}>update</button>
          <button className="btn btn-dark w-100" onClick={()=>deleteItem(x._id)}>Delete</button>
           </div>
        </section>
       </Fragment>)}
        </div>
)})}
</section>
    </div>
  );
}

export default App;