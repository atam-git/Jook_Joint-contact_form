import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function SuccessPage() {
  const location = useLocation();
  const userName = location.state?.userName || "User";
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl font-bold mb-4">Thank You {userName} ❤</h1>
      <p className="text-lg mb-4">
        Your message was sent successfully, we’ll keep you updated.
      </p>
      <p className="text-base mb-6 text-gray-300">
        We promise not to spam you. You’ll only hear from us when it matters 😁.
      </p>
      <Link
        to="/"
        className="bg-[#fd7f0c] hover:bg-[#5a55c7] text-white px-6 py-3 rounded-full text-lg"
      >
        Go Back
      </Link>
    </div>
  );
}
