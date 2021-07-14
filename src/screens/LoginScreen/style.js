import styled from 'styled-components/native';

export default {
    Container: styled.SafeAreaView`
        flex: 1;
        padding:20px;
        background-color:#F5F6FA;
    `,

    Logo: styled.Image`
        width:250px;
        height: 200px;
        margin:0 auto 20px;
    `,

    Field: styled.TextInput`
        border:1px solid #DDDDDD;
        background-color: #FFFFFF;
        border-radius: 5px;
        color: #8863E6;
        font-size: 15px;
        padding:10px;
        margin-bottom:15px;
    `,

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