import {StatusBar} from 'react-native';
import {NavigationContainer } from '@react-navigation/native';
import MainStack from './src/Strack/MainStrack';
import PhotoProvider from './src/contexts/Photo';


export default function App() {

  return (
    <NavigationContainer>
      <StatusBar
          barStyle="light-content"
          hidden={false}
          backgroundColor="#000"/>
         <PhotoProvider>
                  <MainStack/>
           </PhotoProvider>
    </NavigationContainer>
  )
}

