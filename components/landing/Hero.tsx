import Image from "next/image";
import Link from "next/link";

function Hero() {
  return (
    <div>
      <div className="">
        <header className="relative flex max-w-screen-xl flex-col overflow-hidden px-4 py-4 text-gray-800 md:mx-auto md:flex-row md:items-center">
          <a
            href="#"
            className="flex items-center whitespace-nowrap text-2xl font-black"
          >
            <span className="mr-2 text-4xl text-gray-800">
              <Image
                src="/bulb.png"
                width={70}
                height={70}
                alt="Picture of the author"
              />
            </span>
            Shoppers
          </a>
          <input type="checkbox" className="peer hidden" id="navbar-open" />
          <label
            className="absolute top-5 right-7 cursor-pointer md:hidden"
            htmlFor="navbar-open"
          >
            <span className="sr-only">Toggle Navigation</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </label>
          <nav
            aria-label="Header Navigation"
            className="flex max-h-0 w-full flex-col items-center justify-between overflow-hidden transition-all peer-checked:mt-8 peer-checked:max-h-56 md:ml-24 md:max-h-full md:flex-row md:items-start"
          >
            <ul className="flex flex-col items-center space-y-2 md:ml-auto md:flex-row md:space-y-0">
              <li className="font-bold md:mr-12">
                <Link href="/register">SignUp</Link>
              </li>

              <li className="md:mr-12">
                <Link href="/sign-in">
                  <button className="rounded-full border-2 border-gray-900 px-6 py-1 text-gray-900 transition-colors hover:bg-blue-900 hover:text-white">
                    Login
                  </button>
                </Link>
              </li>
            </ul>
          </nav>
        </header>

        <div className="mx-auto h-full px-4 py-20 md:py-36 sm:max-w-xl md:max-w-full md:px-24 lg:max-w-screen-xl lg:px-8">
          <div className="flex flex-col items-center justify-between lg:flex-row">
            <div className=" ">
              <div className="lg:max-w-xl lg:pr-5">
                <p className="flex text-sm uppercase text-gray-800">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-1 inline h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  Your own shopping place.
                </p>
                <h2 className="mb-6 max-w-lg text-5xl font-light leading-snug tracking-tight text-gray-600 sm:text-7xl sm:leading-snug">
                  We make you feel
                  <span className="my-1 inline-block border-b-8 border-gray-600 bg-orange-400 px-4 font-bold text-white">
                    different
                  </span>
                </h2>
                <p className="text-base text-gray-700">
                  Buy and sell products you want. Get all the products you need
                  under one hood.
                </p>
              </div>
              <div className="mt-10 flex flex-col items-center md:flex-row">
                <a
                  href="/"
                  className="mb-3 inline-flex h-12 w-full items-center justify-center rounded bg-gray-700 px-6 font-medium tracking-wide text-white shadow-md transition hover:bg-blue-800 focus:outline-none md:mr-4 md:mb-0 md:w-auto"
                >
                  Stream Now{" "}
                </a>
              </div>
            </div>
            <div className="relative hidden lg:ml-32 lg:block lg:w-1/2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="my-6 mx-auto h-10 w-10 animate-bounce rounded-full bg-blue-50 p-2 lg:hidden"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16 17l-4 4m0 0l-4-4m4 4V3"
                />
              </svg>
              <div className="abg-orange-400 mx-auto w-fit overflow-hidden rounded-[6rem] rounded-br-none rounded-tl-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute -left-10 -top-20 h-28 w-28 rounded-xl bg-white text-yellow-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute right-0 -bottom-20 h-28 w-28 rounded-xl bg-white text-yellow-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z"
                    clip-rule="evenodd"
                  />
                </svg>
                <div className="flex w-96 flex-wrap">
                  <div className="h-48 w-1/2 rounded-full rounded-br-none bg-red-400"></div>
                  <div className="h-48 w-1/2 rounded-[6rem] rounded-br-none rounded-tl-none bg-violet-400"></div>
                  <div className="h-48 w-1/2 rounded-full rounded-b-none rounded-br-none bg-yellow-400"></div>
                  <div className="h-48 w-1/2 rounded-full rounded-t-none rounded-br-none bg-indigo-600"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
