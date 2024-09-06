// ignore_for_file: public_member_api_docs, sort_constructors_first
class RegisterDto {
  RegisterDto({
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

enum UserRole {
  listener,
  artist
}