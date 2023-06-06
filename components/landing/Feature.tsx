function Feature() {
  return (
    <div>
      <div className="bg-gray-800 mx-auto py-10 grid max-w-screen-xl grid-cols-1 text-white pl-6 pr-4 sm:px-20 lg:grid-cols-3">
        <div className="col-span-1 flex flex-col justify-center text-center sm:text-left md:pr-10">
          <h1 className="mb-6 text-4xl text-white">Things you can do here</h1>
          <p className="text-gray-400">
            You can buy your essentials from here any time. We sell everything a
            man needs.
          </p>
        </div>
        <div className="col-span-2 mt-10 grid grid-cols-1 gap-6 rounded-2xl bg-gray-600 p-5 sm:p-10 md:grid-cols-2 lg:mt-0">
          <div className="relative flex gap-5">
            <div className="absolute -left-12 sm:left-auto flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-lg text-gray-500 sm:relative md:bg-transparent md:text-5xl">
              01
            </div>
            <div className="">
              <h3 className="text-xl font-semibold">Men's clothing </h3>
              <p className="text-gray-400 mt-3">
                We have collection of men wear which are in current trend
              </p>
            </div>
          </div>
          <div className="relative flex gap-5">
            <div className="absolute -left-12 sm:left-auto flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-lg text-gray-500 sm:relative md:bg-transparent md:text-5xl">
              02
            </div>
            <div className="">
              <h3 className="text-xl font-semibold">Electornics</h3>
              <p className="text-gray-400 mt-3">
                We have collections of daily gadgets a man would need like watch
                and smart phones
              </p>
            </div>
          </div>
          <div className="relative flex gap-5">
            <div className="absolute -left-12 sm:left-auto flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-lg text-gray-500 sm:relative md:bg-transparent md:text-5xl">
              03
            </div>
            <div className="">
              <h3 className="text-xl font-semibold">Fragrancces</h3>
              <p className="text-gray-400 mt-3">
                We collect fragrances from abroad that are best of its quality
              </p>
            </div>
          </div>
          <div className="relative flex gap-5">
            <div className="absolute -left-12 sm:left-auto flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-lg text-gray-500 sm:relative md:bg-transparent md:text-5xl">
              04
            </div>
            <div className="">
              <h3 className="text-xl font-semibold">Amount not fixed</h3>
              <p className="text-gray-400 mt-3">
                You can buy any product of any amount as long as its available
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Feature;
