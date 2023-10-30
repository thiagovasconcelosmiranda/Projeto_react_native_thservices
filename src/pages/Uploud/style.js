import styled from "styled-components/native";

const Containers = styled.View`
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

const UploadView = styled.View`
   flex-direction: row;
   justify-content: center;
   align-items:center;
   margin:10px;
`;

const UploadTouch = styled.TouchableOpacity`
margin: 10px;
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
margin-top: 30px;
`;

const CustomButtonText = styled.Text `
 font-size:  18px;
 color:#FFFFFF;
`;

const LoginIcon = styled.ActivityIndicator``;

export {Containers, HeaderView,
        ItemLeft, ItemText,
        HeaderText, UploadView,
        UploadTouch ,CustomButtom, 
        CustomButtonText, LoginIcon};