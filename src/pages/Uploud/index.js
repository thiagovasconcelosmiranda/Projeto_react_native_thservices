import * as ImagePicker from 'expo-image-picker';
import { useContext, useEffect, useState } from 'react';
import { Image } from 'react-native';
import { Containers,
         HeaderView,
         ItemLeft,
         ItemText,
         HeaderText,
         UploadView,
         UploadTouch,
         CustomButtom, 
         CustomButtonText,
         LoginIcon 
        } from './style.js';
import Api from '../../Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Left from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import Alert from '../../components/Alert.js';
import { PhotoContext } from '../../contexts/Photo.js';
import LoginIconVery from "../../components/LoginIconVery";

export default () =>{
  const navigation = useNavigation();
  const[imgOne, setimgOne] = useState(null);
  const[imgTwo, setimgTwo] = useState(null);
  const[imgThree, setimgThree] = useState(null);
  const[imgFour, setimgFour] = useState(null);
  const [active, setActive] = useState(false);
  const [message, setMessage] = useState('');
  const [styleDisplay, setStyleDisplay] = useState('none');
  const [verify, setVerify] = useState(false);
  const [activeLoading, setactiveLoading ] = useState(false);
  const {link} = useContext(PhotoContext);
  const[foto1, setFoto1] = useState(null);
  const[foto2, setFoto2] = useState(null);
  const[foto3, setFoto3] = useState(null);
  const[foto4, setFoto4] = useState(null);
  const [background, setBackground] = useState('');
  const [disabled, setdisabled] = useState(true);
 

  const permission = async () =>{
         const result = await ImagePicker.requestCameraPermissionsAsync();
         if(!result !== 'granted'){
           //alert('Permission denied!');
        }
  }

  useEffect(()=>{
    permission();
    getGallery();
  },[]);

  const getGallery = async () =>{
    const token = await AsyncStorage.getItem('token');
    if(token){
      const auth = await Api.getAuth(token);
      if(auth.id){
           const client = await Api.getClient(auth.id, token);
           if(client.id){  
            const company = await Api.getCompany(client.id, token);
            if(company.id){
              const gallery = await Api.getGallery(company.id, token);
              if(gallery.company_id > 0 ){
                setimgOne(gallery.imgOne);
                setimgTwo(gallery.imgTwo);
                setimgThree(gallery.imgThree);
                setimgFour(gallery.imgFour);
                setVerify(true);
                setactiveLoading(true);
              }else{
                setVerify(false);
                setactiveLoading(true);
                
              }
             
            }
           }
        }   
    }
  } 

  async function Upload () {
    setActive(true);
    const token = await AsyncStorage.getItem('token');
    if(token){
        const auth = await Api.getAuth(token);
        if(auth.id){
             const client = await Api.getClient(auth.id, token);
          if(client.id){  
            const company = await Api.getCompany(client.id, token);
            if(company.id){
              setActive(true);
              if(imgOne && imgTwo && imgThree && imgFour){
                const res = await Api.createGallery(imgOne, imgTwo, imgThree, imgFour, company.id, token);
                console.log(res.data);
                if(res.data){
                   setActive(false);
                   navigation.navigate('MainTab');
               }else{
                  alertMessage('Erro ao criar album');
                  setActive(false);
              }
              }else{
                alertMessage('Espaço vazio!');
                setActive(false);
              }
           }
         }
      }
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


  const handleButtonMainTab = ()=>{
    navigation.navigate('MainTab');
  }

  const ImgOneTouch = async () => {
    let resultImgOne = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing:true,
      aspect:[4,3],
      quality: 1
    });

    if (!resultImgOne.canceled) {
       setFoto1(resultImgOne.assets[0].uri);
       setdisabled(false);
  
     
    }
     
  }
  

  const ImgTwoTouch = async () => {
    let resultImgTwo = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing:true,
      aspect:[4,3],
      quality: 1
    });

    if (!resultImgTwo.canceled) {
      setFoto2(resultImgTwo.assets[0].uri);
      setVerify(true);
      setdisabled(false);
 
    }
}
const ImgThreeTouch = async () => {
  let resultImgThree = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
 });

  if (!resultImgThree.canceled) {
    setFoto3(resultImgThree.assets[0].uri);
    setdisabled(false);
  }else{
    setimgThree(null);
  }
}


