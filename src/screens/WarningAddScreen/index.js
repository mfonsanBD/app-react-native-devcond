import React, {useState, useEffect} from 'react';
import { useNavigation } from '@react-navigation/native';
import { launchCamera } from 'react-native-image-picker';
import S from './style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {useStateValue} from '../../contexts/StateContext';
import api from '../../services/api';

export default () => {
    const navigation = useNavigation();
    const [context, dispatch] = useStateValue();

    const [warning, setWarning] = useState('');
    const [photoList, setPhotoList] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        navigation.setOptions({
            headerTitle: 'Adicionar uma Ocorrência'
        });
    },[]);

    const handleAddPhoto = async () => {
        launchCamera({
            mediaType: 'photo',
            maxWidth: 1280
        }, async (response) => {
            if(!response.didCancel){
                setLoading(true);
                let result = await api.addWarningFile(response['assets'][0]);
                setLoading(false);

                if(result.error === ''){
                    let list = [...photoList];
                    list.push(result.photo);
                    setPhotoList(list);
                }
                else{
                    alert(result.error);
                }
            }
        });
    }

    const handleDeletePhoto = (url) => {
        let list = [...photoList];
        list = list.filter(value=>value!==url);
        setPhotoList(list);
    }

    const handleSaveWarning = async () => {
        if(warning === ''){
            alert("A descrição da Ocorrência é obrigatória.");
        }
    }
    
    return(
        <S.Container>
            <S.Scroller>
                <S.Title>Descreva sua Ocorrência:</S.Title>
                <S.Field
                    placeholder="Ex.: Vizinho está com o som alto"
                    value={warning}
                    onChangeText={t=>setWarning(t)}
                />

                <S.Title>Fotos Relacionadas:</S.Title>
                <S.PhotoArea>
                    <S.PhotoScroll horizontal={true}>
                        <S.PhotoAddButton onPress={handleAddPhoto}>
                            <Icon name="camera-plus-outline" size={30} color="#C4C4C4"/>
                        </S.PhotoAddButton>

                        {photoList.map((photo, index)=>(
                            <S.PhotoItem key={index}>
                                <S.Photo source={{uri:photo}}/>
                                <S.RemovePhoto onPress={()=>handleDeletePhoto(photo)}>
                                    <Icon name="close-thick" size={30} color="#C4C4C4"/>
                                </S.RemovePhoto>
                            </S.PhotoItem>
                        ))}
                    </S.PhotoScroll>
                </S.PhotoArea>

                {loading &&
                    <S.LoadingIcon color="#8863E6" size="large"/>
                }

                <S.ButtonArea onPress={handleSaveWarning}>
                    <S.ButtonText>Salvar Ocorrência</S.ButtonText>
                </S.ButtonArea>
            </S.Scroller>
        </S.Container>
    );
}