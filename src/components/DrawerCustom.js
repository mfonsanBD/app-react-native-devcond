import React from 'react';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { useStateValue } from '../contexts/StateContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../services/api';

const DrawerArea = styled.View`
    flex: 1;
    background-color: #FFFFFF;
`;

const DrawerLogoArea = styled.View`
    padding:10px 20px;
    border-bottom-color: #EEEEEE;
    border-bottom-width: 1px;
`;
const DrawerLogo = styled.Image`
    width: 190px;
    height: 40px;
`;
const DrawerScroller = styled.ScrollView`
    flex: 1;
    margin: 20px 0;
`;
const ChangeUnitArea = styled.View`
    margin: 10px;
`;
const ChangeUnitButton = styled.TouchableOpacity`
    background-color: #8863E6;
    padding: 15px;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
`;
const ChangeUnitButtonText = styled.Text`
    color: #FFFFFF;
    font-size: 15px;
    font-weight: bold;
`;
const FooterArea = styled.View`
    padding: 15px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;
const FooterInfo = styled.View``;
const FooterProfile = styled.Text`
    font-size: 15px;
    font-weight: bold;
    color: #495057;
`;
const FooterUnitText = styled.Text`
    font-size: 15px;
    color: #AAAAAA;
`;
const FooterUnitButton = styled.TouchableOpacity``;

const MenuButton = styled.TouchableOpacity`
    flex-direction: row;
    height: 40px;
    margin:0 10px;
    padding-left: 10px;
    align-items: center;
    margin-bottom: 10px;
    border-radius: 5px;
    background-color: ${props=>props.active ? '#8863E6': 'transparent'};
`;
const MenuButtonText = styled.Text`
    font-size: 15px;
    margin-left: 10px;
    color: ${props=>props.active ? '#FFFFFF': '#666E78'};
`;

export default (props) => {
    const navigation = useNavigation();
    const [context, dispatch] = useStateValue();

    const menus = [
        {title: 'Mural de Avisos', icon: 'information-outline', screen: 'WallScreen'},
        {title: 'Documentos', icon: 'file-document-outline', screen: 'DocumentScreen'},
        {title: 'Reservas', icon: 'calendar-month-outline', screen: 'ReservationScreen'},
        {title: 'Livro de Ocorrências', icon: 'sticker-alert-outline', screen: 'WarningScreen'},
        {title: 'Achados e Perdidos', icon: 'text-search', screen: 'FoundAndLostScreen'},
        {title: 'Boletos', icon: 'text-box-outline', screen: 'BilletScreen'},
        {title: 'Perfil', icon: 'account-outline', screen: 'ProfileScreen'}
    ];

    const handlerLogoutButton = async () => {
        await api.logout();
        navigation.reset({
            index: 1,
            routes: [{name: 'LoginScreen'}]
        });
    }

    const handlerChangeUnit = async () => {
        await AsyncStorage.removeItem('property');
        navigation.reset({
            index: 1,
            routes: [{name: 'ChoosePropertyScreen'}]
        });
    }

    return(
        <DrawerArea>
            <DrawerLogoArea>
                <DrawerLogo source={require('../assets/homelogo.png')} resize="contain"/>
            </DrawerLogoArea>

            <FooterArea>
                <FooterInfo>
                    <FooterProfile>Olá, {context.user.user.name}</FooterProfile>
                    <FooterUnitText>{context.user.property.name}</FooterUnitText>
                </FooterInfo>
                <FooterUnitButton onPress={()=>navigation.navigate('UnitScreen')}>
                    <Icon name="cog-outline" size={24} color="#666E78"/>
                </FooterUnitButton>
            </FooterArea>

            <DrawerScroller>
                {menus.map((menu, index)=>{
                    return(
                        <MenuButton key={index} onPress={()=>navigation.navigate(menu.screen)} active={props.state.routes[props.state.index].name === menu.screen}>
                            <Icon 
                                name={menu.icon} 
                                size={20} 
                                color={props.state.routes[props.state.index].name === menu.screen ? '#FFFFFF' : '#666E78'}/>
                            <MenuButtonText
                                active={props.state.routes[props.state.index].name === menu.screen}
                            >{menu.title}</MenuButtonText>
                        </MenuButton>
                    )
                })}
                <MenuButton onPress={handlerLogoutButton}>
                    <Icon name="power" size={20} color={'#666E78'}/>
                    <MenuButtonText>Sair</MenuButtonText>
                </MenuButton>
            </DrawerScroller>

            <ChangeUnitArea>
                <ChangeUnitButton onPress={handlerChangeUnit}>
                    <ChangeUnitButtonText>Trocar Propriedade</ChangeUnitButtonText>
                </ChangeUnitButton>
            </ChangeUnitArea>
        </DrawerArea>
    );
}