import ProfileForm from "@/components/user/ProfileForm";

type Props = {}

const Dashboard = async (props: Props) => {

    return (
        <>
            <div className="flex justify-between border-b pb-8">
                <h1 className="font-semibold text-2xl">Edit Details</h1>
            </div>
            <div className="user-details p-6">
                <ProfileForm />
            </div>
        </>
    )
}

export default Dashboard