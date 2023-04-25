import * as React from 'react';
import { Animated, StyleProp, TouchableOpacity, View, ViewStyle } from 'react-native';

import { MultiBarContext } from '../../context';
import { styles } from './Styles';
// import  MaterialIcons from 'react-native-vector-icons';
import FontAwesome from "react-native-vector-icons/FontAwesome";

type Props = {
  rotationDegrees?: number;
  style?: StyleProp<ViewStyle>;
  onPress?: () => boolean | void;
};

export const MultiBarButton: React.FC<Props> = ({
  children,
  rotationDegrees,
  style,
  onPress
}) => {
  const { extrasVisible, setExtrasVisible } = React.useContext(MultiBarContext);
  const animated = React.useRef<Animated.Value>(new Animated.Value(0)).current;

  React.useEffect(() => {
    const animation = Animated.spring(animated, {
      toValue: extrasVisible ? 1 : 0,
      useNativeDriver: true
    });

    animation.start();

    return () => animation.stop();
  }, [extrasVisible]);

  const handlePress = React.useCallback(() => {
    if (!onPress || !onPress()) {
      setExtrasVisible(!extrasVisible);
    }
  }, [extrasVisible]);

  const rotateZ = animated.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', `${rotationDegrees ?? 180}deg`]
  });

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={handlePress}
    >
      {!extrasVisible? 
        <Animated.View
          style={[styles.contentContainer, {
            transform: [
              { rotateZ }
            ]
          }, style]}
        >
          {children}
        </Animated.View>
        :
        <Animated.View
          style={[styles.contentContainer, {
            transform: [
              { rotateZ }
            ]
          }, style]}
        >
          <View
            style={{
              alignItems:'center',
              justifyContent:'center',
              width: 55,
              height: 55,
              backgroundColor: '#3D5B81',
              borderRadius:50
            }}>
            <FontAwesome name='times' size={20} color='white'/>
          </View>
        </Animated.View>
    }
    </TouchableOpacity>
  );
};
