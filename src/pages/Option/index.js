
import { useContext, useEffect, useState} from 'react';
import { PhotoContext } from '../../contexts/Photo';
import {Container, 
        Image,
        ViewAuth,
        LinkView,
        ItemTouch,
        TextLink,
        LoginIcon,
        ViewMenu,
        ContainerDados,
        ItemLeft,
        Text, 
        Item, 
        SkeletonImage,
        SkeletonName, 
    } from'./style';
import Left from 'react-native-vector-icons/AntDesign';
import Album from 'react-native-vector-icons/Entypo';
import Logout from 'react-native-vector-icons/MaterialCommunityIcons';
import User from 'react-native-vector-icons/Feather';
import Address from 'react-native-vector-icons/Entypo';
import Client from 'react-native-vector-icons/EvilIcons';
import Phone  from 'react-native-vector-icons/AntDesign';
import List from 'react-native-vector-icons/FontAwesome';
import Announcement from 'react-native-vector-icons/Foundation';
import Company from 'react-native-vector-icons/FontAwesome5';
import Notification from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Api from '../../Api';
import { useNavigation } from '@react-navigation/native';
import { Card } from 'react-native-shadow-cards';
import { ScrollView, Animated, StyleSheet, View, Dimensions, useRef } from 'react-native';
import LoginIconVery from "../../components/LoginIconVery";
import {LinearGradient} from 'expo-linear-gradient';


