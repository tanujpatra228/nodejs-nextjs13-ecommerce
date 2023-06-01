'use client'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ToastWrapper = () => {
    return (
        <>
            {<ToastContainer limit={1} />}
        </>
    )
}

export default ToastWrapper