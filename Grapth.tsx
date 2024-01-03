import {Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {LineChart} from 'react-native-chart-kit';

type Props = {
  data: any[];
  wMultiply: number;
};

const Grapth = ({data, wMultiply = 1}: Props) => {
  // const data = {
  //   labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  //   datasets: [
  //     {
  //       data: [
  //         Math.random() * 100,
  //         Math.random() * 100,
  //         Math.random() * 100,
  //         Math.random() * 100,
  //         Math.random() * 100,
  //         Math.random() * 100,
  //       ],
  //     },
  //   ],
  // };

  return (
    <View>
      <Text style={{fontWeight: 'bold'}}>Grafic:</Text>
      <ScrollView horizontal>
        <LineChart
          data={data}
          width={Dimensions.get('window').width * wMultiply}
          height={250}
          yAxisLabel=""
          yAxisSuffix=""
          yAxisInterval={0.2} // optional, defaults to 1
          chartConfig={{
            backgroundColor: 'green',
            backgroundGradientFrom: 'gray',
            backgroundGradientTo: 'purple',
            decimalPlaces: 0, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 0,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: 'purple',
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 10,
          }}
        />
      </ScrollView>
    </View>
  );
};

export default Grapth;

const styles = StyleSheet.create({});
