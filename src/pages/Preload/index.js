import { useEffect} from "react";
import { Container, LoginIcon } from "./style";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Api from "../../Api";
import { useNavigation } from "@react-navigation/native";
import { Image} from "react-native";


export default () =>{
  const navigation = useNavigation();

   useEffect(()=>{
     const checkToken = async()=>{
     const token = await AsyncStorage.getItem('token');
    
     if(token){
        const res = await Api.checkToken(token);
        if(res.total > 0){
           navigation.reset({ 
              routes:[{name: 'MainTab'}]
           });
        }else{
           navigation.reset({ 
             routes:[{name: 'SignIn'}]
            });
        }
     }else{
       navigation.reset({ 
         routes:[{name: 'SignIn'}]
       });
     }
   }  
    checkToken();
  },[])

    return (
      <Container>
         <Image 
           source={require('../../img/logotipo.png')} 
           style={{ width: 230, height: 200}}/>
         <LoginIcon  size="large" color="#FFFFFF"/>
      </Container>

    )
}