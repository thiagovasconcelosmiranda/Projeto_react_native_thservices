import styled from 'styled-components/native';


const Container = styled.SafeAreaView`
flex: 1;
background-color: #000000;
justify-content: center;
align-items: center;
`;

const TextTitulo = styled.Text `
 font-size:40px;
 color: #ffffff;
`;

const LoginIcon = styled.ActivityIndicator`
    margin-top: 20px;
`;

export {Container, TextTitulo, LoginIcon}