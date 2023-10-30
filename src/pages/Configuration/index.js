import { useEffect, useContext, useState } from 'react';
import {ScrollView, Dimensions, StyleSheet, Animated, View } from 'react-native';
import  Email from 'react-native-vector-icons/EvilIcons';
import {Container,
        HeaderView, 
        ItemLeft,
        ItemText,
        HeaderText, 
        GroupItem,
        GroupItemAuth,
        Item, 
        Text,
        GroupIcon,
        Image,
        ItemView, 
        TextAuth,
        Touch,
        InputView,
        CustomButtom,
        CustomButtonText,
        LoginIcon, 
        ContactView,
        SkeletonText, 
        SkeletonImage,
        DeleteView, 
        ItemDelete,
        TextDelete, 
        ButtonToken,
        ButtonText
       } from './style';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Left from 'react-native-vector-icons/AntDesign';
import Down from 'react-native-vector-icons/Entypo';
import Date from 'react-native-vector-icons/Fontisto';
import Api from '../../Api';
import {PhotoContext} from '../../contexts/Photo';
import Input from '../../components/Input';
import Alert from '../../components/Alert';
import { LinearGradient } from 'expo-linear-gradient';

export default () => {
    const [Auth, setAuth ] = useState([]);
    const navigation = useNavigation();
    const {link} = useContext(PhotoContext);
    const [Client, setClient ] = useState([]);
    const [password, setPassword]= useState('');
    const [RePpassword, setRepPassword]= useState('');
    const [email, setEmail]= useState('');
    const [name, setName]= useState('');
    const [Display, setDisplay] = useState('none');
    const [Token, setToken] = useState('');
    const [styleDisplay, setStyleDisplay] = useState('none');
    const [background, setBackground] = useState('');
    const [message, setMessage] = useState('');
    const[active, setActive] = useState(false);
    const [imageClient, setImageClient] = useState('');
    const [verify, setVerify] = useState(true);
    
    const {width} = Dimensions.get('window');
    const  AnimateValue  = new Animated.Value(0);


    useEffect(()=>{
       getAuth();
    }, []);

    setInterval(()=>{
      Animated.loop(Animated.timing(AnimateValue,{
        toValue: 1,
        useNativeDriver: true,
        duration: 2500
     })).start();
    }, 1000);
    
  

    const getAuth = async () => {
        const token = await AsyncStorage.getItem('token');
        if(token){
            setToken(token);
           const auth = await Api.getAuth(token);
           if(auth.id){
            setAuth(auth);
            setName(auth.name);
            setEmail(auth.email);
            setPassword(auth.password);
            const client = await Api.getClient(auth.id, token);
            if(client.id){
              setClient(client);
              const updateClinet = await Api.getUploadClient(client.id, token);
              if(updateClinet.id){
                setImageClient(updateClinet.image);
                setVerify(false);
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

    const handleButtonMainTab = () => {
        navigation.navigate('MainTab');
    }

    const handleDown = () =>{
        if(Display === 'none'){
            setDisplay('flex');
        }else{
            setDisplay('none'); 
        } 
    }

    const handleButtonUser = async () =>{
       setActive(true);
      if(password === RePpassword){
        const auth = await Api.UpdateAuth(Auth.id, name, email, password, Token);
         if(auth.data){
          alertMessage('Dados Alterado com sucesso!', 'green');
          setActive(false);
         }
      }else{
        alertMessage('senhas não confere', 'red');
        setActive(false);
      } 
    }

    const handleButtonDelete = async ()=>{
        console.log(Auth.id);
    }

    return (
       <Container>
          <HeaderView>
               <ItemLeft>
                <Left name='arrowleft'
                  size={30} color="#000"
                  style={{marginLeft:40}}
                  onPress={()=>handleButtonMainTab()}/>
                 </ItemLeft>
             <ItemText>
                <HeaderText>Dados de acesso</HeaderText>
             </ItemText>
           </HeaderView>
           <Alert
              styleDisplay={styleDisplay}
              message={message}
              background={background}/>
           <ScrollView>
             <GroupItemAuth>
              <Item >
              {verify ? (
               <SkeletonText > 
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
               </SkeletonText>
             ):
             (
                <Text>{Client.name}</Text>
             )}
             </Item>
             <Item>
              {verify ? (
                <SkeletonImage>
                    <Animated.View style={[styles.Line ,{
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
              ):
                ( 
               <Image 
                 source={{uri: `${link}${imageClient}`}} 
                 style={{ width: 110, height: 110}}/>
                )}
             </Item>
           </GroupItemAuth>
           <GroupItem>
             <ItemView>
                <GroupIcon>
                  <Email style={{marginTop: 30, marginLeft: 60}} name="envelope" size={30} color="#000"/>
                  <TextAuth>{Auth.email}</TextAuth>
                </GroupIcon>
                <GroupIcon>
                <Date style={{marginTop: 30, marginLeft: 80}} name="date" size={20} color="#000"/>
                <TextAuth style={{ marginLeft: -20}}>{Auth.created_at}</TextAuth>
                </GroupIcon>
                <Touch onPress={()=>handleDown()}>
                    {Display === 'flex' ? (
                     <Down name='chevron-thin-up'
                     size={30} color="#000"/>
                    ): (
                        <Down name='chevron-thin-down'
                        size={30} color="#000"/>
                    )}
                  </Touch>
                <InputView style={{display: `${Display}`}}>
                <Input 
                    placeholder={'Digite seu nome'}
                    value={name}
                    onChangeText={e=>setName(e)}
                    width="80%"/>
                   <Input 
                    placeholder={'Digite seu novo email'}
                    value={email}
                    onChangeText={e=>setEmail(e)}
                    width="80%"/>
                   <Input 
                     placeholder={'Digite sua nova senha'}
                     value={password}
                     password={true}
                     onChangeText={e=>setPassword(e)}
                     width="80%"/>
                    <Input 
                    placeholder={'Repetir sua senha'}
                    value={RePpassword}
                    onChangeText={e=>setRepPassword(e)}
                    password={true}
                    width="80%"/>
                    { active ? (
                          <CustomButtom onPress={()=>handleButtonUser()}>
                          <CustomButtonText><LoginIcon size="large" color="#fff"/></CustomButtonText>
                       </CustomButtom>
                    ) : (
                        <CustomButtom onPress={()=>handleButtonUser()}>
                           <CustomButtonText>Alterar</CustomButtonText>
                        </CustomButtom>
                    )}   
                 </InputView>
              </ItemView>
            </GroupItem>
            <DeleteView>
              <ItemDelete>
                <TextDelete> Exluír minha conta </TextDelete>
                <ButtonToken onPress={()=>handleButtonDelete()}>
                  <ButtonText>Deletar conta</ButtonText>
                </ButtonToken>
              </ItemDelete>
              </DeleteView>
           </ScrollView>
           <ContactView>
             <Touch><Text>Contato</Text></Touch>
             <Touch><Text>Privacidade</Text></Touch>
           </ContactView>
       </Container>
    )};

const styles = StyleSheet.create({
  Line:{
    width:'100%',
    height: '100%',
    opacity: 0.4
  }
});