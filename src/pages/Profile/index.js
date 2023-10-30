import React, { useContext, useEffect, useState } from 'react';
import {Image, ScrollView, StyleSheet, Dimensions, Animated, View} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Api from '../../Api';
import Testimonial from '../../components/Testimonial';
import { PhotoContext } from '../../contexts/Photo';
import { ModalSched, ModalTestimonial} from '../../components/Modals';
import Left from 'react-native-vector-icons/AntDesign';
import { Card } from 'react-native-shadow-cards';
import{ Container,
        HeaderView,
        SwipeDot,
        SwipeDotActive,
        TextView,
        HeaderText,
        ItemLeft,
        ImageView, 
        SelfView, 
        InfoView,
        IconsView,
        Item, 
        LoginIcon,
        Title,
        ViewItem,  
        Text,
        ItemView,
        ViewRede,
        Touch,
        TouchRede,
        ItemText,
        FooterText,
        SkeletonImage
      } from './style';
import Favorite from 'react-native-vector-icons/MaterialIcons';
import Map from 'react-native-vector-icons/Feather';
import Schedule  from 'react-native-vector-icons/MaterialIcons';
import Commentary  from 'react-native-vector-icons/EvilIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swiper from 'react-native-swiper';
import Facebook from 'react-native-vector-icons/AntDesign';
import Instragram from 'react-native-vector-icons/AntDesign';
import Linkedin from 'react-native-vector-icons/AntDesign';
import Twitter from 'react-native-vector-icons/AntDesign';
import * as WebBrowser from 'expo-web-browser';
import {LinearGradient} from 'expo-linear-gradient';

