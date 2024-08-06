import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';

export interface IUser {
    id?: number | string;
    name?: string;
    email: string;
    password: string;
    confirmPassword?: string; // Thêm trường xác nhận mật khẩu
}

const Register = () => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm<IUser>();
    const navigate = useNavigate();

    const onSubmit = async (registerData: IUser) => {
        try {
            const { data } = await axios.post('http://localhost:3000/register', registerData);
            alert('Đăng ký thành công');
            navigate('/login'); // Chuyển hướng đến trang đăng nhập
        } catch (error) {
            alert('Lỗi đăng ký');
        }
    };

    // Kiểm tra xác nhận mật khẩu
    const password = watch('password');

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
                <h1 className="text-3xl font-bold mb-6 text-center">Đăng ký tài khoản</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <input
                            type='text'
                            placeholder='Họ tên'
                            {...register('name')}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
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
                    <div>
                        <input
                            type='password'
                            placeholder='Xác nhận mật khẩu'
                            {...register('confirmPassword', {
                                validate: value => value === password || 'Mật khẩu xác nhận không khớp'
                            })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.confirmPassword && <span className="text-red-500 text-sm mt-1 block">{errors.confirmPassword.message}</span>}
                    </div>
                    <button
                        type='submit'
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                    >
                        Đăng ký
                    </button>
                </form>
                <div className="mt-6 text-center">
                    <p className="text-gray-600">Đã có tài khoản?</p>
                    <a href="/login" className="text-blue-500 hover:underline">Đăng nhập tại đây</a>
                </div>
            </div>
        </div>
    );
};

export default Register;
