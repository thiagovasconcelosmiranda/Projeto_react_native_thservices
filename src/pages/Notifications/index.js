import {useState, useEffect} from 'react';
import {Container,
        HeaderView,
        ItemLeft,
        ItemText,
        HeaderText,
        ItemNotification,
        ItemList,
        AlignItem
     } from "./style";
import Left from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import ListNotification from "../../components/ListNotification";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Api from '../../Api';
import LoginIconVery from '../../components/LoginIconVery';
import {ScrollView} from 'react-native';
import { Image } from 'react-native';

export default () => {
    const navigation = useNavigation();
    const [listNotify, setListNotify] = useState([]);
    const [active, setActive] = useState(false);
    const [very, setVery] = useState(false);
    const [Token, setToken] = useState('');
    const [Icon, setIcon] = useState(false);

    useEffect(()=>{
      getNotifications();
    }, []);

    const getNotifications = async () => {
      setVery(true);
      const token = await AsyncStorage.getItem('token');
      if(token){
        setToken(token)
         const auth = await Api.getAuth(token);
         if(auth.id){
            const client = await Api.getClient(auth.id, token)
            if(client.id){
                const company = await Api.getCompany(client.id, token);
                if(company.id){
                  const notification = await Api.getNotification(company.id, token);
                  if(notification.data.length > 0){
                      setListNotify(notification.data);
                      setActive(true);
                      setVery(false);
                      setIcon(false);
                  }else{
                     setActive(false);
                     setVery(false);
                     setIcon(true);
                  }
                }
             }
          }
       }
    };

    const handleButtonMainTab = () => {
      navigation.reset({ 
        routes:[{name: 'MainTab'}]});
    };

    const handleButton = async (info, item) =>{
      let getSchedule = 0;
      let status = ''
      if(info === 'off'){ 
        status = 'Recusado';

      }else{
        status = 'Confirmado';
      }

 if(status !== ''){
      if(Token){
        const deleteNotification = await Api.deleteNotification(item.id, Token);
      if(deleteNotification > 0){
       const auth = await Api.getAuth(Token);
       if(auth.id){
         const schedule = await Api.getShedules(item.auth_id, Token);
         if(schedule.data.length > 0){
            schedule.data.map((response)=>{
              if(response.company_id === item.company_id){
                getSchedule = response;
              }
            });
             
             const res = await Api.UpdateSchedule( getSchedule.title,  getSchedule.date,  getSchedule.time,
             getSchedule.descrition,  getSchedule.id, getSchedule.company_id, getSchedule.auth_id,  status, Token);
             console.log(res.sucess);
             if(res){
                alert(`Proposta ${status}!`);
                getNotifications(); 
            }
          }
        }
      }
     }
    }
   };
    
    return(
        <Container>
          {Icon && (
              <Image 
              source={require('../../img/vazio.png')} 
              style={{ width: 130, height: 130, position: 'absolute', top: 260, left: 120, opacity: 0.5 }}/> 
          )}
           <HeaderView>
              <ItemLeft>
                 <Left name='arrowleft'
                   size={30} color="#000"
                   style={{marginLeft:40}}
                   onPress={()=>handleButtonMainTab()}/>
                 </ItemLeft>
              <ItemText>
                <HeaderText>Notificações</HeaderText>
              </ItemText>
           </HeaderView>
           <ScrollView>
             <ItemNotification>
                   {active && ( 
                       <ItemList>
                         {listNotify.map((item, k)=>(
                           <AlignItem key={k}>
                                 <ListNotification
                                   item={item}
                                   on={()=>handleButton('on', item)}
                                   off={()=>handleButton('off', item)}
                                 />
                               </AlignItem>
                         ))}
                      </ItemList>
                     )}  
                   
               </ItemNotification>
               </ScrollView>
             
             {very && (
                <LoginIconVery/>
             )}
        </Container>
        
    )
}