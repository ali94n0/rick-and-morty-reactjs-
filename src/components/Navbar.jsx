import {HeartIcon, TrashIcon} from "@heroicons/react/24/outline"
import { useState } from "react";
import Modal from "./Modal";
import { Character } from "./CharectersList";

function Navbar({children}) {
    return (
        <div className="navbar">
            <Logo/>
            {children}
            
        </div>
    );
}

export default Navbar;

const Logo =()=>{
return(<div className="navbar__logo">LOGO😍</div>)
}

export const Search = ({query,setQuery})=>{
    return(<input value={query} onChange={(e)=>setQuery(e.target.value)} className="text-field" type="text" placeholder="search ..."/>)
}

export const Results = ({numOfResult})=>{
    return (<div className="navbar__result">Found {numOfResult} Results</div>)
}

export const Favourite = ({favourites,deleteHandler})=>{
    const[isOpen,setIsOpen] = useState(false);
    console.log(isOpen);
    return(
        <>
    <Modal  favourites={favourites} isOpen={isOpen} onOpen={setIsOpen} title={"Favourite List"}>
    {favourites.map(item=><Character item={item}>
            <button className="icon red" onClick={()=>deleteHandler(item.id)}>
                <TrashIcon />
            </button>
        </Character>)}
    </Modal>
    <button className="heart" onClick={()=>setIsOpen((is)=>!is)}>
    <HeartIcon className="icon"/>
    <span className="badge">{favourites.length}</span>

    </button>
        </>)
}