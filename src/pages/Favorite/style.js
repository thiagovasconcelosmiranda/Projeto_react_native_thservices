import styled from "styled-components";
import Favorite from '../../img/delete.gif';


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

const Imageback = styled.View `
   width: 100%;
   height:30%;
   background-image: url(${Favorite});
`;

const Item = styled.View`
 margin-top: 20px;
`;

const ItemView = styled.View`
 margin-top:40px;
 padding: 10px;
`;

export {Container, HeaderArea, LeftTouch, Title, Imageback, Item, ItemView}



