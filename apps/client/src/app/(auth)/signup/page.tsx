import { CreateAccount } from "@/components/Create-account";
import authOptions from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";


const SignupPage = async () => {
  const session = await getServerSession(authOptions);
  if (session?.user) {
    redirect('/');
  }
  return (
  <div className="flex justify-center items-center h-screen">
    <CreateAccount />
  </div>
  )
};

export default SignupPage;