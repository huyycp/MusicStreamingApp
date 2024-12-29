import 'package:mobile/models/user_model.dart';

class LoginReq {
  LoginReq({
    required this.email,
    required this.password,
    this.authType = AppAuthType.inapp,
  });

  String email;
  String password;
  AppAuthType authType;

  Map<String, dynamic> toJson() => {
    'email': email,
    'password': password,
    'type': authType == AppAuthType.inapp ? '' : authType.name,
  };
}