import React, { useState, useEffect } from 'react'
import {
    FlatList,
    Button,
    TextInput,
    Text,
    View,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    Image,
    ToastAndroid
} from 'react-native'
import * as Clipboard from 'expo-clipboard'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AntDesign } from '@expo/vector-icons'
import user from './assets/user.json'
import AsyncStorage from '@react-native-async-storage/async-storage'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import Geocoder from 'react-native-geocoding'

Geocoder.init('AIzaSyAGu6Ur-d2HArEIs07yxs9iVPsdwIWquxk')

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()
//Hello professor, We are really sorry that this code is a bit messy because it was jointly by three teammates. For your convenience in reviewing, we have written some annotations.
let abig = [
    require('./assets/a-BigWestern.png'),
    require('./assets/a-BigChinese.png'),
    require('./assets/a-BigRihan.png'),
]

let afast = [
    require('./assets/a-FastWestern.png'),
    require('./assets/a-FastChinese.png'),
    require('./assets/a-FastRihan.png'),
]

let bbig = {
    0: require('./assets/b-b-w1.png'),
    1: require('./assets/b-b-w2.png'),
    2: require('./assets/b-b-w3.png'),
    3: require('./assets/b-b-w2.png'),
    4: require('./assets/b-b-w3.png'),
    10: require('./assets/b-b-c1.png'),
    11: require('./assets/b-b-c2.png'),
    12: require('./assets/b-b-c3.png'),
    13: require('./assets/b-b-c4.png'),
    14: require('./assets/b-b-c5.png'),
    20: require('./assets/b-b-j1.png'),
    21: require('./assets/b-b-j2.png'),
    22: require('./assets/b-b-j3.png'),
    23: require('./assets/b-b-j4.png'),
    24: require('./assets/b-b-j1.png'),
}

let bfast = {
    0: require('./assets/b-f-w1.png'),
    1: require('./assets/b-f-w2.png'),
    2: require('./assets/b-f-w3.png'),
    3: require('./assets/b-f-w4.png'),
    10: require('./assets/b-f-c1.png'),
    11: require('./assets/b-f-c2.png'),
    12: require('./assets/b-f-c3.png'),
    13: require('./assets/b-f-c4.png'),
    20: require('./assets/b-f-j1.png'),
    21: require('./assets/b-f-j2.png'),
    22: require('./assets/b-f-j3.png'),
    23: require('./assets/b-f-j4.png'),
}

let cbig = {
    0: require('./assets/c-b-w1.png'),
    1: require('./assets/c-b-w2.png'),
    2: require('./assets/c-b-w3.png'),
    3: require('./assets/c-b-w2.png'),
    4: require('./assets/c-b-w3.png'),
    10: require('./assets/c-b-c1.png'),
    11: require('./assets/c-b-c2.png'),
    12: require('./assets/c-b-c3.png'),
    13: require('./assets/c-b-c4.png'),
    14: require('./assets/c-b-c5.png'),
    20: require('./assets/c-b-j1.png'),
    21: require('./assets/c-b-j2.png'),
    22: require('./assets/c-b-j3.png'),
    23: require('./assets/c-b-j4.png'),
    24: require('./assets/c-b-j1.png'),
}

let cfast = {
    0: require('./assets/c-f-w1.png'),
    1: require('./assets/c-f-w2.png'),
    2: require('./assets/c-f-w3.png'),
    3: require('./assets/c-f-w4.png'),
    10: require('./assets/c-f-c1.png'),
    11: require('./assets/c-f-c2.png'),
    12: require('./assets/c-f-c3.png'),
    13: require('./assets/c-f-c4.png'),
    20: require('./assets/c-f-j1.png'),
    21: require('./assets/c-f-j2.png'),
    22: require('./assets/c-f-j3.png'),
    23: require('./assets/c-f-j4.png'),
}

