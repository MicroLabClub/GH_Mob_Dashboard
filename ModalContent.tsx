import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import CircularProgress, {
  ProgressRef,
} from 'react-native-circular-progress-indicator';
import TemperatureGraph from './TemperatureGraph';
import HumedityGraph from './HumedityGraph';
import Popover from 'react-native-popover-view';
import SliderUI from './SliderUI';
import {MqttClient} from '@openrc/react-native-mqtt';

type Props = {
  item: any;
  onClose: () => void;
  client?: MqttClient;
};

const ModalContent = ({item, onClose, client}: Props) => {
  const progressRef = useRef<ProgressRef>(null);

  console.log('>>>item', item.value);

  useEffect(() => {
    progressRef.current?.play();
  }, [item.value]);
  const isTemperature = item.id == 1;

  const [settingsTempTime, setSettingsTempTime] = useState(0);

  function setMqttData() {
    if (!client) {
      return;
    }
    try {
      let publishSettings = JSON.stringify({temp: settingsTempTime});
      console.log(publishSettings);

      let result = client.publish(
        'agrobot/sensors/temperature/sensor-1',
        publishSettings,
      );
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }

  const child = useCallback(() => {
    return (
      isTemperature && (
        <Popover
          from={
            <TouchableOpacity
              onPress={onClose}
              style={[styles.closeButton, {width: 200, marginTop: 10}]}>
              <Text style={styles.closeButtonText}>Regleaza temperatura</Text>
            </TouchableOpacity>
          }>
          <View
            style={{
              backgroundColor: 'white',
              borderRadius: 16,
              padding: 10,
              width: Dimensions.get('window').width - 100,
              height: 300,
            }}>
            <SliderUI onChange={setSettingsTempTime} />
            <TouchableOpacity
              onPress={() => {
                setMqttData();
                onClose();
              }}
              style={{
                width: 150,
                backgroundColor: '#6F51ED',
                padding: 5,
                borderRadius: 5,
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
              }}>
              <Text style={[styles.closeButtonText, {color: 'white'}]}>
                Aplica
              </Text>
            </TouchableOpacity>
          </View>
        </Popover>
      )
    );
  }, [isTemperature, onClose, setMqttData]);

  return (
    <View style={styles.modalContainer}>
      <SafeAreaView style={{flex: 1}}>
        <Text style={styles.headerText}>{item.text}</Text>
        <View style={styles.modalContent}>
          <CircularProgress
            ref={progressRef}
            value={item.value}
            // title={item.symbol}
            valueSuffix={item.symbol}
            radius={120}
            titleStyle={{fontWeight: 'bold'}}
            titleColor={'black'}
            progressValueColor={'black'}
            activeStrokeColor={'#754FF6'}
            inActiveStrokeOpacity={0.5}
            activeStrokeWidth={20}
            inActiveStrokeWidth={20}
          />
          {child()}

          <View style={{flex: item.id > 2 ? 0.5 : 0.9, marginTop: 20}}>
            {item.id == 1 ? <TemperatureGraph /> : null}
            {item.id == 2 ? <HumedityGraph /> : null}
          </View>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Inapoi</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#AF9ED7',
    flex: 1,
  },
  modalContent: {
    backgroundColor: '#AF9ED7',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  headerText: {
    color: 'white',
    fontSize: 24,
    marginBottom: 10,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  closeButton: {
    marginTop: 50,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    width: 150,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'black',
    fontWeight: 'bold',
  },
});

export default ModalContent;
