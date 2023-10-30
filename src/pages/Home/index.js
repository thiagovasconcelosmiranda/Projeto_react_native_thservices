import {RefreshControl, ScrollView} from 'react-native';
import Api from '../../Api';
import {useNavigation } from '@react-navigation/native';
import {useContext, useEffect, useState } from 'react';
import Facebook from 'react-native-vector-icons/AntDesign';
import Instragram from 'react-native-vector-icons/AntDesign';
import Twitter from 'react-native-vector-icons/AntDesign';
import Input from '../../components/Input';
import ListAnnouncements from '../../components/listAnnouncements';
import { PhotoContext } from '../../contexts/Photo';
import{ Container,
        HeaderArea,
        ItemTouchNotification,
        CountItem,
        CountText,
        HeaderItem,
        SocialView,
        Item,
        SocialText,
        HeaderText,
        LoginIcon,
} from './style';
import Notification from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Sharing from 'expo-sharing';
import {printToFileAsync} from 'expo-print';
import * as WebBrowser from 'expo-web-browser';


export default (props) => {
   const [list, setList] = useState([]);
   const [refresh , setRefresh] = useState(false)
   const navigation = useNavigation();
   const [loginIcon, setoginIcon] = useState('flex');
   const [search, setSerarch] = useState('');
   const [acions, setAcions] = useState(true);
   const {link} = useContext(PhotoContext);
   const [Token, setToken] = useState('');
   const [veryNotification, setVeryNotification] = useState(false);
   const [CountNotification, setCountNotification] = useState(0);
   const [Like, setLikes] = useState([]);

    useEffect(()=>{
      getAnnouncement();
    },[search]);
   
    const  getAnnouncement = async () => {
      const token = await AsyncStorage.getItem('token');
     if(token){
       getNotifitions(token);
       setToken(token);
       if(search === ''){ 
          const resp = await Api.getAnnouncements();
          if(resp.data.length === 0){
              setoginIcon('none');
              setAcions(false);
          }else{
             setList(resp.data);
              setAcions(true);
              setoginIcon('none');   
          }
          
      }else{
         const resp = await Api.getAnnouncement(search);
         if(resp.data.length === 0){
            setoginIcon('none');
            setAcions(false);
         }else{
            setAcions(true);
            setoginIcon('none');
            setList(resp.data);
         }
       }
     }
    };

    let likes = 0;
    let deslikes = 0;
    const veryLikes = async (data, type) => {
       if(Token){
           const like = await Api.getLike(data.id, Token);
           if(!like.id){
            setLikes(like);
              if(type === 'like'){
                likes = 1;
                deslikes = 0;
              }

              if(type === 'deslike'){
                deslikes = 1;
                likes = 0;
              }

              const res = await Api.createLike(likes, deslikes, data.id, Token); 
              if(res){
                 alert("Obrigado pelo seu like");
              }
           }else{
            if(type === 'like'){
               likes =  parseInt(like.like) + 1;
               deslikes =  parseInt(like.deslike);
            }
            if(type === 'deslike'){
              deslikes = parseInt(like.deslike) + 1
              likes =  parseInt(like.like);
            }

            const res = await Api.UpdateLike(likes, deslikes ,data.id, Token);
            if(res > 0){
               alert("Obrigado pelo seu Like");
            }else{
               alert("ERRO: Like não Registrado entre em contato com o desenvolvedor.");
            }
          }
        } 
    };

    const getNotifitions = async (token) =>{
      let num = 0;
       //retorna dados da notificações
       const auth = await Api.getAuth(token);
       if(auth.id){
           const client = await Api.getClient(auth.id, token);
         if(client.id){
              const company = await Api.getCompany(client.id, token);
              if(company.id){
                 const notifications = await Api.getNotification(company.id, token);
                 if(notifications.data.length > 0){
                     notifications.data.map((item)=>{
                        if(item.visualized === "not visualized"){
                           num++;
                        }
                     });
                     if(num > 0){
                      setCountNotification(num);
                      setVeryNotification(true);
                     }
                    
                 }
              }
         }
       }
    };

    const handleNotification = () => {
        navigation.navigate('Notifications');
    }

  const refreshActive = () => {
    setTimeout(()=>{
      getAnnouncement();
      setRefresh(false);
    }, 700);
  };

  const handleButtonProfile = (item) => {
     props.navigation.navigate('Profile', {item: item});
  }

  const handleNavigation = async (url) => {

    const result = await WebBrowser.openBrowserAsync(url);
    
  };

  const handleButton = async (data, type) =>{
    if(type === 'like'){
      veryLikes(data, type);
    }else if(type === 'deslike'){
     veryLikes(data, type);
    }else {
       generate(data);
    }
  };

  const generate = async (data) =>{
    console.log(data.image);
    const html = `
         <html>
            <body>
               <img src='https://d504-2804-1254-8156-2400-b9bc-5a66-840e-9d5c.ngrok-free.app/storage/announcementsPhoto/jq49KUK7ymVSB7k0XojQzFSZI34zVcr4y8q8bPXc.jpg' alt=logo tipo/>
               <h1>${data.title}</h1>
               <p>${data.descrition}</p>
             </body>
          </html>
      `;

     const file = await printToFileAsync({
          html: html,
          base64: false
      });

     await Sharing.shareAsync(file.uri);  
  };
  
    return(
        <Container>
          <HeaderArea>
            <HeaderItem>
                <HeaderText>Encontre serviços</HeaderText>
                  <ItemTouchNotification onPress={()=>handleNotification()}>
                    <Notification name='notifications-outline' size={25} color="#000"/>
                    {veryNotification && (
                      <CountItem>
                         <CountText>+{CountNotification}</CountText>
                      </CountItem>
                    )}
                  </ItemTouchNotification>
            </HeaderItem>
            <SocialView>
                <Item>
                  <SocialText>Siga agente:</SocialText>
                </Item>
              <Item onPress={()=>handleNavigation('https://www.facebook.com/')}>
                  <Facebook name='facebook-square' size={25} color='#4169E1'/>
              </Item>
              <Item onPress={()=>handleNavigation('https://www.instagram.com/accounts/login/')}>
                 <Instragram name='instagram' size={25} color='#4169E1'/>
               </Item>
               <Item onPress={()=>handleNavigation('https://twitter.com/ThiagoPrograma')}>
                  <Twitter name='twitter' size={25} color='#4169E1'/>
                </Item>
             </SocialView>
             <Input placeholder="Buscar"
                    value={search}
                    onChangeText={e=>setSerarch(e)}
                    Icon="search"
                    width="80%"
                    height= {20}
                />      
             </HeaderArea>
             <LoginIcon  style={{display: loginIcon==='flex'? 'flex': 'none'}} size="large" color="#000"/>
               {acions && (
               <ScrollView refreshControl={
                 <RefreshControl refreshing={refresh} onRefresh={refreshActive}/>}> 
                    {list.map((item,k) =>( 
                    
                      <ListAnnouncements
                        key={k} data={item} 
                        link={link}
                        acionar={()=>handleButtonProfile(item)}
                        buttonCompartilha={()=>handleButton(item, 'share')}
                        buttonLike={()=>handleButton(item, 'like')}
                        buttonDeslike={()=>handleButton(item,'deslike')}  
                        /> 
                        
                        ))}  
                </ScrollView>)} 
         </Container>
    )
};