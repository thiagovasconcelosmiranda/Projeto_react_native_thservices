import styled from 'styled-components';
import { useContext, useEffect, useState } from 'react';
import { Card } from 'react-native-shadow-cards';
import { Image } from 'react-native';
import {PhotoContext} from '../contexts/Photo'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Api from '../Api';
 
const View = styled.View`
    width:90%;
    height: auto; 
    background-color: #fff;
    margin-top: 50px;
`;

const TitleView = styled.View`
   width: 100%;
   flex-direction: row;
   justify-content: center;
`;

const Title = styled.Text`
text-align: center;
font-size: 20px;
font-weight: bold;
`;

const Row = styled.View`
   flex-direction: row;
   width: 100%;
   height: auto;
   align-items: center;
   padding: 10px;
`;

const Col = styled.View`
   width: 60%;
`;
const Item = styled.View`
   width: 100%;
   flex-direction: row;
   margin:10px;
   justify-content: space-around;
`;

const TouchLink = styled.TouchableOpacity`
    width: 100%;
`;

const Touch = styled.TouchableOpacity`
  width: 100px;
  height: 40px;
  background-color: green;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text`
    font-weight: bold;
    color: #fff;
`;

const DescritionTitle = styled.Text`
  width: 90%;
  font-size: 18px;
  font-weight: bold;
  color: #000;
`;

const MessageText = styled.Text`
 width: 80%;
 font-size: 14px;
`;

const ItemDate = styled.View`
  width: 90%;
  height: auto;
  flex-direction: row;
  align-items: center;
`;

const ItemInfo = styled.View`
  width: 60%;
`;

const BoldText = styled.Text`
   font-weight: bold;
   color: #000;
`;

export default ({item, on, off}) =>{
 const {link} = useContext(PhotoContext);
 const [background, setBackgrond] = useState('');
 useEffect(()=>{
   if(item.visualized === 'not visualized'){
      setBackgrond("#ADD8E6");
   }else{
      setBackgrond("#fff");
   }
 },[])

 const handleVeryNotify = async (item) => {
   const token = await AsyncStorage.getItem('token');
   if(token){
      if(item.visualized === 'not visualized'){
          const res = await Api.updatNotification(item.company_id, 'ok', token);
           if(res > 0){
             console.log('Visualizado');
           }
      }
   }
    
}


 return (
  <Card style={{backgroundColor: `${background}`}}>
    <View style={{backgroundColor: `${background}`}}>
        <TitleView>
           <Title>Solicitação de serviço</Title>
        </TitleView>
         <Row>
             <Col >
                <Image
                    source={{uri: `${link}${item.photo}`}} 
                    style={{width:110, height:110}} />
             </Col>
             <Col>
             <DescritionTitle>Descrição do pedido:</DescritionTitle>
                 <MessageText>{item.descrition}</MessageText>
                 <ItemDate>
                    <ItemInfo>
                        <BoldText>Data:{item.date}</BoldText>
                    </ItemInfo>
                    <ItemInfo>
                      <BoldText>Hora:</BoldText>
                      <BoldText>{item.time}</BoldText>
                    </ItemInfo>
                 </ItemDate>
             </Col>
         </Row>
         <Item>
         <TouchLink onPress={()=>handleVeryNotify(item)}>
              <MessageText style={{color: 'blue', width: '100%'}}>Mais detahes</MessageText>
          </TouchLink>
  
         </Item>
         <Item>
           <Touch onPress={on} style={{backgroundColor: 'green', Color: 'red'}}>
             <Text >Aceitar</Text>
            </Touch>
            <Touch onPress={off} style={{backgroundColor: 'red'}} >
              <Text>Recusar</Text>
            </Touch>
         </Item>
     </View>
    </Card>
 ) 
}