import React, {useEffect} from 'react';
import { useNavigation } from '@react-navigation/native';
import S from './style';

import {useStateValue} from '../../contexts/StateContext';
import api from '../../services/api';

export default () => {
    const navigation = useNavigation();
    const [context, dispatch] = useStateValue();

    useEffect(()=>{
        const checkLogin = async () => {
            let token = await api.getToken();

            if(token){
                let result = await api.validateToken();

                if(result.error === ''){

                    dispatch({
                        type: 'setUser',
                        payload: {
                            user: result.user
                        }
                    });

                    navigation.reset({
                        index: 1,
                        routes: [{name: 'ChoosePropertyScreen'}]
                    });

                }
                else{
                    alert(result.error);

                    dispatch({
                        type: 'setToken',
                        payload: {
                            token: ''
                        }
                    });

                    navigation.reset({
                        index: 1,
                        routes: [{name: 'LoginScreen'}]
                    });
                }
            }
            else{
                navigation.reset({
                    index: 1,
                    routes: [{name: 'LoginScreen'}]
                });
            }
        }

        checkLogin();
    },[]);


    return(
        <S.Container>
            <S.LoadingIcon color="#8863E6" size="large"/>
        </S.Container>
    );
}