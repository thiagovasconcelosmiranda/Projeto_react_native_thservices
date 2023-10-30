import styled from "styled-components";
import Api from "../Api";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Icon from 'react-native-vector-icons/Ionicons';
import Favorite from 'react-native-vector-icons/MaterialIcons';
import Servico from 'react-native-vector-icons/EvilIcons';

import Help from 'react-native-vector-icons/Feather';
import {Text} from "react-native";

const TabArea = styled.View`
height: 60px;
background-color: #F0F8FF;
flex-direction: row;
`;

const Item = styled.TouchableOpacity`
 flex: 1;
 justify-content: center;
 align-items: center;
`;


export default ({ state , navigation}) => {
    const goTo = (screenName) => {
      navigation.reset({    
        routes:[{name: screenName}]

        });     
    }


    return (
      <TabArea>
         <Item style={{opacity: state.index=== 0? 1 : 0.3}} onPress={()=>goTo('Home')}>
              <Icon name="home-outline" size={30} color="#000"/>
              <Text>Home</Text>
          </Item>
         
         <Item style={{opacity: state.index=== 1? 1 : 0.3}} onPress={()=>goTo('Favorite')}>
             <Favorite  name="favorite-border" size={30} color="#000"/>
             <Text>Favorite</Text>
         </Item>

         <Item style={{opacity: state.index=== 2? 1 : 0.3}} onPress={()=>goTo('Help')} >
            <Help name="help-circle" size={30} color="#000"/>
            <Text>Ajuda</Text>
          </Item>
         <Item  style={{opacity: state.index=== 3? 1 : 0.3}} onPress={()=>goTo('Option')} >
             <Servico name="navicon" size={40} color="#000"/>
             <Text>Opções</Text>
         </Item>
        </TabArea>

   )
}