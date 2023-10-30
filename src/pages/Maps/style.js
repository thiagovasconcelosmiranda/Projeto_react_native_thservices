import styled from "styled-components";


const Container = styled.View`
  flex: 1;
   
`;

const HeaderView = styled.View`
 flex-direction: row; 
 width: 100%;
 height: 200px;
 height: 100px;
 align-items: center;
`;

const ItemLeft = styled.TouchableOpacity`
 margin-left: -10px;
`;

const HeaderText = styled.Text`
   font-size: 25px;
   color: blue;
   margin-left: 20px;
`;

const LocationView = styled.View`
 width: 100%;
 height: auto;
 justify-content: center;
 align-items: center;

`;

const TitleText = styled.Text`
  text-align: center;
  font-weight: bold;
  font-size: 25px;
  margin-top:20px;
`;

const LocationText = styled.Text`
 font-size: 18px;
 width: 300px;
 text-align: center;
 margin-top: 20px;
`;
const Latitude = styled.Text`
 font-weight: bold;
 color: blue;
`;


export {Container, HeaderView, ItemLeft, HeaderText, LocationView, TitleText,
  LocationText, Latitude}