import React from 'react';
import { Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import StyleMenu from "../styles/StyleMenu";


class IconWithBadge extends React.Component {
    render() {
      const { name, badgeCount, color, size } = this.props;
      return (
        <View>
          <Ionicons name={name} size={size} color={color} />
          {badgeCount > 0 && (
            <View
              style={StyleMenu.badgeContainer}>
              <Text style={StyleMenu.badgeText}>
                {badgeCount}
              </Text>
            </View>
          )}
        </View>
      );
    }
  }
  
  const HomeIconWithBadge = props => {
    // You should pass down the badgeCount in some other ways like context, redux, mobx or event emitters.
    return <IconWithBadge {...props} badgeCount={3} />;
  };
  
  const getTabBarIcon = (navigation, focused, tintColor) => {
    const { routeName } = navigation.state;
    let IconComponent = Ionicons;
    let iconName;
    if (routeName === 'Home') {
      iconName = `ios-home${focused ? '' : ''}`;
    } else if (routeName === 'Chat') {
      iconName = `ios-chatboxes${focused ? '' : ''}`;
      // We want to add badges to chat tab icon
      IconComponent = HomeIconWithBadge;
    } else if (routeName === 'Anúncio') {
      iconName = `ios-megaphone${focused ? '' : ''}`;
    } else if (routeName === 'Perfil') {
      iconName = `ios-person${focused ? '' : ''}`;
    }
  
    // You can return any component that you like here!
    return <IconComponent name={iconName} size={25} color={tintColor} />;
  };

  const IconeMenu = getTabBarIcon;
  
  export default IconeMenu;