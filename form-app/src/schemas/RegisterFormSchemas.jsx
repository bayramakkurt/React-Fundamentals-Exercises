import * as yup from 'yup'

export const registerFormSchema = yup.object().shape({
    email: yup.string().email('Geçerli bir e-mail adresi giriniz.').required('E-mail alanı zorunludur.'),
    age: yup.number().min(18, 'Yaşınız 18 veya daha büyük olmalıdır.').required('Yaş alanı zorunludur.'),
    password: yup.string().min(6, 'Şifre en az 6 karakter olmalıdır.').required('Şifre alanı zorunludur.'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), yup.password], 'Şifreler eşleşmelidir.').required('Şifre tekrar alanı zorunludur.'),
    term: yup.boolean().oneOf([true], 'Kullanıcı sözleşmesini kabul etmelisiniz.').required('Kullanıcı sözleşmesi alanı zorunludur.')
})    