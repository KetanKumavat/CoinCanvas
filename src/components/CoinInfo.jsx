import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {CryptoState} from '../CryptoContext'
import { HistoricalChart } from './../config/api';
import { Line } from 'react-chartjs-2';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from "@mui/material/Stack";
import { chartDays } from "../config/data";
import SelectButton from "./SelectButton";
import { CategoryScale, Chart } from "chart.js";
import { LinearScale } from 'chart.js';
Chart.register(LinearScale);
Chart.register(CategoryScale);
import "chart.js/auto";
import { Chart as ChartJS } from "chart.js/auto";

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


  useEffect(() => {
    fetchHistoricData();
  }, [currency,days,coin]);

//  useEffect(() => {
//   console.log("data", historicData);
//  }, [historicData]);

  return (
    <div
      className="w-[75vh] flex flex-col items-center justify-center mt-6 p-10 md:w-full md:mt-0 md:p-20 md:pt-0
">
      {!historicData ? (
        <div>
          <Stack sx={{ color: "black.500" }} spacing={2} direction="row">
            <CircularProgress color="inherit" />
            <h1 className="2xl font-semibold">Generating Real Time Graph</h1>
          </Stack>
        </div>
      ) : (
        <div className="w-[95vh] flex flex-column md:flex-row">
          <Line
            className="w-[60vh] aspect-square md:w-[100%] flex border-l-2 mx-auto border-l-black pl-11 "
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
                  borderWidth: 1.2,
                  borderColor: "black",
                  color: "white",
                  backgroundColor: "rgba(0,0,0,0)",
                  label: `Price (Past ${days} Days} in ${currency}`,
                },
              ],
            }}
            options={{
              elements: {
                point: {
                  radius: 1,
                  backgroundColor: "rgba(0,0,0,0)",
                },
              },
            }}
          />
          <div className="flex justify-center items-center mt-[50vh] ml-[28vh] absolute">
            {chartDays.map((day) => (
              <SelectButton
                key={day.value}
                selected={day.value === days}
                onClick={() => setDays(day.value)}>
                {day.label}
              </SelectButton>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default CoinInfo;