let d = {
    [require('./assets/b-b-w1.png')]: 'Italian Style',
    [require('./assets/b-b-w2.png')]: 'Russian Style',
    [require('./assets/b-b-w3.png')]: 'American Style',
    [require('./assets/b-b-c1.png')]: 'Sichuan Hunan Cuisine',
    [require('./assets/b-b-c2.png')]: 'Huaiyang Cuisine',
    [require('./assets/b-b-c3.png')]: 'Tin Foil Grilled Fish',
    [require('./assets/b-b-c4.png')]: 'Shaanxi Cuisine',
    [require('./assets/b-b-c5.png')]: 'Hot Pot',
    [require('./assets/b-b-j1.png')]: 'Korean-style barbecue',
    [require('./assets/b-b-j2.png')]: 'Budae jjigae',
    [require('./assets/b-b-j3.png')]: 'Sukiyaki',
    [require('./assets/b-b-j4.png')]: 'Sashimi',
    [require('./assets/b-f-w1.png')]: 'Hamburger',
    [require('./assets/b-f-w2.png')]: 'Pastries',
    [require('./assets/b-f-w3.png')]: 'Pizza',
    [require('./assets/b-f-w4.png')]: 'Fried food',
    [require('./assets/b-f-c1.png')]: 'Box Lunch',
    [require('./assets/b-f-c2.png')]: 'Braised chicken',
    [require('./assets/b-f-c3.png')]: 'Chongqing noodles',
    [require('./assets/b-f-c4.png')]: 'Rice noodles',
    [require('./assets/b-f-j1.png')]: 'Sushi',
    [require('./assets/b-f-j2.png')]: 'Bibimbap',
    [require('./assets/b-f-j3.png')]: 'Turkey Noodles',
    [require('./assets/b-f-j4.png')]: 'Oden',
}
let e = {
    [require('./assets/b-b-w1.png')]: '雁塔区朱雀南路',
    [require('./assets/b-b-w2.png')]: '西安永宁门',
    [require('./assets/b-b-w3.png')]: '雁塔区唐延路',
    [require('./assets/b-b-c1.png')]: '未央区沣东新城昆明路',
    [require('./assets/b-b-c2.png')]: '西安唯实路',
    [require('./assets/b-b-c3.png')]: '未央区渭滨路',
    [require('./assets/b-b-c4.png')]: '西安银泰城',
    [require('./assets/b-b-c5.png')]: '碑林区长安路',
    [require('./assets/b-b-j1.png')]: '未央区沣东新城昆明路',
    [require('./assets/b-b-j2.png')]: '小寨西路',
    [require('./assets/b-b-j3.png')]: '雁塔区慈恩西路',
    [require('./assets/b-b-j4.png')]: '碑林区朱雀门',
    [require('./assets/b-f-w1.png')]: '陕西省咸阳市秦都区励志东路',
    [require('./assets/b-f-w2.png')]: '小寨西路',
    [require('./assets/b-f-w3.png')]: '陕西省咸阳市秦都区励志东路',
    [require('./assets/b-f-w4.png')]: '雁塔区雁塔路',
    [require('./assets/b-f-c1.png')]: '西安新城区解放路',
    [require('./assets/b-f-c2.png')]: '陕西省咸阳市秦都区励志东路',
    [require('./assets/b-f-c3.png')]: '西安长安路',
    [require('./assets/b-f-c4.png')]: '未央区沣东新城昆明路',
    [require('./assets/b-f-j1.png')]: '新城区长乐西路',
    [require('./assets/b-f-j2.png')]: '碑林区南关正街',
    [require('./assets/b-f-j3.png')]: '长安区西长安路',
    [require('./assets/b-f-j4.png')]: '碑林区骡马市步行街'
}
let f = 0
//We have placed the image addresses of three card drawing stages into six arrays (three for fast food and three for Big Meals) for random selection
var randomabig
var randomafast
var randombbig
var randombfast
//Four random number variables
function HomeStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: 'black',
                },
                headerTitleAlign: 'center',
                headerTitleStyle: {
                    fontSize: 25,
                    color: 'white',
                    fontWeight: 'bold'
                }
            }}
        >
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{ title: 'WHAT TO EAT' }}
            />
            <Stack.Screen
                name="BigCardchoose"
                component={BigCardchooseScreen}
                options={{ title: 'WHAT TO EAT' }}
            />
            <Stack.Screen
                name="BigCardchoosen"
                component={BigCardchoosenScreen}
                options={{ title: 'WHAT TO EAT' }}
            />
            <Stack.Screen
                name="BigCardchoose2"
                component={BigCardchoose2Screen}
                options={{ title: 'WHAT TO EAT' }}
            />
            <Stack.Screen
                name="BigCardchoosen2"
                component={BigCardchoosen2Screen}
                options={{ title: 'WHAT TO EAT' }}
            />
            <Stack.Screen
                name="FastCardchoose"
                component={FastCardchooseScreen}
                options={{ title: 'WHAT TO EAT' }}
            />
            <Stack.Screen
                name="FastCardchoosen"
                component={FastCardchoosenScreen}
                options={{ title: 'WHAT TO EAT' }}
            />
            <Stack.Screen
                name="FastCardchoose2"
                component={FastCardchoose2Screen}
                options={{ title: 'WHAT TO EAT' }}
            />
            <Stack.Screen
                name="FastCardchoosen2"
                component={FastCardchoosen2Screen}
                options={{ title: 'WHAT TO EAT' }}
            />
            <Stack.Screen
                name="Bigrestaurant"
                component={BigRestaurantScreen}
                options={{ title: 'WHAT TO EAT' }}
            />
            <Stack.Screen
                name="Fastrestaurant"
                component={FastRestaurantScreen}
                options={{ title: 'WHAT TO EAT' }}
            />
        </Stack.Navigator>
    )
}
function HistoryStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: 'black',
                },
                headerTitleAlign: 'center',
                headerTitleStyle: {
                    fontSize: 25,
                    color: 'white',
                    fontWeight: 'bold'
                }
            }}
        >
            <Stack.Screen
                name="History"
                component={HistoryScreen}
                options={{ title: 'HISTORY' }}
            />
            <Stack.Screen name="Details" component={DetailsScreen} />
        </Stack.Navigator>
    )
}
function UserStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: 'black',
                },
                headerTitleAlign: 'center',
                headerTitleStyle: {
                    fontSize: 25,
                    color: 'white',
                    fontWeight: 'bold'
                }
            }}
        >
            <Stack.Screen
                name="User"
                component={UserScreen}
                options={{ title: 'USER' }}
            />
            <Stack.Screen name="Details" component={UserScreen} />
        </Stack.Navigator>
    )
}
//Initialized Stack Navigation
function MyTabs() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarStyle: {
                    backgroundColor: '#FCF5E2',
                },
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName
                    if (route.name === 'HomeTab') {
                        iconName = 'home'
                    } else if (route.name === 'historyTab') {
                        iconName = 'barschart'
                    } else if (route.name === 'UserTab') {
                        iconName = 'user'
                    } else if (route.name === 'MapTab') {
                        iconName = 'enviromento'
                    }
                    return <AntDesign name={iconName} size={size} color={color} />
                },
                tabBarActiveTintColor: 'black',
                tabBarInactiveTintColor: '#BDBBBB',
            })}>
            <Tab.Screen
                name="HomeTab"
                component={HomeStack}
                options={{ title: 'Home' }}
            />

            <Tab.Screen
                name="historyTab"
                component={HistoryStack}
                options={{ title: 'History' }}
            />
            <Tab.Screen
                name="MapTab"
                component={MapScreen}
                options={{ title: 'Map' }}
            />
            <Tab.Screen
                name="UserTab"
                component={UserStack}
                options={{ title: 'User' }}
            />
        </Tab.Navigator>
    )
}
const HomeScreen = ({ navigation }) => (
    <View style={styles.container}>
        <View style={styles.space}>
        </View>
        <View style={styles.container2}>
            <Text style={styles.initialwords}>What to eat</Text>
            <Text style={styles.initialwords}>today</Text>
        </View>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Image style={styles.cat} source={require('/assets/cat.png')} />
        </View>
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    navigation.navigate('FastCardchoose');
                    randomabig = -1;
                    randomafast = -1;
                    randombbig = -1;
                    randombfast = -1
                }}
            >
                <Text style={styles.buttonText}>Fast food</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    navigation.navigate('BigCardchoose');
                    randomabig = -1;
                    randomafast = -1;
                    randombbig = -1;
                    randombfast = -1
                }}
            //Clear the last card draw by setting the original random number to -1 after clicking any of the buttons, to avoid problems with the history page import
            >
                <Text style={styles.buttonText}>Big meal</Text>
            </TouchableOpacity>
        </View>
    </View>
);
//Initial page, used for selecting major cuisines
const Useless = ({ route, navigation }) => (
    <View style={styles.cardpage}>
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('BigCardchoosen')}>
            <Image
                style={styles.card}
                source={require('./assets/a-BigWestern.png')}
            />
        </TouchableOpacity>
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('BigCardchoosen')}>
            <Image
                style={styles.card}
                source={require('./assets/a-BigChinese.png')}
            />
            <Image style={styles.card} source={require('./assets/c-b-w1.png')} />
            <Image style={styles.card} source={require('./assets/c-b-w2.png')} />
            <Image style={styles.card} source={require('./assets/c-b-w3.png')} />
            <Image style={styles.card} source={require('./assets/c-b-c1.png')} />
            <Image style={styles.card} source={require('./assets/c-b-c2.png')} />
            <Image style={styles.card} source={require('./assets/c-b-c3.png')} />
            <Image style={styles.card} source={require('./assets/c-b-c4.png')} />
            <Image style={styles.card} source={require('./assets/c-b-c5.png')} />
            <Image style={styles.card} source={require('./assets/c-f-w1.png')} />
            <Image style={styles.card} source={require('./assets/c-f-w2.png')} />
            <Image style={styles.card} source={require('./assets/c-f-w3.png')} />
            <Image style={styles.card} source={require('./assets/c-f-c1.png')} />
            <Image style={styles.card} source={require('./assets/c-f-c2.png')} />
            <Image style={styles.card} source={require('./assets/c-f-c3.png')} />
            <Image style={styles.card} source={require('./assets/c-f-c4.png')} />
            <Image style={styles.card} source={require('./assets/c-f-w4.png')} />
            <Image style={styles.card} source={require('./assets/c-b-w1.png')} />
            <Image style={styles.card} source={require('./assets/c-b-w2.png')} />
            <Image style={styles.card} source={require('./assets/c-b-w3.png')} />
            <Image style={styles.card} source={require('./assets/c-b-c1.png')} />
            <Image style={styles.card} source={require('./assets/c-b-c2.png')} />
            <Image style={styles.card} source={require('./assets/c-b-c3.png')} />
            <Image style={styles.card} source={require('./assets/c-b-c4.png')} />
            <Image style={styles.card} source={require('./assets/c-b-c5.png')} />
            <Image style={styles.card} source={require('./assets/c-f-w1.png')} />
            <Image style={styles.card} source={require('./assets/c-f-w2.png')} />
            <Image style={styles.card} source={require('./assets/c-f-w3.png')} />
            <Image style={styles.card} source={require('./assets/c-f-c1.png')} />
            <Image style={styles.card} source={require('./assets/c-f-c2.png')} />
            <Image style={styles.card} source={require('./assets/c-f-c3.png')} />
            <Image style={styles.card} source={require('./assets/c-f-c4.png')} />
            <Image style={styles.card} source={require('./assets/c-f-w4.png')} />
            <Image style={styles.card} source={require('./assets/b-b-j1.png')} />
            <Image style={styles.card} source={require('./assets/b-b-j2.png')} />
            <Image style={styles.card} source={require('./assets/b-b-j3.png')} />
            <Image style={styles.card} source={require('./assets/b-b-j4.png')} />
            <Image style={styles.card} source={require('./assets/b-f-j1.png')} />
            <Image style={styles.card} source={require('./assets/b-f-j2.png')} />
            <Image style={styles.card} source={require('./assets/b-f-j3.png')} />
            <Image style={styles.card} source={require('./assets/b-f-j4.png')} />
        </TouchableOpacity>
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('BigCardchoosen')}>
            <Image style={styles.card} source={require('./assets/a-BigRihan.png')} />
        </TouchableOpacity>
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('BigCardchoosen')}>
            <Image
                style={styles.card}
                source={require('./assets/a-FastWestern.png')}
            />
        </TouchableOpacity>
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('BigCardchoosen')}>
            <Image
                style={styles.card}
                source={require('./assets/a-FastChinese.png')}
            />
        </TouchableOpacity>
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('BigCardchoosen')}>
            <Image style={styles.card} source={require('./assets/a-FastRihan.png')} />
        </TouchableOpacity>
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('BigCardchoosen')}>
            <Image style={styles.card} source={require('./assets/greencard.png')} />
            <Image style={styles.card} source={require('./assets/c-b-j1.png')} />
            <Image style={styles.card} source={require('./assets/c-b-j2.png')} />
            <Image style={styles.card} source={require('./assets/c-b-j3.png')} />
            <Image style={styles.card} source={require('./assets/c-b-j4.png')} />
            <Image style={styles.card} source={require('./assets/c-f-j1.png')} />
            <Image style={styles.card} source={require('./assets/c-f-j2.png')} />
            <Image style={styles.card} source={require('./assets/c-f-j3.png')} />
            <Image style={styles.card} source={require('./assets/c-f-j4.png')} />
        </TouchableOpacity>
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('BigCardchoosen')}>
            <Image style={styles.card} source={require('./assets/b-b-w1.png')} />
            <Image style={styles.card} source={require('./assets/b-b-w2.png')} />
            <Image style={styles.card} source={require('./assets/b-b-w3.png')} />
            <Image style={styles.card} source={require('./assets/b-b-c1.png')} />
            <Image style={styles.card} source={require('./assets/b-b-c2.png')} />
            <Image style={styles.card} source={require('./assets/b-b-c3.png')} />
            <Image style={styles.card} source={require('./assets/b-b-c4.png')} />
            <Image style={styles.card} source={require('./assets/b-b-c5.png')} />
            <Image style={styles.card} source={require('./assets/b-f-w1.png')} />
            <Image style={styles.card} source={require('./assets/b-f-w2.png')} />
            <Image style={styles.card} source={require('./assets/b-f-w3.png')} />
            <Image style={styles.card} source={require('./assets/b-f-c1.png')} />
            <Image style={styles.card} source={require('./assets/b-f-c2.png')} />
            <Image style={styles.card} source={require('./assets/b-f-c3.png')} />
            <Image style={styles.card} source={require('./assets/b-f-c4.png')} />
            <Image style={styles.card} source={require('./assets/b-f-w4.png')} />
            <Image style={styles.card} source={require('./assets/c-b-w1.png')} />
            <Image style={styles.card} source={require('./assets/c-b-w2.png')} />
            <Image style={styles.card} source={require('./assets/c-b-w3.png')} />
            <Image style={styles.card} source={require('./assets/c-b-c1.png')} />
            <Image style={styles.card} source={require('./assets/c-b-c2.png')} />
            <Image style={styles.card} source={require('./assets/c-b-c3.png')} />
            <Image style={styles.card} source={require('./assets/c-b-c4.png')} />
            <Image style={styles.card} source={require('./assets/c-b-c5.png')} />
            <Image style={styles.card} source={require('./assets/c-f-w1.png')} />
            <Image style={styles.card} source={require('./assets/c-f-w2.png')} />
            <Image style={styles.card} source={require('./assets/c-f-w3.png')} />
            <Image style={styles.card} source={require('./assets/c-f-c1.png')} />
            <Image style={styles.card} source={require('./assets/c-f-c2.png')} />
            <Image style={styles.card} source={require('./assets/c-f-c3.png')} />
            <Image style={styles.card} source={require('./assets/c-f-c4.png')} />
            <Image style={styles.card} source={require('./assets/c-f-w4.png')} />
        </TouchableOpacity>
        <Text style={styles.cardchoooseText}>Choose a card</Text>
    </View>
)
//This paragraph is not displayed on any page, and it is kept only because we found during testing that if we do not first call up the image addresses placed in the Array somewhere, they cannot be used on the web version of Expo.
const BigCardchooseScreen = ({ route, navigation }) => (
    <View style={styles.cardpagemain}>
        <View style={styles.cardpagesmall}></View>
        <View style={styles.cardpagebigtp}>
            <TouchableOpacity
                style={styles.card}
                onPress={() => navigation.navigate('BigCardchoosen')}>
                <Image style={styles.card} source={require('./assets/greencard.png')} />
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.card}
                onPress={() => navigation.navigate('BigCardchoosen')}>
                <Image style={styles.card} source={require('./assets/greencard.png')} />
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.card}
                onPress={() => navigation.navigate('BigCardchoosen')}>
                <Image style={styles.card} source={require('./assets/greencard.png')} />
            </TouchableOpacity>
        </View>
        <View style={styles.cardpagebigbt}>
            <TouchableOpacity
                style={styles.card}
                onPress={() => navigation.navigate('BigCardchoosen')}>
                <Image style={styles.card} source={require('./assets/greencard.png')} />
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.card}
                onPress={() => navigation.navigate('BigCardchoosen')}>
                <Image style={styles.card} source={require('./assets/greencard.png')} />
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.card}
                onPress={() => navigation.navigate('BigCardchoosen')}>
                <Image style={styles.card} source={require('./assets/greencard.png')} />
            </TouchableOpacity>
        </View>
        <View style={styles.cardpagetext}>
            <Text style={styles.cardchoooseText}>Choose a Card</Text>
        </View>
    </View>
)
//The first card drawing page of Big Meal

