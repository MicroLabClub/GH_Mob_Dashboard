import {StyleSheet, View} from 'react-native';
import React, {useRef, useState} from 'react';
import {RadialSlider} from 'react-native-radial-slider';

type Props = {
  onChange: (x: number) => void;
};
const SliderUI = React.memo(({onChange}: Props) => {
  // const speed = useRef(0);

  return (
    <View style={styles.container}>
      <RadialSlider
        // value={speed.current}
        step={5}
        max={100}
        onChange={val => {
          onChange(val);
          // speed.current = val;
        }}
        subTitle={''}
        unit="℃"
        unitStyle={{fontWeight: 'bold'}}
      />
    </View>
  );
});

export default SliderUI;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
