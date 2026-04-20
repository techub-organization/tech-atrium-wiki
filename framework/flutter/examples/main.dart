import 'package:flutter/material.dart';

class SampleApp extends StatelessWidget {
  const SampleApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      home: Scaffold(
        body: Center(
          child: Text('techrium flutter sample'),
        ),
      ),
    );
  }
}

void main() {
  runApp(const SampleApp());
}
