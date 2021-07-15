import styled from 'styled-components/native';

export default {
    Container: styled.SafeAreaView`
        flex: 1;
        background-color:#F5F6FA;
        padding: 15px;
    `,
    Scroller: styled.ScrollView``,
    Title: styled.Text`
        font-size: 17px;
        color: #495057;
        margin-bottom:5px;
    `,

    Field: styled.TextInput`
        border:1px solid #DDDDDD;
        background-color: #FFFFFF;
        border-radius: 5px;
        color: #8863E6;
        font-size: 15px;
        padding:10px;
        margin-bottom:20px;
    `,

    PhotoArea: styled.View`
        margin-bottom:20px;
    `,

    PhotoScroll: styled.ScrollView`
        flex:1;
    `,

    PhotoAddButton: styled.TouchableOpacity`
        width:65px;
        height:65px;
        justify-content:center;
        align-items:center;
        border:1px dashed #C4C4C4;
        border-radius:10px;
    `,

    PhotoItem: styled.View`
        width: 65px;
        border:1px solid #C4C4C4;
        border-radius: 5px;
        margin-bottom: 5px;
        margin-left: 5px;
        align-items: center;
    `,

    Photo: styled.Image`
        width: 63px;
        height: 63px;
        border-radius: 5px;
        margin-bottom: 5px;
    `,

    RemovePhoto: styled.TouchableOpacity``,
    
    LoadingIcon: styled.ActivityIndicator``,

    ButtonArea: styled.TouchableOpacity`
        background-color: #8863E6;
        padding:15px;
        justify-content:center;
        align-items:center;
        border-radius: 5px;
        margin-bottom:15px;
    `,

    ButtonText: styled.Text`
        color:#FFFFFF;
        font-size:15px;
        font-weight:bold;
        text-transform:uppercase;
    `,
}