import React, { useState } from 'react';
import { Modal } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components/native';

const Box = styled.View`
    background-color: #FFFFFF;
    padding: 15px;
    border: 1px solid #E8E9ED;
    margin-bottom: 10px;
    border-radius: 10px;
`;
const Date = styled.Text`
    font-size: 15px;
    color: #AAAAAA;
`;
const Title = styled.Text`
    font-size: 15px;
    color: #495057;
    font-weight:bold;
`;
const StatusArea = styled.View`
    width:50%;
    flex-direction:row;
    align-items:center;
    margin:10px 0;
    background: ${props=>props.status === 'IN_REVIEW' ? '#FFC107': '#198754'};
    padding:5px;
    border-radius:5px;
`;
const StatusText = styled.Text`
    color: ${props=>props.status === 'IN_REVIEW' ? '#212529': '#FFFFFF'};
    margin-left:5px;
    text-transform:uppercase;
`;

const PhotoArea = styled.View`
    flex-direction:row;
`;
const PhotoItem = styled.TouchableOpacity`
    margin-right:5px;
`;
const PhotoImage = styled.Image`
    width:50px;
    height: 50px;
    border-radius:5px;
`;

const ModalArea = styled.View`
    flex: 1;
    background-color:rgba(0, 0, 0, 0.85);
`;

const ModalImage = styled.Image`
    flex: 1;
`;

const ModalCloseButton = styled.TouchableOpacity`
    width: 70px;
    height: 70px;
    background-color:rgba(125, 125, 125, 0.75);
    position: absolute;
    bottom: 40px;
    left:41%;
    border-radius:35px;
    justify-content:center;
    align-items:center;
`;

export default ({data}) => {
    const [showModal, setShowModal] = useState(false);
    const [modalImage, setModalImage] = useState('');

    const openModal = (img) => {
        setModalImage(img);
        setShowModal(true);
    }

    return(
        <Box>
            <Date>{data.datecreated}</Date>
            <Title>{data.title}</Title>

            <StatusArea status={data.status}>
                <Icon name="inbox" size={24} color={data.status === 'IN_REVIEW' ? '#212529' : '#FFFFFF'}/>
                <StatusText status={data.status}>{data.status === 'IN_REVIEW' ? 'Caso em Análise' : 'Caso Resolvido'}</StatusText>                    
            </StatusArea>

            {data.photos.length > 0 &&
                <PhotoArea>
                    {data.photos.map((photo, index)=>(
                        <PhotoItem key={index} onPress={()=>openModal(photo)}>
                            <PhotoImage source={{uri:photo}} resizeMode="cover"/>
                        </PhotoItem>
                    ))}
                </PhotoArea>
            }

            <Modal
                animationType="fade"
                transparent={true}
                visible={showModal}
                onRequestClose={()=>setShowModal(false)}
            >
                <ModalArea>
                    <ModalImage source={{uri: modalImage}} resizeMode="contain"/>
                        <ModalCloseButton onPress={()=>setShowModal(false)}>
                            <Icon name="close-thick" size={30} color="#FFFFFF"/>
                        </ModalCloseButton>
                </ModalArea>
            </Modal>
        </Box>
    );
}