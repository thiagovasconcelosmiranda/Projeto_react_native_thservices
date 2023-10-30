import {Container,  HeaderArea, LeftTouch, Title, Text, View} from './style';
//import * as webBrouser from 'expo-web-browser';
import {A} from '@expo/html-elements';
import Left from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

export default () => {
   const navigation = useNavigation();
    
   const heandleButtonMainTable = () => {
     navigation.navigate('MainTab');
   }

    return (
        <Container>
            <HeaderArea>
               <LeftTouch onPress={() =>heandleButtonMainTable()}>
                  <Left name='arrowleft'
                    size={30} color="#000"
                    style={{marginLeft:40}}/>
                  </LeftTouch>
                    <Title>Contato</Title>
            </HeaderArea>
            <View>
            <Text>Contato</Text>
              <A href='tel:149967087974'>Ligar</A>
              <A href='mailto:support@expo.dev'>Email</A>
            </View>  
        </Container>
    )
}