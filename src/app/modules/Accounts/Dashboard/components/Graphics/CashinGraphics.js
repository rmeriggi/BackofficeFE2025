/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, {useEffect} from "react";
import { format } from "date-fns";
import SVG from "react-inlinesvg";
import ApexCharts from "apexcharts";
import { toAbsoluteUrl } from "../../../../../../_metronic/_helpers";
import { formatMoney, getNumberFormatted } from "../../../../../utils/formatData";

export function CashinGraphics({ className, title, data }) {

  useEffect(() => {
    const element = document.getElementById("kt_stats_widget_12_chart");

    if (!element) {
      return;
    }

    const options = getChartOption(data);
    const chart = new ApexCharts(element, options);
    chart.render();
    return function cleanUp() {
      chart.destroy();
    };
  }, [data]);

  return (
    <div className={`card card-custom ${className}`}>
      <div className="card-body p-0">
        <div className="d-flex align-items-center justify-content-between card-spacer flex-grow-1">
          <span className="symbol symbol-circle symbol-50 symbol-light-success mr-2">
            <span className="symbol-label">
              <span className="svg-icon svg-icon-xl svg-icon-success">
                <SVG
                  src={toAbsoluteUrl(
                    "/media/svg/icons/Shopping/Chart-line1.svg"
                  )}
                ></SVG>
              </span>
            </span>
          </span>
          <div className="d-flex flex-column text-right">
            <span className="text-dark-75 font-weight-bolder font-size-h3">
              {title}
            </span>
            <span className="text-muted font-weight-bold mt-2"></span>
          </div>
        </div>
        <div
          id="kt_stats_widget_12_chart"
          className="card-rounded-bottom"
          style={{ height: "auto" }}
        ></div>
      </div>
    </div>
  );
}

function getChartOption(data) {
  const dataSeries = data.map(d => d.amount)
  const categories = data.map(d => format(new Date(d.day), "dd LLL"))
  const maxNumber = Math.max(...dataSeries)

  var options = {
    series: [
      {
        name: "",
        data: dataSeries
      }
    ],
    colors:['#1BC5BD'],
    chart: {
      type: "bar",
      height: 215,
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      },
      sparkline: {
        enabled: false
      }
    },
    plotOptions: {
      bar: {
        columnWidth: '75%',
        endingShape: 'rounded'
      }
    },
    legend: {
      show: false
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      type: "solid",
      opacity: 1
    },
    xaxis: {
      categories: categories,
      labels: {
        show: true,
        rotate: -60,
      },
      crosshairs: {
        show: false,
      },
    },
    yaxis: {
      min: 0,
      max: maxNumber,
      states: {
        hover: {
            filter: {
              type: "none",
              value: 0,
          },
        },
      },
      labels: {
        formatter: function (val) {
          return getNumberFormatted(val) ;
        }
      },
    },
    grid: {
      show: false,
    },
    tooltip: {
      style: {
        fontSize: "12px",
      },
      y: {
        formatter: function(val) {
          return formatMoney(val);
        },
      },
    },
  };
  return options;
}
