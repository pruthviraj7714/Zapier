import { CreateAccount } from "@/components/Create-account";

const SignupPage = async () => {
  return (
    <div className="h-screen grid grid-cols-1 md:grid-cols-2 gap-8 items-center p-10 ">
      <div className="flex flex-col space-y-6 md:space-y-8">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          Join millions worldwide who automate their work using Zapier.
        </h1>
        <div className="flex items-center space-x-2">
          <span className="text-2xl">✅</span>
          <span className="text-lg md:text-xl">
            Easy setup, no coding required
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-2xl">✅</span>
          <span className="text-lg md:text-xl">
            Free forever for core features
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-2xl">✅</span>
          <span className="text-lg md:text-xl">
            14-day trial of premium features & apps
          </span>
        </div>
      </div>
      <div className="max-w-xl mx-auto border shadow-xl">
        <CreateAccount />
      </div>
    </div>
  );
};

export default SignupPage;
