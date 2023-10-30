
import styled from "styled-components/native";

const Container = styled.SafeAreaView`
 flex:1;
 align-items:center;
 background-color:#D3D3D3;
 height:auto;
`;

const HeaderArea = styled.View`
  justify-content: center;
  align-items:center;
  background-color:#F8F8FF;
  width:100%;
  height: 180px;
  margin:10px;
`;

const HeaderItem = styled.View`
 width:90%;
 flex-direction: row;
 justify-content: space-between;
 align-items: center;

`;
const ItemTouchNotification = styled.TouchableOpacity`
  height:20px;
  margin-top:10px;
`;

const CountItem = styled.View`
  width: 25px;
  height: 17px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: red;
  position: absolute;
  left: 10px;
`;

const CountText = styled.Text`
   font-size: 10px;
   color: #fff;
   text-align: center;
`;

const HeaderText = styled.Text`
 font-size: 24px;
 color:#0000CD;
 font-weight: bold;
 margin-top: 20px
`;

const  SocialView = styled.View`
flex-direction: row;
padding-left: 10px;
`;

const Item = styled.TouchableOpacity`
 margin:10px;
`;

const SocialText = styled.Text`
    font-size: 20px;
    font-weight: bold;
`;

const SearchView = styled.View`
width:80%;
flex-direction: row;

`;

const ScrollView = styled.View `
 padding: 15px;
`;

const ListArea = styled.View`
  margin-top: 30px;
  margin-bottom: 30px;
`;

const LoginIcon = styled.ActivityIndicator`
position:absolute;
top: 350px;
`;

const InputArea = styled.View`
width: 100%;
height: 50px;
flex-direction: row;
padding: 15px;
margin-left: auto;
margin-right: auto;
align-items: center;
margin-bottom: 30px;
background-color: #fff;
margin-top:10px;
`;

const Input = styled.TextInput`
  flex: 1;
  font-size: 16px;
  color: #00000;
  margin-left:20px;
  margin: auto;
`;
const SkeletonAnnouncement = styled.View`
  background-color: #ECEFF1;
  margin-bottom:20px;
  width: 90%;
  height: 300px;
`;


export {Container, HeaderArea,
        ItemTouchNotification,
        CountItem, CountText,
        HeaderItem, HeaderText, 
        ScrollView, ListArea,
        SocialView, Item,
        SocialText ,LoginIcon,
        SearchView, InputArea,
        Input, SkeletonAnnouncement
       }