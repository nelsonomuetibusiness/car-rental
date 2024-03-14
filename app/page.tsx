
import { CarCard, CustomFilter, Hero, SearchBar } from "@/components";
import { fuels, yearsOfProduction } from "@/constants";
import { HomeProps } from "@/types";
import { fetchCars } from "@/utils";
import {ShowMore} from "@/components";

import Image from "next/image";

export default async function Home({searchParams} : HomeProps) {
  const allCars = await fetchCars({
    manufacturer: searchParams.manufacturer || "",
    year: searchParams.year || 2022,
    fuel: searchParams.fuel || "",
    limit: searchParams.limit || 10,
    model: searchParams.model || "",
  });

  const isDataEmpty = !Array.isArray(allCars)  || allCars.length <1 || !allCars;
  
  return (
    <main className="overflow-hidden">
      <Hero/>
      

      <div className="mt-12 padding-x padding-y max-width" id="discover">

        <h3 className="text-red-600 text-xl font-bold mb-24 text-wrap">NOTE:   This Project used some free api's to get the images but unfortunately the api's service don't offer free services anymore thats why the car images don't show. otherwise the project is fully functional</h3>
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">
            Car Catalogue
          </h1>
          <p>Explore cars you might like........</p>
        </div>

        <div className="home__filters">

          <SearchBar/>


          <div className="home__filter-container">
            <CustomFilter title="fuel" options={fuels} />
            <CustomFilter title="year" options={yearsOfProduction}/>
          </div>
        </div>


        {!isDataEmpty ? (
          <section>
            <div className="home__cars-wrapper">
              {allCars?.map((car) => (<CarCard car={car}/>))}
            </div>


            <ShowMore
              pageNumber={(searchParams.limit || 10) / 10}
              isNext={(searchParams.limit || 10) > allCars.length}
            />
          </section>
        ): (
          <div className="home__error-container">
            <h2 className="text-black text-xl font-bold">no results</h2>
            <p>{allCars?.message}</p>
          </div>
        )}

      </div>
    </main>
  );
}
