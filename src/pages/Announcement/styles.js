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
   align-items:center;
   margin:10px;
`;

const UploadTouch = styled.TouchableOpacity``;

const UploadText = styled.Text`
  width: 80%;
  color: blue;
  text-align: center;
  font-size: 12px;
  font-weight: bold;
`;

const FormView = styled.View`
 width: 100%;
 height: 300px;
`;

const Item = styled.TouchableOpacity`
   width: 100%;
   flex-direction: row;
   justify-content: center;
`;
const AlignButtom = styled.View`
  width: 100%;
  height: 180px;
  flex-direction: row;
  justify-content: center;
  align-items: baseline;
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
const LoginIcon = styled.ActivityIndicator``;


export {Container, HeaderView, 
        ItemLeft, HeaderText, 
        ItemText, UploadView, 
        UploadTouch, UploadText, FormView,
        Item, AlignButtom, CustomButtom,
         CustomButtonText, LoginIcon}