const BigCardchoosenScreen = ({ navigation, route }) => (
    <View style={styles.container}>
        <Image
            style={styles.bigcard}
            source={abig[(randomabig = Math.floor(Math.random() * 3))]}
        />
        <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('BigCardchoose2')}>
            <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
    </View>
)
//The first card drawing result page of Big Meal, and also the first place to use random numbers
// In Props Image,it set a random number to display the first random result
const BigCardchoose2Screen = ({ route, navigation }) => (
    <View style={styles.cardpagemain}>
        <View style={styles.cardpagesmall}>
            <Image
                style={{ height: 173 / 1.5, width: 113 / 1.5 }}
                source={abig[randomabig]}
            />
        </View>
        <View style={styles.cardpagebigtp}>
            <TouchableOpacity
                style={styles.card}
                onPress={() => navigation.navigate('BigCardchoosen2')}>
                <Image
                    style={styles.card}
                    source={require('./assets/orangecard.png')}
                />
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.card}
                onPress={() => navigation.navigate('BigCardchoosen2')}>
                <Image
                    style={styles.card}
                    source={require('./assets/orangecard.png')}
                />
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.card}
                onPress={() => navigation.navigate('BigCardchoosen2')}>
                <Image
                    style={styles.card}
                    source={require('./assets/orangecard.png')}
                />
            </TouchableOpacity>
        </View>
        <View style={styles.cardpagebigbt}>
            <TouchableOpacity
                style={styles.card}
                onPress={() => navigation.navigate('BigCardchoosen2')}>
                <Image
                    style={styles.card}
                    source={require('./assets/orangecard.png')}
                />
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.card}
                onPress={() => navigation.navigate('BigCardchoosen2')}>
                <Image
                    style={styles.card}
                    source={require('./assets/orangecard.png')}
                />
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.card}
                onPress={() => navigation.navigate('BigCardchoosen2')}>
                <Image
                    style={styles.card}
                    source={require('./assets/orangecard.png')}
                />
            </TouchableOpacity>
        </View>
        <View style={styles.cardpagetext}>
            <Text style={styles.cardchooose2Text}>Choose another Card</Text>
        </View>
    </View>
)
//The secound card drawing page of Big Meal
const BigCardchoosen2Screen = ({ navigation, route }) => (
    <View style={styles.container}>
        <Image
            style={styles.bigcard}
            source={
                bbig[randomabig * 10 + (randombbig = Math.floor(Math.random() * 3))]
            }
        />
        <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Bigrestaurant')}>
            <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
    </View>
)
//The secound card drawing result page of Big Meal
//In Props Image, it multiply the first random number by ten to place it in the tens, then perform a second random to place the result in the units, and combine to obtain a random result (For example, 00, 01, 02, and 03 are four Western dishes, while 10, 11, 12, and 13 are four Chinese dishes.)
const FastCardchooseScreen = ({ route, navigation }) => (
    <View style={styles.cardpagemain}>
        <View style={styles.cardpagesmall}></View>
        <View style={styles.cardpagebigtp}>
            <TouchableOpacity
                style={styles.card}
                onPress={() => navigation.navigate('FastCardchoosen')}>
                <Image style={styles.card} source={require('./assets/greencard.png')} />
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.card}
                onPress={() => navigation.navigate('FastCardchoosen')}>
                <Image style={styles.card} source={require('./assets/greencard.png')} />
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.card}
                onPress={() => navigation.navigate('FastCardchoosen')}>
                <Image style={styles.card} source={require('./assets/greencard.png')} />
            </TouchableOpacity>
        </View>
        <View style={styles.cardpagebigbt}>
            <TouchableOpacity
                style={styles.card}
                onPress={() => navigation.navigate('FastCardchoosen')}>
                <Image style={styles.card} source={require('./assets/greencard.png')} />
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.card}
                onPress={() => navigation.navigate('FastCardchoosen')}>
                <Image style={styles.card} source={require('./assets/greencard.png')} />
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.card}
                onPress={() => navigation.navigate('FastCardchoosen')}>
                <Image style={styles.card} source={require('./assets/greencard.png')} />
            </TouchableOpacity>
        </View>
        <View style={styles.cardpagetext}>
            <Text style={styles.cardchoooseText}>Choose a Card</Text>
        </View>
    </View>
)
//The main content of the fast food pages are the same as that of the big meal

