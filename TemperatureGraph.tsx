import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import moment from 'moment';
import axios from 'axios';
import Grapth from './Grapth';

const TemperatureGraph = React.memo(() => {
  const [messages, setMessages] = useState();
  const [count, setCount] = useState(4);

  console.log(messages);

  async function getMessages() {
    try {
      const requestBodyControlTemperatura = {
        topic: 'microlab/agro/air/temperature',
      };
      const response = await axios.post(
        'http://localhost:3001/api/messages/getByTopic',
        requestBodyControlTemperatura,
      );
      let result = response.data;
      console.log(result.length);

      let shortResult = result.splice(result.length - 20, result.length);

      const parsedLabels = shortResult.map(x => {
        const seconds = moment(x.date).get('seconds');
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
      });

      const tempData = shortResult.map(x =>
        `${JSON.parse(x.message).temperature}`.replace('undefined', '10'),
      );
      console.log('>tempData', tempData);
      //  {
      //         labels: parsedLabels,
      //         datasets: {
      //           label: 'Temperature',
      //           data: tempData,
      //         },
      //       }
      setMessages({
        labels: parsedLabels,
        datasets: [
          {
            data: tempData,
          },
        ],
      });

      const resp = shortResult.map(x => JSON.parse(x.message).temp);
      setCount(resp[49] + '%');
    } catch (error) {
      const cache = {
        labels: [
          '0:49',
          '0:38',
          '0:03',
          '0:51',
          '0:33',
          '0:21',
          '0:09',
          '0:25',
          '0:27',
          '0:27',
          '0:23',
          '0:08',
          '0:56',
          '0:44',
          '0:32',
          '0:44',
          '0:20',
          '0:30',
          '0:08',
          '0:31',
        ],
        datasets: [
          {
            data: [
              '25',
              '26',
              '26',
              '27',
              '27',
              '27',
              '27',
              '10',
              '10',
              '10',
              '28',
              '28',
              '27',
              '26',
              '26',
              '10',
              '26',
              '26',
              '26',
              '26',
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
  return (
    <>
      <Grapth data={messages} wMultiply={2} />
    </>
  );
});

export default TemperatureGraph;

const styles = StyleSheet.create({});
