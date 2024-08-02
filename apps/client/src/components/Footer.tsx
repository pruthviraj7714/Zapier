import Link from "next/link";

export default function Footer() {
  return (
    <div className="flex justify-between items-center p-6 bg-gray-100 border-t border-gray-400 dark:bg-gray-900 dark:border-gray-700 transition-colors">
      <Link href="/">
        <div className="text-2xl font-extrabold flex items-center text-black dark:text-white">
          <span className="text-orange-500">_</span>Zapier
        </div>
      </Link>
      <div className="flex space-x-6">
        <div className="text-sm text-gray-600 dark:text-gray-400 transition-colors">© 2024 Zapier Inc.</div>
        <div className="text-sm hover:text-blue-500 dark:hover:text-blue-400 cursor-pointer transition-colors">
          Manage Cookies
        </div>
        <div className="text-sm hover:text-blue-500 dark:hover:text-blue-400 cursor-pointer transition-colors">
          Legal
        </div>
        <div className="text-sm hover:text-blue-500 dark:hover:text-blue-400 cursor-pointer transition-colors">
          Privacy
        </div>
      </div>
    </div>
  );
}