const FastCardchoosenScreen = ({ navigation, route }) => (
    <View style={styles.container}>
        <Image
            style={styles.bigcard}
            source={afast[(randomafast = Math.floor(Math.random() * 3))]}
        />
        <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('FastCardchoose2')}>
            <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
    </View>
)
const FastCardchoose2Screen = ({ route, navigation }) => (
    <View style={styles.cardpagemain}>
        <View style={styles.cardpagesmall}>
            <Image
                style={{ height: 173 / 1.5, width: 113 / 1.5 }}
                source={afast[randomafast]}
            />
        </View>
        <View style={styles.cardpagebigtp}>
            <TouchableOpacity
                style={styles.card}
                onPress={() => navigation.navigate('FastCardchoosen2')}>
                <Image
                    style={styles.card}
                    source={require('./assets/orangecard.png')}
                />
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.card}
                onPress={() => navigation.navigate('FastCardchoosen2')}>
                <Image
                    style={styles.card}
                    source={require('./assets/orangecard.png')}
                />
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.card}
                onPress={() => navigation.navigate('FastCardchoosen2')}>
                <Image
                    style={styles.card}
                    source={require('./assets/orangecard.png')}
                />
            </TouchableOpacity>
        </View>
        <View style={styles.cardpagebigbt}>
            <TouchableOpacity
                style={styles.card}
                onPress={() => navigation.navigate('FastCardchoosen2')}>
                <Image
                    style={styles.card}
                    source={require('./assets/orangecard.png')}
                />
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.card}
                onPress={() => navigation.navigate('FastCardchoosen2')}>
                <Image
                    style={styles.card}
                    source={require('./assets/orangecard.png')}
                />
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.card}
                onPress={() => navigation.navigate('FastCardchoosen2')}>
                <Image
                    style={styles.card}
                    source={require('./assets/orangecard.png')}
                />
            </TouchableOpacity>
        </View>
        <View style={styles.cardpagetext}>
            <Text style={styles.cardchooose2Text}>Choose another Card</Text>
        </View>
    </View>
)
const FastCardchoosen2Screen = ({ navigation, route }) => (
    <View style={styles.container}>
        <Image
            style={styles.bigcard}
            source={
                bfast[randomafast * 10 + (randombfast = Math.floor(Math.random() * 3))]
            }
        />
        <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Fastrestaurant')}>
            <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
    </View>
)

