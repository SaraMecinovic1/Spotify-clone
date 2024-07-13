import React from "react";
import NavBar from "./NavBar";
import { useParams } from "react-router-dom";
import { albumsData } from "../assets/assets";

const DisplayAlbum = () => {
  const { id } = useParams();
  const albumData = albumsData[id];
  console.log(albumData);

  return (
    <>
      <NavBar />
      <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-end">
        <img className="w-48 rounded" src={albumData.image} alt="" />
        <div>
            
        </div>
      </div>
    </>
  );
};

export default DisplayAlbum;
