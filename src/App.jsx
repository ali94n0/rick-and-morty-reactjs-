
import "./App.css";
import CharactersList from "./components/CharectersList";
import Navbar, { Favourite, Results, Search } from "./components/Navbar";

import CharacterDetails from "./components/CharacterDetails";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./components/Loader";
import toast, { Toaster } from "react-hot-toast";


function App(){
  const[characters,setCharacters] = useState([]);
  const [isLoading,setIsLoading] = useState(false);
  const [query , setQuery]=useState("");
  const[selectedId,setSelectedId] = useState(null);
  const[favourites, setFavourites]=useState(()=>JSON.parse(localStorage.getItem("favourites")) || []);

  useEffect(()=>{
    const controler =new AbortController();
    const signal = controler.signal;
      const fetchAllCharacters = async()=>{
        try {
          setIsLoading(true);
     
        const {data}=await axios.get(`https://rickandmortyapi.com/api/character/?name=${query}`,{signal});
        setCharacters(data.results.slice(0,5))

        } catch (error) {
          setCharacters([])
          toast.error(error.response.data.error)
        }finally{
          setIsLoading(false)
        }
      
      }

      if(query.length < 3){
        setCharacters([])
        return;
      }
      fetchAllCharacters();

return ()=>{
  controler.abort()
}

      },[query]);

      useEffect(()=>{
        localStorage.setItem("favourites", JSON.stringify(favourites));
      },[favourites])
      

      const onSelectCharacter = (id)=>{
        setSelectedId((prevId => prevId === id ? null : id))
      }

      const onAddFavourite=(character)=>{
        setFavourites(prevFav=> [...prevFav , character]);
        

      }

      const isFavourite=favourites.map(fav=>fav.id).includes(selectedId)

      const deleteHandler = (id)=>{
        setFavourites((prevFav)=>prevFav.filter((i) => i.id !== id))
      }

  return <div>
    
    <Toaster/>
    <Navbar>
      <Search query={query} setQuery={setQuery}/>
      <Results numOfResult={characters.length}/>
      <Favourite favourites={favourites} deleteHandler={deleteHandler}/>
    </Navbar>
    <div className="main">
       <CharactersList allCharacters={characters} isLoading={isLoading} onSelectCharacter={onSelectCharacter} selectedId={selectedId}/>
      
      <CharacterDetails selectedId={selectedId} onAddFavourite={onAddFavourite} isFavourite={isFavourite}/>
    </div>
  </div>
}

export default App;