import styled from "styled-components/native";

const Container = styled.View`
   flex: 1;
`;

const HeaderView = styled.View`
 flex-direction: row;
 align-items: center;
 width:100%;
 height: 70px;
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
  height:40px;
`;

const HeaderText = styled.Text`
 font-size: 20px;
 color:#000;
 margin-left: 30px;
`;

const ItemView = styled.View`
 width: 100%;
 flex: 1;
 background-color:#D3D3D3;
 margin-top: -10px;
`;

const ImageItem = styled.View`
 width: 100%;
 flex-direction: row;
 justify-content: center;
 margin-top: 10px;
`;

const AlignItem = styled.View`
width: 100%;
flex-direction: row;
justify-content: center ;
`;

const Item = styled.View`
 width: 90% ;
 height: 200px;
 background-color: #fff;
`;

export {Container, HeaderView,
        ItemLeft, ItemText,
        HeaderText, ItemView,
        ImageItem, Item,
        AlignItem}