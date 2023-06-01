import Link from 'next/link';
import { AiOutlineMenu } from 'react-icons/ai';
import { SocialIcon } from 'react-social-icons';
import Logo from './ui/Logo';

const NavBar = () => {
    return (
        <nav className="p-4 bg-blue-900 text-gray-200 fixed top-0 left-0 right-0 z-10 shadow-lg">
            <div className="px-4 sm:px-6 lg:px-10 m-auto flex justify-between items-center">
                <div className="flex items-center">
                    <i className="text-2xl fas fa-campground" />
                    <h1 className="font-serif tracking-wide font-bold text-xl">
                        <Logo />
                    </h1>
                </div>
                {/* MOBILE NAV ICON */}
                <div className="md:hidden block top-4 right-8 fixed">
                    <button aria-label="navigation" type="button" className="md:hidden text-gray-200 transition duration-300 focus:outline-none focus:text-white hover:text-white">
                        <AiOutlineMenu className="text-3xl" />
                    </button>
                </div>
                {/* NAVIGATION - LARGE SCREENS */}
                <div className="hidden md:flex">
                    <ul className="hidden md:flex">
                        <li className="text-lg pr-8 ">
                            <Link href="/" className='className="transition duration-300 focus:outline-none focus:text-yellow-500 focus:underline hover:underline hover:text-yellow-500'>Home</Link>
                        </li>
                        <li className="text-lg pr-8">
                            <Link href='/products' className='className="transition duration-300 focus:outline-none focus:text-yellow-500 focus:underline hover:underline hover:text-yellow-500'>Products</Link>
                        </li>
                        <li className="text-lg pr-8">
                            <Link href='/blog' className="transition duration-300 focus:outline-none focus:text-yellow-500 focus:underline hover:underline hover:text-yellow-500" style={{ textUnderlineOffset: 8 }}>Blog</Link>
                        </li>
                        <li className="text-lg pr-8">
                            <Link href='/contact' className="transition duration-300 focus:outline-none focus:text-yellow-500 focus:underline hover:underline hover:text-yellow-500" style={{ textUnderlineOffset: 8 }}>Contact</Link>
                        </li>
                    </ul>
                </div>
                <div className="hidden md:flex">
                    <SocialIcon url='https://www.facebook.com/m4m.co.za' fgColor='#ECECEC' bgColor='transparent' className='text-2xl pr-8' />
                    <SocialIcon url='https://www.linkedin.com/' fgColor='#ECECEC' bgColor='transparent' className='text-2xl pr-8' />
                    <SocialIcon url='https://www.instagram.com/' fgColor='#ECECEC' bgColor='transparent' className='text-2xl pr-8' />
                    <SocialIcon url='https://www.twitter.com/' fgColor='#ECECEC' bgColor='transparent' className='text-2xl pr-8' />
                </div>
            </div>
            {/* MOBILE MENU */}
            <div id="mobileMenu" className="hidden flex w-full mx-auto py-8 text-center">
                <div className="flex flex-col justify-center items-center w-full">
                    <a href="#" className="block text-gray-200 cursor-pointer py-3 transition duration-300 focus:outline-none focus:text-yellow-500 focus:underline hover:underline hover:text-yellow-500" style={{ textUnderlineOffset: 8 }}>Home</a>
                    <a href="#" className="block text-gray-200 cursor-pointer mt-1 py-3 transition duration-300 focus:outline-none focus:text-yellow-500 focus:underline hover:underline hover:text-yellow-500" style={{ textUnderlineOffset: 8 }}>About</a>
                    <a href="#" className="block text-gray-200 cursor-pointer mt-1 py-3 transition duration-300 focus:outline-none focus:text-yellow-500 focus:underline hover:underline hover:text-yellow-500" style={{ textUnderlineOffset: 8 }}>Blog</a>
                    <a href="#" className="block text-gray-200 cursor-pointer mt-1 py-3 transition duration-300 focus:outline-none focus:text-yellow-500 focus:underline hover:underline hover:text-yellow-500" style={{ textUnderlineOffset: 8 }}>Contact</a>
                </div>
            </div>
        </nav>
    )
}

export default NavBar;