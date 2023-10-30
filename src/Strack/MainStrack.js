import {createStackNavigator} from "@react-navigation/stack";
import Preload from "../pages/Preload";
import Profile from '../pages/Profile';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Home from '../pages/Home';
import ResetPassword from '../pages/ResetPassword';
import Favorite from '../pages/Favorite';
import Help from '../pages/Help';
import EmailVerified from '../pages/EmailVerified';
import AddressClient from '../pages/AddressClient';
import AddressCompany from "../pages/AddressCompany";
import Announcement from "../pages/Announcement";
import Upload from '../pages/Uploud';
import Client from '../pages/Client';
import Maps from '../pages/Maps';
import Company from '../pages/Company';
import Notifications from '../pages/Notifications';
import Configuration from '../pages/Configuration';
import Contact from '../pages/Contact';
import Services from '../pages/Favorite';
import Schedule from '../pages/Schedule';
import MainTab from '../Strack/MainTab';

const Stack = createStackNavigator();

export default () => (
    <Stack.Navigator
         initialRouteName="Preload"
         screenOptions={{
         headerShown:false}}>
          <Stack.Screen name="Preload" component={Preload}/>
          <Stack.Screen name="SignIn" component={SignIn}/>
          <Stack.Screen name="SignUp" component={SignUp}/>
          <Stack.Screen name="MainTab" component={MainTab}/>
          <Stack.Screen name="Home" component={Home}/> 
          <Stack.Screen name="ResetPassword" component={ResetPassword}/> 
          <Stack.Screen name="Favorite" component={Favorite}/> 
          <Stack.Screen name="Help" component={Help}/> 
          <Stack.Screen name="EmailVerified" component={EmailVerified}/> 
          <Stack.Screen name="AddressClient" component={AddressClient}/>
          <Stack.Screen name="AddressCompany" component={AddressCompany}/>
          <Stack.Screen name="Announcement" component={Announcement}/>
          <Stack.Screen name="Upload" component={Upload}/>
          <Stack.Screen name="Client" component={Client}/>
          <Stack.Screen name="Maps" component={Maps}/>
          <Stack.Screen name="Profile" component={Profile}/>
          <Stack.Screen name="Company" component={Company}/>
          <Stack.Screen name="Notifications" component={Notifications}/>
          <Stack.Screen name="Configuration" component={Configuration}/>
          <Stack.Screen name="Contact" component={Contact}/>
          <Stack.Screen name="Services" component={Services}/>
          <Stack.Screen name="Schedule" component={Schedule}/>
    </Stack.Navigator>
);