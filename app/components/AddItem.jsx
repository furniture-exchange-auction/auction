import DropDown from "./DropDown";
export default function AddItem() {

  return (
    <form>
      <div class="bg-indigo-50 min-h-screen md:px-20 pt-6">
        <div class=" bg-white rounded-md px-6 py-10 max-w-2xl mx-auto">
          <h1 class="text-center text-2xl font-bold text-gray-500 mb-10">
            ADD ITEM
          </h1>
          <div class="space-y-4">
            <div>
              <label for="title" class="text-lx font-serif">
                Title of Listing:
              </label>
              <input
                type="text"
                placeholder="title"
                id="title"
                class="ml-2 outline-none py-1 px-2 text-md border-2 rounded-md"
              />
            </div>
            <div>
              <label for="description" class="block mb-2 text-lg font-serif">
                Description:
              </label>
              <textarea
                id="description"
                cols="30"
                rows="10"
                placeholder="write here..."
                class="w-full h-20 font-serif  p-4 text-gray-600 bg-indigo-50 outline-none rounded-md"
              ></textarea>
            </div>
            <div>
              <label for="name" class="text-lx font-serif">
                Name:
              </label>
              <input
                type="text"
                placeholder="name"
                id="name"
                class="ml-2 outline-none py-1 px-2 text-md border-2 rounded-md"
              />
            </div>
            <div>
              <DropDown />
            </div>
            <div>
              <button
                id="dropdownDefault"
                data-dropdown-toggle="dropdownId"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="button"
              >
                Dropdown button{" "}
                <svg
                  class="ml-2 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>
              <div
                id="dropdown"
                class="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700"
              >
                <ul
                  class="py-1 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownDefault"
                >
                  <li>
                    <a
                      href="#"
                      class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Dashboard
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Settings
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Earnings
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Sign out
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div>
              <label for="email" class="text-lx font-serif">
                Start Price:
              </label>
              <input
                type="text"
                placeholder="price"
                id="email"
                class="ml-2 outline-none py-1 px-2 text-md border-2 rounded-md"
              />
            </div>
            <button class=" px-6 py-2 mx-auto block rounded-md text-lg font-semibold text-indigo-100 bg-indigo-600  ">
              ADD ITEM
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
