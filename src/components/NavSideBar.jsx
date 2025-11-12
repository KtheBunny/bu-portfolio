export default function NavSideBar() {
  return (
    <>
      <nav className="h-screen w-14 fixed top-0 left-0 z-50 flex flex-col justify-center bg-gradient-to-b from-gray-900 to-gray-800 border-r items-center py-4 space-y-4">
        <a
          className="flex p-3 rounded-lg bg-gray-600"
          href="#"
        >
          <span className="material-icons text-white">
            home
          </span>
        </a>
        <a className="flex p-3 rounded-lg" href="#">
          <span className="material-icons text-gray-500">
            explore
          </span>
        </a>
        <a className="flex p-3 rounded-lg" href="#">
          <span className="material-icons text-gray-500">
            bookmark
          </span>
        </a>
        <a className="flex p-3 rounded-lg" href="#">
          <span className="material-icons text-gray-500">
            settings
          </span>
        </a>
      </nav>
    </>
  );
}
