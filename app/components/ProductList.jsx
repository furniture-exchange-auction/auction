import BidButton from "./BidButton"
import { useDispatch, useSelector, useEffect } from "react-redux";
import { addItem, syncItems } from "../store/data-slice";
import { itemActions } from "../store/data-slice";

// 

const products = [
	{
		id: 1,
		name: 'Lucious Leather Beauty',
		href: `/#`,
		price: '$250',
		imageSrc: 'https://i.ibb.co/yXfbTBS/Screen-Shot-2022-04-06-at-5-29-38-PM.png',
		imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
	},
	{
		id: 2,
		name: 'Big Comfy Couch',
		href: `/#`,
		price: '$35',
		imageSrc: 'https://i.ibb.co/JFMfBPQ/241643209-4239842692801659-2963176905711158749-n.jpg',
		imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
	},
	{
		id: 3,
		name: "Tony's Special 😏",
		href: `/#`,
		price: '$89',
		imageSrc: 'https://i.ibb.co/Y0ny6z4/Screen-Shot-2022-04-06-at-5-28-02-PM.png',
		imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
	},
	{
		id: 4,
		name: 'Couch McGouch',
		href: `/#`,
		price: '$35',
		imageSrc: 'https://i.ibb.co/dPF31mQ/225899990-1087541161775037-3136387870647082841-n.jpg',
		imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
	},
	{
		id: 5,
		name: 'Honeymoon Couch - Made Memories - So Can You',
		href: `/#`,
		price: '$35',
		imageSrc: 'https://i.ibb.co/2tTtN3B/Screen-Shot-2022-04-06-at-5-27-22-PM.png',
		imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
	},
	{
		id: 6,
		name: 'Just a couch, nothing more',
		href: `/#`,
		price: '$35',
		imageSrc: 'https://i.ibb.co/pXKmqgz/243610086-4711755655515370-2651042183182798279-n.jpg',
		imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
	},
	{
		id: 7,
		name: 'MUST GO NOW FBI HEAT HIGH BEST OFFER',
		href: `/#`,
		price: '$25',
		imageSrc: 'https://i.ibb.co/4R4R1YD/246466117-4877627662295514-3924816169154942115-n.jpg',
		imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
	},
	{
		id: 8,
		name: 'Couch of Dreams',
		href: `/#`,
		price: '$35',
		imageSrc: 'https://i.ibb.co/S3mNxtV/249938842-1146247739237712-6432707952832045666-n.jpgg',
		imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
	}
	// More products...
]

export default function ProductList() {

// 	const products = useSelector((state) => state.data.items)
// 	console.log(products)

	


	return (
		<div className="bg-white">
			<div className="max-w-2xl mx-auto py-10 px-4 sm:py-6 sm:px-6 lg:max-w-7xl lg:px-8">
				<h2 className="sr-only">Products</h2>
				<div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
					{products.map((product) => (
						<a className="group">
							<div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
								<img
									src={product.imageSrc}
									alt={product.imageAlt}
									className="w-full h-full object-center object-cover group-hover:opacity-75"
								/>
							</div>
							<h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
							<div >
							  <span className="mt-1 text-lg font-medium text-gray-900">{product.price}</span>
							  <div className="inline pl-2">
							    <BidButton/>
							  </div>
							</div>	
						</a>
					))}
				</div>
			</div>
		</div>
	)
}