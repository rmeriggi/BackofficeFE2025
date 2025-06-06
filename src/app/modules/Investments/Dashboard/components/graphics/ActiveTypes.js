import React, { useEffect } from 'react'
import ApexCharts from 'apexcharts';
import { formatAmountFromString } from '../../../../../utils/formatData';

function getChartOption(data){
  const labels = data.map(s => s.specie)
  const series = data.map(s => s.value)
  const options = {
    tooltip: {
      style: {
        fontSize: "12px",
      },
      y: {
        formatter: function(val) {
          return '$' + formatAmountFromString(val);
        },
      },
    },
    series: series,
    labels: labels,
    chart: {
      type: 'donut',
    },
    dataLabels: {
      enabled: true,
    },
    legend: {
      show: true,
      position: 'bottom'
    },      
  }
  return options;
}

export function ActiveTypes({data}) {
  
  
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
    <>
      <div className='d-flex justify-content-center pt-5'>
        <h5>Tipo de instrumentos</h5>
      </div>
      <div 
        style={{width: "auto"}}
        className="mx-auto mt-8"
        id="apex_chart_pie">
      </div>
    </>
  )
}
