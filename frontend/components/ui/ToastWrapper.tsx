'use client'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ToastWrapper = () => {
    return (
        <>
            {<ToastContainer limit={1} autoClose={1000} position='bottom-right' pauseOnFocusLoss={false} pauseOnHover={false} />}
        </>
    )
}

export default ToastWrapper