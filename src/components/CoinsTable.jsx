import React, { useEffect, useState } from "react";
import { CoinList } from "./../config/api";
import axios from "axios";
import { CryptoState } from "../CryptoContext";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";
// import coinListINR from "../data/coinListINR.json";
// import coinListUSD from "../data/coinListUSD.json";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";

export function numberWithCommas(x) {
  if (x === undefined || x === null) {
    return ""; // or any other default value you want
  }
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const CoinsTable = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const { currency, symbol } = CryptoState();
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  // const fetchCoins = async () => {
  //   setLoading(true);
  //   let coinList;
  //   if (currency === "INR") {
  //     coinList = coinListINR;
  //   } else if (currency === "USD") {
  //     coinList = coinListUSD;
  //   }
  //   setCoins(coinList);
  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    // console.log(data);
    setCoins(data);
    setLoading(false);
  };

  // const { data } = await axios.get(CoinList(currency)); //FOR API CALL
  // console.log(data);
  useEffect(() => {
    fetchCoins();
  }, [currency]);

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };

  return (
    <div className="text-black">
      <h1 className="text-2xl mt-16 font-semibold text-center">
        CryptoCurrency Prices by Market Cap
      </h1>
      <input
        type="search"
        placeholder="Search"
        className="input input-bordered bg-black text-white flex mb-16 mt-6 flex-wrap w-1/2 mx-auto rounded-2xl"
        onChange={(e) => setSearch(e.target.value)}
      />
      <div>
        <TableContainer component={Paper}>
          {loading ? (
            <div>
              <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
                <LinearProgress color="inherit" />
              </Stack>
            </div>
          ) : (
            <div>
              <Table>
                <TableHead className="bg-black text-white cursor-default border-2 border-black ">
                  <TableRow className="text-white">
                    {["Coin", "Price", "24h Change", "Market Cap"].map(
                      (head) => (
                        <TableCell
                          className="text-2xl bg-"
                          style={{ color: "white", fontSize: "1.5rem" }}
                          key={head}
                          align={head === "Coin" ? "" : "right"}>
                          {head}
                        </TableCell>
                      )
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {handleSearch()
                    .slice((page - 1) * 10, (page - 1) * 10 + 10)
                    .map((row) => {
                      const profit = row.price_change_percentage_24h > 0;
                      return (
                        <TableRow
                          className="cursor-pointer bg-[#e6eced] hover:bg-gray-300"
                          onClick={() => {
                            navigate(`/coins/${row.id}`);
                            // console.log(row.id);
                          }}
                          key={row.name}>
                          <div className="flex flex-row items-center justify-center">
                            <TableCell component="th" scope="row">
                              <img
                                src={row?.image}
                                alt={row.name}
                                className="h-24 mb-2 cursor-pointer"
                              />
                              <div className="flex flex-col justify-center items-center">
                                <span className="uppercase text-3xl">
                                  {row.symbol}
                                </span>
                                <span className="text-slate-950">
                                  {row.name}
                                </span>
                              </div>
                            </TableCell>
                          </div>
                          <TableCell
                            align="right"
                            className="text-5xl font-semibold">
                            <span className="text-3xl">
                              {symbol}{" "}
                              {numberWithCommas(row.current_price ?? 0)}
                            </span>
                          </TableCell>
                          <TableCell
                            align="right"
                            style={{
                              fontSize: "1.875rem",
                              lineHeight: "2.25rem",
                              color: profit ? "green" : "red",
                              fontWeight: 500,
                            }}>
                            {profit && "+"}
                            {row.price_change_percentage_24h.toFixed(2)}%
                          </TableCell>
                          <TableCell align="right">
                            <span className="text-3xl">
                              {symbol}{" "}
                              {numberWithCommas(row.market_cap ?? 0).slice(
                                0,
                                -6
                              )}
                              <span className="ml-1">M</span>
                            </span>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </div>
          )}
        </TableContainer>
        <div className="flex justify-center items-center mt-8 mb-5">
          <button
            className="bg-black text-white p-3 rounded-xl font-semibold"
            onClick={() => setPage(page - 1)}
            disabled={page === 1}>
            Previous Page
          </button>
          <span className="text-2xl flex ml-4 font-bold">{page}</span>
          <button
            className="bg-black text-white p-3 rounded-xl ml-4 font-semibold"
            onClick={() => setPage(page + 1)}
            disabled={page === 10}>
            Next Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoinsTable;
