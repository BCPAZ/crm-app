const Tabs = () => {
  return (
    <ul className="flex flex-wrap -mb-px px-5 border-b border-grey/20">
          <li className="me-2">
            <a
              href="#"
              className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
            >
              Profile
            </a>
          </li>
          <li className="me-2">
            <a
              href="#"
              className="inline-block p-4 text-black border-b-2 border-black rounded-t-lg active"
              aria-current="page"
            >
              Dashboard
            </a>
          </li>
          <li className="me-2">
            <a
              href="#"
              className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
            >
              Settings
            </a>
          </li>
          <li className="me-2">
            <a
              href="#"
              className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
            >
              Contacts
            </a>
          </li>
        </ul>
  )
}

export default Tabs