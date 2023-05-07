import * as React from 'react';
import { BackHandler, View } from 'react-native';

import { MultiBarOverlay } from '../MultiBarOverlay';
import { styles } from './Styles';
import { MultiBarPassThroughParams } from '../../types';
import { MultiBarContext, } from '../../context';

type Props = Pick<MultiBarPassThroughParams, 'params'>;

export const BottomTabBarWrapper: React.FC<Props> = ({
  children,
  params
}) => {
  const {
    extrasVisible,
  } = React.useContext(MultiBarContext);

  return (
    <View
      pointerEvents="box-none"
      style={[styles.container, extrasVisible?{backgroundColor:'white'} : null ]}
    >
      <MultiBarOverlay
        params={params}
      />
      {children}
    </View>
  );
}
