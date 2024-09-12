import * as Yup from 'yup'

export const registerSchema = Yup.object({
  email: Yup.string()
    .email('Email này không hợp lệ. Hãy đảm bảo rằng email được nhập dưới dạng example@email.com')
    .required('Email là bắt buộc')
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Email không hợp lệ'),
  password: Yup.string()
    .min(10, 'Mật khẩu phải có ít nhất 10 ký tự')
    .matches(/[0-9]/, 'Mật khẩu phải có ít nhất một chữ số')
    .matches(/[\d!?#&]/, 'Mật khẩu phải có ít nhất một chữ cái một ký tự đặc biệt (!?#&)')
    .required('Mật khẩu là bắt buộc')
})