const ImgFourTouch= async () => {
  let resultImgFour = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing:true,
    aspect:[4,3],
    quality: 1
  });
  
  if (!resultImgFour.canceled) {
    setFoto4(resultImgFour.assets[0].uri);
    setdisabled(false);
   }
  }

  async function Upload (very) {
    setActive(true);
    const token = await AsyncStorage.getItem('token');
    if(token){
        const auth = await Api.getAuth(token);
        if(auth.id){
             const client = await Api.getClient(auth.id, token);
          if(client.id){  
            const company = await Api.getCompany(client.id, token);
            if(company.id){
              setActive(true);
              if(very === 'add'){
                  if(foto1 && foto2 && foto3 && foto4){
                    const res = await Api.createGallery(foto1, foto2, foto3,
                       foto4, company.id, token);
                       if(res.data){
                          alertMessage('Album criado com sucesso!', 'green');
                          setActive(false);
                          getGallery();
                       }else{
                        alertMessage('Erro ao criar Album!', 'red');
                       }
                 
                  }else{
                    alertMessage('Insire todas as imagens!', 'red');
                  }

            }else{
              if(foto1 && foto2 && foto3 && foto4){
                const res = await Api.createGallery(foto1, foto2, foto3,
                  foto4, company.id, token);
                  if(res.data){
                    alertMessage('Album Alterado com sucesso!', 'green');
                    setActive(false);
                    getGallery();
                    return;
                  }else{
                    alertMessage('Erro ao alterar!', 'red');
                    setActive(false);
                  }
              }
             
              setActive(false);
            }
           }
         }
      }
    }
  }

    return(
        < Containers>
            <HeaderView>
               <ItemLeft>
                <Left name='arrowleft'
                  size={30} color="#000"
                  style={{marginLeft:40}}
                  onPress={()=>handleButtonMainTab()}/>
                 </ItemLeft>
                <ItemText>
                  {verify ? (<HeaderText>Alterar Album</HeaderText>):
                  (<HeaderText>Criar novo Album</HeaderText>)}
             </ItemText>
           </HeaderView>
           <Alert 
              styleDisplay={styleDisplay}
              message={message}
              background={background}/>
            <UploadView>
                
                {verify ? (
                  <>
                  {foto1 ? (
                     <UploadTouch  onPress={()=>ImgOneTouch()}>
                       <Image source={{uri: foto1}}
                       style={{height:150, width:150}} />
                    </UploadTouch>
                  ): (
                    <UploadTouch  onPress={()=>ImgOneTouch()}>
                      <Image source={{uri: `${link}${imgOne}`}}
                      style={{height:150, width:150}} />
                    </UploadTouch>
                  )}
                 </>
                ): (
                  <>
                  {foto1 ? (
                     <UploadTouch  onPress={()=>ImgOneTouch()}>
                      <Image source={{uri: foto1}}
                      style={{height:150, width:150}} />
                   </UploadTouch>
                  ): (
                     <UploadTouch  onPress={()=>ImgOneTouch()}>
                     <Image source={require("../../img/image.png")}
                     style={{height:150, width:150}} />
                   </UploadTouch>
                  )}
                  
                  </>
                 )}


                 
                {verify ? (
                  <>
                  {foto2 ? (
                     <UploadTouch  onPress={()=>ImgTwoTouch()}>
                       <Image source={{uri: foto2}}
                       style={{height:150, width:150}} />
                    </UploadTouch>
                  ): (
                    <UploadTouch  onPress={()=>ImgTwoTouch()}>
                      <Image source={{uri: `${link}${imgTwo}`}}
                      style={{height:150, width:150}} />
                    </UploadTouch>
                  )}
                 </>
                ): (
                  <>
                  {foto2 ? (
                     <UploadTouch  onPress={()=>ImgTwoTouch()}>
                      <Image source={{uri: foto2}}
                      style={{height:150, width:150}} />
                   </UploadTouch>
                  ): (
                     <UploadTouch  onPress={()=>ImgTwoTouch()}>
                     <Image source={require("../../img/image.png")}
                     style={{height:150, width:150}} />
                   </UploadTouch>
                  )}
                  
                  </>
                 )}

            </UploadView>
            <UploadView>
                {verify ? (
                  <>
                  {foto3 ? (
                     <UploadTouch  onPress={()=>ImgThreeTouch()}>
                       <Image source={{uri: foto3}}
                       style={{height:150, width:150}} />
                    </UploadTouch>
                  ): (
                    <UploadTouch  onPress={()=>ImgThreeTouch()}>
                      <Image source={{uri: `${link}${imgThree}`}}
                      style={{height:150, width:150}} />
                    </UploadTouch>
                  )}
                 </>
                ): (
                  <>
                  {foto3 ? (
                     <UploadTouch  onPress={()=>ImgThreeTouch()}>
                      <Image source={{uri: foto3}}
                      style={{height:150, width:150}} />
                   </UploadTouch>
                  ): (
                     <UploadTouch  onPress={()=>ImgThreeTouch()}>
                     <Image source={require("../../img/image.png")}
                     style={{height:150, width:150}} />
                   </UploadTouch>
                  )}
                  
                  </>
                 )}
                  
                  {verify ? (
                  <>
                  {foto4 ? (
                     <UploadTouch  onPress={()=>ImgFourTouch()}>
                       <Image source={{uri: foto4}}
                       style={{height:150, width:150}} />
                    </UploadTouch>
                  ): (
                    <UploadTouch  onPress={()=>ImgFourTouch()}>
                      <Image source={{uri: `${link}${imgFour}`}}
                      style={{height:150, width:150}} />
                    </UploadTouch>
                  )}
                 </>
                ): (
                  <>
                  {foto4 ? (
                     <UploadTouch  onPress={()=>ImgFourTouch()}>
                      <Image source={{uri: foto4}}
                      style={{height:150, width:150}} />
                   </UploadTouch>
                  ): (
                     <UploadTouch  onPress={()=>ImgFourTouch()}>
                     <Image source={require("../../img/image.png")}
                     style={{height:150, width:150}} />
                   </UploadTouch>
                  )}
                  
                  </>
                 )}
                  
            </UploadView>
            {verify ? (<>
            {active ? (
               <CustomButtom disabled={true} >
               <CustomButtonText><LoginIcon size="large" color="#FFFFFF"/></CustomButtonText>
           </CustomButtom>
           ) : (<CustomButtom disabled={disabled}  onPress={()=>Upload('alter')}>
              <CustomButtonText>Alterar</CustomButtonText>
           </CustomButtom>)}
         </>) : (<>
            {active ? (
               <CustomButtom disabled={true}  >
               <CustomButtonText><LoginIcon size="large" color="#FFFFFF"/></CustomButtonText>
           </CustomButtom>
           ) : (<CustomButtom disabled={disabled}  onPress={()=>Upload('add')}>
              <CustomButtonText>Cadastrar</CustomButtonText>
           </CustomButtom>)}
         </>)}
             {!activeLoading && (<LoginIconVery/>)}
        </ Containers>
    )
  }

