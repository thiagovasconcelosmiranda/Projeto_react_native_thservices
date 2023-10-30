import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState, useContext } from 'react';
import { 
       Container,
       HeaderView,
       ItemLeft,
       HeaderText,
       ItemText,
       UploadView,
       UploadTouch,
       UploadText,
       FormView,
       AlignButtom,
       CustomButtom, 
       CustomButtonText, 
       LoginIcon
 } from './styles.js';
import Left from 'react-native-vector-icons/AntDesign';
import { PhotoContext } from "../../contexts/Photo";
import {useNavigation } from '@react-navigation/native';
import {Image } from 'react-native';
import Input from '../../components/Input';
import {ScrollView } from "react-native-gesture-handler";
import Api from '../../Api.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Alert from '../../components/Alert.js';
import LoginIconVery from '../../components/LoginIconVery.js';

export default () =>{
    const navigation = useNavigation();
    const [Photo, setPhoto] = useState(null);
    const [title, setTitle] = useState('');
    const [descrition, setDescrition] = useState('');
    const [companyId, setCompanyId] = useState('');
    const [Token, setToken] = useState('');
    const [active, setActive] = useState(false);
    const [message, setMessage] = useState('');
    const [styleDisplay, setStyleDisplay] = useState('none');
    const [background, setBackground] = useState('');
    const [titleHeader, setTitleHeade] = useState('Novo Anúncio');
    const [image, setImage] = useState(null);
    const [Announcement, setAnnouncement] = useState([]);
    const [AnnouncementId, setAnnouncementId] = useState('');
    const [verify, setVerify] = useState(false);
    const {link} = useContext(PhotoContext);

    useEffect(()=>{
         permission();
         getAnnouncement();
    },[]);
 
    const permission = async () =>{
       const result = await ImagePicker.requestCameraPermissionsAsync();
       if(!result !== 'granted'){
         //alert('Permission denied!');
       }
   }

   const getAnnouncement = async () => {
      const token = await AsyncStorage.getItem('token');
      setToken(token);
      if(token){
        const auth = await Api.getAuth(token);
        if(auth.id){
           const client = await Api.getClient(auth.id, token);
           if(client.id){
              const company = await Api.getCompany(client.id, token);
              if(company.id){
                 setCompanyId(company.id);
                 const announcement = await Api.getAnnouncement(company.id);
                 if(announcement.id){
                     setAnnouncementId(announcement.id);
                     setAnnouncement(announcement);
                     setTitle(announcement.title);
                     setDescrition(announcement.descrition);
                     setTitleHeade('Alterar Anúncio');
                     setVerify(true);
                     const uploadclient = await Api.getUploadAnnouncements(announcement.id, token);
                     setImage(uploadclient.image);
                    
                 }
              }
           }
        }
      }
   }

   const handleButtonMainTab = () =>{
       navigation.navigate('MainTab');
   }

   const PickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
       mediaTypes: ImagePicker.MediaTypeOptions.All,
       allowsEditing: true,
       aspect: [4, 3],
       quality: 1,
    });

     if (!result.canceled) {
         setPhoto(result.assets[0].uri);
         setImage(null);
     }
   }

   const alertMessage = (msg, background) =>{
    setMessage(msg);
    setStyleDisplay('flex');
    setBackground(background);
    setTimeout(function(){
      setStyleDisplay('none');
    },8000);
    setActive(false);
  };

   const handleButtonAnnouncement = async (status) =>{
     setActive(true);
     if(Token){
       if(companyId){
         if(status === 'add'){
          if(title && descrition && Photo){
            const res = await Api.createAnnouncement(title, descrition, companyId);
             if(res){
                 const upload = await Api.UploadAnnouncements(Photo, AnnouncementId, Token);
                    if(upload.data){
                      alertMessage('Anuncio criado com sucesso!!', 'green');
                      setActive(false);
                    }
               navigation.navigate('Upload');
             }else{
               setActive(false);
               alertMessage('Não adicionado!','red');
             }
          }else{
            setActive(false);
            alertMessage('Espaço em branco!', 'red');
          }
         }else{

           if(Token){
              const res = await Api.UpdateAnnouncement(AnnouncementId, title, descrition,
                 companyId, Announcement.media);
                 if(res > 0){
                  if(Photo){
                    const upload = await Api.UploadAnnouncements(Photo, AnnouncementId, Token);
                    if(upload.data){
                      alertMessage('Alteraro com sucesso!', 'green');
                    }
                  }   
               }
            }
            setActive(false);
         }
      } 
    }
  }

   return(
     <Container>
       <HeaderView>
         <ItemLeft>
          <Left name='arrowleft'
           size={30} color="#000"
           style={{marginLeft:40}}
           onPress={()=>handleButtonMainTab()}/>
         </ItemLeft>
         <ItemText>
          <HeaderText>{titleHeader}</HeaderText>
         </ItemText>
       </HeaderView>
        <Alert 
          styleDisplay={styleDisplay}
          message={message}
          background={background}/>
          {image ? (
              <UploadView>
              <UploadTouch onPress={()=>PickImage()}>
                <Image source={{uri: `${link}${image}`}} 
                style={{height:150, width:150}}/>
              </UploadTouch>
             </UploadView>
          ):(
           <>
            {Photo ? (
              <UploadView>
               <UploadTouch onPress={()=>PickImage()}>
                 <Image source={{uri: Photo}} 
                 style={{height:150, width:150}}/>
               </UploadTouch>
              </UploadView>
              ): (
             <UploadView>
              <UploadTouch onPress={()=>PickImage()}>
                <Image source={ require("../../img/image.png")}   style={{height:150, width:150}}/>
              </UploadTouch>
             </UploadView>)}
             </>
          )}
        <UploadView>
           <UploadText>Adicione a imagem principal onde todos vao ver na lista de pesquisa</UploadText>
        </UploadView> 
        <ScrollView>
          <FormView>
           <Input
              placeholder='Titulo ex: Pernambucanas'
              value={title}
              onChangeText={e=>setTitle(e)}
            width="70%"
            height='10%'/>
          <Input
            placeholder='Descrição do anuncio'
            value={descrition}
            onChangeText={e=>setDescrition(e)}
            width="70%"
            height='40%'/>
         </FormView>
         <AlignButtom>
          {verify ? (
            <>
             {active ? (
                <CustomButtom>
                  <CustomButtonText><LoginIcon size="large" color="#FFFFFF"/></CustomButtonText>
                </CustomButtom>
            ): (
             <CustomButtom onPress={()=>handleButtonAnnouncement('alter')}>
                <CustomButtonText>Alterar anúncio</CustomButtonText>
             </CustomButtom>
           )}
           </>
            ): (
             <>
              {active ? (
                <CustomButtom>
                   <CustomButtonText><LoginIcon size="large" color="#FFFFFF"/></CustomButtonText>
                </CustomButtom>
              ): (
                <CustomButtom onPress={()=>handleButtonAnnouncement('add')}>
                  <CustomButtonText>Criar anuncio</CustomButtonText>
                </CustomButtom>
              )}
               </>
            )}      
        </AlignButtom>
       </ScrollView>  
       {!verify && (<LoginIconVery/>)}
 </Container>
);}