export default (props) => {  
   const[listAnnouncements, setListAnnouncements] = useState([]);
   const [tokenAction, setTokenAction] = useState('');
   const [active, setactive] = useState(false);
   const [authId, setAuthId] = useState('');
   const [listGallery, setLisGallery] = useState([]);
   const [error, setError] = useState(false);
   const[loadFavorite, setLoadFavorite] =  useState(false);
   const [styleActiveSched,  setStyleActiveSched] = useState('none');
   const [styleActiveTestimonial,  setStyleActiveTestimonial] = useState('none');
   const [nameCat, setNameCat] = useState('');
   const [favoriteId, setfavoriteId] = useState('');
   const [testimonialBoolean, seTestimonialBoolean] = useState(false);
   const [listTestimonial, setTestimonial] = useState([]);
   const [textTestemonial, setTextTestemonial] = useState('Mostrar comentário');
   const navigation = useNavigation();
   const {link} = useContext(PhotoContext);
   const [FacebookVery, setFacebookVery] = useState(false);
   const [TwitterVery, setTwitterVery] = useState(false);
   const [InstagramVery, setInstagramVery] = useState(false);
   const [LinkedinVery, setLinkedinVery] = useState(false);
   const [Announcement, setAnnouncement] = useState([]);
   const [imageAnnouncement, setImageAnnouncement] = useState('');
   const [very, setVery] = useState(true);

   const {width} = Dimensions.get('window');
   const  AnimateValue  =new Animated.Value(0);

   useEffect(()=>{
      const announcement = props.route.params.item
      if(announcement.id){
         setListAnnouncements(announcement);
         getdados(announcement);
         setError(false);
      }else{
         setError(true);
      }
      getView(announcement);
   },[]);

   setTimeout(() => {
      Animated.loop(Animated.timing(AnimateValue, {
         toValue: 1,
         useNativeDriver: true,
         duration: 2500
      })).start();
   }, 2000);

 // Views create, udate get
   const getView = async (announcement) => {
      let num = 1
     const view = await Api.getView(announcement.id);
     if(view.data.length > 0){
         view.data.map((item)=>{
          num = item.num + 1;
         });

        const res = await Api.updateView(num, announcement.id);
        if(res === 0){
           alert('Erro no view');
        };
     }else{
        await Api.createView(num, announcement.id);

     }
   }

   const getdados = async (announcement) =>{
      getTestemonial(announcement); 
      setLoadFavorite(false);
      setAnnouncement(announcement);
      getNetwork(announcement);
      const token = await AsyncStorage.getItem('token');
      if(token){
         setTokenAction(token)
         const auth = await Api.getAuth(token);
         if(auth.id){
            setAuthId(auth.id)
              const client = await Api.getClient( auth.id, token);
              if(client.id > 0){
               const uploadclient = await Api.getUploadAnnouncements(announcement.id, token);
                if(uploadclient.id > 0){
                  setImageAnnouncement(uploadclient.image);
                }
                 const gallery = await Api.getGallery(announcement.company_id, token);
                 if(gallery.id){
                      setLisGallery(gallery);
                      setVery(false);
                      clearTimeout();
                      const company = await Api.getCompany(client.id, token);
                      if(company.id){
                        const category = await Api.getCategoryId(company.category_id);
                        if(category.id){
                           setNameCat(category.nameCat);
                           const favorite = await Api.getFavorite(auth.id, token);
                           let num = 0;
                           if(favorite.data.length > 0){
                              favorite.data.map((item)=>{
                                if(item.title === announcement.title){
                                   num++;
                                   if(num > 0){
                                    setfavoriteId(item.id);
                                    setactive(true);
                                    setLoadFavorite(true);
                                   }else{
                                    setactive(false);
                                    setLoadFavorite(true);
                                   }
                                }else{
                                  setLoadFavorite(true);
                                }

                              });
                             
                           }else{
                              setactive(false);
                              setLoadFavorite(true);
                           }
                           
                         }
                      }
                  }
               }
            }
         }
      }

       const getTestemonial = async (announcement) => {
          let media = 0;
          let count = 0;
      
          const testemonial = await Api.getTestimonial(announcement.id);
          if(testemonial.data.length > 0){
             setTestimonial(testemonial.data);
             //Média de notas de valiação
             testemonial.data.map((item)=>{
               count++;
               media += parseInt(item.note);
             });
              media = media / count;
               const res = await Api.UpdateAnnouncement(announcement.id, announcement.image,
               announcement.title, announcement.descrition, announcement.company_id, media); 
          }    
       }

    const handleButtonMainTab = () => {
      navigation.reset({ 
         routes:[{name: 'MainTab'}]
      });
    }

    const handleButtonMap = () =>{
         props.navigation.navigate('Maps', {item: listAnnouncements}); 
    }

    const handleButtonFavorite =  async () => {
      if(active === false){
         const res = await Api.CreateFavorite(listAnnouncements.title, nameCat, listAnnouncements.image, authId, listAnnouncements.descrition, listAnnouncements.company_id, tokenAction)
         if(res){
            setactive(true);
         }   
       }else{ 

            const res = await Api.deleteFavorite(favoriteId, tokenAction);
            if(res){
              setactive(false);
            }
       }
       
   }

   const handleButtonSchedule = ()=>{
      if(styleActiveSched === 'none'){
        setStyleActiveSched('flex');
      }else{
         setStyleActiveSched('none');
      }
   }

   const getNetwork = async (announcement) => {
      (announcement.twitter && setTwitterVery(true));
      (announcement.facebook && setFacebookVery(true));
      (announcement.linkedim && setLinkedinVery(true));
      (announcement.instagram && setInstagramVery(true));
   }

   const handlebuttonNetwork = async (item) => {
      if(item === 'facebook'){
         await WebBrowser.openBrowserAsync(Announcement.facebook);
       }

       if(item === 'twitter'){
         await WebBrowser.openBrowserAsync(Announcement.twitter);
       }

       if(item === 'instagram'){
         await WebBrowser.openBrowserAsync(Announcement.instagram);
       }

       if(item === 'linkedin'){
       
         await WebBrowser.openBrowserAsync(Announcement.linkedim);

       }
       
   }

   const hndleButtonTestimonial =  () => {
      if(styleActiveTestimonial === 'none'){
       setStyleActiveTestimonial('flex');
      } else{
         setStyleActiveTestimonial('none');
      }
   }

   const handleTestemonial = () => {
      if(testimonialBoolean === true){
         setTextTestemonial('Mostrar comentário');
         seTestimonialBoolean(false);
      }else{
         setTextTestemonial('Ocutar comentário');
         seTestimonialBoolean(true);
      } 
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
                 <TextView>
                   <HeaderText>Faça seu orçamento!</HeaderText>
                </TextView>
             </HeaderView>
             <ImageView>
               <Swiper 
                   style={{height: 240}}
                   paginationStyle={{top: 15, right: 15, bottom: null, left: null}}
                   dot={<SwipeDot/>}
                   activeDot={<SwipeDotActive/>}
                   autoplay={true}
                   >
                     {listGallery.imgOne !== '' && (
                        <Image 
                           source={{uri: `${link}${listGallery.imgOne}`}}
                           style={{ width: '100%', height: 200}}/>
                     )}
                     {listGallery.img !== '' && (
                       <Image 
                         source={{uri: `${link}${listGallery.imgTwo}`}}
                         style={{ width: '100%', height: 200}}/>
                     )}    
                     
                     {listGallery.imgThree !== '' && (
                       <Image 
                          source={{uri: `${link}${listGallery.imgThree}`}}
                          style={{ width: '100%', height: 200}}/>
                     )}

                     {listGallery.imgFour !== '' && (
                       <Image 
                          source={{uri: `${link}${listGallery.imgFour}`}}
                          style={{ width: '100%', height: 200}}/>
                     )}   
                    </Swiper>
                   </ImageView>
                     <InfoView>
                       <SelfView>
                            {very ? (
                              <SkeletonImage>
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
                              </SkeletonImage>
                            ):(
                              <Image
                              source={{uri: `${link}${imageAnnouncement}`}} 
                                style={{ width: 200, height: 120,}}/>
                            )}
                           
                       </SelfView> 
                       <ScrollView>
                         {error === false ? (
                          <Title>{listAnnouncements.title}</Title>):
                          <Title></Title>
                         }
                        <IconsView>
                           <Item onPress={()=>handleButtonSchedule()}>
                               <Schedule  name="schedule" size={35} color="#000"/>
                            </Item>
                            {loadFavorite === false ? ( <Item>
                                  <LoginIcon color="#000"/>
                                  </Item>): ( <Item onPress={()=>handleButtonFavorite()}>
                                     {active=== true? (<Favorite  name="favorite" size={35} color="#000"/>): 
                                     <Favorite  name="favorite-border" size={35} color="#000"/>}
                                  </Item>)}
                                <Item onPress={()=>handleButtonMap()}>
                                  <Map  name="map-pin" size={30} color="#000"/>
                               </Item>
                            <Item onPress={()=>hndleButtonTestimonial()}>
                               <Commentary name='comment' size={45} color="#000"/>
                            </Item>
                         </IconsView>
                              <ViewItem>
                                 {error === false ? (
                                  <Text>{listAnnouncements.descrition}</Text> ):
                                  <Text></Text> }
                               </ViewItem>
                               <ViewRede>
                                 {FacebookVery && (
                                    <TouchRede onPress={()=>handlebuttonNetwork('facebook')}>
                                       <Facebook name='facebook-square' size={25} color='#4169E1'/>
                                    </TouchRede>
                                 )}

                                 {InstagramVery && (
                                     <TouchRede onPress={()=>handlebuttonNetwork('instagram')}>
                                        <Instragram name='instagram' size={25} color='red'/> 
                                     </TouchRede>
                                 )} 
                                 
                                 {TwitterVery && (
                                    <TouchRede onPress={()=>handlebuttonNetwork('twitter')}>
                                      <Twitter name='twitter' size={25} color='#4169E1'/>
                                    </TouchRede>
                                 )}

                                 {LinkedinVery && (
                                    <TouchRede onPress={()=>handlebuttonNetwork('linkedin')}>
                                    <Linkedin name='linkedin-square' size={25} color='#4169E1'/>
                                    </TouchRede>
                                 )}
      
                               </ViewRede>
                              <ItemView>
                                 {listTestimonial.length > 0 && (
                                    <Touch onPress={()=>handleTestemonial()}>
                                        <ItemText>{textTestemonial}</ItemText>
                                     </Touch>)}
                               </ItemView>
                                <ItemView>
                                     {testimonialBoolean === true && ( 
                                         listTestimonial.map((item, k)=>(
                                          <Testimonial key={k}
                                          testimonial = {item}/>
                                       )))}
                                  </ItemView> 
                           <FooterText>Todos os direitos reservados</FooterText>
                         </ScrollView>
                    </InfoView> 
                  <ModalSched 
                     dat={new Date()}
                     listAnnouncement={listAnnouncements}
                     authId={authId}
                     styleActive={styleActiveSched}
                     active = "Agendar"
                     title = 'Novo agendamento'
                     info = {[]}
                  />  
                  <ModalTestimonial
                     styleActiveTestimonial = {styleActiveTestimonial}
                     listAnnouncement = {listAnnouncements}
                  />   
          </Container>
           )
       }

       const styles = StyleSheet.create({
         Line:{
           width:'80%',
           height: '100%'
         }
       });