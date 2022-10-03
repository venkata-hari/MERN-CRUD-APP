import axios from 'axios';
import React, { createContext, useEffect, useState ,Fragment} from 'react';
import {View,Text,Image,TextInput,Button,TouchableHighlight} from 'react-native-web'
import {Link} from 'react-router-native'
import NewPost from './Childs/NewPost'
export const Store=createContext(null)
function Screen1() {
    const[data,setData]=useState([])
    const[Search,setSearch]=useState(data)
    const[Value,setValue]=useState(true)
    useEffect(()=>{
        async function getData(){
            try{
              const res=await axios.get("https://venkatahari.herokuapp.com/posts")
              setData(res.data)
            }
            catch(error){
                console.log(error)
            }

        }getData()
    },[])


const setOpen=()=>{
    setValue(false)
}
const FollowButton=(e)=>{
    const z=data.find(x=>x.id===e.id)
    if(z.Follow==="Follow"){
    setData(data.map(x=>x.id===e.id?{...x,Follow:"Following"}:x))}
    else if(z.Follow==="Following"){
        setData(data.map(x=>x.id===e.id?{...x,Follow:"Follow"}:x)) 
    }
}

const LikeButton=(e)=>{
setData(data.map(x=>x.id===e.id?{...x,color:"red",count:x.count+1}:x))
}
const DeletePost=(id)=>{
    if(window.confirm("Ary you sure to delete this post?")){
        axios.delete(`https://venkatahari.herokuapp.com/posts/${id}`)
        setData(data.filter(x=>x.id!==id))      
        }
       
}


    return (
        <Store.Provider value={{setValue,data,setData}}>
     <View style={{width:"100%",height:"7vh",borderBottom:"1px solid #80808036",padding:'3px',marginBottom:"3%",flexDirection:"row",justifyContent:"center",position:"fixed",zIndex:900,top:0,background:'white'}}>
        <View style={{flexDirection:"row"}}>
        <Image source={{uri:"https://i.pinimg.com/736x/0d/cf/b5/0dcfb548989afdf22afff75e2a46a508.jpg"}} style={{width:30,height:30}}/>
        <Text style={{color:"grey"}}>VaaveProject</Text>
        </View>
        
       
     </View>
            {Value?(
        <View style={{marginTop:"15%"}}>
        <View style={{flexDirection:"row",justifyContent:"center"}}>
        <View style={{background:"#f5f5ff",borderRadius:"5px",color:"black",flexDirection:"row",justifyContent:"space-between",width:"96%",border:"1px solid #8b797966"}}>
        <TextInput 
         style={{width:"80%",outline:"none",padding:"3px",color:"grey"}}
         onChangeText={(Search)=>setSearch(Search)}
         placeholder="Search User Name"
         />
       <Button title="search"/>
        </View>
        </View>  
       <View>
       <View style={{width:'25%',marginTop:"2%",padding:"1%"}}>
        <Button title="New +" color="green" onPress={setOpen}/>
       </View>

        <View style={{width:"100%", flexDirection: "row",flexWrap:"wrap",justifyContent:"center"}}>
          {data.filter((y)=>y.author.toLowerCase().includes(Search)).map((x)=>{return(
           	<View key={x.id} style={{width:"95%",boxShadow:"0 0 2px grey",marginTop:'2%',padding:'4%'}}>
            <View style={{flexDirection:"row",justifyContent:"space-between",}}>
            <Text></Text>
           
            <View>

                <TouchableHighlight onPress={() => DeletePost(x.id)}>
            <Image source={{uri:x.dot}} style={{width:30,height:10}} />
            </TouchableHighlight>

            </View>
            </View>
            
                <View style={{flexDirection:'row'}}>
                <Link to={{pathname:`/${x.id}`}} style={{textDecoration:'none'}}><Image source={{uri:x.photo}} style={{width:40,height:40}}/></Link>
                <Link to={{pathname:`/${x.id}`}} style={{textDecoration:'none',marginLeft:'1%',marginRight:'4%'}}><Text>{x.author}</Text></Link>    
                  <Text style={{color:'#4285F4',fontWeight:600,marginLeft:"2%"}} onPress={()=>FollowButton(x)}>. {x.Follow}</Text>
               </View>
            <View>
                <Text>{x.title}:</Text><Link to={{pathname:`/${x.id}`}} style={{textDecoration:'none'}}>
                <Image source={{uri:x.post}} style={{width:"100%",height:"30vh"}}/></Link>
                <View style={{flexDirection:"row"}}>
                <Text style={{fontSize:"34px",color:x.color}} onPress={()=>LikeButton(x)} >&#9825;</Text>
               <Text style={{fontSize:"15px",marginTop:"3%",marginLeft:"2%"}}>{x.count}</Text>
               </View>
            </View>
            </View>)})}
        </View>
        <View>
            
        </View>
       </View> 
       </View>):(<Fragment> <NewPost/></Fragment>
      )}
       </Store.Provider>
    );
}

export default Screen1;