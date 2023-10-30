import styled from "styled-components";

const Container = styled.View`
  flex: 1;
  background-color:#D3D3D3;
  position: relative;
`;

const HeaderView = styled.View`
 flex-direction: row;
 align-items: center;
 width:100%;
 height: 80px;
 background-color: #fff;
`;

const ItemLeft = styled.View`
flex-direction: row;
justify-content: center;
align-items: center;
margin-left:-12px;
height:40px;
`;

const ItemText = styled.Text`
  margin-left:20px;
  margin-top:10px;
  height:40px;
`;

const HeaderText = styled.Text`
 font-size: 20px;
 color:#000;
 margin-left: 30px;
`;

const ItemNotification = styled.View`
  width: 100%;
  height:auto;
  flex-direction: row;
  justify-content: center;
`;
const ItemList = styled.View`
 height: auto;
`;

const AlignItem = styled.View`
   margin: 10px;
   flex-direction: row;
   justify-content: center;
  `;

 export {Container, HeaderView, ItemLeft, ItemText, HeaderText, ItemNotification, ItemList, AlignItem}