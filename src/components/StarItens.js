import styled from "styled-components"
import Star from 'react-native-vector-icons/FontAwesome';
import { useEffect, useState } from "react";

const StarView = styled.View`
 flex-direction: row;
 align-items: center;
 margin-left: 20px;

`;

const Item = styled.View`
 padding: 3px;


`;
const Text = styled.Text`
   font-size: 16px;
   margin-left: 10px;
`;

 export const StarTestimonial = ({note, media, status}) => {
 const [num, setNum] = useState('');
 const [color, setColor] = useState('');
 const [ star1, setStar1] = useState(false);
 const [ star2, setStar2] = useState(false);
 const [ star3, setStar3] = useState(false);
 const [ star4, setStar4] = useState(false);
 const [ star5, setStar5] = useState(false);

   useEffect(()=>{
     if(status){
       setNum(media);
       setColor('#000');
       
       if(media <= 5 ){
         setStar1(true);
         setStar2(true);
       }

       if(media >= 5 && media <= 7 ){
         setStar1(true);
         setStar2(true);
         setStar3(true);
       }
       if(media > 7){
         setStar1(true);
         setStar2(true);
         setStar3(true);
         setStar4(true);
         setStar5(true);
       }

     }else{
       setNum(note);
       setColor('#fff');

       if(note === 1){
          setStar1(true);
       }
       if(note === 2){
         setStar1(true);
         setStar2(true);
     }

     if(note === 3){
         setStar1(true);
         setStar2(true);
         setStar3(true);
     }

       if(note === 4){
          setStar1(true);
          setStar2(true);
          setStar3(true);
          setStar4(true);
       }

       if(note === 5){
          setStar1(true);
          setStar2(true);
          setStar3(true);
          setStar4(true);
          setStar5(true);
       }
    }

   },[])
    return(
       <StarView>
         {star1 && (
           <Item>
             <Star name="star" size={16}  color="#FF8C00" />
          </Item>
         )}
          
          {star2 && (
           <Item>
             <Star name="star" size={16}  color="#FF8C00" />
          </Item>
         )}

          {star3 && (
            <Item>
              <Star name="star" size={16}  color="#FF8C00" />
            </Item>
          )}

           {star4 && (
             <Item>
                <Star name="star" size={16}  color="#FF8C00"/>
             </Item>
           )}
        
        {star5 && (
            <Item>
              <Star name="star" size={16}  color="#FF8C00" />
            </Item>
          )}
         { color === '#000' ? (
          <Text style={{color: '#000'}}>{num}</Text>
         ):(
          <Text style={{color: '#fff'}}>{num}</Text>
         )}
        
         
      </StarView>
    )
}

