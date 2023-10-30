import styled from "styled-components/native";

const Container = styled.View`
   flex:1;
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

const InputView = styled.View`
  width:100%;
  height: 400px;
  margin-top: 8px;
`;
const ItemView = styled.View `
 flex-direction: column;
 margin: 20px;
 margin-top: -8px;
`; 
const Title = styled.Text `
 font-size: 20px;
 margin-left: 45px;
 font-weight: bold;
`;

const Item = styled.View`
   flex-direction: row;
   width:60%;
`;

const CustomButtom = styled.TouchableOpacity`
  width:230px;
  height: 56px;
  background-color: #268596;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  margin-top: 60px;
`;

 const CustomButtonText = styled.Text `
  font-size:  18px;
  color:#FFFFFF;
`;

const LoginIcon = styled.ActivityIndicator`
`;


export {Container, HeaderView,
         HeaderText, ItemLeft, 
         ItemText, InputView,
         ItemView,  Title,
         Item, CustomButtom,
         CustomButtonText, LoginIcon 
       }