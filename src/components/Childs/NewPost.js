import React, {useContext,useState } from 'react';
import {Store} from '../PostsListScreen'
import {nanoid} from 'nanoid'
import axios from 'axios';
function NewPost() {
  const{data,setData,setValue}=useContext(Store)
 
  const[Post,setPost]=useState({
    id: "",
    title:"",
    post:"",
    photo:"https://media.istockphoto.com/vectors/avatar-5-vector-id1131164548?k=20&m=1131164548&s=170667a&w=0&h=VlwTJ3LpA8Pjzk9u8XYgkII0Vrvrb07e67cHALFX_aY=",
    author:"",
    email:"",
    website:"",
    company:"",
    blog:"",
    value:false,
    count:0,
    color:"black",
    dot:"https://miro.medium.com/max/1188/1*HulO5WD-QR5yciOpbwhbRg.png",
    Follow:"Following"

  })
  const inputSubmit=(e)=>{
    e.preventDefault()
    const Name=e.target.getAttribute('name')
    const Value=e.target.value
    const NewIndex={...Post}
    NewIndex[Name]=Value
    setPost(NewIndex)
  }
  const formSubmit=async(e)=>{
    e.preventDefault()
    const req={
        id:nanoid() ,
        title:Post.title,
        post:Post.post,
        photo:Post.photo,
        author:Post.author,
        email:Post.email,
        website:Post.website,
        company:Post.company,
        blog:Post.blog,
        value:Post.value,
        count:Post.count,
        color:Post.color,
        dot:Post.dot,
        Follow:Post.Follow

    }
    const res=await axios.post("https://venkatahari.herokuapp.com/posts",req)
    const NewIndexTwo=[...data,res.data]
    setData(NewIndexTwo)
    setValue(true)
  }

    return (
    <div style={{ width:"auto",display:'flex',marginTop:"20%",justifyContent:'center',alignItems:'center',alignContent:'center',marginBottom:'5%',overflow:'hidden'}}>
    <form style={{width:'90%',border:"1px solid grey",overflow:'hidden'}} onSubmit={formSubmit}>
    <input style={{width:'100%',padding:'2%'}} type="text"  required="required" name="title" placeholder='Enter Post Title..'  onChange={inputSubmit}/><br/>
    <input style={{width:'100%',padding:'2%'}} type="text"  required="required" name="post" placeholder='Paste Img URL' onChange={inputSubmit}/><br/>
    <input style={{width:'100%',padding:'2%'}} type="text"  required="required" name="author" placeholder='Enter Your Your Name...' onChange={inputSubmit}/><br/>
    <input style={{width:'100%',padding:'2%'}} type="text"  required="required" name="email" placeholder='Enter Email Addrress...' onChange={inputSubmit}/><br/>
    <input style={{width:'100%',padding:'2%'}} type="text"  required="required" name="website" placeholder='Enter Your Website Name...' onChange={inputSubmit}/><br/>
    <input style={{width:'100%',padding:'2%'}} type="text"  required="required" name="company" placeholder='Enter Your Company Name...' onChange={inputSubmit}/><br/>
    <textarea placeholder="Write Your Blog Here..." required="required" name="blog" onChange={inputSubmit} style={{width:'100%',height:"20vh"}}></textarea><br/>
    <button type="submit" style={{width:'100%',padding:'2%',background:'green',color:'white',border:'none'}}>Publish Post</button>
            </form>
            
        </div>
    );
}

export default NewPost;