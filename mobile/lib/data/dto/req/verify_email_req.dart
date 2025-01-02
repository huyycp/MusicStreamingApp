class VerifyEmailReq {
  VerifyEmailReq({
    required this.email,
    required this.otp,
  });

  String email;
  String otp;
  
  Map<String, dynamic> toJson() => {
    'email': email,
    'otp': otp,
  };
}
