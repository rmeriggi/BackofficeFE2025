import React, { useEffect } from 'react'
import ApexCharts from 'apexcharts';
import { formatAmountFromString } from '../../../../utils/formatData';

function getChartOption(data){
  const { trx, tc, cashin} = data
  const options = {

    series: [ trx, tc, cashin],
    labels: ['Transacciones', 'Links de pago', 'Bocas de efectivo'],
    colors:[ '#52D23D', '#FBC93F', '#FBC99F'],
    chart: {
      type: 'donut',
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false
    },    
    plotOptions: {
      pie: {
        customScale: 1
      }
    },
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
  }
  return options;
}

export default function InversionGraphicDoughnut({data}) {
  
  
  useEffect(() => {
    const element = document.getElementById("apex_chart_pie2");

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
    <div 
      className="col-xl-10 col-lg-8 col-md-4 col-sm-6 col-8 mx-auto"
      id="apex_chart_pie2"
     >
    </div>
  )
}
