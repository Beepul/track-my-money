import {z} from 'zod';

export const RegisterSchema = z.object({
    first_name: z.string().min(1, 'First name is required'),
    last_name: z.string().min(1, 'Last name is required'),
    email: z.email('Enter a valid email address'),
    password: z.string().min(4, 'Password must be at least 4 characters'),
    confirmPassword: z.string().min(4, 'Please confirm your password')
}).refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    error: 'Password doesnot match'
})

export const SignInSchema = z.object({
    email: z.email('Enter a valid email address'),
    password: z.string().min(4, 'Password must be at least 4 characters')
})