import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';

type Props = {
  data: any[];
  onPress: (idx: number) => void;
};

const GridLayout = (props: Props) => {
  const data = props.data;

  return (
    <>
      <Text style={{fontSize: 22, fontWeight: '500', paddingHorizontal: 10}}>
        Functionalitati
      </Text>
      <ScrollView contentContainerStyle={styles.container}>
        {data.map(item => (
          <Pressable
            key={item.id}
            style={styles.gridItem}
            onPress={() => props.onPress(item.id)}>
            <Text
              style={[
                styles.text,
                {
                  fontSize: 40,
                  fontWeight: 'bold',
                },
              ]}>
              {item.value + item.symbol}
            </Text>
            <Image source={item.uri} style={styles.image} />
            <Text style={styles.text}>{item.text}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 16,
  },
  gridItem: {
    width: '48%', // Adjust as needed to leave space for margins
    backgroundColor: '#754FF6',
    marginVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    height: 160,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 50, // Make it circular
    position: 'absolute',
    left: 10,
    top: 10,
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default GridLayout;
