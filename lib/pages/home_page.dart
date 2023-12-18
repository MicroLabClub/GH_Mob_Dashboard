import 'dart:async';
import 'dart:convert';
import 'package:expane/pages/temperature_table.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class HomePage extends StatefulWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  double temperature = 0.0; // Default temperature

  Future<void> fetchTemperature() async {
    try {
      final response = await http.post(
        Uri.parse('http://172.17.10.20:3001/api/messages/getBySensorId'),
        headers: <String, String>{
          'Content-Type': 'application/json',
        },
        body: jsonEncode(<String, dynamic>{
          'sensor_id': 1,
        }),
      );

      if (response.statusCode == 200) {
        final List<dynamic> messages = jsonDecode(response.body);
        if (messages.isNotEmpty) {
          final dynamic latestMessage = messages.last;
          final dynamic messageContent = jsonDecode(latestMessage['message']);
          final dynamic tempValue = messageContent['temp'];

          if (tempValue != null) {
            final double temp = tempValue.toDouble();
            setState(() {
              temperature = temp;
            });
          } else {
            print('Temperature value is null');
          }
        }
      } else {
        throw Exception('Failed to load temperature');
      }
    } catch (e) {
      print('Error fetching temperature: $e');
    }
  }

  @override
  void initState() {
    super.initState();
    // Initialize temperature
    fetchTemperature();

    // Set up a periodic timer to update temperature every 1 minute (adjust as needed)
    Timer.periodic(Duration(seconds: 5), (timer) {
      fetchTemperature();
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(
          'Monitorizare seră',
          style: TextStyle(
            color: Colors.deepPurple.shade100,
            fontSize: 20,
            fontWeight: FontWeight.bold,
          ),
        ),
        backgroundColor: Colors.deepPurple,
        elevation: 0.0,
        centerTitle: true,
      ),
      backgroundColor: Colors.deepPurple.shade200,
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            // Circular temperature indicator
            CircularProgressIndicator(
              value: temperature / 100, // Assuming the range is 0-100
              backgroundColor: Colors.deepPurple.shade100,
              valueColor: AlwaysStoppedAnimation<Color>(Colors.deepPurple),
            ),
            SizedBox(height: 20),
            Text(
              '$temperature °C',
              style: TextStyle(fontSize: 35, fontWeight: FontWeight.bold),
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          // Navigate to the temperature chart page
          Navigator.push(
            context,
            MaterialPageRoute(builder: (context) => TemperatureChartPage()),
          );
        },
        child: Icon(Icons.navigation),
        backgroundColor: Colors.deepPurple,
      ),
    );
  }
}