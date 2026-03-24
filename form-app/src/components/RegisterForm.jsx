import React from 'react'
import {useFormik} from 'formik';
import { registerFormSchema } from '../schemas/RegisterFormSchemas';

function RegisterForm() {

    const {values, errors, handleChange, handleSubmit} = useFormik({
        initialValues: {
            email: '',
            age: '',
            password: '',
            confirmPassword: '',
            term: false
        },
        validationSchema: registerFormSchema,
        onSubmit: (values, action) => {
            console.log(values);
            action.resetForm();
        }
    });


  return (
    <div>
        <form onSubmit={handleSubmit}>
            <div className='input-div'>
                <label htmlFor="">E-mail:</label>
                <input type="text" id='email' placeholder='E-mail Giriniz...'
                value={values.email} onChange={handleChange} />
                {errors.email && <span className='error'>{errors.email}</span>}
            </div>
            <div className='input-div'>
                <label htmlFor="">Yaş:</label>
                <input type="number" id='age' placeholder='Yaş Giriniz...'
                value={values.age} onChange={handleChange} />
                {errors.age && <span className='error'>{errors.age}</span>}
            </div>
            <div className='input-div'>
                <label htmlFor="">Şifre:</label>
                <input type="password" id='password' placeholder='Parola Giriniz...'
                value={values.password} onChange={handleChange} />
                {errors.password && <span className='error'>{errors.password}</span>}
            </div>
            <div className='input-div'>
                <label htmlFor="">Şifre Tekrarı:</label>
                <input type="password" id='confirmPassword' placeholder='Parola Tekrar Giriniz...'
                value={values.confirmPassword} onChange={handleChange} />
                {errors.confirmPassword && <span className='error'>{errors.confirmPassword}</span>}
            </div>
            <div className='input-div'>
                <div className='checkbox-div'>
                    <input className='checkbox' type="checkbox" id='term'
                    value={values.term} onChange={handleChange} />
                    <label htmlFor="">Kullanıcı sözleşmesini kabul ediyorum.</label>
                </div>
                {errors.term && <span className='error'>{errors.term}</span>}
            </div>
            <button type='submit' className='save-button'>Kaydet</button>
        </form>
    </div>
  )
}

export default RegisterForm