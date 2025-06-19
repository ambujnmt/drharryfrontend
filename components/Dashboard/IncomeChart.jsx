import dynamic from "next/dynamic";
import { Row, Col } from "react-bootstrap";

// Dynamically import ApexCharts
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

// components
import { BasicPortlet } from "./Portlet";
import ChartStatistics from "./ChartStatistics";

const IncomeChart = () => {
  const apexOpts = {
    chart: {
      sparkline: {
        enabled: true
      }
    },
    plotOptions: {
      bar: {
        columnWidth: "65%"
      }
    },
    xaxis: {
      crosshairs: {
        width: 1
      }
    },
    stroke: {
      width: 0,
      curve: "smooth"
    },
    colors: ["#00acc1"],
    tooltip: {
      fixed: {
        enabled: false
      },
      x: {
        show: false
      },
      y: {
        title: {
          formatter: () => ""
        }
      },
      marker: {
        show: false
      }
    }
  };

  const apexData = [
    {
      data: [3, 6, 7, 8, 6, 4, 7, 10, 12, 7, 4, 9, 12, 13, 11, 12]
    }
  ];

  return (
    <BasicPortlet cardTitle="Income Amounts" titleClass="header-title">
      <div className="text-center">
        <Chart
          options={apexOpts}
          series={apexData}
          type="bar"
          height={250}
          width={250}
          className="apex-charts mt-0"
        />
        <Row className="mt-3">
          <Col xs={4}>
            <ChartStatistics title="Target" icon="fe-arrow-up" stats="641" variant="success" />
          </Col>
          <Col xs={4}>
            <ChartStatistics title="Last week" icon="fe-arrow-down" stats="234" variant="danger" />
          </Col>
          <Col xs={4}>
            <ChartStatistics title="Last Month" icon="fe-arrow-up" stats="3201" variant="success" />
          </Col>
        </Row>
      </div>
    </BasicPortlet>
  );
};

export default IncomeChart;
