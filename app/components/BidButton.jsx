import { useState } from "react";
import BidModal from "./BidModal";

export default function BidButton () {
    const [open, setOpen] = useState(false)
    return (
        <>
        <button 
        	className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-3 py-1.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
			href="/details"
            onClick={() => setOpen(true)}
        	>Bid
        </button>
        <BidModal open ={open} setOpen={setOpen}/>
        </>
    )


}