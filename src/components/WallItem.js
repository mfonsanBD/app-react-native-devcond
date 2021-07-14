import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components/native';

import api from '../services/api';

const Box = styled.View`
    background-color: #FFFFFF;
    padding: 15px;
    border: 1px solid #E8E9ED;
    margin-bottom: 10px;
    border-radius: 10px;
`;

const HeaderArea = styled.View`
    flex-direction: row;
    align-items: center;
`;
const InfoArea = styled.View`
    margin-left: 10px;
`;
const Title = styled.Text`
    font-size: 15px;
    font-weight: bold;
    color: #495057;
`;
const Date = styled.Text`
    font-size: 15px;
    color: #AAAAAA;
`;

const Body = styled.Text`
    color: #AAAAAA;
    margin: 30px 0;
`;

const FooterArea = styled.View`
    flex-direction: row;
    align-items: center;
`;
const LikeButton = styled.TouchableOpacity``;
const LikeText = styled.Text`
    margin-left: 5px;
    color: #495057;
    font-size: 15px;
`;

export default ({data}) => {
    const [likeCount, setLikeCount] = useState(data.likes);
    const [liked, setLiked] = useState(data.liked);
    
    const handlerLike = async () => {
        setLiked(!liked);
        const result = await api.likeWallPost(data.id);
        if(result.error===''){
            setLikeCount(result.likes);
            setLiked(result.liked);
        }
        else{
            alert(result.error);
        }
    }
    return(
        <Box>
            <HeaderArea>
                <Icon name="newspaper-variant-outline" size={30} color="#8B63E7"/>
                <InfoArea>
                    <Title>{data.title}</Title>
                    <Date>{data.datecreated}</Date>
                </InfoArea>
            </HeaderArea>
            <Body>
                {data.body}
            </Body>
            <FooterArea>
                <LikeButton onPress={handlerLike}>
                    {liked 
                    ?
                        <Icon name="heart" size={20} color="#FF0000"/>
                    :
                        <Icon name="heart-outline" size={20} color="#FF0000"/>
                    }
                </LikeButton>
                <LikeText>{likeCount} pessoa{likeCount === 1?'':'s'} curti{likeCount === 1?'u':'ram'} isso</LikeText>
            </FooterArea>
        </Box>
    );
}