const BigRestaurantScreen = ({ navigation, route }) => {
    if (randomabig * 10 + randombbig >= 0) {

        f = bbig[randomabig * 10 + randombbig]
    } else if (randomafast * 10 + randombfast >= 0) {

        f = bfast[randomafast * 10 + randombfast]
    }
    const copyToClipboard = async () => {
        await Clipboard.setStringAsync(e[f]);
    };
    const showToast = () => {
        copyToClipboard();
        ToastAndroid.show('Address Information Copied', ToastAndroid.SHORT);
    };
    return (
        <SafeAreaView style={styles.restaurantpagemain}>
            <View style={styles.cardpagesmall}>
                <Image
                    style={{ height: 173 / 1.5, width: 113 / 1.5 }}
                    source={abig[randomabig]}
                />
                <Image
                    style={{ height: 173 / 1.5, width: 113 / 1.5 }}
                    source={bbig[randomabig * 10 + randombbig]}
                />
            </View>
            <View style={styles.restaurantpageimage}>
                <TouchableOpacity
                    style={styles.restaurantimage}
                    onPress={showToast}
                >
                    <Image style={styles.restaurantimage} source={cbig[randomabig * 10 + randombbig]} />
                </TouchableOpacity>
            </View>
            <View style={styles.RestaurantText}>
                <Text style={styles.RestaurantText}>Tap Image to Copy the Location</Text>
            </View>
            <View style={styles.restaurantpagebutton}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.popToTop()}>
                    <Text style={styles.buttonText}>Back to home</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
} //Recommended page for Big Meal restaurant,display the restaurant based on random results
const FastRestaurantScreen = ({ navigation, route }) => {
    if (randomabig * 10 + randombbig >= 0) {

        f = bbig[randomabig * 10 + randombbig]
    } else if (randomafast * 10 + randombfast >= 0) {

        f = bfast[randomafast * 10 + randombfast]
    }
    const copyToClipboard = async () => {
        await Clipboard.setStringAsync(e[f]);
    };
    const showToast = () => {
        copyToClipboard();
        ToastAndroid.show('Address Information Copied', ToastAndroid.SHORT);
    };
    return (
        <View style={styles.restaurantpagemain}>
            <View style={styles.cardpagesmall}>
                <Image
                    style={{ height: 173 / 1.5, width: 113 / 1.5 }}
                    source={afast[randomafast]}
                />
                <Image
                    style={{ height: 173 / 1.5, width: 113 / 1.5 }}
                    source={bfast[randomafast * 10 + randombfast]}
                />
            </View>
            <View style={styles.restaurantpageimage}>
                <TouchableOpacity
                    style={styles.restaurantimage}
                    onPress={showToast}
                >
                    <Image style={styles.restaurantimage} source={cfast[randomafast * 10 + randombfast]} />
                </TouchableOpacity>
            </View>
            <View style={styles.RestaurantText}>
                <Text style={styles.RestaurantText}>Tap Image to Copy the Location</Text>
            </View>
            <View style={styles.restaurantpagebutton}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.popToTop()}>
                    <Text style={styles.buttonText}>Back to home</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
//Recommended page for Fast Food restaurant.Same as the previous paragraph
const HistoryScreen = ({ navigation }) => {
    const [histories, sethistory] = useState([])
    useEffect(() => {
        loadhistory()
    }, [])
    const loadhistory = async () => {
        try {
            const savedhistory = await AsyncStorage.getItem('histories')
            if (savedhistory) {
                sethistory(JSON.parse(savedhistory))
            }
        } catch (e) {
            console.error('Failed to load history', e)
        }
    }
    //Initialize and load AsyncStorage
    const togglehistory = async () => {
        let updatedhistory
        const now = new Date().toLocaleString()
        if (randomabig * 10 + randombbig >= 0) {
            updatedhistory = [
                ...histories,
                { item: bbig[randomabig * 10 + randombbig], time: now },
            ]
            sethistory(updatedhistory)
            await AsyncStorage.setItem('histories', JSON.stringify(updatedhistory))
            randomabig = -1
            randomafast = -1
            randombbig = -1
            randombfast = -1
        } else if (randomafast * 10 + randombfast >= 0) {
            updatedhistory = [
                ...histories,
                { item: bfast[randomafast * 10 + randombfast], time: now },
            ]
            sethistory(updatedhistory)
            await AsyncStorage.setItem('histories', JSON.stringify(updatedhistory))
            randomabig = -1
            randomafast = -1
            randombbig = -1
            randombfast = -1
        }
        //If there is a history of card draws (random value greater than 0), save it in history and set the random value to -1 after saving to avoid duplicate saves
    }
    //Real time modification and saving of card drawing history through State and AsyncStorage
    const clearHistory = async () => {
        try {
            await AsyncStorage.removeItem('histories')
            sethistory([])
        } catch (e) {
            console.error('Failed to clear history', e)
        }
    }
    //Clear History
    return (
        <View style={styles.historycontainer}>
            <FlatList
                data={[...histories]}
                keyExtractor={(item) => item.item}
                renderItem={({ item }) => (
                    <View style={styles.historyitem}>
                        <Image
                            style={{ height: 173 / 1.5, width: 113 / 1.5 }}
                            source={item.item}
                        />
                        <SafeAreaView style={styles.historyitem3}>
                            <Text style={styles.title}>{d[item.item]}</Text>
                            <Text style={styles.year}>{item.time}</Text>
                        </SafeAreaView>
                    </View>
                )}
            />
            <SafeAreaView style={styles.historyitem2}>
                <TouchableOpacity style={styles.hisbutton} onPress={clearHistory}>
                    <Text style={styles.buttonText}>Clear history</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.hisbutton}
                    onPress={() => togglehistory(randombbig)}>
                    <Text style={styles.buttonText}>Add history</Text>
                </TouchableOpacity>
            </SafeAreaView>

        </View>
    )
}
//Manually save and display card drawing history
const UserScreen = ({ navigation }) => (
    <View style={styles.usercontainer}>
        <FlatList
            data={user}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <View style={{ flex: 1 }}>
                    <View style={styles.user}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Cardchoosen3')}>
                            <Image
                                style={styles.userphoto}
                                source={require('./assets/hoshino.png')}
                            />
                        </TouchableOpacity>
                        <View style={{ marginLeft: 20 }}>
                            <Text style={styles.username}>{item.username}</Text>
                            <Text style={styles.phonenumber}>{item.phonenumber}</Text>
                        </View>
                        <View style={{ flex: 1 }} />
                        <TouchableOpacity>
                            <AntDesign
                                style={{ marginRight: 40 }}
                                name={'edit'}
                                size={25}
                                color={'black'}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.userlist}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Cardchoosen3')}>
                            <Text
                                style={{
                                    fontSize: 20,
                                    color: 'black',
                                }}>
                                My Collection
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.userlist}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Cardchoosen3')}>
                            <Text
                                style={{
                                    fontSize: 20,
                                    color: 'black',
                                }}>
                                Settings
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        />
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Image style={styles.cat2} source={require('/assets/cat2.png')} />
        </View>
    </View>
)
//User page
const DetailsScreen = () => (
    <View style={styles.container}>
        <Text>Details Screen</Text>
    </View>
)

