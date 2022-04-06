import DropDown from "./DropDown";
import { useDispatch, useSelector } from "react-redux";
import { addItem, syncItems } from "../store/data-slice";
import { itemActions } from "../store/data-slice";


export default function AddItem() {
  const dispatch = useDispatch()
  const newItemName = useSelector((state) => state.data.setItemName)
  const newPrice = undefined;
  const newDescription = undefined;
  const newUrl = undefined;
  const alt_text = undefined;
  const category = undefined;
  const end_time = undefined;


  const handleSubmit = (e) => {
    return dispatch(addItem(body))
      .then(() => dispatch(syncItems()))
  }
  const body = {
    title: 'Couch',
    opening_bid: 450,
    description: 'large clean comfortable 3 seat sofa couch',
    url: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg',
    alt_text: 'a couch',
    category: 'Living Room',
    end_time: '2022-04-17T08:00:00.000Z',
  }

  return (
    <form onSubmit={handleSubmit}>
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
                onChange={(e) => dispatch(itemActions.setItemName(e.target.value))}
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
                onChange={(e) => body.description = e.target.value}
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
