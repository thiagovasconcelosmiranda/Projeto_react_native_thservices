import styled from 'styled-components/native';


const Container = styled.View`
   flex: 1;
   align-items: center;
   position: relative;

`;

const HeaderArea = styled.View`
   flex-direction: row;
   width:100%;
   height: 90px;
   background-color: #FFFAF0 ;
   align-items: center;
`;

const LeftTouch = styled.TouchableOpacity`
  height: 50px;
   margin-top:20px;
`;

const Title = styled.Text`
 font-size: 20px;
 margin-left:30px;
`;

const Text = styled.Text `
   color: #000;
`;
const Button  = styled.TouchableOpacity`
   width: 30%;
   padding: 10px;
  background: blue;
`;

const ButtonText = styled.Text `
    color: #fff;
`;
const View = styled.View``;


export {Container, HeaderArea, LeftTouch, Title, Text, Button, ButtonText, View}