// Map
const MapScreen = () => {
    const [searchQuery, setSearchQuery] = useState('')
    const [region, setRegion] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    })
    const [markerCoordinate, setMarkerCoordinate] = useState(null)

    const handleSearch = async () => {
        try {
            const response = await Geocoder.from(searchQuery)
            const { lat, lng } = response.results[0].geometry.location

            setRegion({
                latitude: lat,
                longitude: lng,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            })

            setMarkerCoordinate({
                latitude: lat,
                longitude: lng,
            })
        } catch (error) {
            console.warn(error)
            alert('Location not found')
        }
    }

    return (
        <View style={styles.mapContainer}>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search for a location"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
                <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
                    <AntDesign name="search1" size={24} color="white" />
                </TouchableOpacity>
            </View>

            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                region={region}
                showsUserLocation={true}>
                {markerCoordinate && (
                    <Marker coordinate={markerCoordinate} title={searchQuery} />
                )}
            </MapView>
        </View>
    )
}

export default function App() {
    return (
        <NavigationContainer>
            <MyTabs />
        </NavigationContainer>
    )
}
const styles = StyleSheet.create({
    initialwords: {
        fontSize: 50,
        fontWeight: 'bold',
        alignItems: 'center',
        justifyContent: 'space-around',
        color: 'black'
    },
    RestaurantText: {
        fontSize: 20,
        fontWeight: 'bold',
        alignItems: 'center',
        justifyContent: 'flex-end',
        color: 'black'
    },
    space: {
        flex: 0.05,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 40,
        backgroundColor: '#FCF5E2'
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 28,
        backgroundColor: '#FCF5E2'
    },
    container2: {
        flex: 0.75,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 12,
        backgroundColor: '#FCF5E2'
    },
    historycontainer: {
        flex: 1,
        backgroundColor: '#FCF5E2',
    },
    usercontainer: {
        flex: 1,
        backgroundColor: '#FCF5E2',
    },
    button: {
        backgroundColor: 'black',
        width: 250,
        height: 70,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    hisbutton: {
        backgroundColor: 'black',
        width: 180,
        height: 65,
        borderRadius: 60,
        marginBottom: 25,
        marginTop: 5,
        marginHorizontal: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 28,
        color: 'white',

    },
    cardchoooseText: {
        fontSize: 40,
        color: 'green',
        fontWeight: 'bold'
    },
    cardchooose2Text: {
        fontSize: 35,
        color: 'orange',
        fontWeight: 'bold'
    },
    card: {
        height: 173,
        width: 113,
        justifyContent: 'center',
        alignContent: 'center',
    },
    cat: {
        height: 330,
        width: 330,

    },
    cat2: {
        height: 300,
        width: 350,

    },
    bigcard: {
        height: 346,
        width: 226
    },
    restaurantimage: {
        height: 246,
        width: 346
    },
    cardpage: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        flexWrap: 'wrap',
        rowGap: 5,
        columnGap: 10,
        backgroundColor: '#fff1d1'
    },
    cardpagesmall: {
        flex: 0.8,
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        flexWrap: 'wrap',
        rowGap: 5,
        columnGap: 10,
        backgroundColor: '#fff1d1'
    },
    cardpagebigtp: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'flex-start',
        flexWrap: 'wrap',
        rowGap: 5,
        columnGap: 10,
        backgroundColor: '#fff1d1'
    },
    cardpagebigbt: {
        flex: 1.2,
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        flexWrap: 'wrap',
        rowGap: 5,
        columnGap: 10,
        backgroundColor: '#fff1d1'
    },
    cardpagetext: {
        flex: 0.8,
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'flex-start',
        flexWrap: 'wrap',
        rowGap: 5,
        columnGap: 10,
        backgroundColor: '#fff1d1'
    },
    cardpagemain: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        flexWrap: 'wrap',
        rowGap: 5,
        columnGap: 10,
        backgroundColor: '#fff1d1'
    },
    restaurantpagemain: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff1d1'
    },
    restaurantpagebutton: {
        flex: 0.75,
        justifyContent: 'center',
        alignContent: 'center',
        columnGap: 10,
        backgroundColor: '#fff1d1',
        alignSelf: 'center'
    },
    historyitem: {
        flexDirection: 'row',
        padding: 30,
        fontSize: 18,
        height: 150,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        alignItems: 'center'
    },
    historyitem2: {
        flexDirection: 'row',
        justifyContent: 'center',
        rowGap: 5
    },
    historyitem3: {

        justifyContent: 'center',
        rowGap: 5
    },
    user: {
        fontSize: 18,
        height: 120,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1
    },
    userlist: {
        flexDirection: 'row',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
    },
    username: {
        color: 'black',
        fontSize: 25,
    },
    userphoto: {
        marginLeft: 20,
        height: 80,
        width: 80,
        borderRadius: 40,
        borderWidth: 2,
        borderColor: '#black'
    },
    phonenumber: {
        color: 'grey',
        fontSize: 15,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        paddingLeft: 26,
        flexWrap: 'wrap',
    },
    year: {
        fontSize: 16,
        color: 'gray',
        paddingLeft: 26
    },
    mapContainer: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
    searchContainer: {
        flexDirection: 'row',
        backgroundColor: '#FCF5E2',
        marginTop: 30,
        padding: 10,
    },
    searchInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginRight: 10,
    },
    searchButton: {
        backgroundColor: 'black',
        padding: 10,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
})
