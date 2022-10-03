import React,{useContext} from 'react';
import {Text,View} from 'react-native'
import {Store} from './IndividualPostScreen'
import {Link} from 'react-router-native'
function IndividualUserScreen() {
    const {data,setMainDisplay}=useContext(Store)
   const backUser=()=>{
    setMainDisplay(false)
   }
       return (
      <View>
         <Link to={{pathname:`/${data.id}`}} style={{textDecoration:'none'}} onPress={()=>backUser(data.id)}>
         <Text>Back</Text>
         </Link>
      
     <View style={{flexDirection:"column",padding:"5px",border:"1px solid grey"}}>
                <View style={{flexDirection:"row",justifyContent:"space-between",borderBottom:"1px solid grey"}}>
                <Text>UserName</Text>
                <Text style={{borderLeft:"1px solid grey"}}>:</Text>
                <Text>{data.author}</Text></View>
                <View style={{flexDirection:"row",justifyContent:"space-between",borderBottom:"1px solid grey"}}>
                <Text >FullName</Text>
                <Text style={{borderLeft:"1px solid grey"}}>:</Text>
                <Text>{data.author}</Text></View>
                <View style={{flexDirection:"row",justifyContent:"space-between",borderBottom:"1px solid grey"}}>
                <Text>Website</Text>
                <Text style={{borderLeft:"1px solid grey"}}>:</Text>
                <Text>{data.website}</Text></View>
                <View style={{flexDirection:"row",justifyContent:"space-between",borderBottom:"1px solid grey"}}>
                <Text>Email</Text>
                <Text style={{borderLeft:"1px solid grey"}}>:</Text>
                <Text>{data.email}</Text></View>
                <View style={{flexDirection:"row",justifyContent:"space-between",borderBottom:"1px solid grey"}}>
                <Text>Company</Text>
                <Text style={{borderLeft:"1px solid grey"}}>:</Text>
                <Text>{data.company}</Text></View>
        </View>
      </View>  
    );
}

export default IndividualUserScreen;