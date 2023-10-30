import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import Api from '../../Api';
import Input from '../../components/Input';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import {Container,
         LangView ,
         ButtonLang,
         ButtonLangText,
         InputArea, 
         MessageText,
         CustomButtom, 
         CustomButtonText, 
         LoginIcon, 
         ImageView, 
         ViewAlign,
         AlignButton,
         SignMessageButton,
         SignMessageButtonTextBold,
    } from'./style';

import '../../utils/i18n';
import { useTranslation } from 'react-i18next';
import Alert from '../../components/Alert';

export default () => {

  const [email, setEmail] = useState('');
  const [password, setPassoword] = useState('');
  const [state, setState] = useState(false);
  const [message, setMessage] = useState('');
  const [styleDisplay, setStyleDisplay] = useState('none');
  const [currentLanguage, setCurrentLanguage] = useState('pt');
  const navigation = useNavigation();
  const{ t, i18n} = useTranslation();

  const changeLanguage = value => {
    setCurrentLanguage(value)
     i18n.changeLanguage(value).then(()=>{
        console.log("Linguagem alterada");
     })
     .catch((err) =>{
         console.log(err);
     })
  }

  useEffect(() => {
     setState(false);
  },[]);


const alertMessage = (msg) =>{
   setMessage(msg);
   setStyleDisplay('flex');
   setTimeout(function(){
    setStyleDisplay('none');
  },8000);
  setState(false);
}

  const handleSignClick = async () => {
         setState(true);
         if(email != "" && password != ""){
          const res = await Api.SignIn(email, password);
           if(res.data.token){
            console.log(res);
            await AsyncStorage.setItem('token', res.data.token);
            navigation.navigate("MainTab");
          }else if(res.data.error){
            alertMessage(res.data.error);
          }  
         }else{
          alertMessage('Espaço vázio!');
         }
          
         
  }

  const handleButtonSignUp = () => {
    navigation.reset({ 
      routes:[{name: 'SignUp'}]

      });
  }

  const handleButtonEmail = () => {
    navigation.reset({ 
      routes:[{name: 'EmailVerified'}]

      });
  }

    return(
        <Container>  
          <LangView>
               <ButtonLang 
                 onPress={()=>changeLanguage('en')}>
                 <ButtonLangText>Inglês</ButtonLangText>
                </ButtonLang>
                <ButtonLang
                 onPress={()=>changeLanguage('pt')}>
                     <ButtonLangText>Português Brasil</ButtonLangText>
                </ButtonLang>
          </LangView>
          <ImageView>
             <ViewAlign>
                <Animatable.Image
                    animation="flipInY"
                    source={require('../../img/logotipo.png')} 
                    style={{ width: 180, height: 130}}/>
                 <MessageText>{t('Seja bem vindo')}</MessageText>
             </ViewAlign>
          </ImageView>
          <Alert 
              styleDisplay={styleDisplay}
              message={message}
              background='red'/>
         <Animatable.View delay={600} animation="fadeInUp">
          <InputArea>
              <Input 
                    placeholder={t('Digite seu email')}
                    value={email}
                    onChangeText={t=>setEmail(t)}
                    Icon="email"/>
               <Input 
                  placeholder={t('Digite sua senha')}
                  value={password}
                  password={true}
                  onChangeText={t=>setPassoword(t)}
                  Icon="password"/>

            <AlignButton>
              {state === true && (
                <CustomButtom disabled={true} onPress={handleSignClick}>
                    <CustomButtonText><LoginIcon size="large" color="#FFFFFF"/></CustomButtonText>
                </CustomButtom> 
              ) }

               {state === false && (
                  <CustomButtom onPress={handleSignClick}>
                      <CustomButtonText>{t('Acessar')}</CustomButtonText>
                  </CustomButtom> 
               ) }
             </AlignButton> 
             
             <SignMessageButton onPress={()=>handleButtonEmail()}>
                 <SignMessageButtonTextBold>{t('Esqueceu sua senha?')}</SignMessageButtonTextBold>
           </SignMessageButton>
           <SignMessageButton onPress={()=>handleButtonSignUp()} style={{marginTop: -5}} >
                 <SignMessageButtonTextBold>{t('Cadastre-se')}</SignMessageButtonTextBold>
           </SignMessageButton>
           <SignMessageButton  style={{marginTop: -5}} >
                 <SignMessageButtonTextBold>2022</SignMessageButtonTextBold>
           </SignMessageButton>
          </InputArea>
          </Animatable.View>
        </Container>
    )
};