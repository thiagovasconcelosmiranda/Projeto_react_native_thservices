import styled from "styled-components/native";


const Container = styled.View`
  flex: 1;
`;

const HeaderView = styled.View`
 flex-direction: row;
 width:100%;
 height: 80px;
 background-color: #fff;
 align-items: center;
`;

const ItemLeft = styled.View`
margin-left:-12px;
height:40px;
`;

const ItemText = styled.Text`
  margin-left:20px;
  height:40px;
`;

const HeaderText = styled.Text`
 font-size: 20px;
 color:#000;
 margin-left: 30px;
`;

const UploadView = styled.View`
   flex-direction: row;
   justify-content: center;
   width: 100%;
`;

const TouchableOpacityItem = styled.TouchableOpacity``;


const  FormView = styled.View`
 width: 100%;
 height: 300px;
`;

const InputItem = styled.View`
   width: 100%;
   margin-top: 20px;
`;

const Text = styled.Text`
  font-size: 20px;
  margin-left: 50px;
`;

const Item = styled.View`
  width: 100%;
  height: auto;
  flex-direction: row;
  justify-content: center;
  margin-top: 10px;
`;

const CustomButtom = styled.TouchableOpacity`
  width:230px;
  height: 56px;
  background-color: #268596;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
`;

const CustomButtonText = styled.Text `
  font-size:  18px;
  color:#FFFFFF;
`;
const LoginIcon = styled.ActivityIndicator``;

export {Container, HeaderView,
        ItemLeft, ItemText,
        HeaderText, UploadView, 
        FormView, Text, 
        InputItem, Item, 
        CustomButtom, CustomButtonText, 
        LoginIcon, TouchableOpacityItem
      }