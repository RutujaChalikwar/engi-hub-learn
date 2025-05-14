
import SignUpForm from "@/components/auth/SignUpForm";

const SignUp = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-edu-primary">EduEngineer</h1>
          <p className="mt-2 text-gray-600">Engineering education platform</p>
        </div>
        <SignUpForm />
      </div>
    </div>
  );
};

export default SignUp;
