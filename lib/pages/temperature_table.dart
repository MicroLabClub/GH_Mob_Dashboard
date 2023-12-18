import 'package:flutter/material.dart';
import 'package:fl_chart/fl_chart.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class TemperatureChartPage extends StatefulWidget {
  const TemperatureChartPage({super.key});

  @override
  State<TemperatureChartPage> createState() => _TemperatureChartPageState();
}

class _TemperatureChartPageState extends State<TemperatureChartPage> {
  // Exemplu de date cu temperaturi din seră
  final List<FlSpot> temperatureData = [
    FlSpot(0, 22.0),
    FlSpot(1, 23.5),
    FlSpot(2, 24.0),
    FlSpot(3, 22.8),
    FlSpot(4, 25.0),
    FlSpot(5, 24.5),
  ];

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
        child: Padding(
          padding: EdgeInsets.all(16.0),
          child: LineChart(
            LineChartData(
              gridData: FlGridData(
                show: false,
              ),
              titlesData: FlTitlesData(
                bottomTitles: SideTitles(showTitles: true),
                leftTitles: SideTitles(showTitles: true),
              ),
              borderData: FlBorderData(
                show: true,
                border: Border.all(color: const Color(0xff37434d), width: 1),
              ),
              minX: 0,
              maxX: 5,
              minY: 20,
              maxY: 26,
              lineBarsData: [
                LineChartBarData(
                  spots: temperatureData,
                  isCurved: true,
                  colors: [Colors.deepPurple],
                  dotData: FlDotData(show: false),
                  belowBarData: BarAreaData(show: false),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
