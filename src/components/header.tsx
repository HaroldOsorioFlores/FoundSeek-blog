export function Header() {
  return (
    <header className="bg-white dark:bg-gray-800 shadow font-g ">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          FoundSeek
        </h1>
        {/* <div className="relative">
        <Input
          type="search"
          placeholder="Buscar artículos..."
          className="pl-10 pr-4 py-2 rounded-full"
        />
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={20}
        />
      </div> */}
      </div>
    </header>
  );
}
