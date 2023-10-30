import styled from "styled-components"
import Delete from 'react-native-vector-icons/AntDesign';
import { Image } from "react-native";
import { PhotoContext } from "../contexts/Photo";
import { useContext, useEffect, useState } from "react";
import { Card } from "react-native-shadow-cards";
import Api from "../Api";
import AsyncStorage from "@react-native-async-storage/async-storage";


const ItemView= styled.View`
 width: 100%;
 height: auto;
 background-color:#fff;
 flex-direction: row;
 align-items: center;
 padding: 20px;
`;

const ImageView = styled.TouchableOpacity`
  width:100px;
  height: 90px;
  background-color: #F5F5DC;
  flex-direction: row;
  align-items: center;
  margin-left: 5px;
`;

const TitleView = styled.View`
  margin-left: 10px;
`;

const TitleText = styled.Text`
   font-size: 18px;
   max-width: 130px;
   font-weight: bold;
`;

const ItemIcon = styled.TouchableOpacity`
    width: 30%;
    height: 80px;
    margin-left: -10px;
    justify-content: center;
    align-items: center;
`;


export default ({data, onPress, button}) => {
  const {link} = useContext(PhotoContext);
   const [image, setImage] = useState([]);

   useEffect(()=>{
     getImage();

   },[]);

   const getImage = async () => {
      const token = await AsyncStorage.getItem('token');
      if(token){
         const announcement = await Api.getAnnouncement(data.company_id);
         if(announcement.id){
           const upload = await Api.getUploadAnnouncements(announcement.id, token);
           if(upload.id){
             setImage(upload.image);
           }
              
         }
      }
   }

    return(
      <Card style={{margin: 5}}>
       <ItemView>
         <ImageView onPress={button}>
            <Image 
            source={{uri: `${link}${image}`}} 
            style={{ width: 100, height: 90}}/>
         </ImageView>
        <TitleView>
          <TitleText>{data.title}</TitleText>
        </TitleView>
        <ItemIcon onPress={onPress}>
           <Delete name="delete" size={30} color="red"/>
      </ItemIcon>
   </ItemView>
 </Card>
    )
}