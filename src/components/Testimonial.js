
import styled from "styled-components";
import {StarTestimonial} from './StarItens'

const Container = styled.View`
  width:90%;
  height: auto;
  background-color:#008080;
  border-radius: 5px;
  margin-top: 30px;
  padding: 10px;
`;

const NameTitleView = styled.View`
   width:100%;
   flex-direction: row;
   justify-content: center;
   align-items:center;
`; 

const NametitleText = styled.Text`
width: 80%;
text-align: center;
font-size: 20px;
color:#fff;
font-weight: bold;
`;

const Testimonial = styled.View`
   width: 100%;
   flex-direction: row;
   justify-content: center;
   align-items:center;
`;

const TestimonialText = styled.Text`
   width:80%;
  text-align: center;
  font-size: 16px;
  color: #fff;
`;


const StarView = styled.View`
   width: 100%;
   flex-direction: row;
   justify-content: center;
   align-items:center;
`;

export default ({testimonial}) =>{
   return (
      <Container>
           <NameTitleView>
              <NametitleText>{testimonial.title}</NametitleText>
           </NameTitleView>
            <Testimonial>
              <TestimonialText>{testimonial.commentary}</TestimonialText>
            </Testimonial>
            <StarView>
              <StarTestimonial
                 note = {testimonial.note}
                 />
              </StarView>
      </Container>
   )
}