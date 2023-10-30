import{
       Container,
       HeaderView,
       ItemLeft,
       ItemText,
       HeaderText,
       FormView,
       InputItem, 
       Text, 
       Item,
       DateTouch,
       CustomButtom,
       CustomButtonText,
       LoginIcon
     } from './style.js';
import Left from 'react-native-vector-icons/AntDesign';
import {useNavigation } from '@react-navigation/native';
import {useEffect, useState } from 'react';
import {TextInputMask } from "react-native-masked-text";
import Input from '../../components/Input.js';
import DateTimePicker from '@react-native-community/datetimepicker';
import Date from 'react-native-vector-icons/Fontisto';
import {Picker} from "@react-native-picker/picker";
import Api from '../../Api.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Alert from '../../components/Alert.js';
import LoginIconVery from '../../components/LoginIconVery.js';

export default (props) =>{
    const [date, setDate] = useState(props.route.params.date);
    const navigation = useNavigation();
    const [cnpj, setCnpj] = useState('');
    const [newDate, setNewDate] = useState('');
    const [modal, setModal] = useState(false);
    const [mode, setMode] = useState('');
    const [category, setCategory] = useState('');
    const [itemCategory, setItemCategory] = useState([]);
    const [token, setToken] = useState('');
    const [active, setActive] = useState(false);
    const [message, setMessage] = useState('');
    const [styleDisplay, setStyleDisplay] = useState('none');
    const [verify, setVerify] = useState(false);
    const [background, setBackground] = useState('');
  
    useEffect(()=>{
        getLists();
        console.log(new Date());
    },[]);

    const getLists = async () =>{
        const token = await AsyncStorage.getItem('token');
        if(token){
          setToken(token);
            setToken(token);
            const categories = await Api.getCategory(token);
             setItemCategory(categories.data);
             const auth = await Api.getAuth(token);
             if(auth.id){  
              const client = await Api.getClient(auth.id, token);
              if(client.id){
                 const company  = await Api.getCompany(client.id,token);
                 if(company.id){
                    setCnpj(company.cnpj);
                    setNewDate(company.dateStart);
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
    const handleButtonMainTab = () => {
        navigation.navigate('MainTab');
    }

    const onChange = (event, selectedDate) =>{
        setModal(false);
       const currentDate =  selectedDate || date;
       setDate(currentDate);
       let fDate = currentDate.getDate() + '/' + (currentDate.getMonth() + 1) + '/' + currentDate.getFullYear();
       if(event.type !== 'dismissed'){
            if(mode === 'date'){
               setNewDate(fDate);
            }
       }
    }

    const handleDate = (a) =>{
        setMode(a);
        setModal(true);
    }

    const handleButtonAdd = async (very) =>{
      setActive(true);
       if(token){
         const auth = await Api.getAuth(token);
          if(auth.id){
            const client = await Api.getClient(auth.id, token);
            if(client.id){
              if(very === 'add'){
                if(cnpj && newDate, category){
                   const res = await Api.createCompany(cnpj,newDate, category, client.id, token);
                   if(res.data){
                     alertMessage("Compania criada!");
                     navigation.navigate('Upload');
                     setActive(false);
                   }else{ 
                    alertMessage("Erro ao criar!");
                     setActive(false);
                   }
                }else{
                    alertMessage("Espaço em Branco");
                    setActive(false);
                }
              }else{
               const updateCompany = await Api.updateCompany(cnpj, newDate, category, client.id, token);
               
                if(updateCompany > 0){
                  setActive(false);
                  alertMessage('Alterardo com sucesso!', 'green');
                }else{
                  alertMessage('Error ao alterar', 'red');
                }
               
              }
            }
          } 
       }
    }

    return(
        <Container>
            {modal && (
                <DateTimePicker 
                testID="dateTimePicker"
                value={date}
                is24Hour={true}
                display='default'
                mode={mode}
                onChange={onChange}/>
            )}{modal && (
                <DateTimePicker 
                testID="dateTimePicker"
                value={date}
                is24Hour={true}
                display='default'
                mode={mode}
                onChange={onChange}/>
            )}
             <HeaderView>
               <ItemLeft>
                <Left name='arrowleft'
                  size={30} color="#000"
                  style={{marginLeft:40}}
                  onPress={()=>handleButtonMainTab()}/>
                 </ItemLeft>
                <ItemText>
                  {verify ? ( <HeaderText>Alterar empresa</HeaderText>):(
                     <HeaderText>Criar nova empresa</HeaderText>
                  )}
             </ItemText>
           </HeaderView>
           <Alert
              styleDisplay={styleDisplay}
              message={message}
              background={background}/>
           <FormView>
            <InputItem>
              <Text>CNPJ*</Text>
              <Item>
                 <TextInputMask
                    style={{width: '70%', height: 40, backgroundColor: '#fff', padding: 10}}
                    type={'cnpj'}
                    placeholder=' Ex: 00.623.904/0001-73'
                    onChangeText={text=>setCnpj(text)}
                    value={cnpj}
                  />    
             </Item>
             </InputItem>
             <InputItem>
               <Item>
                 <Input 
                 placeholder="00/00/0000"
                  width={'60%'} height={'15%'} value={newDate}/>
                 <DateTouch onPress={()=>handleDate('date')}>
                    <Date name="date" size={40}/>
                 </DateTouch>
               </Item>
             </InputItem>
             <InputItem>
               <Item>
                   <Picker
                        style={{width: '70%', height: 40}}
                        selectedValue={category}
                        onValueChange={(itemValue) =>
                        setCategory(itemValue)}>
                       <Picker.Item label="Selecione as opções" value="Selecione as opções" />
                      {itemCategory.map((item, k)=>(
                          <Picker.Item key={k} label={item.nameCat} value={item.id}/>
                      ))}
                    </Picker>
               </Item>
             </InputItem>
           </FormView>
          {verify ? (<>
            {active ? (<CustomButtom disabled={true}>
              <CustomButtonText><LoginIcon size="large" color="#FFFFFF"/></CustomButtonText>
              </CustomButtom>): (<CustomButtom onPress={()=>handleButtonAdd('alter')}>
              <CustomButtonText>Alterar empresa</CustomButtonText>
            </CustomButtom>)}
           </>) : (<>
            {active ? (<CustomButtom disabled={true}>
              <CustomButtonText><LoginIcon size="large" color="#FFFFFF"/></CustomButtonText>
              </CustomButtom>): (<CustomButtom onPress={()=>handleButtonAdd('add')}>
              <CustomButtonText>Cadastrar empresa</CustomButtonText>
            </CustomButtom>)}
           </>)}
           {!verify && (<LoginIconVery/>)}
        </Container>
    );
}