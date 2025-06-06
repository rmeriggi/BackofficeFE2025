import React, { useEffect } from 'react'
import ApexCharts from 'apexcharts';
import { LinearProgress } from '@material-ui/core';
import { formatNumberToMoney } from '../../../../../utils/formatData';

const RoundProgress = ({name, total, amount, progress}) => {
  return (
    <div className='py-2 my-3'>
      <span>{name} <span className='font-weight-bolder'>${formatNumberToMoney(amount)}</span></span>
      <LinearProgress variant="determinate" value={progress} aria-valuemax={total}/>
    </div>
  )
}

function getChartOption(data){
  const labels = data.map(d => d.round)
  const series = data.map(d => d.amount)
  const colors = data.map(d => d.color)

  const options = {
    tooltip: {
      style: {
        fontSize: "12px",
      },
    },
    colors: colors,
    series: series,
    labels: labels,
    chart: {
      type: 'donut',
    },
    dataLabels: {
      enabled: true,
    },
    legend: {
      show: false
    },     
  }
  return options;
}

export function RoundsActives({data}) {
  
  useEffect(() => {
    const element = document.getElementById("apex_chart_pie");

    if (!element) {
      return;
    }

    const options = getChartOption(data)
    const chart = new ApexCharts(element, options);
    chart.render();
    return function cleanUp() {
      chart.destroy();
    };
  }, [data]);

  return (
    <div className='w-50 d-flex border-right'>
      <div style={{width : "60%"}}>
        <p className='h4 mb-5'>Monto por ronda activo</p>
        <div id="apex_chart_pie"></div>
      </div>
      <div className='d-flex flex-column pr-2' style={{width: "40%"}}>
        <div className='d-flex justify-content-between flex-wrap'>
          {data.map((r, i) => (
            <div key={i} className='d-flex align-items-baseline'>
              <div className="rounded-pill" style={{width: "20px", height: "10px", backgroundColor: `${r.color}`}}></div>
              <span key={r.round} className="ml-3">{r.round}</span>
            </div>
          ))}
        </div>
        <div className='py-3 mt-2  h-100'>
          {data.map(r => (
            <RoundProgress key={r.round} name={r.round} total={r.total} amount={r.amount} progress={r.progress}/>
          ))}
        </div>
      </div>
    </div>
  )
}
