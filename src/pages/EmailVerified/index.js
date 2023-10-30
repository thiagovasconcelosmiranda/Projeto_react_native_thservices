import React, { useEffect, useState } from 'react';
import{ 
         Container,
         TelaView,
         ImageView,
         CustomButtom, 
         CustomButtonText,
         SignMessageButton,
         SignMessageButtonTextBold, 
         Title, 
         LoginIcon
      } from './style';
import { Image } from 'react-native';
import Input from '../../components/Input';
import Api from '../../Api';
import Alert from "../../components/Alert";
import { useNavigation } from '@react-navigation/native';


export default () =>{
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [styleDisplay, setStyleDisplay] = useState('none');
  const [background, setBackground] = useState('');
  const [active, setActive] = useState(false);
  const navigation = useNavigation();

  const alertMessage = (msg, background) =>{
    setMessage(msg);
    setStyleDisplay('flex');
    setBackground(background);
    setTimeout(function(){
      setStyleDisplay('none');
    },8000);
    setActive(false);
  };


 const handleEmail = async () => {
     setActive(true);
     if(email){
       const res = await Api.linkEmail(email);
       console.log(res);
       if(res){
           alertMessage('Link Enviado para seu email', 'green');
           navigation.navigate('resetPassword');
        }
     }else{
      alertMessage('Email não diigitado', 'red');
      setActive(false);
     }
 }

 const handleSignin = () =>{
    navigation.navigate('SignIn');
 }
 const handleSignup = () =>{
  navigation.navigate('SignUp');
 }

   return (
     <Container>
       <Alert
              styleDisplay={styleDisplay}
              message={message}
              background={background}/>
      <ImageView>
       <Image 
           source={require('../../img/logotipo.png')} 
           style={{ width: 230, height: 200}}/>              
       </ImageView>
        <TelaView>
        <Title>Recupere sua senha</Title>
            <Input placeholder="Digite seu email"
            value={email}
            onChangeText={e=>setEmail(e)}
            Icon="email"
            />
            {active ? (
              <CustomButtom disabled={true} onPress={()=>handleEmail()}>
              <CustomButtonText ><LoginIcon size="large" color="#FFFFFF"/></CustomButtonText>
               </CustomButtom>
            ): (
              <CustomButtom onPress={()=>handleEmail()}>
                 <CustomButtonText >Enviar</CustomButtonText>
              </CustomButtom>
            )}
            
        </TelaView>
        <SignMessageButton onPress={()=>handleSignin()}>
                <SignMessageButtonTextBold>Logim</SignMessageButtonTextBold>
        </SignMessageButton>
        <SignMessageButton onPress={()=>handleSignup()}>
                <SignMessageButtonTextBold>Cadastre-se</SignMessageButtonTextBold>
        </SignMessageButton>
     </Container>
   )
}