import React, { Fragment, useContext } from 'react';
import {Store} from '../IndividualPostScreen'
function Comment() {
    const{inputSubmit,formSubmit}=useContext(Store)
    

    
    return (
   <Fragment>   
    <form onSubmit={formSubmit} style={{display:'grid',gridTemplateColumns:'20% 80%',marginTop:'6%'}}>
      <div style={{width:'60%'}}>
<img src="https://media.istockphoto.com/vectors/avatar-5-vector-id1131164548?k=20&m=1131164548&s=170667a&w=0&h=VlwTJ3LpA8Pjzk9u8XYgkII0Vrvrb07e67cHALFX_aY=" style={{width:'100%'}} alt=''/> </div> 
<div>
<section  style={{width:'100%'}}>   
<input type='text' placeholder='Add a Comment' 
                name='comment'
                onChange={inputSubmit}
                style={{color:'grey',outline:'none',border:'none !important',width:'90%',padding:'5px'}}/>
  </section>
  <section style={{display:'flex',flexDirection:'row-reverse',width:'95%',marginTop:'2%'}}>            
        <button style={{padding:'5px',background:'green',color:'white'}} type='submit'>AddComment</button>
</section>
</div>
</form>

</Fragment>  
    );
}

export default Comment;