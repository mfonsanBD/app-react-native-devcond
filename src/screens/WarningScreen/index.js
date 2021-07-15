import React, {useState, useEffect} from 'react';
import { useNavigation } from '@react-navigation/native';
import S from './style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {useStateValue} from '../../contexts/StateContext';
import api from '../../services/api';

import WarningItem from '../../components/WarningItem';

export default () => {
    const navigation = useNavigation();
    const [context, dispatch] = useStateValue();

    const [loading, setLoading] = useState(true);
    const [warningList, setWarningList] = useState([]);

    useEffect(()=>{
        navigation.setOptions({
            headerTitle: 'Livro de Ocorrência',
            headerRight: () => (
                <S.AddButton onPress={()=>{navigation.navigate('WarningAddScreen')}}>
                    <Icon name="sticker-plus-outline" size={24} color="#222222"/>
                </S.AddButton>
            )
        });

        getWarnings();
    },[]);

    const getWarnings = async () => {
        setWarningList([]);
        setLoading(true);
        let result = await api.getWarnings();
        setLoading(false);

        if(result.error === ''){
            setWarningList(result.list);
        }
        else{
            alert(result.error);
        }
    }
    
    return(
        <S.Container>
            {!loading && warningList.length === 0 &&
                <S.NoListArea>
                    <Icon name="alert-outline" size={70} color="#DDDDDD"/>
                    <S.NoListText>Não há ocorrências.</S.NoListText>
                </S.NoListArea>
            }

            <S.List
                data={warningList}
                onRefresh={getWarnings}
                refreshing={loading}
                renderItem={({item})=><WarningItem data={item}/>}
                keyExtractor={(item) => item.id.toString()}
            />
        </S.Container>
    );
}