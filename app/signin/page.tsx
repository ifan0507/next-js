import { LoginGoogleButton } from "@/components/login-button";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
};

const SignInPage = async ({ searchParams }: { searchParams?: Promise<{ redirect_url?: string }> }) => {
  const params = (await searchParams)?.redirect_url;
  let redirecturl;
  if (!params) {
    redirecturl = "/";
  } else {
    redirecturl = `/${params}`;
  }
  return (
    <div className="min-h-screen flex items-center">
      <div className="bg-white w-96 mx-auto rounded-sm shadow p-8">
        <h1 className="text-4xl font-bold mb-1">Sign In</h1>
        <p className="font-medium mb-5 text-gray-500">Sign in to your account</p>
        <div className="py-4 text-center">
          <LoginGoogleButton redirectUrl={redirecturl} />
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
