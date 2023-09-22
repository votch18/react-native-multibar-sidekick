import * as React from 'react';
import { Animated } from 'react-native';

import { MultiBarContext, } from '../../context';
import { MultiBarOverlayProps, MultiBarPassThroughParams } from '../../types';
import { styles } from './Styles';

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
    overlayWidth,
    overlayHeight
  } = React.useMemo<Required<MultiBarOverlayProps>>(() => {
    return Object.assign<Required<MultiBarOverlayProps>, MultiBarOverlayProps>({
      expandingMode: 'staging',
      iconWidth: 30,
      iconHeight: 30,
      overlayWidth: 300,
      overlayHeight: 100
    }, overlayProps || {});
  }, [overlayProps]);

  const animations = React.useMemo(() => data.map(() => new Animated.Value(extrasVisible ? 1 : 0)), [data]);

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

    const stepX = overlayWidth / (data.length + 1)  ;
    const x =  stepX * (idx + 1) - iconWidth / 2 ;
    const y = overlayHeight * 0.15;
    
    const left = animations[idx].interpolate({
      inputRange: [0, 1],
      outputRange: [(overlayWidth - iconWidth)/2 , x]
    });

    const top = animations[idx].interpolate({
      inputRange: [0, 1],
      outputRange: [overlayHeight, y]
    });

    return (
      <Animated.View
        key={`extra_item_${idx}`}
        style={[styles.itemContainer, {
          left,
          top,
          width: iconWidth,
          height: iconHeight,
        }]}
        onTouchEnd={handleTouchEnd}
      >
        {extrasRender({
          params: params
        })}
      </Animated.View>
    )
  }), [animations, data, iconWidth, iconHeight, overlayHeight, overlayWidth]);

  return (
    <Animated.View
      pointerEvents="box-none"
      style={[styles.container, {
        width: overlayWidth,   
        height: overlayHeight,
      }]} 
    >
      {itemsList}
    </Animated.View>
  );
};
