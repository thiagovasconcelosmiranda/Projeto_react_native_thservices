import  { Container,
          HeaderArea,
          LeftTouch,
          Title,
          ItemView,
        } from'./style';
import ListFavorite from '../../components/ListFavorite';
import Left from 'react-native-vector-icons/AntDesign';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Api from '../../Api';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'react-native';
import LoginIconVery from "../../components/LoginIconVery";

export default (props) => {
   const navigation = useNavigation();
   const[list, setlist] = useState([]);
   const[deleteItem, setDeleteItem] = useState(false);
   const [verify, setVerify] = useState(true);
   const [Icon, setIcon] = useState(false);

   useEffect(()=>{
      getFavorite();
    },[]);

   const getFavorite = async() => {
  
       setVerify(false);
       const token =  await AsyncStorage.getItem('token');  
       if(token){
          const auth = await Api.getAuth(token);
          const favorite = await Api.getFavorite(auth.id, token);
          console.log(favorite.data.length);
          setDeleteItem(false);
          if(favorite.data.length > 0){
            setVerify(true);
            setlist(favorite.data); 
            setVerify(true);
            setIcon(false);
          }else{
            setVerify(true);
            setIcon(true);
          }
              
       }
   }
    const handleBbuttonDelete = async (item) =>{
          const token = await AsyncStorage.getItem('token');
          if(token){
            const res = await Api.deleteFavorite(item.id, token)
            if(res > 0){
              setDeleteItem(true);
              getFavorite();
            }else{
              getFavorite();
            }
          }
         
    }

    const handleBbuttonProfile = (item) =>{
        props.navigation.navigate('Profile', {item: item});
    }

    const heandleButtonMainTable = () =>{
      navigation.reset({ 
        routes:[{name: 'MainTab'}]

        });
    }
    return(
        <Container>
           {Icon && (
              <Image 
              source={require('../../img/vazio.png')} 
              style={{ width: 130, height: 130, position: 'absolute', top: 260, left: 120, opacity: 0.5 }}/> 
          )}
          <HeaderArea >
            <LeftTouch onPress={() =>heandleButtonMainTable()}>
                  <Left name='arrowleft'
                    size={30} color="#000"
                    style={{marginLeft:40}}/>
                  </LeftTouch>
                    <Title>Meus Favoritos</Title>
          </HeaderArea>
            {deleteItem === true && (<Image source={require('../../img/delete.gif')}
                 style={{width: 80, height: 80}} />
                  )}
          <ItemView>
              {list.map((item, k)=>(
                <ListFavorite key={k} data={item}
                  onPress={()=>handleBbuttonDelete(item)}
                  button={()=>handleBbuttonProfile(item)}/>))}
          </ItemView>
          {!verify && (<LoginIconVery/>)}
        </Container>
    )
};