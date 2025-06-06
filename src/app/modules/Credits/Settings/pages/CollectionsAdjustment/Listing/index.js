import React from "react";
import {ListingTable} from "./ListingTable";

export default function Listing({installments, setModalInfo, openModal}) {

    return (
        <div className='mt-10'>
            <ListingTable 
                cuotesData={installments} 
                setModalInfo={setModalInfo}
                openModal={openModal} 
            />
        </div>
    )
}