import React, { useState, useEffect, useRef } from "react";
import { TextField, Button } from "@material-ui/core";
import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import {debounce} from 'lodash'
import Animelist from "./animelist";

function SearchPage() {
  const [animeData, setAnimeData] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});

  const history = useHistory();

  const handleClick = (anime) => {
    history.push({
      pathname: "/anime-info",
      state: { anime }
    });
  };


  const handleQuery = debounce((query)=> {
    setQuery(query)

  },1000)

  
  useEffect(() => {
    const getData = async () => {
      
      const res = await fetch(
        `https://api.jikan.moe/v4/characters?page=${page}&limit=15&q=${query}&order_by=favorites&sort=desc`
      );
      const resData = await res.json();
      setAnimeData(resData.data);
      setPagination(resData.pagination);
      
    };
    getData();
    console.log(animeData);
  }, [query, page]);

  const handleNext = () => {
    if (
      
      pagination.has_next_page &&
      page < pagination.last_visible_page
    )
      setPage(page + 1);
  };

  const handlePrevious = () => {
    if (page > 1) setPage(page - 1);
  };

  return (
    <>
      <TextField
        label="Search"
        // value={query}
        onChange={(e) => handleQuery(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          )
        }}
      />

      <Animelist animeData={animeData} handleClick={handleClick} />
      <Button onClick={handlePrevious} disabled={page === 1}>
        Previous
      </Button>
      {pagination ? (
        <Button onClick={handleNext} disabled={pagination.has_next_page && page === pagination.last_visible_page}>Next</Button>
      ) : null}
    </>
  );
}

export default SearchPage;
