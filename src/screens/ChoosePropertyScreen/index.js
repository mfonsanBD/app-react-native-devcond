import React, {useState, useEffect} from 'react';
import { useNavigation } from '@react-navigation/native';
import S from './style';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {useStateValue} from '../../contexts/StateContext';
import api from '../../services/api';

export default () => {
    const navigation = useNavigation();
    const [context, dispatch] = useStateValue();

    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const checkPropertySelected = async () => {
            let property = await AsyncStorage.getItem('property');

            if(property){
                property = JSON.parse(property);
                await chooseProperty(property);
            }

            setLoading(false);
        }
        checkPropertySelected();
    }, []);

    const handlerLogoutButton = async () => {
        await api.logout();
        navigation.reset({
            index: 1,
            routes: [{name: 'LoginScreen'}]
        });
    }

    const chooseProperty = async (property) => {
        await AsyncStorage.setItem('property', JSON.stringify(property));
        dispatch({type: 'setProperty', payload: {property}});
        navigation.reset({index: 1, routes: [{name: 'MainDrawer'}] });
    }
    
    return(
        <S.Container>
            <S.Scroller>
                {loading &&
                    <S.LoadingIcon color="#8863E6" size="large"/>
                }

                {!loading && context.user.user.properties.length > 0 &&
                    <>
                        <S.HeaderTitle>Olá, {context.user.user.name}</S.HeaderTitle>
                        <S.HeaderSubTitle>Escolha uma das suas propriedades abaixo:</S.HeaderSubTitle>

                        <S.propertyList>
                            {context.user.user.properties.map((item, index)=>(
                                <S.ButtonArea key={index} onPress={()=>{chooseProperty(item)}}>
                                    <S.ButtonText>{item.name}</S.ButtonText>
                                </S.ButtonArea>
                            ))}
                        </S.propertyList>
                    </>
                }

                {!loading && context.user.user.properties.length <= 0 &&
                    <S.BigArea>
                        <S.HeaderTitle>Parabéns pelo cadastro, {context.user.user.name}!</S.HeaderTitle>
                        <S.HeaderSubTitle>Agora a administração precisa liberar seu acesso.</S.HeaderSubTitle>
                    </S.BigArea>
                }
            </S.Scroller>
            <S.ExitButtonArea onPress={handlerLogoutButton}>
                <S.ExitButtonText>Sair</S.ExitButtonText>
            </S.ExitButtonArea>
        </S.Container>
    );
}