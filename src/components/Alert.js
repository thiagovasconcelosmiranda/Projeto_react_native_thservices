import styled from "styled-components";

const AlertView = styled.View`
  position: absolute;
  width: 100%;
  height: 60px;
  background-color: #fff;
  top: 20px;
  left: 1px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: red;
`;

const AlertText = styled.Text `
   font-size: 18px;
   font-weight: bold;
   color: #fff;
`;


 export default ({message, styleDisplay, background}) => {
    return (
        <AlertView style={{display: styleDisplay, backgroundColor: background}}>
             <AlertText>Atenção: {message}</AlertText>
        </AlertView>
    )
 }