import 'package:string_validator/string_validator.dart';

String? emailValidator(String? value) {
  if (value == null || !isEmail(value)) {
    return 'Please check your email again';
  }
  return null;
}

String? passwordValidator(String? value) {
  if (value == null || !isLength(value, 6)) {
    return 'At least 6 characters';
  }
  return null;
}

String? emptyValidator(String? value) {
  if (value == null || value.isEmpty) {
    return 'Cannot be empty';
  }
  return null;
}