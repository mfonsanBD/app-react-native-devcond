import React, {useState, useEffect} from 'react';
import { useNavigation } from '@react-navigation/native';
import S from './style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {useStateValue} from '../../contexts/StateContext';
import api from '../../services/api';

import BilletItem from '../../components/BilletItem';

export default () => {
    const navigation = useNavigation();
    const [context, dispatch] = useStateValue();

    const [loading, setLoading] = useState(true);
    const [billetList, setBilletList] = useState([]);

    useEffect(()=>{
        navigation.setOptions({
            headerTitle: 'Boletos'
        });

        getBillets();
    },[]);

    const getBillets = async () => {
        setBilletList([]);
        setLoading(true);
        let result = await api.getBillets();
        setLoading(false);

        if(result.error === ''){
            setBilletList(result.list);
        }
        else{
            alert(result.error);
        }
    }
    
    return(
        <S.Container>
            {!loading && billetList.length === 0 &&
                <S.NoListArea>
                    <Icon name="alert-outline" size={70} color="#DDDDDD"/>
                    <S.NoListText>Não há boleto disponível desta unidade.</S.NoListText>
                </S.NoListArea>
            }

            <S.List
                data={billetList}
                onRefresh={getBillets}
                refreshing={loading}
                renderItem={({item})=><BilletItem data={item}/>}
                keyExtractor={(item) => item.id.toString()}
            />
        </S.Container>
    );
}