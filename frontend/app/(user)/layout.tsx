import VerticalMenu from "@/components/VerticalMenu";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import LoginForm from "@/components/LoginForm";

const AccountLayout = async ({
    children,
}: {
    children: React.ReactNode
}) => {
    const session = await getServerSession(authOptions);

    const links = [
        {
            label: 'Dashboard',
            href: '/dashboard'
        },
        {
            label: 'Order history',
            href: '/order-history'
        },
        {
            label: 'Logout',
            href: '#logout'
        },
    ];
    return (
        <>
            <section className="mt-32 mx-auto px-4 sm:px-6 lg:px-8">
                <div className="container mx-auto mt-10">
                    <div className="shadow-md my-10 lg:grid lg:grid-cols-6 lg:divide-x lg:p-6">
                        <div className="relative bg-white p-2 lg:p-6 lg:col-span-2">
                            {
                                !session && (
                                    <div className="absolute top-0 right-0 w-full h-full z-10 bg-white/70 flex justify-center items-center">
                                        <h4 className="text-2xl font-semibold text-center"><i>👉</i><br />Login to access Dashboard!</h4>
                                    </div>
                                )
                            }
                            <div className={`${!session ? 'blur-sm' : 'blur-none'}`}>
                                <VerticalMenu links={links} disableAllLinks={!session ? true : false} />
                            </div>
                        </div>
                        <div className="bg-white p-2 lg:p-6 lg:col-span-4">
                            <div className="">
                                {!session ? <LoginForm /> : children}
                            </div>
                        </div>
                    </div>
                </div>
            </section >
        </>
    );
}
export default AccountLayout;