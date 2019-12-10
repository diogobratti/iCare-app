import { StyleSheet } from "react-native";

const StyleBase = StyleSheet.create({
    headerStyle: {
        backgroundColor: "#DA552F"
    },
});

export const navigationOptions = {
    headerTintColor: { 
        headerTintColor: "#FFF"
    },
    tabBarOptions:  {
        activeTintColor: 'red',
        inactiveTintColor: 'gray',
    }
};

export default StyleBase;