import React, {useState, useEffect} from 'react';
import { useNavigation } from '@react-navigation/native';
import S from './style';

import {useStateValue} from '../../contexts/StateContext';
import api from '../../services/api';

export default () => {
    const navigation = useNavigation();
    const [context, dispatch] = useStateValue();

    const [cpf, setCpf] = useState('');
    const [password, setPassword] = useState('');

    const handlerLoginButton = async () => {
        if(cpf === ''){
            alert("O campo de CPF é obrigatório!");
        }
        else if(password === ''){
            alert("O campo de Senha é obrigatório!");
        }
        else{
            let result = await api.login(cpf, password);

            if(result.error === ''){
                dispatch({type: 'setToken', payload: {token: result.token}});
                dispatch({type: 'setUser', payload: {user: result.user}});

                navigation.reset({
                    index: 1,
                    routes: [{name: 'ChoosePropertyScreen'}]
                });
            }
            else{
                alert(result.error);
            }
        }
    }

    const handlerRegisterButton = () => {
        navigation.navigate('RegisterScreen');
    }
    
    return(
        <S.Container>
            <S.Logo
                source={require('../../assets/undraw_home.png')}
                resizeMode="contain"
            />

            <S.Field
                placeholder="Digite seu CPF"
                keyboardType="numeric"
                value={cpf}
                onChangeText={t=>setCpf(t)}
            />

            <S.Field
                placeholder="Digite sua Senha"
                secureTextEntry={true}
                value={password}
                onChangeText={t=>setPassword(t)}
            />

            <S.ButtonArea onPress={handlerLoginButton}>
                <S.ButtonText>Entrar</S.ButtonText>
            </S.ButtonArea>

            <S.ButtonArea onPress={handlerRegisterButton}>
                <S.ButtonText>Cadastre-se</S.ButtonText>
            </S.ButtonArea>

        </S.Container>
    );
}