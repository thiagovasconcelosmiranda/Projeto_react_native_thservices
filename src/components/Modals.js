import styled from "styled-components/native";
import { LinearGradient } from 'expo-linear-gradient';
import DateTimePicker from '@react-native-community/datetimepicker';
import Input from './Input';
import Date from 'react-native-vector-icons/Fontisto';
import Time from 'react-native-vector-icons/Ionicons';
import Close from 'react-native-vector-icons/AntDesign';
import List from 'react-native-vector-icons/FontAwesome';
import Commentary  from 'react-native-vector-icons/EvilIcons';
import { useEffect, useState } from "react";
import Api from "../Api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';
import Alert from "./Alert";
import Star from 'react-native-vector-icons/FontAwesome';
import * as Notifications from 'expo-notifications';


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});


const View = styled.View`
 position: absolute;
 top:20px;
 height: 100%;
 width: 100%;
 display: flex;
`;

const Modal = styled.View`
  width: 90%;
  height: auto;
  background-color: #fff;
  border-radius: 25px;
  margin: auto;
  padding: 20px;
`;
const TopView = styled.View`
   width: auto;
   height: auto;
   flex-direction: row;
  justify-content:space-between
`;

const ItemTop = styled.TouchableOpacity``;

const Title = styled.Text`
  text-align: center;
  font-size: 18px;
  margin: 10px;
`;

const InputView = styled.View`
 width: 100%;
 height: 90px;
 flex-direction: row;
 align-items: center;
 justify-content: center;
`;

const Text = styled.Text`
  font-size: 20px;
  text-align: center;
`;

const Item = styled.TouchableOpacity`
  padding: 10px;
`;

const CustomButtom = styled.TouchableOpacity`
width:230px;
height: 56px;
background-color: #268596;
justify-content: center;
align-items: center;
margin-left: auto;
margin-right: auto;
margin-top: 40px;
`;


