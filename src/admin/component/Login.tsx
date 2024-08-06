import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { IUser } from './Register';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<IUser>();
    const navigate = useNavigate();

    const onSubmit = async (loginData: IUser) => {
        try {
            const { data } = await axios.post('http://localhost:3000/login', loginData);
            alert('Đăng nhập thành công');
            sessionStorage.setItem('user', JSON.stringify(data));
            navigate('/admin'); // Chuyển hướng đến trang admin sau khi đăng nhập thành công
        } catch (error) {
            alert('Sai tên đăng nhập hoặc mật khẩu');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
                <h1 className="text-3xl font-bold mb-6 text-center">Đăng nhập</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <input
                            type='text'
                            placeholder='Email'
                            {...register('email', {
                                required: true,
                                pattern: /^\S+@(\S+\.)+\S{2,6}$/
                            })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.email && <span className="text-red-500 text-sm mt-1 block">Sai định dạng email</span>}
                    </div>
                    <div>
                        <input
                            type='password'
                            placeholder='Mật khẩu'
                            {...register('password', { required: true, minLength: 6 })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.password && <span className="text-red-500 text-sm mt-1 block">Mật khẩu lớn hơn 6 kí tự</span>}
                    </div>
                    <button
                        type='submit'
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                    >
                        Đăng nhập
                    </button>
                </form>
                <div className="mt-6 text-center">
                    <p className="text-gray-600">Chưa có tài khoản?</p>
                    <a href="/register" className="text-blue-500 hover:underline">Đăng ký tại đây</a>
                </div>
            </div>
        </div>
    );
};

export default Login;
