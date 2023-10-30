
import MapView from 'react-native-maps';
import { Container,
         HeaderView, 
         ItemLeft,
         HeaderText ,
         LocationView,
         TitleText,
         LocationText,
         Latitude
        } from './style';

import Left from 'react-native-vector-icons/AntDesign';
import { ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import Api, { API } from '../../Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginIconVery from '../../components/LoginIconVery'

export default (props) => {
   const navigation = useNavigation();
   const [regionDb, setRegionDb] = useState([]);
   const [location, setLocation] = useState([]);
   const [locationUser, setLocationUser] = useState(false);
   const [region, setRegion] = useState(null);
   const[very, setVery] = useState(false);
   const [info, setInfo] = useState('');
   
  const hendleButtonLeft = () =>{
      navigation.navigate('MainTab');
  }

  useEffect(()=>{
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
           setErrorMsg('Permission to access location was denied');
           return;
      }
          })();
          getGeolocalization(props.route.params.item);
         
  },[]);


  

  const getGeolocalization = async (announcement) => { 
    setVery(true);
    setInfo('Verificando dados aguarde..');
     const token = await AsyncStorage.getItem('token');
     if(token){
         if(announcement.id){
              const geolocalization = await Api.getGeolocalization(announcement.company_id, token);
              if(geolocalization.id){ 
                setRegion({
                  latitude:-22.1534682,
                  longitude:-49.9611349,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421
              });
              setVery(false);
                setRegionDb(geolocalization);
            }else{
              handleLocalize(geolocalization, announcement, token);
            }
        }
     }
  }

  const handleLocalize = async (geolocalization, announcement, token) =>{
    setVery(true);
    setInfo('Registrando dados aguarde..');
    if(!geolocalization.id){
      setLocationUser(true);
      let location = await Location.getCurrentPositionAsync({});
      if(location.coords){
          let latitudeText = JSON.stringify(location.coords.latitude);
          let longitudeText = JSON.stringify(location.coords.longitude);
          setLocation({
             latitude: latitudeText,
             longitude: longitudeText
          }) ;

          if(latitudeText !== ''){
          const auth = await Api.getAuth(token);
          if(auth.id){
            const client = await Api.getClient(auth.id, token);
            if(client.id){
              const company = await Api.getCompany(client.id, token);
              if(company.id){
                if(company.id === announcement.company_id){
                    const res = await Api.CreateGeolocalization(latitudeText , longitudeText, 
                      company.id, token);
                    if(res){
                      setVery(false);
                         alert("Rastreamento registrado com sucesso!!");
                         navigation.navigate('MainTab');
                    }
                 }else{
                    alert('Usuario não adicionou o rastreamento!');
                    navigation.navigate('MainTab');
                 }
              }
            }
          }   
        }     
     }    
   }
  }
      
  return (
    <Container>
         <HeaderView>
            <ItemLeft onPress={hendleButtonLeft}>
            <Left name='arrowleft'
                  size={30} color="#000"
                  style={{marginLeft:40}}/>
            </ItemLeft>
            <ItemLeft>
            <HeaderText>Pesquisar de localização</HeaderText>
            </ItemLeft>
         </HeaderView>
         <MapView style={{width: '100%', height: '60%' }}
                 initialRegion={region}
                 showsUserLocation={locationUser}
                 minZoomLevel={17}
                 zoomEnabled={true}
                 loadingEnabled={true}
                 />
           <LocationView>
            <TitleText>Dados de localização</TitleText>
             {regionDb != '' ? (
                <ScrollView>
                  <LocationText> <Latitude>Latitude:  </Latitude>{regionDb.latitude}</LocationText>
                  <LocationText> <Latitude>Longitude:  </Latitude>{regionDb.longitude}</LocationText>
                </ScrollView> ): (
                <ScrollView>
                   <LocationText> <Latitude>Latitude:  </Latitude>{location.latitude}</LocationText>
                   <LocationText> <Latitude>Longitude:  </Latitude>{location.longitude}</LocationText>
                </ScrollView>
                )}  
           </LocationView>
           {very && (
               <LoginIconVery
                 info={info}
               
               />
           )}
           
    </Container>
  );
}

