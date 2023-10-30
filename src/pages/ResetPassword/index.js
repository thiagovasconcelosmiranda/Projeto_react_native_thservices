import { useEffect, useState } from 'react';
import {Container,
        TelaView, 
        SignMessageButton,
        SignMessageButtonTextBold,
        ImageView,
        CustomButtom,
        CustomButtonText,
        Title,
         LoginIcon
    }  from'./style';
import Alert from '../../components/Alert';
import { Image } from 'react-native';
import Input from '../../components/Input';
import Api from '../../Api';
import { useNavigation } from '@react-navigation/native';

export default ({route}) => {
    const [password, setPassoword] = useState('');
    const [message, setMessage] = useState('');
    const [styleDisplay, setStyleDisplay] = useState('none');
    const [background, setBackground] = useState('');
    const [repPassoword, setRepPassoword] = useState('');
    const [token, setToken] =  useState('');
    const [actve, setActive] = useState(false);

    const navigation = useNavigation();
    

    useEffect(()=>{
      const token = route.params?.token;
      if(token){
        setToken(token);
      }

    }, [])

    const alertMessage = (msg, background) =>{
        setMessage(msg);
        setStyleDisplay('flex');
        setBackground(background);
        setTimeout(function(){
          setStyleDisplay('none');
        },8000);
        setActive(false);
      };


    const handlePassword = async () => {
      setActive(true);
     if(token){
       const resetpassword = await Api.resetPassword(password, repPassoword, token);
       if(resetpassword){
        setActive(false);
        Ale
           navigation.navigate('SignIn');
           alertMessage('Foi enviado um link para seu email','green');
       }else{
        alertMessage('error ao alterar senha','red');
       }
     }
    }
    const handleSignIn = ()=>{
      navigation.navigate('SignIn');
    }
    const handleSignUp = () => {
      navigation.navigate('SignUp');
    }

    return(
        <Container>
       <Alert
              styleDisplay={styleDisplay}
              message={message}
              background={background}/>
      <ImageView>
       <Image
           source={require('../../img/logotipo.png')} 
           style={{ width: 180, height: 150}}/>              
       </ImageView>
      
        <TelaView>
        <Title>Nova senha {token}</Title>
            <Input placeholder="Digite a nova senha"
            onChangeText={e=>setPassoword(e)}
            Icon="email"
            value={password}
            password={true}
            />
             <Input placeholder="Digite sua senha novamente "
             value={repPassoword}
            onChangeText={e=>setRepPassoword(e)}
            Icon="email"
            />
            <CustomButtom onPress={()=>handlePassword()}>
                  <CustomButtonText >Enviar</CustomButtonText>
            </CustomButtom>
        </TelaView>
        <SignMessageButton onPress={()=>handleSignIn()}>
                <SignMessageButtonTextBold>Logim</SignMessageButtonTextBold>
        </SignMessageButton>
        <SignMessageButton onPress={()=>handleSignUp()}>
                <SignMessageButtonTextBold>Cadastre-se</SignMessageButtonTextBold>
        </SignMessageButton>
     </Container>
    )
}