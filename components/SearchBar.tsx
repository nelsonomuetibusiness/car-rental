"use client"


import react, { useState } from "react"
import { SearchManufacturer } from "./"
import Image from "next/image"
import { Router } from "next/router"
import { useRouter } from "next/navigation"




const SearchButton = ({ otherClasses }: { otherClasses: string }) => (
  <button type="submit" className={`-ml-3 z-10 ${otherClasses}`}>
    <div className="flex justify-between">
    <Image src="/magnifying-glass.svg" alt="magnifying glass" width={40} height={40} className="object-contain" />
    <p className="font-bold mt-2">search</p>
    </div>
    
  </button>
)

const SearchBar = () => {
  const [manufacturer, setManufacturer] = useState('');
  const [model, setModel] = useState("")
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (manufacturer === '' && model === '') {
      return alert('Please fill in the search bar')
    }

    updateSearchParams(model.toLowerCase(), manufacturer.toLowerCase());

  };

  const updateSearchParams = (model: string, manufacturer: string) => {
    const searchParams = new URLSearchParams(window.location.search);

    if (model) {
      searchParams.set('model', model)
    } else {
      searchParams.delete('model')
    }

    if (manufacturer) {
      searchParams.set('manufacturer', manufacturer)
    } else {
      searchParams.delete('manufacturer')
    }

    const newPathname = `${window.location.pathname}?${searchParams.toString()}`;


    router.push(newPathname, {scroll: false});

  }



  return (
    <form className='searchbar' onSubmit={handleSearch}>
      <div className="searchbar__item">
        <SearchManufacturer manufacturer={manufacturer} setManufacturer={setManufacturer} />

        
      </div>

      <div>
        <Image src="/model-icon.png" alt="car model" width={25} height={25} className="absolute w-[20px] h-[20px] ml-4" />

        <input type="text" name="model" value={model} onChange={(e) => setModel(e.target.value)} placeholder="Tuareg" className="searchbar__input" />
        

      </div>
      <SearchButton otherClasses="" />
    </form>
  )
}

export default SearchBar