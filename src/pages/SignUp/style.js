
import styled from "styled-components/native";


const Container = styled.SafeAreaView`
 background-color: #111;
 flex: 1;
 justify-content: center;
 align-items: center;
`;

const TitleView = styled.View`
  width: 100%;
 flex-direction: row;
 justify-content: center;
 align-items: center;
`;

const TitleTop = styled.Text`
 color: '#fff';
 font-size: 20px;
`;


const ImageView = styled.View`
 width:100%;
 margin-top: 100px;
 flex-direction: row;
 justify-content: center;
 align-items: center;
`;
const ViewAlign = styled.View`
  width: auto;
  margin: 0 auto;
`;

const InputArea = styled.View`
   width: 80%;
   height:80%;
   padding: 30px;
   background-color: #333;
   border-top-left-radius:30px;
   border-top-right-radius:30px;
   margin-top: 50px;
`;

const CaractereView = styled.View`
 width: 100%;
 margin: -20px;
 padding: 10px;
`;
const AlignCaracte = styled.View`
 flex-direction: row;
 align-items: center;
 margin: 5px;
`;

const CaracteText = styled.Text`
 color: #fff;
 font-size: 14px;
 margin-left: 20px;
`;

const AlignValidate = styled.View`
 width: 100%;
 flex-direction: row;
 align-items: center;
 margin-top: -20px;
 
`;

const AlignButton = styled.View`
  width:100%;
  margin-top:20px;
`;

const CustomButtom = styled.TouchableOpacity`
width: 230px;
height: 50px;
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

const LoginIcon = styled.ActivityIndicator``;

const ImageAlign = styled.View`
 width:100%;
  `;

 const SignMessageButton = styled.TouchableOpacity`
   flex-direction:row;
   justify-content: center;
   margin-top: 30px;
   margin-bottom:20px;
`;

const SignMessageButtonTextBold = styled.Text `
font-size:16px;
color: #FFF;
font-weight:bold;
margin-left: 8px;
`;

export { Container, TitleView, TitleTop, InputArea, CaractereView, AlignCaracte, CaracteText, AlignValidate,CustomButtom,
         CustomButtonText, LoginIcon, ImageAlign, AlignButton, SignMessageButton,
         SignMessageButtonTextBold, ImageView, ViewAlign
        }
