import  Name from 'react-native-vector-icons/EvilIcons';
import  Email from 'react-native-vector-icons/EvilIcons';
import  Password from 'react-native-vector-icons/EvilIcons';
import  Search from 'react-native-vector-icons/EvilIcons';

import styled from 'styled-components/native';

const InputView = styled.View`
width: 80%;
min-height: 50px;
flex-direction: row;
padding: 15px;
margin-left: auto;
margin-right: auto;
align-items: center;
margin-bottom: 30px;
background-color: #FFFFFF;
margin-top:20px;
border: 0.7px #000;
height: 20px;
`;

const Input = styled.TextInput`
  flex: 1;
  font-size: 16px;
  color:#000000;
  margin-left:20px;
  margin: auto;  
`;

export default ({placeholder, value, onChangeText, password, Icon, width, height, multiline, numberOfLines, keyboard}) => {

    return(
     <InputView style={{width: width, height: height}}>
       <Input 
           disabled={true}
           placeholder={placeholder}
           multiline={multiline}
           numberOfLines={numberOfLines}
           value={value}
           onChangeText={onChangeText}
           secureTextEntry={password}
           keyboardType={keyboard}
           />
           

          {Icon === 'name' && (
           <Name name="user" size={30} color="#000"/> 
        )}

        {Icon === 'email'&& (
             <Email name="envelope" size={30} color="#000"/> 
        )}

        {Icon === 'password' && (
           <Password name="lock" size={40} color="#000"/> 
        )}

        {Icon === 'search' && (
           <Search name="search" size={28} color="#000"/> 
        )}
  
     </InputView>
    )
}