import styled from "styled-components/native";
import Edit from 'react-native-vector-icons/Feather';
import Delete from 'react-native-vector-icons/MaterialCommunityIcons';
import { useEffect, useState } from "react";



const ViewScheadule = styled.View`
   width: 90%;
   height: auto ;
   background-color: #fff;
   margin-top: 20px;
`;

const TimeView = styled.View`
 flex-direction: row;
 width: 100% ;
 background-color: green;
 height: auto;
 justify-content: center; 
 align-items:  center;
`;

const DateTimeText = styled.Text`
    color: #fff;
    font-size: 20px;
    text-align: center;
    font-weight: bold;
`

const Colunn = styled.View`
 width: 50%;
 margin-top: 10px;
`;

const ItemView = styled.View`
 width: 60%;
 height: auto;
 flex-direction: row;
 align-items: center;
 margin: 10px;
`;

const ItemText = styled.Text`
  font-size: 16px;
  text-align: center;
  
`;

const DescritionText = styled.Text`
  font-size: 18px;
  max-width: 100%;
`;

const AlignView = styled.View `
  flex-direction: row;
  width: 100%;
  height: auto ;
`;

const ItemIcon = styled.View`
    flex-direction: row;
    width: 100%;
    height: auto;
    align-items: center;

`;
const ItemTouch = styled.TouchableOpacity`
  margin: 5px;
`;

const BoldText = styled.Text`
  font-weight: bold;
`;

export default ({item, button, buttonAlter}) => {
  
  const [backgroud, setBackgroud] = useState('');

  useEffect(()=>{
    if(item.status === "Confirmado"){
       setBackgroud('green');
    }
    if(item.status === "Recusado"){
      setBackgroud('red');
    }

    if(item.status === "Aguardando"){
      setBackgroud('#B8860B');
    }
  },[]); 

    return( 
        <ViewScheadule>
             <TimeView> 
                <DateTimeText>{item.created_at}</DateTimeText>
             </TimeView>
             <ItemText><BoldText>{item.title}</BoldText></ItemText>
             <AlignView>
              <Colunn>
                <ItemView>
                    <ItemText><BoldText>Data Agenda:</BoldText>{item.date}</ItemText>
                </ItemView>
                <ItemView>
                      <ItemText><BoldText>Hora:</BoldText> {item.time}hs</ItemText>
                  </ItemView>
                  <ItemView style={{backgroundColor: backgroud}}>
                    <ItemText style={{color: '#fff', marginLeft:5}}>{item.status}</ItemText>
                  </ItemView>
                </Colunn>
                <Colunn>
                <ItemText style={{fontWeight: 'bold'}}>Descrição:</ItemText>
                <DescritionText>{item.descrition}</DescritionText>
                 <ItemIcon >
                    <ItemTouch onPress={buttonAlter}>
                        <Edit name="edit" size={40} color='blue'/>
                    </ItemTouch>
                    <ItemTouch onPress={button}>
                        <Delete name="delete-outline" size={45} color='red'/>
                    </ItemTouch>                   
                 </ItemIcon>
                </Colunn>
            </AlignView>
      </ViewScheadule>
    )
}