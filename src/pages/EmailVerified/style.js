import styled from "styled-components/native";

const Container = styled.View`
   flex:1;
   justify-content: center;
   align-items: center;
   background-color: #000;
`;
const ImageView = styled.View`
 width:100%;
 position: absolute;
 top: 15px;
 left: 80px;
 right: auto;
`;

const TelaView = styled.View`
   width: 80%;
   padding: 30px;
   background-color: #333;
   margin-top:130px;
`;

const Title = styled.Text`
   text-align: center;
   color: #fff;
   font-weight:bold;
   font-size:25px;


`;


const CustomButtom = styled.TouchableOpacity`

width:230px;
height: 56px;
border-radius: 25px;
background-color: #268596;
justify-content: center;
align-items: center;
margin-left: auto;
margin-right: auto;

`;


const CustomButtonText = styled.Text `
 font-size:  18px;
 color:#FFFFFF;
`;
const LoginIcon = styled.ActivityIndicator`
`;

 const SignMessageButton = styled.TouchableOpacity`
   flex-direction:row;
   justify-content: center;
   margin-bottom:0px;

`;

const SignMessageButtonTextBold = styled.Text `
font-size:20px;
color: #FFF;
font-weight:bold;
margin-left: 8px;
margin-top: 10px;
`;

export {Container, TelaView, 
        SignMessageButton,
        SignMessageButtonTextBold, ImageView,
        CustomButtom, CustomButtonText, Title, LoginIcon};