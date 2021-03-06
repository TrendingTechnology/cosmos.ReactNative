import React, {useState, useEffect} from 'react';
import {
  TouchableWithoutFeedback,
  Animated,
  Vibration,
  StyleSheet,
  Dimensions,
} from 'react-native';

const {width} = Dimensions.get('screen');

const ReactionIcon = ({
  style,
  iconName,
  pressAction = () => {},
  longPressAction = () => {},
  hasReacted,
}) => {
  const [fill, setFill] = useState(false);
  const iconAnimation = new Animated.Value(1);
  const iconOpacity = iconAnimation.interpolate({
    inputRange: [0.8, 1],
    outputRange: [0.2, 1],
  });

  const requireIcon = () => {
    let Icon;
    switch (iconName) {
      case 'heart':
        Icon = require('../Svg/Icons/HeartIcon/index.js').default;
        return <Icon fill={fill} />;
      case 'meh':
        Icon = require('../Svg/Icons/MehFaceIcons/index.js').default;
        return <Icon fill={fill} />;
      case 'frown':
        Icon = require('../Svg/Icons/SadFaceIcon/index.js').default;
        return <Icon fill={fill} />;
      case 'comment':
        Icon = require('../Svg/Icons/CommentIcon/index.js').default;
        return <Icon fill={fill} />;
      default:
        Icon = require('../Svg/Icons/CommentIcon/index.js').default;
        return <Icon fill={fill} />;
    }
  };

  useEffect(() => {
    setFill(hasReacted);
  }, [hasReacted]);

  return (
    <TouchableWithoutFeedback
      onLongPress={() => longPressAction()}
      onPress={() => {
        Vibration.vibrate(15);
        Animated.timing(iconAnimation, {
          toValue: 0.8,
          duration: 200,
          useNativeDriver: true,
        }).start(() => {
          setFill(!hasReacted);
          Animated.timing(iconAnimation, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
          }).start(() => pressAction());
        });
      }}>
      <Animated.View
        style={[
          {...style},
          styles.reactIcons,
          {
            opacity: iconOpacity,
            transform: [{scale: iconAnimation}],
          },
        ]}>
        {requireIcon()}
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  reactIcons: {
    marginHorizontal: width * 0.02,
    marginVertical: width * 0.01,
    marginTop: 0,
  },
});

export default ReactionIcon;
