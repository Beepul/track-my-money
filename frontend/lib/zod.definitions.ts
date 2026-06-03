import { File } from 'buffer';
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


export const AddTransactionSchema = z.object({
    title: z.string().min(3, "Title must be greater than 3 characters"),
    amount: z.coerce.number().min(1, "Amount must be greater than 0"),
    note: z.string().optional(),
    type: z.enum(["INCOME", "EXPENSE"]),
    categoryId: z.string().min(1, "Category is required"),
    date: z.coerce.date({ message: "Invalid date" }),
    image: z.instanceof(Blob).optional()
});