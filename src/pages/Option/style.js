import styled from "styled-components/native";


const Container = styled.SafeAreaView`
  flex: 1;
`;
const ItemLeft = styled.TouchableOpacity`
`;

const ViewAuth = styled.View`
 height:100px;
 flex-direction: row;
 background-color: #fff;
 align-items:center;
 margin:10px;
`;

const LinkView = styled.View`
   width: 100%;
   height: auto;
`;

const ItemTouch = styled.TouchableOpacity`
   color: blue;
   margin-left: 17%;
   padding: 10px;
`;

const TextLink = styled.Text`
   color: blue;
`;

const Image = styled.Image`
   border-radius:25px;
   margin-left: 10px;
`;

const ViewMenu = styled.View`
 padding: 20px;
 height: auto ;
`;

const LoginIcon = styled.ActivityIndicator``;

const ContainerDados = styled.View`
  flex:2;
  flex-direction: row;
  background-color: #fff;
  align-items:center;
`;

const Text = styled.Text`
  font-size: 15px;
  margin-left: 20px;
`;

const Item = styled.TouchableOpacity`
  flex-direction: row;
  margin-top: 30px;
  margin-left: -10px;
`;
const SkeletonImage = styled.View `
  width: 50px;
  height: 50px;
  background: #ECEFF1;
  border-radius:50px;
  overflow: hidden;

`;

const SkeletonName = styled.View `
  width: 200px;
  height: 20px;
  background: #ECEFF1;
  margin: 30px;
  overflow: hidden;
`;


export {Container, ViewAuth,
         LinkView, ItemTouch, TextLink,
         Image, LoginIcon,
         ViewMenu, ContainerDados,
         ItemLeft , Text, Item,  SkeletonImage, SkeletonName}