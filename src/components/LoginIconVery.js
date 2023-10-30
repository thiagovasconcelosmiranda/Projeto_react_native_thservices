import styled from "styled-components/native";

const LoginIconView = styled.View `
 width:100%;
 height: 100%;
 flex:1;
 background-color: transparent;
 position: absolute;
 flex-direction: row;
 justify-content: center;
 align-items:center;
`;

const AlignView = styled.View `
`;

const LoginIcon = styled.ActivityIndicator``;
const TextLogin = styled.Text `
  font-size: 18px;
`;

export default ({info}) =>{
    return (
      <LoginIconView>
        <AlignView>
           <LoginIcon size="large" color="#000"/>
           <TextLogin>{info}</TextLogin>
        </AlignView> 
      </LoginIconView>
    );
}