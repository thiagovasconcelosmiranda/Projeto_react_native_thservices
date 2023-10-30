import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import Api from '../../Api.js';
import{Container, HeaderView,
       HeaderText, ItemLeft, 
       ItemText,
       InputView,
       ItemView, 
       Title,
       Item, 
       CustomButtom,
       CustomButtonText,
       LoginIcon
    } from './style.js';
import Left from 'react-native-vector-icons/AntDesign';
import { ScrollView } from 'react-native';
import Input from '../../components/Input.js';
import Alert from '../../components/Alert.js';
import LoginIconVery from '../../components/LoginIconVery.js';

export default () =>{
    const navigation = useNavigation();
    const [active, setActive] = useState(false);
    const [end, setEnd] = useState('');
    const [num, setNum] = useState('');
    const [cep, setCep] = useState('');
    const [bairro, setBairro] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');
    const [message, setMessage] = useState('');
    const [styleDisplay, setStyleDisplay] = useState('none');
    const [ very, setVery] = useState(false);
    const [veryForm, setVeryForm] = useState(false);
    const [title, setTitle] = useState('Novo Endereço Empresa');
    const [background, setBackground] = useState('');

    useEffect(()=>{
     getCompany()
    },[]);

    const handleButtonMainTab = () => {
        navigation.navigate('MainTab');
    };

    const getCompany = async () => {
      const token = await AsyncStorage.getItem('token');
      if(token){
        const auth = await Api.getAuth(token);
        setVery(true);
        if(auth.id){
           const client = await Api.getClient(auth.id, token);
           if(client.id){
            const company = await Api.getCompany(client.id, token);
            if(company.id){
               const addresscompany = await Api.getAddressCompany(company.id,token);
               if(addresscompany.id){
                  setCep(addresscompany.cep);
                  setEnd(addresscompany.address);
                  setNum(`${addresscompany.number}`);
                  setCity(addresscompany.city);
                  //console.log(addresscompany);
                  setBairro(addresscompany.district);
                  setUf(addresscompany.state);
                  setVery(false);
                  setVeryForm(true);
                  setTitle('Alterar Endereço Empresa');
               }else{
                setVery(false);
                setVeryForm(false);
                setTitle('Novo Endereço Empresa');
               } 
            }
           }
         }
      }
    }
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
            setActive(false);
        }
    }  
    };

    const alertMessage = (msg, background) =>{
      setMessage(msg);
      setStyleDisplay('flex');
      setBackground(background);
      setTimeout(function(){
        setStyleDisplay('none');
      },8000);
      setActive(false);
    };

    const handleButton = async (info) =>{
       setActive(true);
       const token = await AsyncStorage.getItem('token');
       if(token){
         const auth = await Api.getAuth(token);
         if(auth.id){
            const client = await Api.getClient(auth.id, token);
            if(client.id){
                 const company = await Api.getCompany(client.id, token);
                 if(company.id){
                  if(info === 'add'){
                   if(cep && end && num && bairro && city && uf){
                    const res = await Api.createAddressCompany(cep, end, num, bairro, city, company.id, uf, token);
                    console.log(res.id);
                    if(res){
                       setActive(false);
                       navigation.navigate('Upload');
                    }else{
                      alertMessage("Erro ao adicionar!");
                      setActive(false);
                    }
                  }else{
                    alertMessage("Espaço vazio! Digite os dados!");
                    setActive(false);
                  }
                }else{
                   const addresscompany = await Api.updateAddressCompany(cep, end, num, bairro, city, company.id, uf, token);
                   if(addresscompany.data){
                     alertMessage('Alterado com sucesso!', 'green');
                     getCompany();
                   }else{
                     alertMessage('Erro ao alterar!', 'red');
                     setActive(false);
                   }
                }
              }
            }
         }
       }
    };
    
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
              <HeaderText>{title}</HeaderText>
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
                height='6%'/>
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
                placeholder='Número'
                value={num}
                onChangeText={e=>setNum(e)}
                width="50%"
                height='6%'/>
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
               onChangeText={e=>setCity(e)}
               value={city}
               width="70%"
                height='10%'/>
             </ItemView> 
             <ItemView> 
              <Title>Estado*</Title>
              <Input
               placeholder='Estado'
               value={uf}
               onChangeText={e=>setUf(e)}
               width="70%"
               height='10%'/>
            </ItemView> 
            </ScrollView>
          </InputView>
          {veryForm ? (<>
            {active ? (
            <CustomButtom >
               <CustomButtonText><LoginIcon size="large" color="#FFFFFF"/></CustomButtonText>
            </CustomButtom>
           ) : (<CustomButtom onPress={()=>handleButton('alter')}>
            <CustomButtonText>Alterar</CustomButtonText>
            </CustomButtom>)}
           </>) : (<>
            {active ? (
            <CustomButtom >
               <CustomButtonText><LoginIcon size="large" color="#FFFFFF"/></CustomButtonText>
            </CustomButtom>
           ) : (<CustomButtom onPress={()=>handleButton('add')}>
            <CustomButtonText>Cadastrar</CustomButtonText>
            </CustomButtom>)}</>
          )}
          
        {very && (
          <LoginIconVery/>
        )}
      </Container> 
    )
}