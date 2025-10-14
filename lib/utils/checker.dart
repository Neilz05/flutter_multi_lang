String? emailValidator(String email) {
  final emailRegex = RegExp(r'^[^@]+@[^@]+\.[^@]+');
  final emptyError = requiredFieldValidator(email, fieldName: 'Email');
  if (emptyError != null) {
    return emptyError;
  }
  if (!emailRegex.hasMatch(email)) {
    return 'Invalid email format';
  }
  return null;
}

String? requiredFieldValidator(String? value, {String? fieldName = 'Field'}) {
  if (value == null || value.trim().isEmpty) {
    if (fieldName == null) {
      return 'This field is required';
    } else {
      return '$fieldName is required';
    }
  }
  return null;
}