const CustomButtonText = styled.Text `
  font-size:  18px;
  color:#FFFFFF;
`;
const LoginIcon = styled.ActivityIndicator`
`;

 const ModalSched = ({dat, authId, listAnnouncement, styleActive, active, info, title}) => {
    const [modal, setModal] = useState(false);
    const [mode, setMode] = useState('');
    const [date, setDate] = useState(dat);
    const [newDate, setNewDate] = useState('');
    const [newTime, setNewTime] = useState('');
    const [descrition, setDescrition] = useState('');
    const [Style, setStyle] = useState('none');
    const [preloadButton, setPreloadButton] = useState(false);
    const [message, setMessage] = useState('');
    const [styleDisplay, setStyleDisplay] = useState('none');
    const[background, setBackgroud] = useState('green');
    const navigation = useNavigation();
    const [Client, setClient] = useState('');

     useEffect(()=>{
        setStyle(styleActive);
       getSchedule();
    }, [styleActive]);
     
    const getSchedule = () => {
      if(active === 'Alterar'){
           setNewDate(info.date);
           setNewTime(info.time);
           setDescrition(info.descrition);
      }
    }
    const onChange = (event, selectedDate) =>{
      setModal(false);
       const currentDate =  selectedDate || date;
       setDate(currentDate);
       let fDate = currentDate.getDate() + '/' + (currentDate.getMonth() + 1) + '/' + currentDate.getFullYear();
       let fTime = currentDate.getHours() + ':' + currentDate.getMinutes();
       
       if(event.type !== 'dismissed'){
            if(mode === 'date'){
               setNewDate(fDate);
            }

            if(mode === 'time'){
               setNewTime(fTime);
             }   
       }
    }

    const alertMessage = (msg, background) =>{
      setBackgroud(background)
      setMessage(msg);
      setStyleDisplay('flex');
      setTimeout(function(){
        setStyleDisplay('none');
      },8000)
    }

  const handleDate = (a) =>{
    setMode(a);
    setModal(true);
  }

  const handleButtonSchedule = async ()=>{
    setPreloadButton(true);
    const token = await AsyncStorage.getItem('token');
     if(active !== 'Alterar'){
       if(newDate === '' || newTime === '' || descrition === ''){
          alertMessage('Espaço em branco!', 'red');
          setPreloadButton(false); 
       }else{
         if(token){
          const auth = await Api.getAuth(token);
          if(auth.id){
            const client = await Api.getClient(auth.id, token);
            if(client.id){
              setClient(client.name)
              const res = await Api.createSchedule(listAnnouncement.title, newDate, newTime, descrition, 
                listAnnouncement.company_id, authId, 'Aguardando', token);
             if(res.data !== ''){
                const notification = await Api.createNotification( client.file, descrition, newDate, newTime, 
                  auth.id, 'not visualized', listAnnouncement.company_id, token);
                if(notification.data){
                    // resposta da notificação
                    Notification(client.name, listAnnouncement.title); 
                }
                setPreloadButton(false);
                alertMessage(res.data, 'green');
                setNewDate('');
                setNewTime('');
                setDescrition('');
              }else{
               setMessage(res.error);
               setPreloadButton(false);
               alertMessage(res.error,'red');
             }
          }        
        }
      } 
   }
  }else{
    if(newDate !== '' || newTime !== '' || descrition !== ''){
         const schedule = await Api.UpdateSchedule(info.title, newDate, newTime, descrition, info.id, 
          info.company_id, info.authClient_id, info.status, token);
          console.log(schedule);
         if(schedule.sucess === 'success alter'){
           alertMessage('Alterardo com sucesso!','green');
           setPreloadButton(false);
           getSchedule();
         }else if(schedule.error === 'not create'){
             alertMessage('Erro ao alterar','red');
             setPreloadButton(false);
         }
    }else{
        alertMessage('Espaço vazio','red');
        setPreloadButton(false);
    }
  }
 };
 
 const Notification = async (user, des) => { 
  await Notifications.scheduleNotificationAsync({
      content: {
      title: 'Nova Notificação',
      body:`Requisição de ${user} para ${des}.`,
      },
      trigger: null,
   });
 }

 
  const handleClose = () =>{
     setStyle('none');
     setPreloadButton(false);
     setNewDate('');
     setNewTime('');
     setDescrition('');
  }

  const handleListSchedule = () =>{
   navigation.navigate('Schedule');
  }
  
   return (   
      <View style={{display: `${Style}`}}>
         {modal  && (
              <DateTimePicker 
                 testID="dateTimePicker"
                 value={date}
                 is24Hour={true}
                 display='default'
                 mode={mode}
                 onChange={onChange}/>
        )}
        <LinearGradient colors={['rgba(2,0,0,0.8)', 'transparent']} style={{width: '100%', height:'100%'}}>
        <Modal>
            <TopView>
            <ItemTop onPress={handleListSchedule}>
                  <List name="list-alt" size={30}/>
               </ItemTop>
            <ItemTop onPress={handleClose}> 
                  <Close name="close" size={30}/>
               </ItemTop>
               
            </TopView>
            <Title>{title}</Title>
            <InputView>
              <Item disabled={true}>
                <Input width={'80%'} height={'15%'}  value={newDate}/>
               </Item>
               <Item onPress={()=>handleDate('date')}>
                 <Date name="date" size={40}/>
               </Item>
            </InputView>
            <InputView>
              <Item disabled={true}>
                <Input width={'80%'} height={'15%'} value={newTime} />
               </Item>
               <Item onPress={()=>handleDate('time')}>
                 <Time name="md-time-outline" size={50}/>
               </Item>
             </InputView>
            <InputView>
              <Input onChangeText={(e) => setDescrition(e)}
                 width={'90%'}
                 height={'100%'}
                 multiline={true}
                 placeholder="Descrição"
                 value={descrition}
                 />
            </InputView>
            <CustomButtom  onPress={()=>handleButtonSchedule()}>
                 {preloadButton ? (
                      <CustomButtonText  ><LoginIcon size="large" color="#fff"/></CustomButtonText>):
                 (<CustomButtonText >{active}</CustomButtonText>)} 
            </CustomButtom>
          </Modal>
        </LinearGradient>
        <Alert
            message={message}
            styleDisplay={styleDisplay}
            background={background}
           
        />
    </View>
    )
}

