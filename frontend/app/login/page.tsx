import LoginBtnGoogle from "@/components/ui/LoginBtnGoogle";
import Logo from "@/components/ui/Logo";

const page = () => {
    return (
        <section className="flex items-center min-h-screen mx-auto bg-gray-100 lg:justify-center px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col overflow-hidden bg-white rounded-md shadow-lg max md:flex-row md:flex-1 lg:max-w-screen-md">
                <div className="p-4 py-6 text-white bg-blue-900 md:w-80 md:flex-shrink-0 md:flex md:flex-col md:items-center md:justify-evenly">
                    <div className="my-3 text-4xl font-bold tracking-wider text-center">
                        <Logo />
                    </div>
                    <p className="mt-6 font-normal text-center text-gray-300 md:mt-0">
                        With the power of K-WD, you can now focus only on functionaries for your digital products, while leaving the
                        UI design on us!
                    </p>
                    <p className="flex flex-col items-center justify-center mt-10 text-center">
                        <span>Don't have an account?</span>
                        <a href="#" className="underline">Get Started!</a>
                    </p>
                    <p className="mt-6 text-sm text-center text-gray-300">
                        Read our <a href="#" className="underline">terms</a> and <a href="#" className="underline">conditions</a>
                    </p>
                </div>
                <div className="p-5 bg-white md:flex-1">
                    <h3 className="my-4 text-2xl font-semibold text-gray-700">Account Login</h3>
                    <form action="#" className="flex flex-col space-y-5">
                        <div className="flex flex-col space-y-1">
                            <label htmlFor="email" className="text-sm font-semibold text-gray-500">Email address</label>
                            <input
                                type="email"
                                id="email"
                                className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                            />
                        </div>
                        <div className="flex flex-col space-y-1">
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="text-sm font-semibold text-gray-500">Password</label>
                                <a href="#" className="text-sm text-blue-600 hover:underline focus:text-blue-800">Forgot Password?</a>
                            </div>
                            <input
                                type="password"
                                id="password"
                                className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                            />
                        </div>
                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                id="remember"
                                className="w-4 h-4 transition duration-300 rounded focus:ring-2 focus:ring-offset-0 focus:outline-none focus:ring-blue-200"
                            />
                            <label htmlFor="remember" className="text-sm font-semibold text-gray-500">Remember me</label>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-blue-200 focus:ring-4"
                            >
                                Log in
                            </button>
                        </div>
                    </form>
                    <div className="flex flex-col space-y-5 mt-5">
                        <span className="flex items-center justify-center space-x-2">
                            <span className="h-px bg-gray-400 w-14"></span>
                            <span className="font-normal text-gray-500">or login with</span>
                            <span className="h-px bg-gray-400 w-14"></span>
                        </span>
                        <div className="flex flex-col space-y-4">
                            <LoginBtnGoogle />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default page