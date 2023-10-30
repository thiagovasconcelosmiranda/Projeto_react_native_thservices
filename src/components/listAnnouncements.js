import { Image } from "react-native";
import {useEffect, useState} from 'react';
import { Dimensions, View, Animated, StyleSheet} from "react-native";
import styled from "styled-components/native"
import {StarTestimonial} from "./StarItens";
import {Card} from 'react-native-shadow-cards';
import Likes from "./Likes";
import Ese from 'react-native-vector-icons/AntDesign';
import Api from "../Api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {LinearGradient} from 'expo-linear-gradient';


const Area = styled.TouchableOpacity`
  background-color: #fff;
  margin-bottom:20px;
  padding:15px;
  flex-direction: row;
  width: 100%;
  height: auto;
`;

const Avatar = styled.View`
 flex:1;
 width: auto;
 height:auto;
 border-radius:15px;
 align-items: center;
 margin-top: 1px;
`;

const InfoArea = styled.View`
margin-left: 20px;
justify-content: space-between;
`;

const Row = styled.View`
    width:100%;
    height: auto;
`;
const UserName = styled.Text`
   font-size: 16px;
   font-weight: bold;
   max-width: 150px; 
`;


const SeeProfileButton = styled.View`
  flex-direction: row;
  width: auto;
  height: auto;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  padding: 10px;
  background: #1C1C1C;
`;

const SeeProfileButtonText = styled.Text`
  font-size: 13px;
  color: #fff;
`;
const ItemView = styled.View `
  width: 100%;
  height: auto;
  flex-direction: row;
`;
const ImageView = styled.View`
  width: 150px;
  height: 150px;
  background: #ECEFF1;
  overflow: hidden;
`;

const  ItemViews = styled.View`
   width: auto;
   height: auto;
   margin-left: 40px;
   flex-direction: row;
   align-items: center;
   justify-content: center;
`;

const TextCount = styled.Text`
   margin-left: 5px;
   color: #808080;
`;

const TextComments = styled.Text`
   color: #808080
`;

export default ({data, acionar, link, buttonCompartilha, buttonLike, buttonDeslike}) => {
  const [Count, setCount] = useState(0);
  const [CountView, setCountView] = useState('0');
  const [image, setImage] = useState('');
  const [very, setVery] = useState(true);
  
  const {width} = Dimensions.get('window');
  const  AnimateValue  =new Animated.Value(0);

    useEffect(()=>{
       getTestimonial();
       getView();
       getUpload();
    },[]);
    setTimeout(()=>{
      Animated.loop(Animated.timing(AnimateValue, {
        toValue: 1,
        useNativeDriver: true,
        duration: 2500
     })).start();
    }, 1000)

    const getUpload = async () => {
      const token = await AsyncStorage.getItem('token');
      if(token){
        const upload = await Api.getUploadAnnouncements(data.id, token );
        if(upload.id){
          setImage(upload.image);
          setVery(false);
          clearTimeout();
        }
      } 
    }

    const getTestimonial = async () => {
       const testimonial = await Api.getTestimonial(data.id);
       if(testimonial.data.length > 0){
        setCount(testimonial.data.length);
       }
      
    }

    const getView = async () => {
      const view = await Api.getView(data.id);
      if(view.data.length > 0){
        view.data.map((item)=>{
          setCountView(item.num);
        })
      }
    }
  
    return (
      <Card style={{margin:5 }}>
      <Row>
        <Area onPress={acionar}>
         <Avatar>
           {!very ? ( 
              <Image 
              source={{uri: `${link}${image}`}} 
              style={{ width: 140, height: 130}} />
           ): (
            <ImageView>
            <Animated.View
                style={[styles.Line, {
                       transform:[{
                            translateX: AnimateValue.interpolate({
                              inputRange: [0, 1],
                                outputRange: [-width,width]
                            })
                       }]
                  }]}>
                   <LinearGradient 
                       colors={['#DCDCDC', '#DCDCDC', '#DCDCDC']}
                       style={{flex: 1}}
                       start={{x: 0, y: 0}}/> 
                  </Animated.View>     
            </ImageView>
           )}
         </Avatar>
         <InfoArea>
            <UserName>{data.title}</UserName>
            <TextComments>Categoria: ELetricista</TextComments>
             <StarTestimonial
                media = {data.media}
                status = {true}
              />
            <SeeProfileButton>
              <SeeProfileButtonText>Faça seu orcaemnto</SeeProfileButtonText>
            </SeeProfileButton>
         </InfoArea>
        </Area>
        <ItemView>
          <ItemViews>
             <Ese name="eyeo" size={30} color={'#808080'}/>
             <TextCount>{CountView}</TextCount>
          </ItemViews>
          <ItemViews>
              <TextComments>Comentários {Count}</TextComments>
          </ItemViews>
        </ItemView>
        <Likes
           buttonCompartilha={buttonCompartilha}
           buttonDeslike={buttonDeslike}
           buttonLike={buttonLike}
           data={data}
            />
       </Row>
      </Card>
    )
}

const styles = StyleSheet.create({
  Line:{
    width:'60%',
    height: '100%'
  }
});


