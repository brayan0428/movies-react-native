import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { DrawerContentScrollView } from '@react-navigation/drawer'
import { Drawer, TouchableRipple, Switch, Text } from 'react-native-paper'
import useTheme from '../hooks/useTheme'

export default function DrawerContent({navigation}) {
    const [screen, setScreen] = useState('home')
    const {darkTheme, toggleTheme} = useTheme()

    const onChangeScreen = screen => {
        setScreen(screen)
        navigation.navigate(screen)
    }

    return (
        <DrawerContentScrollView>
            <Drawer.Section>
                <Drawer.Item 
                    label="Home"
                    active={screen === 'Home'}
                    onPress={() => onChangeScreen("Home")}
                />
                <Drawer.Item 
                    label="Peliculas Populares"
                    active={screen === 'Popular'}
                    onPress={() => onChangeScreen("Popular")}
                />
                <Drawer.Item 
                    label="Peliculas Nuevas"
                    active={screen === 'News'}
                    onPress={() => onChangeScreen("News")}
                />
            </Drawer.Section>
            <Drawer.Section title="Opciones">
                <TouchableRipple>
                    <View style={styles.theme}>
                        <Text>Tema oscuro</Text>
                        <Switch value={darkTheme} onValueChange={toggleTheme}/>
                    </View>
                </TouchableRipple>
            </Drawer.Section>
        </DrawerContentScrollView>
    )
}

const styles = StyleSheet.create({
    theme: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 12
    }
})
