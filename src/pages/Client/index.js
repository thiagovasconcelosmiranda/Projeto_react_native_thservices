import { Image} from "react-native";
import {Container,
         HeaderView,
         ItemLeft,
         ItemText, 
         HeaderText,
         UploadView, 
         TouchableOpacityItem,
         FormView,
         Text,
         InputItem,
         Item,
         CustomButtom,
         CustomButtonText, 
         LoginIcon
        } from'./style';
import { Picker } from "@react-native-picker/picker";
import Left from 'react-native-vector-icons/AntDesign';
import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { TextInputMask } from "react-native-masked-text";
import Input from '../../components/Input';
import { ScrollView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Api from "../../Api";
import * as ImagePicker from 'expo-image-picker';
import Alert from "../../components/Alert";
import { PhotoContext } from "../../contexts/Photo";
import LoginIconVery from "../../components/LoginIconVery";

export default () =>{
    const navigation = useNavigation();
    const [cpf, setCpf] = useState('');
    const [cell, setCell] = useState('');
    const [maritalStatus, setMaritalStatus] = useState('');
    const [name, setname] = useState('');
    const [facebook, setFacebook] = useState('');
    const [linkedin, setLinkdin] = useState('');
    const [intagram, setInstagram] = useState('');
    const [twitter, setTwitter] = useState('');
    const [photo, setPhoto] = useState(null);
    const [active, setActive] = useState(false);
    const [message, setMessage] = useState('');
    const [styleDisplay, setStyleDisplay] = useState('none');
    const [verify, setVerify] = useState(false);
    const [file, setFile ] = useState('');
    const [clientId, setClientId] = useState('');
    const [background, setBackground] = useState('');
    const {link} = useContext(PhotoContext);

    useEffect(()=>{
       getClient();
    },[]);
    
    const getClient = async () => {
      const token =  await AsyncStorage.getItem('token');
      if(token){
        const auth = await Api.getAuth(token);
        if(auth.id){
          const client = await Api.getClient(auth.id, token);
          if(client.id){
            setClientId(client.id);
               setname(client.name);
               setMaritalStatus(client.maritalStatus);
               setCpf(client.cpf);
               setCell(client.cell);
               setFacebook(client.facebook);
               setLinkdin(client.linkedin);
               setInstagram(client.intagram);
               setTwitter(client.twitter);
               setVerify(true);

               const uploadclient = await Api.getUploadClient(client.id, token);
               
               if(uploadclient.id > 0){
                  setFile(uploadclient.image);

               }
          }else{
            alert('Não há dados');
            setVerify(false);
          }
        } 
      }
    }

    const PickImage = async () => {
       const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
     });
 
      if (!result.canceled) {
          setPhoto(result.assets[0].uri);
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

    const hadlebuttonClient =  async(very) => {
        setActive(true);
        const token =  await AsyncStorage.getItem('token');
        const auth = await Api.getAuth(token);
        if(very === "add"){
          if( photo !== null && name !== '' && maritalStatus !=="" && cpf !=="" && cell !=="" ){
            if(token){
            if(auth.id){
               const res = await Api.createClient(name, cpf, maritalStatus, cell, auth.id, facebook, linkedin,intagram,twitter,token);
            if(res.data){
               navigation.navigate('AddressClient');
            }else{
               alertMessage('Error! Não adicionado');
               setActive(false);
            }
         }
       }
    }else{
      alertMessage('Erro ao adicionar imagem', 'red');
      setActive(false);
    }
  }
   if(very === "alter"){
     if(token){
       if(auth.id){
         const res = await Api.UpdateClient(name, cpf, maritalStatus, cell, auth.id,
           facebook, linkedin, intagram, twitter, token);
          if(res.data){
            if(photo){
                const upload = await Api.UploadClient(photo, clientId,  token);
                if(upload.data){
                  alertMessage('alterado com sucesso', 'green');
                  setActive(false);
                  getClient();
                }else{
                  alertMessage('Erro ao alterar', 'red');
                }
              
            }
          }
        
        }
     }
     setActive(false);
  }}

   const handleButtonMainTab = () =>{
      navigation.navigate('MainTab');
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
                 <HeaderText>Novo cadastro de usuário</HeaderText>
             </ItemText>
           </HeaderView>
           <Alert
              styleDisplay={styleDisplay}
              message={message}
              background={background}/>
            <UploadView>
            {verify ? (
               <TouchableOpacityItem onPress={()=>PickImage()}>
                   {photo ? (<Image
                      source={{uri: photo}}
                      style={{height: 100, width:100, borderRadius: 50}}
                      />): (<Image
                      source={{uri: `${link}${file}`}}
                      style={{height: 100, width:100, borderRadius: 50}}
                    />)} 
                  </TouchableOpacityItem>
                  ):(
                  <TouchableOpacityItem onPress={()=>PickImage()}>
                    {photo ? (<Image
                      source={{uri: photo}}
                      style={{height: 100, width:100, borderRadius: 50}}
                    />): (<Image
                    source={require("../../img/user.png")}
                    style={{height: 100, width:100}}
                   />)} 
                 </TouchableOpacityItem>
                )}
             </UploadView>
               <FormView>
                <ScrollView>
                  <InputItem>
                   <Text>Nome completo*</Text>
                   <Item>
                     <Input
                       placeholder='Nome completo'
                       value={name}
                       onChangeText={e=>setname(e)}
                       width="70%"
                        height='10%'/>
                     </Item>
                    </InputItem>
                   <InputItem>
                    <Text>Estado Civil*</Text> 
                    <Item>
                      <Picker
                        style={{width: '70%', height: 40}}
                        selectedValue={maritalStatus}
                        onValueChange={(itemValue) =>
                        setMaritalStatus(itemValue)
                        }>
                       <Picker.Item label="Selecione as opções" value="Selecione as opções" />
                       <Picker.Item label="Solteiro" value="Solteiro" />
                       <Picker.Item label="Casado" value="casado" />
                       <Picker.Item label="Divorsiado" value="Divorsiado" />
                       <Picker.Item label="Outro" value="Outro" />
                    </Picker>
               </Item>
             </InputItem>
             <InputItem>
             <Text>CPF*</Text> 
            <Item>
               <TextInputMask
                 style={{width: '70%', height: 40, backgroundColor: '#fff', padding: 10}}
                 type={'cpf'}
                 placeholder='000.000.000-15'
                 onChangeText={text=>setCpf(text)}
                 value={cpf}
               />
            </Item>
          </InputItem>
          <InputItem>
             <Text>Celular*</Text> 
             <Item>
                <TextInputMask
                   style={{width: '70%', height: 40,  backgroundColor: '#fff', padding: 10}}
                   type={'cel-phone'}
                   placeholder="(00) 0000-0000"
                   options={{
                   maskType:"BRL",
                   withDDD: true,
                   dddMask: '(99)'
                   }}
                   value={cell}
                   onChangeText={text=>setCell(text)}
                  />
              </Item>
             </InputItem>
             <InputItem>
                   <Text>Facebook</Text>
                    <Item>
                     <Input
                        placeholder='https://wwww.facebook.com/thservices'
                        value={facebook}
                        onChangeText={e => setFacebook(e)}
                        width="70%"
                        height='10%'/>
                     </Item>
             </InputItem>

             <InputItem>
                   <Text>Linkedin</Text>
                    <Item>
                     <Input
                        placeholder='https://wwww.linkdin.com/'
                        value={linkedin}
                        onChangeText={e => setLinkdin(e)}
                        width="70%"
                        height='10%'/>
                     </Item>
             </InputItem>
             <InputItem>
                   <Text>Intagram</Text>
                    <Item>
                     <Input
                        placeholder='https://wwww.intagram.com/'
                        value={intagram}
                        onChangeText={e => setInstagram(e)}
                        width="70%"
                        height='10%'/>
                     </Item>
             </InputItem>
             <InputItem>
                   <Text>Twitter</Text>
                    <Item>
                     <Input
                        placeholder='https://wwww.twitter.com/'
                        value={twitter}
                        onChangeText={e => setTwitter(e)}
                        width="70%"
                        height='10%'/>
                     </Item>
             </InputItem>
             </ScrollView>
            </FormView>
            {verify ? (<>
             {active ? ( <CustomButtom disabled={true}>
              <CustomButtonText><LoginIcon size="large" color="#FFFFFF"/></CustomButtonText>
              </CustomButtom>):( <CustomButtom onPress={()=>hadlebuttonClient('alter')}>
              <CustomButtonText>Alterar cadastro</CustomButtonText>
            </CustomButtom>)}
            </>):(<>
            {active ? ( <CustomButtom disabled={true}>
              <CustomButtonText><LoginIcon size="large" color="#FFFFFF"/></CustomButtonText>
            </CustomButtom>):( <CustomButtom onPress={()=>hadlebuttonClient('add')}>
              <CustomButtonText>Cadastrar</CustomButtonText>
            </CustomButtom>)}
            </>)}
            {!verify && (<LoginIconVery/>)}
        </Container>
    )
}


