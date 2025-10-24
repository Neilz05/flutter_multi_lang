class Fact {
  Fact({required this.text});

  factory Fact.fromJson(Map<String, Object?> json) {
    return Fact(text: json['text']! as String);
  }

  final String text;
}
