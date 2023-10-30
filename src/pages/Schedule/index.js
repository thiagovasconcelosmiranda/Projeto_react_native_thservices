import { ScrollView, RefreshControl, Image } from "react-native";
import { Container,
         HeaderView,
         ItemLeft,
         ItemText,
         HeaderText, 
         ItemView,
         ImageItem,
         AlignItem
       } from "./style";
import Left from 'react-native-vector-icons/AntDesign';
import { useNavigation } from "@react-navigation/native";
import ListSchedules from "../../components/ListSchedules";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import Api from "../../Api";
import { ModalSched } from '../../components/Modals';
import LoginIconVery from "../../components/LoginIconVery";

export default () => {

  const navigation = useNavigation();
  const [schedules, setSedules] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [tokenAuth, setTokenAuth] = useState('');
  const [deleteItem, setDeleteItem] = useState(false);
  const [styleActive, setStyleActive] = useState('none');
  const [authId, setAuthId] = useState('');
  const [info, setInfo] = useState([]);
  const [verify , setVerify ] = useState(false);


   useEffect(()=>{
     getShedules();
   },[]);

   const refreshActive = () => {
      setRefresh(true);
      setTimeout(()=>{
         getShedules();
         setRefresh(false);
       }, 9000);
   }

   const getShedules = async () => {
      const token = await AsyncStorage.getItem('token');
      setTokenAuth(token);
      if(token){
         const auth = await Api.getAuth(token);
         if(auth.id > 0){
            setAuthId(auth.id);
             const res = await Api.getShedules(auth.id,token);
             if(res.data.length > 0){
               setVerify(true);
                setSedules(res.data);
                setDeleteItem(false);
          }else{
            setVerify(true);
          }
        }
      }
   }

  const hndleButtonMainTab = () => {
     navigation.navigate('MainTab');
  }
   const handleDelete = async (id) => {
   setDeleteItem(true);
   if(tokenAuth){
       const res = await Api.deleteShedules(id, tokenAuth);
       if(res > 0){
          getShedules();
          setDeleteItem(false);
       }
    }
  }

  const handleAlter = (item) => {
    if(styleActive === 'none'){
       setStyleActive('flex');
       setInfo(item);
    }else{
      setStyleActive('none');
    }
  }
  
    return(
       <Container>
            <HeaderView>
              <ItemLeft>
                 <Left name='arrowleft'
                   size={30} color="#000"
                   style={{marginLeft:40}}
                   onPress={()=>hndleButtonMainTab()}/>
                 </ItemLeft>
                <ItemText>
                <HeaderText>Meus Agendamentos</HeaderText>
              </ItemText>
           </HeaderView>
              <ItemView>
              {deleteItem === true && (
               <ImageItem>
                  <Image source={require('../../img/delete.gif')}
                   style={{width: 80, height: 80}} />
                 </ImageItem>
                  )}    
              <ScrollView refreshControl={<RefreshControl 
                 refreshing={refresh} onRefresh={refreshActive}/>}>
                 {schedules.map((item, k)=>(
                  <AlignItem  key={k} >
                     <ListSchedules
                          item={item}
                          button={()=>handleDelete(item.id)}
                          buttonAlter={()=>handleAlter(item)}
                          info="teste"
                          />
                      </AlignItem>
                  ))}
                   </ScrollView>
               </ItemView> 
               <ModalSched 
                     dat={new Date()}
                     authId={authId}
                     styleActive={styleActive}
                     active = "Alterar"
                     title = 'Alterar agendamento'
                     info = {info}
                />
                 {!verify && (<LoginIconVery/>)}
        </Container>
    )
}