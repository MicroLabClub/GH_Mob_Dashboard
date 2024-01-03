import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import moment from 'moment';
import axios from 'axios';
import Grapth from './Grapth';

const HumedityGraph = React.memo(() => {
  const [messages, setMessages] = useState();
  const [count, setCount] = useState(4);

  async function getMessages() {
    try {
      const requestBodySoilHumidity = {
        topic: 'microlab/agro/soil/humidity',
      };
      const response = await axios.post(
        'http://localhost:3001/api/messages/getByTopic',
        requestBodySoilHumidity,
      );

      let result = response.data;
      console.log(result.length);

      let shortResult = result.splice(result.length - 50, result.length);

      setMessages({
        labels: shortResult.map(x => x.message_id),
        datasets: [
          {
            data: shortResult.map(x => JSON.parse(x.message).humidity),
          },
        ],
      });
      const resp = shortResult.map(x => JSON.parse(x.message).humidity);
      setCount(resp[49] + '%');
    } catch (error) {
      const cache = {
        labels: [
          75808, 75809, 75810, 75811, 75812, 75813, 75814, 75815, 75816, 75817,
          75818, 75819, 75820, 75821, 75822, 75823, 75824, 75825, 75826, 75827,
          75828, 75829, 75830, 75831, 75832, 75833, 77300, 77301, 77304, 77305,
          77306, 77307, 77314, 77316, 77317, 77318, 77319, 77326, 77327, 77329,
          77330, 77331, 77338, 77339, 77340, 77342, 77343, 77350, 77351, 77352,
        ],
        datasets: [
          {
            data: [
              72, 91, 3, 5, 45, 41, 98, 71, 88, 69, 20, 60, 6, 8, 60, 66, 72,
              67, 57, 43, 69, 54, 12, 79, 58, 12, 2582, 2579, 2576, 2573, 2576,
              2576, 2578, 2585, 2576, 2570, 2574, 2577, 2581, 2582, 2579, 2579,
              2577, 2576, 2580, 2576, 2576, 2577, 2576, 2576,
            ],
          },
        ],
      };
      setMessages(cache);
      console.error(error);
    }
  }
  useEffect(() => {
    getMessages();
    //automatically update the chart data each 5 seconds
    // const intervalId = setInterval(() => {
    //   getMessages();
    // }, 15000);

    // return () => clearInterval(intervalId);
  }, []);

  if (!messages) {
    return (
      <ActivityIndicator animating={true} size={'large'} color={'purple'} />
    );
  }
  return <Grapth data={messages} wMultiply={5} />;
});

export default HumedityGraph;

const styles = StyleSheet.create({});
