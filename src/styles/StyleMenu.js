import { StyleSheet } from "react-native";

const StyleMenu = StyleSheet.create({
    badgeContainer: {
        // /If you're using react-native < 0.57 overflow outside of the parent
        // will not work on Android, see https://git.io/fhLJ8
        position: 'absolute',
        right: -6,
        top: -3,
        backgroundColor: 'red',
        borderRadius: 6,
        width: 12,
        height: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    badgeText: { 
        color: 'white', 
        fontSize: 10, 
        fontWeight: 'bold' 
    },
});

export default StyleMenu;