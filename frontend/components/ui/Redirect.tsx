'use client'
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation"

type Props = {
    to: string;
}
const Redirect = ({ to = '/' }: Props) => {
    const router = useRouter();
    const { data: session } = useSession();
    if (session) {
        router.back();
    }
    return <></>
}

export default Redirect;