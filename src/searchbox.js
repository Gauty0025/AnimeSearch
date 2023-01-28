import React, { useState, useEffect, useRef } from "react";
import { TextField } from "@material-ui/core";
import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment } from "@material-ui/core";
import { useHistory, withRouter } from "react-router-dom";
import Animelist from "../animelist";

function SearchPage() {
  const [animeData, setAnimeData] = useState([]);
  const [query, setQuery] = useState("");

  const history = useHistory();

  const handleClick = (anime) => {
    history.push({
      pathname: "/anime-info",
      state: { anime }
    });
  };

  const requestCounterRef = useRef(0);
  useEffect(() => {
    const getData = async () => {
      requestCounterRef.current++;
      if (requestCounterRef.current > 3) {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // delay of 1 second
        requestCounterRef.current = 0;
      }
      const res = await fetch(
        `https://api.jikan.moe/v4/characters?page=0&limit=15&q=${query}&order_by=favorites&sort=desc`
      );
      const resData = await res.json();
      setAnimeData(resData.data);
    };
    getData();
    console.log(animeData);
  }, [query]);

  return (
    <>
      <TextField
        label="Search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          )
        }}
      />

      <Animelist animeData={animeData} handleClick={handleClick} />
    </>
  );
}

export default SearchPage;