export default (props) => {
    const navigation = useNavigation();
    const[list, setList] = useState([]);
    const[images, setImages]  = useState('');
    const {link} = useContext(PhotoContext);
    const [verify, setVerify] = useState(false);

    const {width} = Dimensions.get('window');
    const  AnimateValue  =new Animated.Value(0);

    useEffect(()=>{
       Animated.loop(Animated.timing(AnimateValue,{
           toValue: 1,
           useNativeDriver: true,
           duration: 2500
        })).start();

        const  getAuth = async () => {
           const token = await AsyncStorage.getItem('token');
           if(token){
               const auth = await Api.getAuth(token);
               if(auth.id > 0){
                 const client = await Api.getClient(auth.id, token);
                 if(client.id){
                  setList(client);
                  const uploadclient = await Api.getUploadClient(client.id, token);
                  if(uploadclient.id){
                    setImages(uploadclient.image);
                    clearInterval();
                  }
                 }
                 
              }
           } 
         }
       getAuth();
    },[]);

    const handleButtonLogout = async()=>{
      setVerify(true);
      const token = await AsyncStorage.getItem('token');
      if(token){
           const res = await Api.logout(token);
           if(res){
            setVerify(false);
              await AsyncStorage.setItem('token', '');
              navigation.reset({ 
                 routes:[{name: 'SignIn'}]
              }); 
          }
         
      }
     
    }

    const hndleButtonMainTab = () =>{
      navigation.reset({ 
        routes:[{name: 'MainTab'}]
        });
    }

    const handleButtonUpload = () => {
        navigation.navigate('Upload');
    }

    const handleListSchedule = () =>{
      navigation.navigate('Schedule');
    }

    const handleButtonClient = () => {
      navigation.navigate('Client');
    }

    const handleButtonAddressClient = () =>{
      navigation.navigate('AddressClient');
    }

    const handleButtonAnuncio = () =>{
      navigation.navigate('Announcement');
    }

    const handleButtonCompany = () => {

     const data = new Date();
      props.navigation.navigate('Company', {date: new Date()});
    }

    const handleButtonAddressCompany = () => {
      navigation.navigate('AddressCompany');
    }

    const handleButtonNotificatios = () => {
      navigation.navigate('Notifications');
    }

    const  handleConfiguration = () => {
      navigation.navigate('Configuration');
    }

    const handleButtonContact = () => {
       navigation.navigate('Contact');
    }

    return (
      <Container>
          <ViewAuth>
            <LinkView>
              <ContainerDados>
                <ItemLeft>
                    <Left name='arrowleft'
                      size={30} color="#000"
                      style={{marginLeft:20}}
                      onPress={()=>hndleButtonMainTab()}/>
                  </ItemLeft>
                  {images === '' ? (<ItemLeft>
                     <SkeletonImage>
                        <Animated.View style={[styles.Line, {
                            transform:[{
                              translateX: AnimateValue.interpolate({
                                inputRange: [0, 1],
                                outputRange: [-width,width]
                              })
                            }]
                         }]}>
                          <LinearGradient 
                            colors={['#DCDCDC', '#DCDCDC', '#DCDCDC']}
                            style={{flex: 1}}
                            start={{x: 0, y: 0}}/> 
                       </Animated.View>
                     </SkeletonImage>
                     </ItemLeft>): ( <ItemLeft>
                       {images !== '' ?  ( 
                        <Image 
                             source={{uri: `${link}${images}`}} 
                             style={{ width: 50, height: 50}}/>
                      ): (<Client name="user" size={50} color="#000"/>)}
                  </ItemLeft>)}
                  
                  {list.id > 0 ? (<Text>{list.name}</Text>): (
                    <ItemLeft>
                     <SkeletonName>
                         <Animated.View style={[styles.Line, {
                            transform:[{
                              translateX: AnimateValue.interpolate({
                                inputRange: [0, 1],
                                outputRange: [-width,width]
                              })
                            }]
                         }]}>
                           <LinearGradient 
                            colors={['#DCDCDC', '#DCDCDC', '#DCDCDC']}
                            style={{flex: 1}}
                            start={{x: 0, y: 0}}/>

                         </Animated.View>
                     </SkeletonName>
                    </ItemLeft>
                  )}  
             </ContainerDados>
             <ItemTouch onPress={()=>handleConfiguration()}>
                <TextLink>Configurações</TextLink>
             </ItemTouch>
            </LinkView>
          </ViewAuth>
           <ScrollView>
          <ViewMenu>
            <Card>
               <Item onPress={()=>handleButtonNotificatios()}>
                  <Notification name='notification'size={25} color="#000" style={{marginLeft:20}}/>
                  <Text>Notificação</Text>
                </Item>
               <Item onPress={()=>handleButtonUpload()}>
                  <Album  name='image'size={25} color="#000" style={{marginLeft:20}}/>
                  <Text>Galeria</Text>
                </Item>
                <Item onPress={()=>handleButtonClient()}>
                 <User name='user'size={30} color="#000" style={{marginLeft:20}}/>
                 <Text>Usuário</Text>
               </Item>
               <Item onPress={()=>handleButtonAddressClient()}>
                 <Address name='address'size={30} color="#000" style={{marginLeft:20}}/>
                 <Text>Endereço usuário</Text>
               </Item>
               <Item onPress={()=>handleButtonCompany()}>
                   <Company name='landmark'size={25} color="#000" style={{marginLeft:20}}/>
                   <Text>Empresa</Text>
                </Item>
               <Item onPress={()=>handleButtonAddressCompany()}>
                 <Address name='address'size={30} color="#000" style={{marginLeft:20}}/>
                 <Text>Endereço Empresa</Text>
               </Item>
               
                <Item onPress={()=>handleButtonAnuncio()}>
                     <Announcement name='megaphone'size={25} color="#000" style={{marginLeft:20}}/>
                     <Text>Anúncio</Text>
                </Item>
                <Item onPress={()=>handleListSchedule()}>
                    <List name="list-alt" size={30} style={{marginLeft:20}}/>
                    <Text>Agendamentos</Text>
                </Item>
               <Item onPress={()=>handleButtonContact()}>
                 <Phone name='phone'size={25} color="#000" style={{marginLeft:20}}/>
                 <Text>Contato</Text>
              </Item>
               <Item onPress={()=>handleButtonLogout()}>
                 <Logout name='logout-variant'size={25} color="#000" style={{marginLeft:20}}/>
                 <Text>Sair</Text>
               </Item>
             </Card>
          </ViewMenu> 
        </ScrollView> 
        {verify && (<LoginIconVery/>)}
     </Container>
    )
}

const styles = StyleSheet.create({
  Line:{
    width:'100%',
    height: '100%'
  }
});