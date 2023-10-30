import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  background-color: #fff;
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

const GroupItemAuth = styled.View`
   width: 93%;
   height: auto;
   flex-direction: row;
   justify-content: space-between;
   align-items: center; 
   margin-top: 50px;
   padding: 10px;
`;

const GroupItem = styled.View`
   width: 100%;
   height: auto;
   flex-direction: row;
   justify-content: center;
   align-items: center; 
   margin-top: 50px;
   padding: 10px;
`;

const Item = styled.View`
 heigth: auto;
`;

const Text = styled.Text`
  width: 60%;
  font-size: 23px;
  font-weight: bold;
  margin-left: 20px;
`;
const GroupIcon = styled.View`
  widht: 60%;
  margin: 0 auto;
  flex-direction: row;
  justify-content: center;
  align-items: center; 
`;

const Image = styled.Image`
   border-radius: 100px;
   margin-left: -90px;
`;

const ItemView = styled.View`
  width: 90%;
  height: auto;
  background-color: #DCDCDC;
  padding: 20px;
  transation: 2s;
`;

const TextAuth = styled.Text`
  width: 100%;
  font-size: 14px;
  text-align: center;
  margin-top: 30px;
  margin-left: -40px;
`;

const Touch = styled.TouchableOpacity`
   widht: 100%;
   flex-direction: row;
   justify-content: center;
   align-items: center; 
   margin-top: 30px;
`;

const InputView = styled.View`
     width: 100%;
     height: auto;
`;

const CustomButtom = styled.TouchableOpacity`
width:230px;
height: 56px;
background-color: #333;
justify-content: center;
align-items: center;
margin-left: auto;
margin-right: auto;
`;

const CustomButtonText = styled.Text `
  font-size:  18px;
  color:#FFF;
`;
const LoginIcon = styled.ActivityIndicator``;

const ContactView = styled.View`
  margin: 0 auto;
  width: 90%;
  height: auto;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const SkeletonImage = styled.View`
   width: 100px;
   height: 100px;
   border-radius: 100px;
   margin-left: 50px;
   background-color: #ECEFF1;
   overflow: hidden;
   
`;

const SkeletonText = styled.View`
   width: 150px;
   height: 100px;
   background-color: #ECEFF1;
   overflow: hidden;
`;
const DeleteView = styled.View`
  width: 100%;
  height: auto;
  flex-direction: row;
  justify-content: center;
  align-items: center; 

`;

const ItemDelete = styled.View`
   width: 85%;
   heigth: auto;
   padding: 20px 10px;
   border: 2px solid red;
   flex-direction: row;
   justify-content: space-between;
    margin: 10px;
`;

const TextDelete = styled.Text`
 margin-top: 5px;
 color: red;
 font-size: 16px;
`;
const ButtonToken = styled.TouchableOpacity`
   width: 110px;
   border-radius: 25px;
   background: red;
   padding: 10px 10px;
   flex-direction: row;
   justify-content: center;
   align-items: center; 
`;

const ButtonText = styled.Text`
   color: #fff;
`;

export {Container, HeaderView, 
        ItemLeft, ItemText,
        HeaderText , GroupItem, GroupItemAuth,
        Item, Text, GroupIcon , Image, ItemView,
        TextAuth, Touch , InputView,
        CustomButtom, CustomButtonText, 
        LoginIcon, ContactView, SkeletonText , 
        SkeletonImage, DeleteView, ItemDelete,
        TextDelete, ButtonToken, ButtonText 
       };
