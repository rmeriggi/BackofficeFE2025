/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, { useMemo, useEffect } from "react";
import objectPath from "object-path";
import ApexCharts from "apexcharts";
import SVG from "react-inlinesvg";
import { format, isEqual, max } from "date-fns";
import { toAbsoluteUrl } from "../../../../../../_metronic/_helpers";
import { useHtmlClassService } from "../../../../../../_metronic/layout";

const filterLastBalances = (data) => {
  if(data.length > 0){
    const date = data.map(d => new Date(d.date))
    const maxDate = max(date)

    const balance = data.find(d => isEqual(maxDate, new Date(d.date)))?.balances

    let lastBalance = balance?.toString().split(".")
    lastBalance[0] = lastBalance[0]?.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    return lastBalance = "$ " + lastBalance.join(".")
  }
}

export function BalancesGraphics({ className, symbolShape, baseColor, title, data }) {

  const lastBalance = filterLastBalances(data)
  
  const uiService = useHtmlClassService();
  const layoutProps = useMemo(() => {
    return {
      colorsGrayGray500: objectPath.get(
        uiService.config,
        "js.colors.gray.gray500"
      ),
      colorsGrayGray200: objectPath.get(
        uiService.config,
        "js.colors.gray.gray200"
      ),
      colorsGrayGray300: objectPath.get(
        uiService.config,
        "js.colors.gray.gray300"
      ),
      colorsThemeBaseSuccess: objectPath.get(
        uiService.config,
        `js.colors.theme.base.${baseColor}`
      ),
      colorsThemeLightSuccess: objectPath.get(
        uiService.config,
        `js.colors.theme.light.${baseColor}`
      ),
      fontFamily: objectPath.get(uiService.config, "js.fontFamily"),
    };
  }, [uiService, baseColor]);

  useEffect(() => {
    const element = document.getElementById("kt_stats_widget_11_chart");

    if (!element) {
      return;
    }

    const options = getChartOption(layoutProps, data);
    const chart = new ApexCharts(element, options);
    chart.render();
    return function cleanUp() {
      chart.destroy();
    };
  }, [layoutProps, data]);

  return (
    <div className={`card card-custom ${className}`}>
      <div className="card-body p-0">
        <div className="d-flex align-items-center justify-content-between card-spacer flex-grow-1">
          <span
            className={`symbol ${symbolShape} symbol-50 symbol-light-${baseColor} mr-2`}
          >
            <span className="symbol-label">
              <span className={`svg-icon svg-icon-xl svg-icon-${baseColor}`}>
                <SVG
                  src={toAbsoluteUrl(
                    "/media/svg/icons/Shopping/Dollar.svg"
                  )}
                ></SVG>
              </span>
            </span>
          </span>
          <div className="d-flex flex-column text-right">
            <span className="text-dark-75 font-weight-bolder font-size-h3">
              {lastBalance}
            </span>
            <span className="text-muted font-weight-bold mt-2">
              {title}
            </span>
          </div>
        </div>
        <div
          id="kt_stats_widget_11_chart"
          className="card-rounded-bottom mx-2 my-2"
          style={{ height: "200px" }}
        ></div>
      </div>
    </div>
  );
}

function getChartOption(layoutProps, data) {
  const dataSeries = data.map(d => d.balances)
  const maxNumber = Math.max(...dataSeries)
  const categories = data.map(d => {
   const date = new Date(d.date)
   return format(date, "dd/MM/yyyy")
  })
  const options = {
    series: [
      {
        name: "",
        data: dataSeries,
      },
    ],
    chart: {
      type: "area",
      height: 357,
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
      colors: [layoutProps.colorsThemeBaseSuccess],
    },
    xaxis: {
      categories: categories,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
        style: {
          colors: layoutProps.colorsGrayGray500,
          fontSize: "12px",
          fontFamily: layoutProps.fontFamily,
        },
      },
      crosshairs: {
        show: false,
        position: "front",
        stroke: {
          color: layoutProps.colorsGrayGray300,
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
          fontFamily: layoutProps.fontFamily,
        },
      },
    },
    yaxis: {
      min: 0,
      max: maxNumber + 15,
      labels: {
        show: false,
        style: {
          colors: layoutProps.colorsGrayGray500,
          fontSize: "12px",
          fontFamily: layoutProps.fontFamily,
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
    tooltip: {
      style: {
        fontSize: "12px",
        fontFamily: layoutProps.fontFamily,
      },
      y: {
        formatter: function(val) {
          let str = val.toString().split(".")
          str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".")
          return val = "$ " + str.join(".")
        },
      },
    },
    colors: [layoutProps.colorsThemeLightSuccess],
    markers: {
      colors: [layoutProps.colorsThemeLightSuccess],
      strokeColor: [layoutProps.colorsThemeBaseSuccess],
      strokeWidth: 3,
    },
  };
  return options;
}
