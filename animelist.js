import React from "react";
import {
  Table,
  TableRow,
  TableCell,
  TableBody,
  Button
} from "@material-ui/core";
import ArrowForwardSharpIcon from "@mui/icons-material/ArrowForwardSharp";

const Animelist = ({ animeData, handleClick }) => {
  return (
    <div>
      <Table>
        <TableBody>
          {animeData && animeData.length
            ? animeData.map((item) => (
                <TableRow key={item.mal_id}>
                  <TableCell>
                    <img
                      src={item.images.webp.small_image_url}
                      alt={item.name}
                      width={50}
                      height={50}
                    />
                  </TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>
                    <ArrowForwardSharpIcon onClick={() => handleClick(item)} />
                  </TableCell>
                </TableRow>
              ))
            : "Not Found"}
        </TableBody>
      </Table>
    </div>
  );
};

export default Animelist;
