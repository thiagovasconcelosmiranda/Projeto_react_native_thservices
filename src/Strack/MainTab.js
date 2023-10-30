import React from "react";
import TabBar from "../components/TabBar";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Favorite from '../pages/Favorite';
import Home from '../pages/Home';
import Help from "../pages/Help";
import Option from "../pages/Option";

const Tabs = createBottomTabNavigator();

export default () => (

     <Tabs.Navigator   screenOptions={{
        headerShown:false}}
        tabBar={props => <TabBar { ...props } />}>
           <Tabs.Screen name="Home" component={Home}/>
           <Tabs.Screen name="Favorite" component={Favorite}/>
           <Tabs.Screen name="Help" component={Help}/>
           <Tabs.Screen name="Option" component={Option}/>
          
       </Tabs.Navigator>

)
        
    




