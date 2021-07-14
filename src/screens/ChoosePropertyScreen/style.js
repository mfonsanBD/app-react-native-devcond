import styled from 'styled-components/native';

export default {
    Container: styled.SafeAreaView`
        flex: 1;
        background-color:#F5F6FA;
    `,
    Scroller: styled.ScrollView`
        flex: 1;
        padding:20px;
    `,
    LoadingIcon: styled.ActivityIndicator``,
    HeaderTitle: styled.Text`
        font-size:22px;
        font-weight:bold;
        color:#495057;
        text-align:center;
    `,
    HeaderSubTitle: styled.Text`
        font-size:15px;
        color:#AAAAAA;
        text-align:center;
    `,
    BigArea: styled.View`
        margin:50px 0;
        align-items:center;
    `,
    ExitButtonArea: styled.TouchableOpacity`
        background-color:#8863E6;
        justify-content:center;
        align-items:center;
        padding:15px;
    `,
    ExitButtonText: styled.Text`
        font-size:15px;
        color:#FFFFFF;
        font-weight:bold;
    `,
    propertyList: styled.View`
        margin:20px 0;
    `,
    ButtonArea: styled.TouchableOpacity`
        background-color: #FFFFFF;
        border: 2px solid #E8E9ED;
        border-radius: 20px;
        padding: 15px;
        align-items: center;
        margin-bottom: 10px;
    `,
    ButtonText: styled.Text`
        font-size:15px;
        color:#495057;
        font-weight:bold;
    `,
}