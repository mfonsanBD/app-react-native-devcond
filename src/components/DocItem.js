import React from 'react';
import { Linking } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components/native';

const Box = styled.TouchableOpacity`
    background-color: #FFFFFF;
    padding: 15px;
    border: 1px solid #E8E9ED;
    margin-bottom: 10px;
    border-radius: 10px;
    flex-direction:row;
    align-items:center;
`;
const Title = styled.Text`
    font-size: 15px;
    color: #495057;
    margin-left:10px;
`;

export default ({data}) => {
    const handlerClick = async () => {
        const supported = await Linking.canOpenURL(data.fileurl);

        if(supported){
            await Linking.openURL(data.fileurl);
        }
    }
    return(
        <Box onPress={handlerClick}>
            <Icon name="file-document-outline" size={30} color="#8B63E7"/>
            <Title>{data.title}</Title>
        </Box>
    );
}