import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {CryptoState} from '../CryptoContext'
import { HistoricalChart } from './../config/api';
import { Line } from 'react-chartjs-2';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from "@mui/material/Stack";
import { chartDays } from "../config/data";
import SelectButton from "./SelectButton";

const CoinInfo = ({coin}) => {
  const [historicData, setHistoricData] = useState();
  const [days,setDays] = useState(1);
  const {currency, symbol} = CryptoState();
  const [flag, setflag] = useState(false);

const fetchHistoricData = async () => {
  if (coin && coin.id) {
    try {
      const { data } = await axios.get(
        HistoricalChart(coin.id, days, currency)
      );
      setflag(true);
      setHistoricData(data.prices);
    } catch (error) {
      console.error("Error fetching historical data:", error);
    }
  }
};

  console.log(coin);

  useEffect(() => {
    fetchHistoricData();
  }, [currency,days]);
  return (
    <div
      className="w-[75vh] flex flex-col items-center justify-center mt-6 p-10 md:w-full md:mt-0 md:p-20 md:pt-0
">
      {!historicData || !Array.isArray(historicData) ? (
        <Stack sx={{ color: "black.500" }} spacing={2} direction="row">
          <CircularProgress color="inherit" />
        </Stack>
      ) : (
        <div>
          <>
            <Line
              data={{
                labels: historicData.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),

                datasets: [
                  {
                    data: historicData.map((coin) => coin[1]),
                    label: `Price ( Past ${days} Days ) in ${currency}`,
                    borderColor: "#EEBC1D",
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            />
            <div
              style={{
                display: "flex",
                marginTop: 20,
                justifyContent: "space-around",
                width: "100%",
              }}>
              {chartDays.map((day) => (
                <SelectButton
                  key={day.value}
                  onClick={() => {
                    setDays(day.value);
                    setflag(false);
                  }}
                  selected={day.value === days}>
                  {day.label}
                </SelectButton>
              ))}
            </div>
          </>
        </div>
      )}
    </div>
  );
}

export default CoinInfo;
