import React, {useState, useEffect} from 'react';
import { useNavigation } from '@react-navigation/native';
import S from './style';

import {useStateValue} from '../../contexts/StateContext';
import api from '../../services/api';

export default () => {
    const navigation = useNavigation();
    const [context, dispatch] = useStateValue();

    const [name, setName]           = useState('');
    const [email, setEmail]         = useState('');
    const [cpf, setCpf]             = useState('');
    const [password, setPassword]   = useState('');
    const [password_confirm, setPasswordConfirmation]   = useState('');

    useEffect(()=>{
        navigation.setOptions({
            headerTitle: 'Fazer Cadastro'
        })
    },[]);

    const handlerRegisterButton = async () => {
        if(name && email && cpf && password && password_confirm){
            let result = await api.register(name, email, cpf, password, password_confirm);

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
        else{
            alert("Todos os campos são obrigatórios.");
        }
    }
    
    return(
        <S.Container>
            <S.Field
                placeholder="Digite seu Nome Completo"
                value={name}
                onChangeText={t=>setName(t)}
            />

            <S.Field
                placeholder="Digite seu E-mail"
                value={email}
                onChangeText={t=>setEmail(t)}
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

            <S.Field
                placeholder="Confirme sua Senha"
                secureTextEntry={true}
                value={password_confirm}
                onChangeText={t=>setPasswordConfirmation(t)}
            />

            <S.ButtonArea onPress={handlerRegisterButton}>
                <S.ButtonText>Cadastre-se</S.ButtonText>
            </S.ButtonArea>

        </S.Container>
    );
}