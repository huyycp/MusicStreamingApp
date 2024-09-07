import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/data/data_sources/user_remote_data_source.dart';
import 'package:mobile/data/dto/login_dto.dart';
import 'package:mobile/data/dto/register_dto.dart';

final userRepoProvider = Provider<UserRepository>(
  (ref) => UserRepository(ref.read(userRemoteProvider))
);

class UserRepository {
  UserRepository(UserRemoteDataSource userRemote) {
    _userRemote = userRemote;
  }
  
  late final UserRemoteDataSource _userRemote;

  Future<bool> registerWithEmail({
    required String email,
    required String password,
    required String gender, 
    required String name, 
    required UserRole role, 
  }) async {
    return await _userRemote.registerWithEmail(RegisterDto(
      email: email, 
      password: password, 
      gender: gender, 
      name: name, 
      role: role
    ));
  }

  Future<bool> loginWithEmail({
    required String email,
    required String password
  }) async {
    return await _userRemote.loginWithEmail(LoginDto(
      email: email,
      password: password
    ));
  }
}