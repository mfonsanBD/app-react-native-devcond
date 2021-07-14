import styled from 'styled-components/native';

export default {
    Container: styled.SafeAreaView`
        flex: 1;
        background-color:#F5F6FA;
        padding: 15px;
    `,
    LoadingIcon: styled.ActivityIndicator``,
    NoListArea: styled.View`
        flex: 1;
        justify-content: center;
        align-items: center;
    `,
    NoListText: styled.Text`
        font-size: 18px;
        color: #DDDDDD;
    `,

    List: styled.FlatList`
        flex: 1;
    `
}