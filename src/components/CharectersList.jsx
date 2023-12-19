import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import Loader from "./Loader";


function CharactersList({allCharacters,isLoading,onSelectCharacter,selectedId}) {
    return (
        <div className="characters-list">
            {isLoading ? <Loader/> : allCharacters.map(item =>(<Character key={item.id} item={item} >
                <button className="icon red" onClick={()=>onSelectCharacter(item.id)}>
                {selectedId === item.id ? <EyeSlashIcon/> :<EyeIcon/>}
            </button>
            </Character>
            ))}
        </div>
    );
}

export default CharactersList;



export const Character = ({item,children}) => {
    return (
        <div className="list__item">
            <img src={item.image} alt={item.name}/>
            <CharacterName item={item}/>
            <CharacterInfo item={item}/>
            {children}
        </div>
    );
};

const CharacterName = ({item})=>{
return <h3 className="name">
                <span>{item.gender === "Male" ? "👱🏻‍♂️" : "👩🏻‍🦳"}</span> 
                <span > {item.name}</span>
            </h3>
}

const CharacterInfo =({item})=>{
return <div className="list-item__info info">
                <span className={`status ${item.status === "Dead" ? "red" : ""}`}></span>
                <span > {item.status}</span>
                <span> - {item.species}</span>
            </div>
}
