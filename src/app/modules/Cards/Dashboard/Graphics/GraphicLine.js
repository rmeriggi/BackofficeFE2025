import React, { useEffect} from 'react'
import ApexCharts from 'apexcharts';


function getChartOption(data){
  const dataSolds = data.map(s => s.value)
  const months = data.map(m => {
    let month = ''
    switch (m.month) {
      case 1:
        month = 'Ene'
        break
      case 2:
        month = 'Feb'
        break
      case 3:
        month = 'Mar'
      break
      case 4:
        month = 'Abr'
        break
      case 5:
        month = 'May'
        break
      case 6:
        month = 'Jun'
        break
      case 7:
        month = 'Jul'
        break
      case 8:
        month = 'Ago'
        break
      case 9:
        month = 'Sep'
        break
      case 10:
        month = 'Oct'
        break
      case 11:
        month = 'Nov'
        break
      case 12:
        month = 'Dic'
        break
      default:
        break;
    }
    return month
  })

  const maxNumber = Math.max(...dataSolds)
  const options = {
    series: [
      {
        name: "Saldo promedio",
        data: dataSolds,
      },
    ],
    chart: {
      type: "area",
      height: 150,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
      sparkline: {
        enabled: true,
      },
    },
    plotOptions: {},
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      type: "solid",
      opacity: 1,
    },
    stroke: {
      curve: "smooth",
      show: true,
      width: 3,
      colors: ['#00AAFF'],
    },
    xaxis: {
      categories: months,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
        style: {
          fontSize: "12px",
        },
      },
      crosshairs: {
        show: false,
        position: "front",
        stroke: {
          color: '#00AAFF',
          width: 1,
          dashArray: 3,
        },
      },
      tooltip: {
        enabled: true,
        formatter: undefined,
        offsetY: 0,
        style: {
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      min: 0,
      max: maxNumber + 50,
      labels: {
        show: false,
        style: {
          fontSize: "12px",
        },
      },
    },
    states: {
      normal: {
        filter: {
          type: "none",
          value: 0,
        },
      },
      hover: {
        filter: {
          type: "none",
          value: 0,
        },
      },
      active: {
        allowMultipleDataPointsSelection: false,
        filter: {
          type: "none",
          value: 0,
        },
      },
    },
    colors: ['#E5F7FF'],
    markers: {
      colors: ['#E5F7FF'],
      strokeColor: ['#00AAFF'],
      strokeWidth: 3,
    }, 
  }
  return options;
}

export default function GraphicLine({data}) {

  useEffect(() => {
    const element = document.getElementById("apex_chart_line");

    if (!element) {
      return;
    }

    const options = getChartOption(data.data)
    const chart = new ApexCharts(element, options);
    chart.render();
    return function cleanUp() {
      chart.destroy();
    };
  }, [data]);
  
  return (
    <div id="apex_chart_line"></div>
  )
}
