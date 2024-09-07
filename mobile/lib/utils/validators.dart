import 'package:string_validator/string_validator.dart' ;

String? emailValidator(String? value) {
  if (value == null || !isEmail(value)) {
    return 'Please check your email again';
  }
  return null;
}

String? passwordValidator(String? value) {
  if (value == null || value.isEmpty) {
    return 'Cannot be empty';
  }

  bool hasMinLength = value.length >= 10;
  bool hasDigit = matches(value, r'.*\d.*');
  bool hasLetter = matches(value, r'.*[A-Za-z].*');
  bool hasSpecialChar = matches(value, r'.*[\W_].*');
  if( !hasMinLength || !hasDigit || !hasLetter || !hasSpecialChar) {
    return '''
    At least:
      - 10 characters
      - A character
      - A digit
      - A special character
    ''';
  }
  return null;
}

String? emptyValidator(String? value) {
  if (value == null || value.isEmpty) {
    return 'Cannot be empty';
  }
  return null;
}