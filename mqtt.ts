import AsyncStorage from '@react-native-async-storage/async-storage';
import init from 'react_native_mqtt';

const host = 'wss://9b7b323ee67e46d18f9317162c8e8841.s1.eu.hivemq.cloud';
// const options = {
//   username: 'sergiu.doncila',
//   password: 'QWEasd!@#123',
//   //host: '9b7b323ee67e46d18f9317162c8e8841.s1.eu.hivemq.cloud',
//   //port: 8883,
//   //protocol: 'mqtts',
// };

init({
  size: 10000,
  storageBackend: AsyncStorage,
  defaultExpires: 1000 * 3600 * 24,
  enableCache: true,
  sync: {},
});
const options = {
  host: host,
  port: 8884,
  path: '/mqtt',
  id: 'id_' + parseInt(Math.random() * 100000),
  username: 'sergiu.doncila',
  password: 'QWEasd!@#123',
};
console.log('options', options);
// 创建客户端实例
client = new Paho.MQTT.Client(options.host, options.port, options.path);

console.log('client', client);
