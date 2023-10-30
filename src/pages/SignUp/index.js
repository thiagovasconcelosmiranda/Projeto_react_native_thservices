import{useState } from 'react';
import { Image, ScrollView} from 'react-native';
import Input from '../../components/Input';
import { useNavigation } from '@react-navigation/native';
import Api from '../../Api';
import * as Animatable from 'react-native-animatable';
import Alert from '../../components/Alert';
import { Container, 
         TitleView,
         TitleTop,
         InputArea,
         CaractereView,
         AlignCaracte,
         CaracteText,
         AlignValidate,
         AlignButton,
         CustomButtom,
         SignMessageButtonTextBold,
         CustomButtonText,
         SignMessageButton,
         LoginIcon, 
         ImageView,
         ViewAlign
        } from './style';
 import '../../utils/i18n';
 import { useTranslation } from 'react-i18next';
 import Check from 'react-native-vector-icons/Entypo';
 import Close from 'react-native-vector-icons/AntDesign';

export default () => {
  const navigation = useNavigation();
  const [state, setState] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validatePassword, setValidatePassword] = useState('');
  const [reppassword, setRepassword] = useState('');

  const [validateRepPasswordBool, setValidateRepPasswordBool] = useState(false)

  const [message, setMessage] = useState('');
  const [styleDisplay, setStyleDisplay] = useState('none');
  const{ t, i18n} = useTranslation();
  const[validateInput, setValidateInput] = useState({
    case: false,
    caseCaractere: false,
    number: false,
    length: false
  });

  const segureText = (password) => {
    setPassword(password);
      const regexUperCase = RegExp(/(?=,*[A-Z]).+$/);
      const regexCaractereCase = RegExp(/\W|_/);
      const regexNumber = RegExp(/(?=,*[0-9]).+$/);
      const length = password.length >= 7;

      setValidateInput({
        case: regexUperCase.test(password),
        caseCaractere: regexCaractereCase.test(password),
        number: regexNumber.test(password),
        length: length
      });
      validate(password);
    }

    const validate = (pass) =>{
      if(validateInput.case && validateInput.length && 
        validateInput.number && validateInput.caseCaractere){
          setValidatePassword(pass); 
      }
    }

    const valRepPassword = (e) => {
      setRepassword(e)
      if(e === validatePassword){
        setValidateRepPasswordBool(true);
      }else{
        setValidateRepPasswordBool(false);
      }
    }

   const alertMessage = (msg) =>{
    setMessage(msg);
    setStyleDisplay('flex');
    setTimeout(function(){
    setStyleDisplay('none');
    },8000);
    setState(false);
  }

  const handleSignUpClick = async() =>{
      setState(true);
      if(name != '' && email != '' &&  validatePassword!= '' && reppassword != ''){
        if(validateRepPasswordBool){
          const res = await Api.SignUp(name, email, validatePassword);
         if(res.data.user){
          setState(false);
          navigation.reset({ 
            routes:[{name: 'SignIn'}]
          });
         }
        }
      }else{
        alertMessage('Espaço vázio!');
        setState(false);
      }
  }

  const  hangleButtonSignIn = () => {
    navigation.reset({ 
      routes:[{name: 'SignIn'}]

      });
    } 
    return(
          <Container>
             <ImageView>
             < ViewAlign>
                <Animatable.Image 
                    animation="flipInY"
                    source={require('../../img/logotipo.png')} 
                    style={{ width: 170, height: 120,
                    marginRight: 'auto', marginLeft:'auto', margin:'auto', marginTop:"auto"}}/>
                   <TitleView>
                  <TitleTop style={{color: '#fff'}}>Novo cadastro</TitleTop>
              </TitleView> 
              </ViewAlign>
              </ImageView>
             
              <Alert 
                  styleDisplay={styleDisplay}
                  message={message}
                  background='red'/> 
              <Animatable.View delay={600} animation="fadeInUp"> 
                   <InputArea>
                    <ScrollView>
                       <Input placeholder="Digite seu nome"
                          onChangeText={t=>setName(t)}
                          value={name}
                          Icon="name"/>  
                       <Input placeholder={t('Digite seu email')}
                          onChangeText={t=>setEmail(t)}
                          value={email}
                          Icon="email"/>
                        <Input placeholder={t('Digite seu senha')}
                           password={true}
                           onChangeText={(e)=>{segureText(e)}}
                           value={password}
                           Icon="password"/>
                            {password && (
                              <CaractereView>
                                <AlignCaracte>
                                  <CaracteText> Minino 6 caractere</CaracteText>
                                   {validateInput.length ? (
                                    <Check name='check' size={20} color="green" />
                                   ): (<Close  name='close' size={20} color="red"/>)}
                                </AlignCaracte>
                               <AlignCaracte>
                                 <CaracteText>Números</CaracteText>
                                 {validateInput.number ? (
                                  <Check name='check' size={20} color="green" />
                                  ): (<Close  name='close' size={20} color="red"/>)}
                               </AlignCaracte>
                               <AlignCaracte>
                                 <CaracteText>Maiúscula</CaracteText>
                                 {validateInput.case ? (
                                  <Check name='check' size={20} color="green" />
                                  ): (<Close  name='close' size={20} color="red"/>)}
                             </AlignCaracte>
                             <AlignCaracte>
                               <CaracteText>Caractere especiais</CaracteText>
                               {validateInput.caseCaractere ? (
                                 <Check name='check' size={20} color="green" />
                                 ): (<Close  name='close' size={20} color="red"/>)}
                            </AlignCaracte>
                        </CaractereView>)}
                        <Input style={{marginTop: 30}} placeholder="Confirma sua senha"
                           password={true}
                           onChangeText={(t)=>{valRepPassword(t)}}
                           value={reppassword}
                           Icon="password"/>
                           {reppassword && (
                             <AlignValidate>
                               <CaracteText>Senha confere</CaracteText>
                               {validateRepPasswordBool ? (<Check name='check' size={20} color="green" />):(
                               <Close  name='close' size={20} color="red"/>)}
                               
                              </AlignValidate>
                           )}
                           <AlignButton>
                         <CustomButtom >
                          {state === true && (
                         <CustomButtom disabled={true} onPress={handleSignUpClick}>
                         <CustomButtonText><LoginIcon size="large" color="#FFFFFF"/></CustomButtonText>
                       </CustomButtom> 
                       )}

                     {state === false && (
                      <CustomButtom onPress={handleSignUpClick}>
                         <CustomButtonText>Cadastrar</CustomButtonText>
                     </CustomButtom> 
                     )}
                    </CustomButtom>
                  </AlignButton>
                  <SignMessageButton onPress={()=>hangleButtonSignIn()} >
                    <SignMessageButtonTextBold>{t('Faça seu acesso')}</SignMessageButtonTextBold>
                  </SignMessageButton>
                </ScrollView>
              </InputArea>
            </Animatable.View>
        </Container>
    )
}