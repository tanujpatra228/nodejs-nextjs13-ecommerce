import Logo from "@/components/ui/Logo";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Redirect from "@/components/ui/Redirect";
import LoginForm from "@/components/LoginForm";

const page = async () => {
    const session = await getServerSession(authOptions);
    if (session) {
        return <Redirect to={'/'} />
    }

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
                <LoginForm />
            </div>
        </section>
    )
}

export default page