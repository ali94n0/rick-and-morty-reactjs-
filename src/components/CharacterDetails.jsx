import { ArrowUpCircleIcon } from "@heroicons/react/24/outline";
import { character,episodes } from "../../data/data";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./Loader";
import toast from "react-hot-toast";
function CharacterDetails({selectedId,onAddFavourite,isFavourite}) {
    const[isLoading,setIsLoading] = useState(false)
    const [character,setCharacter] = useState(null)
    const [episodes,setEpisodes] = useState([])
    useEffect(()=>{
        const fetchCharacter = async()=>{
            try {
                setIsLoading(true);
                const {data} = await axios.get(`https://rickandmortyapi.com/api/character/${selectedId}`);

                setCharacter(data)
                const episodesId = data.episode.map(e=> e.split("/").at(-1));
                const{data : episodes} = await axios.get(`https://rickandmortyapi.com/api/episode/${episodesId}`)
                setEpisodes([episodes].flat().slice(0,5))

                
            } catch (error) {
                toast.error(error.response.data.error)
                setCharacter(null)
            }finally{ 
                setIsLoading(false)
            }
        }
        if(selectedId){fetchCharacter()}

    },[selectedId])

    if(!character || !selectedId){
        return(<p style={{flex:1 , color:"white"}} >please select a character</p>)
    }
    return (
        <>
        {isLoading ? <div style={{flex:1}}><Loader /></div> : <div style={{flex:1}}>
    <CharacterDetail character={character} onAddFavourite={onAddFavourite} isFavourite={isFavourite}/>
    <CharacterEpisodes episodes={episodes}/>
</div>}
        </>
    );}

export default CharacterDetails;

const CharacterDetail = ({character,onAddFavourite,isFavourite})=>{
    return <div className="character-detail">
    <img src={character.image} alt={character.name} className="character-detail__img"/>
    <div className="character-detail__info">
    <h3 className="name">
        <span>{character.gender === "Male" ? "👱🏻‍♂️" : "👩🏻‍🦳"}</span>
        <span> {character.name}</span>
    </h3>
    <div className="info">
        <span className={`status ${character.status === "Dead" ? "red" : ""}`}></span>
        <span> {character.status}</span>
        <span> - {character.species}</span>
    </div>
    <div className="location">
        <p>Last Known Location:</p>
        <p>{character.location.name}</p>
    </div>
    <div className="action">
        {isFavourite ? <p style={{color:"var(--slate-200)"}}>Already added in Favourites ✅</p> : <button onClick={()=>onAddFavourite(character)} className="btn btn--primary">Add to Favourite</button>}
        
    </div>
    </div>
</div>
}

const CharacterEpisodes = ({episodes})=>{
    const[sort,setSort]= useState(true);
 

 let sortedEpisodes;

 if(sort){
    sortedEpisodes = [...episodes].sort((a,b)=> new Date(a.created) - new Date(b.created) )
 }else{
    sortedEpisodes = [...episodes].sort((a,b)=> new Date(b.created) - new Date(a.created) )
 }
    
return <div className="character-episodes">
<div className="title">
    <h2>List of Episodes:</h2>
    <button onClick={()=>setSort((prev)=>!prev)} >
        <ArrowUpCircleIcon className="icon" style={{rotate : sort ? "180deg" : ""}}/>
    </button>
</div>
<ul>
    {sortedEpisodes.map((item,index) => (<li key={item.id}>
        <div>
            {String(index+1).padStart(2,"0")} - {item.episode} : <strong>{item.name}</strong>
        </div>
        <div className="badge badge--secondary">{item.air_date}</div>
    </li>))}
</ul>
</div>
}