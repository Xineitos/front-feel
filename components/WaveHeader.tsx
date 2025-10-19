import React from 'react';
import { View, Dimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const { width } = Dimensions.get('window');

export default function WaveHeader() {
  return (
    <View style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 200, zIndex: 0 }}>
      <Svg
        height="200"
        width={width}
        viewBox={`0 0 ${width} 200`}
        style={{ position: 'absolute', top: 0 }}
      >
        {/* Wave Layer 1 - Lightest */}
        <Path
          d={`M0,80 Q${width * 0.25},100 ${width * 0.5},80 T${width},80 L${width},0 L0,0 Z`}
          fill="#FF7900"
          fillOpacity={0.15}
        />
        {/* Wave Layer 2 - Medium */}
        <Path
          d={`M0,60 Q${width * 0.25},80 ${width * 0.5},60 T${width},60 L${width},0 L0,0 Z`}
          fill="#FF7900"
          fillOpacity={0.25}
        />
        {/* Wave Layer 3 - Darkest */}
        <Path
          d={`M0,40 Q${width * 0.25},60 ${width * 0.5},40 T${width},40 L${width},0 L0,0 Z`}
          fill="#FF7900"
          fillOpacity={0.4}
        />
      </Svg>
    </View>
  );
}
