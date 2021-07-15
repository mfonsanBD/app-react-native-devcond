import React, {useState, useEffect} from 'react';
import { useNavigation } from '@react-navigation/native';
import S from './style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {useStateValue} from '../../contexts/StateContext';
import api from '../../services/api';

import DocItem from '../../components/DocItem';

export default () => {
    const navigation = useNavigation();
    const [context, dispatch] = useStateValue();

    const [loading, setLoading] = useState(true);
    const [docList, setDocList] = useState([]);

    useEffect(()=>{
        navigation.setOptions({
            headerTitle: 'Documentos do Condomínio'
        });

        getDocs();
    },[]);

    const getDocs = async () => {
        setDocList([]);
        setLoading(true);
        let result = await api.getDocs();
        setLoading(false);

        if(result.error === ''){
            setDocList(result.list);
        }
        else{
            alert(result.error);
        }
    }
    
    return(
        <S.Container>
            {!loading && docList.length === 0 &&
                <S.NoListArea>
                    <Icon name="alert-outline" size={70} color="#DDDDDD"/>
                    <S.NoListText>Não há documento disponível</S.NoListText>
                </S.NoListArea>
            }

            <S.List
                data={docList}
                onRefresh={getDocs}
                refreshing={loading}
                renderItem={({item})=><DocItem data={item}/>}
                keyExtractor={(item) => item.id.toString()}
            />
        </S.Container>
    );
}