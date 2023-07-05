'use client'

import { useFormik } from "formik";
import { useSession } from "next-auth/react";
import * as Yup from "yup";

type Props = {}

const ProfileForm = async (props: Props) => {
    const session = await useSession();
    const user = session?.data?.user;

    const formik = useFormik({
        initialValues: {
            name: user?.name || '',
            email: user?.email || '',
            phone: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Please fill out this field.'),
            email: Yup.string().email('Please enter a valid email.').required('Please fill out this field.'),
            phone: Yup.string().required('Please fill out this field.').min(10, 'Please enter a valid phone number.').max(10, 'Please enter a valid phone number.'),
        }),
        onSubmit: (values) => {
            console.log('values', values);
        }
    });
    return (
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={formik.handleSubmit}>
            <div className="px-3 mb-6 md:mb-0 flex flex-col">
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    placeholder="Tanuj Patra"
                    id="name"
                    name="name"
                    className="p-2 border-b transition delay-100 focus:outline-none focus:border-blue-800"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                />
                <p className={`text-red-500 text-xs italic ${formik.errors.name && formik.touched.name ? 'opacity-100' : 'opacity-0'}`}>{formik?.errors?.name || ''}</p>
            </div>
            <div className="px-3 mb-6 md:mb-0 flex flex-col">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    placeholder="email@email.com"
                    id="email"
                    name="email"
                    className="p-2 border-b transition delay-100 focus:outline-none focus:border-blue-800"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                />
                <p className={`text-red-500 text-xs italic ${formik.errors.email && formik.touched.email ? 'opacity-100' : 'opacity-0'}`}>{formik?.errors?.email || ''}</p>
            </div>
            <div className="px-3 mb-6 md:mb-0 flex flex-col">
                <label htmlFor="phone">Phone No.</label>
                <input
                    type="text"
                    placeholder="9876543210"
                    id="phone"
                    name="phone"
                    className="p-2 border-b transition delay-100 focus:outline-none focus:border-blue-800"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                />
                <p className={`text-red-500 text-xs italic ${formik.errors.phone && formik.touched.phone ? 'opacity-100' : 'opacity-0'}`}>{formik?.errors?.phone || ''}</p>
            </div>

            <div className="md:col-span-2 text-right">
                <input type="submit" value="Save" className="px-6 py-2 bg-blue-800 text-lg text-white rounded-md" />
            </div>
        </form>
    )
}

export default ProfileForm;