import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-100">
      <div className="text-center space-y-6">
        <div className="text-6xl text-pink-500 flex justify-center space-x-4">
          <i className="fas fa-nail transform -rotate-45"></i>
          <i className="fas fa-exclamation-triangle"></i>
          <i className="fas fa-nail transform rotate-45"></i>
        </div>
        <h1 className="text-4xl font-bold text-pink-700">
          Oops! Page Not Found
        </h1>
        <p className="text-xl text-pink-600">
          Looks like this page has chipped away!
        </p>
        <Link
          href="/"
          className="inline-block bg-pink-500 text-white px-6 py-3 rounded-full hover:bg-pink-600 transition duration-300"
        >
          Go back to homepage
        </Link>
      </div>
    </div>
  );
}
