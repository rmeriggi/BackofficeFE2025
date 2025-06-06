import { Button, CircularProgress, colors, createMuiTheme } from '@material-ui/core'
import moment from "moment"
import { es } from 'date-fns/locale'
import { ThemeProvider } from '@material-ui/styles';
import DateFnsUtils from '@date-io/date-fns'
import ApexCharts from 'apexcharts';
import React, { useEffect, useState } from 'react'
import { MultiselectComponent } from '../MultiselectComponent'
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import { getAccumulatedInterest } from '../../utils/service';
import { LayoutSplashScreen } from '../../../../../../_metronic/layout';
import { useParams } from 'react-router-dom';

const defaultMaterialTheme = createMuiTheme({
  palette: {
    primary: colors.indigo,
  },
});

function getChartOption(data) {

  const series = data.map(r => {
    const round = {
      name: r[0].name,
      data: r.map(r =>  r.amount),
    }
    return round
  })

  const dates = data[0].map(r => r.date)

  const options = {
    series: series,
    chart: {
      type: "area",
      stacked: false,
      height: 250,
      toolbar : {
        show: true
      },
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      width: 3,
    },
    markers: {
      size: 0,
      style: 'hollow',
    },
    xaxis: {
      type: 'datetime',
      categories: dates,
      labels: {
        formatter: function (value) {
          return moment(value).format("DD-MM")
        },
      }
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.5,
        opacityTo: 0,
        stops: [0, 90, 100]
      }
    },
    tooltip: {
      shared: false,
      y: {
        formatter: function (val) {
          return "$ " + val
        }
      }
    }
  };
  return options;
}

export const AccumulatedInterests = ({rounds}) => {

  const {id} = useParams()

  const initialFilters = {
    round: [0],
    fromDate: "2022-06-02",
    toDate: "2022-06-03",
  }
  
  const [filters, setFilters] = useState(initialFilters)
  const [interests, setInterests] = useState()
  const [loading, setLoading] = useState(false)

  useEffect(() =>{
    const getInterests = async () => {
      const response = await getAccumulatedInterest(id, initialFilters)
      setInterests(response.interestsChart)
    }
    getInterests()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  useEffect(() => {
    const element = document.getElementById("apex_chart_bar");

    if (!element) {
      return;
    }

    const options = getChartOption(interests)
    const chart = new ApexCharts(element, options);
    chart.render();
    return function cleanUp() {
      chart.destroy();
    };
  }, [interests]);

  const handleClick = async() => {
    setLoading(true)
    const response = await getAccumulatedInterest(id, filters)
    setInterests(response.interestsChart)
    setLoading(false)
  }

  if(!interests) return <LayoutSplashScreen />

  return (
    <div className='w-50 pl-2'>
      <div>
        <p className='h4 mb-5'>Intereses Acumulados</p>
        <div className='d-flex'>
          <div className='col'>
            <MultiselectComponent 
              label="Rondas"
              array={rounds}
              property="round"
              filters={filters}
              setFilters={setFilters}
            />
          </div>
          <div className='col'>
            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={es}> 
              <ThemeProvider theme={defaultMaterialTheme}>
                  <KeyboardDatePicker
                    autoOk
                    disableFuture
                    fullWidth
                    size="small"
                    label="Fecha Desde"
                    format="dd/MM/yyyy"
                    value={filters.fromDate}
                    cancelLabel="cancelar"
                    onChange={date => {
                      setFilters({...filters, fromDate: date})
                    }}
                  />
              </ThemeProvider>
            </MuiPickersUtilsProvider>
          </div>
          <div className='col'>
            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={es}> 
              <ThemeProvider theme={defaultMaterialTheme}>
                  <KeyboardDatePicker
                    autoOk
                    disableFuture
                    fullWidth
                    size="small"
                    label="Fecha Hasta"
                    format="dd/MM/yyyy"
                    value={filters.toDate}
                    cancelLabel="cancelar"
                    onChange={date => {
                      setFilters({...filters, toDate: date})
                    }}
                  />
              </ThemeProvider>
            </MuiPickersUtilsProvider>
          </div>
          <div className='col-2 p-0 m-0 d-flex justify-content-end align-items-center'>
            <Button
              variant="contained"
              color="secondary"
              size="small"
              onClick={() => handleClick()}
              endIcon={
                loading && <CircularProgress size={10} color="primary"/>  
                }
              >
                Buscar
            </Button>
          </div>
        </div>
      </div>
      <div className="mx-auto" 
        id="apex_chart_bar">
        </div>
    </div>
  )
}
