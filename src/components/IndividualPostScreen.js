import axios from 'axios';
import React, { useCallback, useEffect, useState,createContext, Fragment} from 'react';
import {View,Text,Image,Button} from 'react-native-web'
import {Link, useParams} from 'react-router-native'
import {nanoid} from 'nanoid'
import IndividualUserScreen from './IndividualUserScreen';
import Comment from './Childs/Comment'
export const Store=createContext(null)
function IndividualPostScreen() {
    const{id}=useParams()
    const[INC,setINC]=useState(0)
    const[MainDisplay,setMainDisplay]=useState(false)
    const[display,setDisplay]=useState(false)
    const[dis,setDis]=useState(false)
    const[DEC,setDEC]=useState(0)
    const[data,setData]=useState([])
    const[NewData,setNewData]=useState([])
    const[UserComment,setUserComment]=useState({
        comment:'',
        name:'unKnown',
        avator:'https://media.istockphoto.com/vectors/avatar-5-vector-id1131164548?k=20&m=1131164548&s=170667a&w=0&h=VlwTJ3LpA8Pjzk9u8XYgkII0Vrvrb07e67cHALFX_aY='
        ,INC: 0,
        DEC: 0,
        display: false,
        dis: false
    })

    const likeThumb=()=>{
        setINC(INC+1)
        setDisplay(true)
    }
    const dislikeThumb=()=>{
        setDEC(DEC-1)
        setDis(true)
    }
    const getData=useCallback(async()=>{
     try{
        const res=await axios.get(`https://venkatahari.herokuapp.com/posts/${id}`)
        setData(res.data)
     }
     catch(error){
        console.log(error)
     }
    },[id])
    useEffect(()=>{getData()},[getData])
    
    useEffect(()=>{
    async function getData(){
   try{
    const res=await axios.get("https://venkatahari.herokuapp.com/comments")
   setNewData(res.data)}
   catch(error){
    console.log(error)
   }
    }getData()
},[])
const inputSubmit=(e)=>{
    e.preventDefault()
    const Name=e.target.getAttribute('name')
    const Value=e.target.value
    const NewIndex={...UserComment}
    NewIndex[Name]=Value
    setUserComment(NewIndex)
}
const formSubmit=async(e)=>{
        e.preventDefault()
        const req={
            id:nanoid(),
            comment:UserComment.comment,
            avator:UserComment.avator,
            name:UserComment.name,
            INC: UserComment.INC,
            DEC: UserComment.DEC,
            display:UserComment.display,
            dis: UserComment.dis
        }
        const res=await axios.post(`https://venkatahari.herokuapp.com/comments`,req)
        const newIndex=[...NewData,res.data]
        setNewData(newIndex)
    }
    const arraylikeThumb=(e)=>{
        const z=NewData.find(x=>x.id===e.id)
        if(z){
            setNewData(NewData.map(x=>x.id===e.id?{...x,INC:x.INC+1,display:true}:x))
        }
        
        }   
        const arraydislikeThumb=(e)=>{
            setNewData(NewData.map(x=>x.id===e.id?{...x,DEC:x.DEC-1,dis:true}:x))
        } 
    const UserDetalis=()=>{
        setMainDisplay(true)
    }    
return (
<Store.Provider value={{UserComment,setUserComment,formSubmit ,inputSubmit,NewData,setNewData,data,setMainDisplay}}>
{MainDisplay?(    
<View><IndividualUserScreen/></View>):(
    <Fragment>
        <View style={{width:"100%",height:"100%"}}>
        <View style={{width:"20%"}}><Link to='/'><Image source={{uri:"data:image/png;base64,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"}} style={{width:30,height:29}}/></Link></View>
       <View style={{width:"100%",flexDirection:'row',justifyContent:'center',borderBottom:"1px solid grey"}}>   
       <View style={{width:"90%",flexDirection:'row',justifyContent:'center',background:'white'}}>
        <View style={{flexDirection:'row',justifyContent:'space-around',width:'60%'}}> 
            
            <View>
            <Image source={{uri:data.photo}} style={{width:100,height:100}} alt="Author"/>
            </View>
            
            <View>   
        <Text onPress={()=>UserDetalis(data.id)}
        style={{fontSize:"20px",textAlign:"center",fontWeight:500,height:"30%"}}>
        {data.author}</Text>     
           <Button title="Follow" style={{height:"40%"}}/>
            </View>
            
           </View>
       </View>   
       </View>      
        </View>
        <View>
        <Text style={{fontWeight:900,fontSize:"20px"}}>{data.title}</Text>
            <Image source={{uri:data.post}} style={{width:"60%",height:"30vh"}}/>
        <Text style={{borderTop:"1px solid grey"}}>{data.blog}</Text>    
        </View>
<Fragment>
  <Comment/>   
</Fragment>
{NewData.map(x=>
<View style={{flexDirection:'row',height:'100%',borderBottom:"1px solid grey",padding:"10px"}} key={x.id}>
<View>
    <Image source={x.avator} style={{width:50,height:50}} alt=''/>
</View>
<View style={{marginLeft:'2%'}}>
            <Text style={{fontWeight:500}}>{x.name}</Text>
            <Text style={{marginTop:'3px'}}>{x.comment}</Text>

           <View style={{flexDirection:'row'}}>
            <Text onPress={()=>arraylikeThumb(x)}>&#128077;</Text>
           {x.display?(<Text>{x.INC}</Text>):( <Text></Text>)}
            <Text style={{marginLeft:"30%"}} onPress={()=>arraydislikeThumb(x)}>&#128078;</Text>
            {x.dis?(<Text>{x.DEC}</Text>):( <Text></Text>)}
        </View>
        </View>
</View>
    )}
        <View style={{flexDirection:'row',height:'100%'}}>
            <View>
            <Image source={{uri:data.userPhoto}} style={{width:50,height:50}}/>
            </View>
            <View style={{marginLeft:'2%'}}>
            <Text style={{fontWeight:500}}>{data.details}</Text>
            <Text style={{marginTop:'3px'}}>{data.comment}</Text>
            <View style={{flexDirection:'row'}}>
            <Text onPress={likeThumb}>&#128077;</Text>
           {display?(<Text>{INC}</Text>):( <Text></Text>)}
            <Text style={{marginLeft:"30%"}} onPress={dislikeThumb}>&#128078;</Text>
            {dis?(<Text>{DEC}</Text>):( <Text></Text>)}
        </View>
    </View>
    </View></Fragment>)}
        </Store.Provider>
    );
}

export default IndividualPostScreen;