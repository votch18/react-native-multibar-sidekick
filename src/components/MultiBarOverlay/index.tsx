import * as React from 'react';
import { Animated } from 'react-native';

import { MultiBarContext, } from '../../context';
import { MultiBarOverlayProps, MultiBarPassThroughParams } from '../../types';
import { styles } from './Styles';

const COMMON_DEGREES = 180;

type Props = Pick<MultiBarPassThroughParams, 'params'>;

export const MultiBarOverlay: React.FC<Props> = ({
  params
}) => {
  const {
    data,
    extrasVisible,
    overlayProps,
    setExtrasVisible
  } = React.useContext(MultiBarContext);

  const {
    expandingMode,
    iconWidth,
    iconHeight,
    overlayRadius
  } = React.useMemo<Required<MultiBarOverlayProps>>(() => {
    return Object.assign<Required<MultiBarOverlayProps>, MultiBarOverlayProps>({
      expandingMode: 'staging',
      iconWidth: 30,
      iconHeight: 30,
      overlayRadius: 80
    }, overlayProps || {});
  }, [overlayProps]);

  // const iconWidthHalf = React.useMemo(() => iconWidth / 2, [iconWidth]);
  const iconWidthHalf = React.useMemo(() => iconWidth / 2, [iconWidth]);
  const surfaceSize = React.useMemo(() => (overlayRadius *2 ) + iconWidth, [iconWidth, overlayRadius]);
  const surfaceSizeHalf = React.useMemo(() => surfaceSize / 2, [surfaceSize]);
  const angleStep = React.useMemo(() => COMMON_DEGREES / data.length, [data]);
  const animations = React.useMemo(() => data.map(() => new Animated.Value(extrasVisible ? 1 : 0)), [data]);
  const overlayHeight = React.useMemo(() => {
    return surfaceSizeHalf * (surfaceSize / overlayRadius / 4);
  }, [surfaceSizeHalf, surfaceSize, overlayRadius]);

  React.useEffect(() => {
    const animate = Animated.spring;

    const animationsList = animations.map((anim, idx) => animate(anim, {
      toValue: extrasVisible ? 1 : 0,
      useNativeDriver: false
    }));

    const animator = expandingMode === 'staging'
      ? Animated.stagger(100, animationsList)
      : Animated.parallel(animationsList);

    animator.start();

    return () => animator.stop();
  }, [extrasVisible]);

  const itemsList = React.useMemo(() => data.map((extrasRender, idx) => {
    const handleTouchEnd = () => {
      setExtrasVisible(false);
    };

    const angle = COMMON_DEGREES + (angleStep * idx) + (angleStep / 2);

    const x = overlayRadius * Math.cos(angle * Math.PI / COMMON_DEGREES) + (surfaceSizeHalf - iconWidthHalf);
    const y = overlayRadius * -1.2 + (surfaceSizeHalf);

    const left = animations[idx].interpolate({
      inputRange: [0, 1],
      outputRange: [surfaceSizeHalf - iconWidthHalf, x]
    });

    const top = animations[idx].interpolate({
      inputRange: [0, 1],
      outputRange: [surfaceSize, y]
    });

    const rotateZ = animations[idx].interpolate({
      inputRange: [0, 1],
      outputRange: ['90deg', '0deg']
    });

    return (
      <Animated.View
        key={`extra_item_${idx}`}
        style={[styles.itemContainer, {
          left,
          top,
          width: iconWidth,
          height: iconHeight,
          transform: [
            { rotateZ }
          ]
        }]}
        onTouchEnd={handleTouchEnd}
      >
        {extrasRender({
          params: params
        })}
      </Animated.View>
    )
  }), [animations, angleStep, data, iconWidth, iconHeight, overlayRadius, surfaceSizeHalf, iconWidthHalf]);

  return (
    <Animated.View
      pointerEvents="box-none"
      style={[styles.container, {
        width: surfaceSize,   
        height: overlayHeight,
      }]} 
    >
      {itemsList}
    </Animated.View>
  );
};
