import styled from "styled-components";

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #000;
  position: relative;
`;

const HeaderView = styled.View`
 flex-direction: row;
 width:100%;
 height: auto;
 padding: 15px;
 background-color: #fff;
 align-items: center;
`;

const SwipeDot = styled.View`
  width: 10px;
  height: 10px;
  background-color: #FFF;
  border-radius: 5px;
  margin:3px;
`;

const SwipeDotActive  = styled.View`
  width: 10px;
  height: 10px;
  background-color: #000;
  border-radius: 5px;
  margin:3px;
`;

const ItemLeft = styled.View`
 margin-left:-12px;
 height: 40px;
`;

const TextView = styled.View`
  margin-left:20px;
  height:40px;

`;

const HeaderText = styled.Text`
 font-size: 20px;
 color:#000;
 margin-left: 30px;
 font-weight: bold;
`;

const ImageView = styled.View`
  flex: 1;
  background-color: #000;
  justify-content:center;
  align-items: center;
`;

const SkeletonImage = styled.View`
  width:230px;
  height:130px;
  background-color: #ECEFF1;
  overflow: hidden;
`;

const SelfView = styled.View`
   width:230px;
   height:130px;
   flex-direction: row;
   justify-content: center;
   align-items: center;
`;
const InfoView = styled.View`
    flex:2;
    background-color: #FFFF;
    justify-content: center;
    align-items: center;
`;

const IconsView = styled.View`
 width: 100%;
 flex-direction: row;
 margin: 5px;
 justify-content: center;
 align-items:center;
 
`;
const Item = styled.TouchableOpacity`
     margin: 10px;
`;
const LoginIcon = styled.ActivityIndicator``;

const Title = styled.Text`
    font-size:20px;
    font-weight: bold;
    text-align: center;
    margin-top:1px;
`;

const ViewItem = styled.View`
 width: 100%;
 flex-direction: row;
 justify-content: center;
 margin-top: -10px;
 align-items: center;
`;

const Text = styled.Text`
    font-size:18px;
     width: 90%;
     background: #DCDCDC;
     padding: 20px;
`;

const ItemView = styled.View`
   margin-top:10px;
   width: 100%;
   align-items: center;
   justify-content: center;
`;
const ViewRede = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
   padding: 10px;
  `;
const Touch = styled.TouchableOpacity`
   background-color: #fff;
   width: 70%;
   margin-top: 10px;
`;
const TouchRede = styled.TouchableOpacity`
  margin-left: 10px;
`;

const ItemText = styled.Text`
 color: blue;
 font-size: 20px;
 text-align: center;
`;

const FooterText = styled.Text`
 margin-top: 20px;
 text-align: center;
 font-size: 22px;
 color: #000;
`;

const InputViewModal = styled.View`
 width: 100%;
 height: 100px;
 flex-direction: row;

`;


export { Container, HeaderView,  SwipeDot, SwipeDotActive, TextView,
         HeaderText, ItemLeft, ImageView, SelfView ,InfoView, IconsView, 
         Item, LoginIcon , Title, ViewItem, Text, ItemView, ViewRede,
         Touch, TouchRede, ItemText, FooterText, InputViewModal,SkeletonImage 
       }