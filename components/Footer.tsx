import Link from "next/link";

export default function Footer() {
  return (
    <footer className=" bg-black text-gray-300 text-base">
      <div className=" p-10 mx-auto max-w-screen-xl flex flex-wrap flex-row items-center justify-between gap-8">
        <div className=" w-fit">
          <h4 className="text-white font-bold mb-3 text-lg">Company</h4>
          <ul className="space-y-2 text-base">
            <li>
              {" "}
              <Link href="/#about">About</Link>
            </li>
            <li>
              {" "}
              <Link href="/#features">Features</Link>
            </li>
            <li>
              {" "}
              <Link href="/pricing">Pricing</Link>
            </li>
            <li>
              {" "}
              <Link href="/pricing">Agents</Link>
            </li>
          </ul>
        </div>
        {/* <div className="w-fit">
          <h4 className="text-white font-bold mb-3 text-lg ">Resources</h4>
          <ul className="space-y-2 text-base">
            <li>Case Studies</li>
            <li>Webinars</li>
            <li>Developer</li>
            <li>Documentation</li>
          </ul>
        </div> */}
        <div className="w-fit">
          <h4 className="text-white font-bold mb-3 text-lg">App</h4>
          <ul className="space-y-2 text-base">
            <li>
              {" "}
              <Link href="/sign-in">Sign In</Link>
            </li>
            <li>
              {" "}
              <Link href="/sign-up">Sign Up</Link>
            </li>
            <li>
              {" "}
              <Link href="/contact-us">Contact us</Link>
            </li>
            <li>
              <Link href="/privacy-policy">Privacy Policy</Link>
            </li>
          </ul>
        </div>

        {/* Email Subscription Section */}
        <div className=" flex flex-col w-full md:w-[400px] shrink-0 ">
          <h4 className="text-white font-bold mb-3 text-base text-center md:text-left">
            Subscribe To Newsletter
          </h4>
          <div className="flex flex-col md:flex-row items-center md:items-end gap-3 w-full">
            <input
              type="email"
              placeholder="Enter Email Address"
              className="p-4 bg-gray-800 rounded-lg w-full md:w-72 text-white placeholder-gray-400 text-base transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:bg-gray-700"
            />
            <button className="bg-indigo-500 px-6 py-4 text-white font-bold rounded-lg text-base transition-all duration-300 hover:bg-indigo-600 hover:scale-105 w-full md:w-auto">
              SUBSCRIBE
            </button>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <hr className="border-teal-800/30 my-8" />
      <p className="text-center text-lg mb-8">
        CopyRight &copy; 2025 AgentDispatch
      </p>
    </footer>
  );
}