const ModalTestimonial = ({styleActiveTestimonial, listAnnouncement}) => {
    const [styleTestimonial, setStyleTestimonial] = useState('none');
    const [message, setMessage] = useState('');
    const [styleDisplay, setStyleDisplay] = useState('none');
    const[background, setBackgroud] = useState('green');
    const [starColor1, setStarColor1] = useState('#000');
    const [starColor2, setStarColor2] = useState('#000');
    const [starColor3, setStarColor3] = useState('#000');
    const [starColor4, setStarColor4] = useState('#000');
    const [starColor5, setStarColor5] = useState('#000');
    const [nota, setNota] = useState('');
    const [state, setState] = useState(false);
    const [descrition, setDescrition] = useState('');
  
    useEffect(()=>{
        setStyleTestimonial(styleActiveTestimonial);
    }, [styleActiveTestimonial]);

    const handleListSchedule = () =>{
        navigation.navigate('Schedule');
       }

       const alertMessage = (msg, background) =>{
        setBackgroud(background)
        setMessage(msg);
        setStyleDisplay('flex');
        setTimeout(function(){
          setStyleDisplay('none');
        },8000)
      }


       const handleTestemonialClose = () => {
         reset();
         setStyleTestimonial('none');
       }

       const reset = () =>{
        setStarColor1('#000');
        setStarColor2('#000');
        setStarColor3('#000');
        setStarColor4('#000');
        setStarColor5('#000');
        setNota('');
        setDescrition(' ');
       }
       
       const handleStar = (num) => {
        if(num === '5'){
             setNota(num);
             setStarColor1('#FF8C00');
             setStarColor2('#FF8C00');
             setStarColor3('#FF8C00');
             setStarColor4('#FF8C00');
             setStarColor5('#FF8C00');
        }

        if(num === '4'){
          setNota(num);
             setStarColor1('#FF8C00');
             setStarColor2('#FF8C00');
             setStarColor3('#FF8C00');
             setStarColor4('#FF8C00');
             setStarColor5('#000');
          
        }
        if(num === '3'){
          setNota(num);
          setStarColor1('#FF8C00');
          setStarColor2('#FF8C00');
          setStarColor3('#FF8C00');
          setStarColor4('#000');
          setStarColor5('#000');
        }

        if(num === '2'){
          setNota(num);
          setStarColor1('#FF8C00');
          setStarColor2('#FF8C00');
          setStarColor3('#000');
          setStarColor4('#000');
          setStarColor5('#000');
        }

        if(num === '1'){
          setNota(num);
          setStarColor1('#FF8C00');
          setStarColor2('#000');
          setStarColor3('#000');
          setStarColor4('#000');
          setStarColor5('#000');
        } 
   }

   const handleButtonEnviar = async () =>{
       setState(true);
       const token = await AsyncStorage.getItem('token');
       if(token){
        const auth = await Api.getAuth(token);
        if(auth.id){
          const client = await Api.getClient(auth.id, token);
          if(client.id){
            if(nota !== '' && descrition !== ''){
              const testimonial = await Api.createTestimonial(nota, descrition, listAnnouncement.id, client.name);
              if(testimonial.data){
                  alertMessage('Enviado com sucesso! seu comentario é muito importante pra nós','green');
                  reset();
                  setState(false);
                }else if(testimonial.data.error){
                  alertMessage('Erro ao enviar!','red');
                  setState(false);
                 }  
        }else{
             alertMessage('Epaço vazio!','red');
             setState(false);
        }
        
          }
       }
     }  
   }
       
   return (
    <View style={{ display: styleTestimonial}} >
         <LinearGradient colors={['rgba(2,0,0,0.8)', 'transparent']} style={{width: '100%', height:'100%'}}>
          <Modal>
          <TopView>
              <ItemTop onPress={handleListSchedule}>
              <Commentary name='comment' size={45} color="#000"/>
              </ItemTop>
              <ItemTop onPress={handleTestemonialClose}> 
                  <Close name="close" size={30}/>
              </ItemTop>
            </TopView>
            <Title>Avalie o profissional</Title>

            <InputView>
            <Item onPress={()=>handleStar('1')}>
               <Star name="star" size={35} color={starColor1} />
            </Item>
            <Item onPress={()=>handleStar('2')}>
               <Star name="star" size={35} color={starColor2}  />
            </Item>
            <Item onPress={()=>handleStar('3')}>
               <Star name="star" size={35} color={starColor3}  />
            </Item>
            <Item onPress={()=>handleStar('4')}>
               <Star name="star" size={35} color={starColor4}  />
            </Item>
            <Item onPress={()=>handleStar('5')}>
               <Star name="star" size={40} color={starColor5}/>
            </Item>
            </InputView>
            <InputView>
              <Input
                 width={'90%'}
                 height={'100%'}
                 multiline={true}
                 placeholder="Comentario"
                 value={descrition}
                 onChangeText={e=>setDescrition(e)} />
            </InputView>
            <CustomButtom onPress={handleButtonEnviar}>
               {state ? (
                 <CustomButtonText><LoginIcon color="#fff"/></CustomButtonText>):
                 ( <CustomButtonText>Enviar</CustomButtonText>)}
               

            </CustomButtom>
          </Modal>
          </LinearGradient>
          <Alert
             message={message}
             styleDisplay={styleDisplay}
              background={background}
         
      />
    </View>
   );
}

export {ModalSched, ModalTestimonial}