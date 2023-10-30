
import { Container,
         HeaderView,
         ItemLeft,
         ItemText,
         HeaderText,
         InputView, 
         ItemView,
         Title,
         Item,
         CustomButtom,
         CustomButtonText,
         LoginIcon
       } from "./style";
import Left from 'react-native-vector-icons/AntDesign';
import { useNavigation } from "@react-navigation/native";
import Input from "../../components/Input";
import { ScrollView } from "react-native";
import { useEffect, useState } from "react";
import Api from "../../Api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Alert from "../../components/Alert";
import LoginIconVery from "../../components/LoginIconVery";

export default (props) =>{
    const navigation = useNavigation();
    const [cep, setCep] = useState('');
    const [end, setEnd] = useState('');
    const [number, setNumber] = useState('');
    const [bairro, setBairro] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');
    const [active, setActive] = useState(false);
    const [message, setMessage] = useState('');
    const [styleDisplay, setStyleDisplay] = useState('none');
    const [background, setBackground] = useState('');
    const [verify, setVerify] = useState(false);
    
    useEffect(()=>{
        getAddressCLient();
    },[]);



    const getAddressCLient = async () =>{
       const token = await AsyncStorage.getItem('token');
       if(token){
         const auth = await Api.getAuth(token);
         if(auth.id){
            const client = await Api.getClient(auth.id, token);
            if(client.id){
              const addressclient = await Api.getAddressClient(client.id, token);
              if(addressclient.id){
                setCep(addressclient.cep);
                setNumber(`${addressclient.number}`);
                setEnd(addressclient.address);
                setBairro(addressclient.district);
                setCity(addressclient.city);
                setUf(addressclient.state);
                setVerify(true);
             }else{
              setVerify(true);
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

    const Cep = async (e) =>{
        setCep(e);
        if(e.length === 8){
            const res = await Api.getCep(e);
            if(res.cep){
                setEnd(res.logradouro);
                setBairro(res.bairro);
                setCity(res.localidade);
                setUf(res.uf);
            }else{
                alertMessage('Cep não existe!', 'red');

            }
        }  
    };

    const handleButtonMainTab = () =>{
      navigation.navigate('MainTab');
    };

    const handleButtonAdd = async (very) => {
        setActive(true);
        const token = await AsyncStorage.getItem('token');
          if(token){
            const auth = await Api.getAuth(token);
            
            if(auth.id){
              const client = await Api.getClient(auth.id, token);
             if(very === "add"){ 
                if(client.id){
                   if(cep && end && number && bairro && city && uf){
                    const res = await Api.createAddressClient(cep, end, number, bairro, city, client.id, uf, token);
                       if(res.data){
                          navigation.navigate('Company');
                          setActive(false);
                        }else{
                          alertMessage('Erro ao cadastrar!', 'red');
                          setActive(false);
                         }
                    }else{
                       alertMessage('Espaço em Branco!', 'red');
                       setActive(false);
                 }
              }
            } else if(very === "alter"){
              const res = await Api.UpdateAddressClient(cep, end, number, bairro, city, client.id, uf, token);
              if(res.sucess){
                getAddressCLient();
                alertMessage('Adicionado com sucesso!', 'green');
                setActive(false);
              }else{
                alertMessage('Erro ao alterar!', 'red');
                 setActive(false);
              }
            }
          }
        }
    };

    return(
        <Container>
            <HeaderView>
              <ItemLeft>
                <Left name='arrowleft'
                 size={30} color="#000"
                 style={{marginLeft:40}}
                 onPress={()=>handleButtonMainTab()}
                 />
              </ItemLeft>
            <ItemText>
              {verify ? ( <HeaderText>Alterar endereço de úsuario</HeaderText>): 
              ( <HeaderText>Novo Endereço do Usuário</HeaderText>)}
             
            </ItemText>
          </HeaderView>
          <Alert
              styleDisplay={styleDisplay}
              message={message}
              background={background}/>
          <InputView>
          <ScrollView>
            <ItemView>
              <Title>Cep*</Title>
              <Input placeholder="Digite seu cep"
                value={cep}
                onChangeText={e=>Cep(e)}
                width="70%"
                height='6%'
                keyboard="numeric"/>
             </ItemView>
             <ItemView>
               <Title>Endereço*</Title>
               <Input
                placeholder='Endereço'
                value={end}
                onChangeText={e=>setEnd(e)}
                width="70%"
                height='6%'/>
             </ItemView>
             <ItemView> 
              <Title>Número*</Title>
              <Item>
                <Input
                placeholder='Nº'
                value={number}
                onChangeText={e=>setNumber(e)}
                width="50%"
                height='6%'
                keyboard="numeric"/>
              </Item>
             </ItemView>
             <ItemView> 
              <Title>Bairro*</Title>
              <Input
                placeholder='Bairro'
                value={bairro}
                onChangeText={e=>setBairro(e)}
                width="70%"
                height='6%'/>
             </ItemView> 
             <ItemView> 
              <Title>Cidade*</Title>
              <Input
               placeholder='Cidade'
               value={city}
               onChangeText={e=>setCity(e)}
               width="70%"
                height='10%'/>
             </ItemView> 
             <ItemView> 
              <Title>Estado*</Title>
              <Item>
                <Input
                placeholder='UF'
                value={uf}
                onChangeText={e=>setUf(e)}
                width="50%"
                height='6%'
                keyboard="numeric"/>
              </Item>
             </ItemView>
            </ScrollView>
          </InputView>
         {verify ? (<>
            {active ? (
               <CustomButtom>
               <CustomButtonText><LoginIcon size="large" color="#FFFFFF"/></CustomButtonText>
           </CustomButtom>
           ) : (<CustomButtom onPress={()=>handleButtonAdd('alter')}>
              <CustomButtonText>Alterar</CustomButtonText>
           </CustomButtom>)}
         </>) : (<>
            {active ? (
               <CustomButtom >
               <CustomButtonText><LoginIcon size="large" color="#FFFFFF"/></CustomButtonText>
           </CustomButtom>
           ) : (<CustomButtom onPress={()=>handleButtonAdd('add')}>
              <CustomButtonText>Cadastrar</CustomButtonText>
           </CustomButtom>)}
         </>)}
          {!verify && (<LoginIconVery/>)}
        </Container>
    );
}