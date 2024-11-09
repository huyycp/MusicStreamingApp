import 'package:mobile/models/user_model.dart';

class RegisterReq {
  RegisterReq({
    required this.email,
    required this.password,
    required this.gender,
    required this.name,
    required this.role
  });
  
  String email;
  String password;
  String gender;
  String name;
  UserRole role;

  Map<String, dynamic> toJson() => {
    'email': email,
    'password': password,
    'gender': gender,
    'name': name,
    'role': role.index.toString()
  };
}