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
            href: '/account/'
        },
        {
            label: 'Order history',
            href: '/order-history/'
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
                    <div className="flex shadow-md my-10 divide-x">
                        <div className="w-1/4 bg-white px-10 py-10 relative">
                            {
                                !session && (
                                    <div className="absolute top-0 right-0 w-full h-full z-10 bg-white/70 flex justify-center items-center">
                                        <h4 className="text-2xl font-semibold text-center"><i>👉</i><br />Login to access Dashboard!</h4>
                                    </div>
                                )
                            }
                            <div className={`${!session ? 'blur-sm' : 'blur-none'}`}>
                                <VerticalMenu links={links} />
                            </div>
                        </div>
                        <div className="w-3/4 bg-white px-10 py-10">
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