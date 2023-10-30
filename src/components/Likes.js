import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import styled from "styled-components/native";
import Like from 'react-native-vector-icons/AntDesign';
import Api from "../Api";

const LikItem = styled.View`
   width:100%;
   height: auto;
   flex-direction: row;
   justify-content: center;
   align-items: center;
`;

const ItemToch = styled.TouchableOpacity`
  margin: 20px;
`;

const LikText = styled.Text`
    font-size: 14px;
`;
const Text = styled.Text`
  margin-left: 10px;
`;

export default ({buttonCompartilha, buttonDeslike, buttonLike, data}) => {
   const [Likes, setLikes] = useState([]);
   useEffect(()=>{
      getLike();
   },[])

   const getLike = async () =>{
     const token = await AsyncStorage.getItem('token');
     if(token){
        const like = await Api.getLike(data.id, token);
        setLikes(like);
     }
   }
    return(
      <LikItem>
        <ItemToch onPress={buttonCompartilha}>
           <LikText>Compartinhar</LikText>
         </ItemToch>
          <ItemToch onPress={buttonLike}>
             <Like name="like1" size={25} color="#000"/>
             <Text>{Likes.like}</Text>
          </ItemToch>
          <ItemToch onPress={buttonDeslike}>
             <Like name="dislike1" size={25} color="#000"/>
             <Text>{Likes.deslike}</Text>
        </ItemToch>
     </LikItem>
   
    )
}