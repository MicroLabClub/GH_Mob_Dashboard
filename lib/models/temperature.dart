// To parse this JSON data, do
//
//     final temperature = temperatureFromJson(jsonString);

import 'dart:convert';

List<Temperature> temperatureFromJson(String str) => List<Temperature>.from(json.decode(str).map((x) => Temperature.fromJson(x)));

String temperatureToJson(List<Temperature> data) => json.encode(List<dynamic>.from(data.map((x) => x.toJson())));

class Temperature {
  int messageId;
  int? sensorId;
  Topic topic;
  String message;
  DateTime date;

  Temperature({
    required this.messageId,
    required this.sensorId,
    required this.topic,
    required this.message,
    required this.date,
  });

  factory Temperature.fromJson(Map<String, dynamic> json) => Temperature(
    messageId: json["message_id"],
    sensorId: json["sensor_id"],
    topic: topicValues.map[json["topic"]]!,
    message: json["message"],
    date: DateTime.parse(json["date"]),
  );

  Map<String, dynamic> toJson() => {
    "message_id": messageId,
    "sensor_id": sensorId,
    "topic": topicValues.reverse[topic],
    "message": message,
    "date": date.toIso8601String(),
  };
}

enum Topic {
  AGROBOT_SENSORS_TEMPERATURE_SENSOR_1,
  AGROBOT_SENSORS_TEMPERATURE_SENSOR_2,
  SECOND_TOPIC_IN_MESSAGES
}

final topicValues = EnumValues({
  "agrobot/sensors/temperature/sensor-1": Topic.AGROBOT_SENSORS_TEMPERATURE_SENSOR_1,
  "agrobot/sensors/temperature/sensor-2": Topic.AGROBOT_SENSORS_TEMPERATURE_SENSOR_2,
  "Second topic in messages.": Topic.SECOND_TOPIC_IN_MESSAGES
});

class EnumValues<T> {
  Map<String, T> map;
  late Map<T, String> reverseMap;

  EnumValues(this.map);

  Map<T, String> get reverse {
    reverseMap = map.map((k, v) => MapEntry(v, k));
    return reverseMap;
  }
}
