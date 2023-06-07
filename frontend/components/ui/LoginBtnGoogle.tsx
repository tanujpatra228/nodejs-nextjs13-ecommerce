'use client'
import { signIn } from "next-auth/react";

const LoginBtnGoogle = () => {
    return (
        <>
            <button
                className="flex items-center justify-center px-4 py-2 space-x-2 transition-colors duration-300 border border-blue-700 rounded-md group hover:bg-blue-800 focus:outline-none"
                onClick={() => signIn('google')}
            >
                <span>
                    <svg viewBox="0 0 40 40" className="w-5 h-5 text-gray-800 fill-current group-hover:text-white">
                        <path d="M39.611 16.083H38V16H20V24H31.303C29.654 28.657 25.223 32 20 32C13.373 32 8 26.627 8 20C8 13.373 13.373 8 20 8C23.059 8 25.842 9.154 27.961 11.039L33.618 5.382C30.046 2.053 25.268 0 20 0C8.955 0 0 8.955 0 20C0 31.045 8.955 40 20 40C31.045 40 40 31.045 40 20C40 18.659 39.862 17.35 39.611 16.083Z" fill="#FFC107" />
                        <path d="M2.306 10.691L8.877 15.51C10.655 11.108 14.961 8 20 8C23.059 8 25.842 9.154 27.961 11.039L33.618 5.382C30.046 2.053 25.268 0 20 0C12.318 0 5.656 4.337 2.306 10.691Z" fill="#FF3D00" />
                        <path d="M20 40C25.166 40 29.86 38.023 33.409 34.808L27.219 29.57C25.1435 31.1484 22.6075 32.0021 20 32C14.798 32 10.381 28.683 8.717 24.054L2.195 29.079C5.505 35.556 12.227 40 20 40Z" fill="#4CAF50" />
                        <path d="M39.611 16.083H38V16H20V24H31.303C30.5142 26.2164 29.0934 28.1532 27.216 29.571L27.219 29.57L33.409 34.808C32.971 35.206 40 30 40 20C40 18.659 39.862 17.35 39.611 16.083Z" fill="#1976D2" />
                    </svg>
                </span>
                <span className="text-sm font-medium text-gray-800 group-hover:text-white">Login with Google</span>
            </button>
        </>
    )
}

export default LoginBtnGoogle;