import { Row, Col } from "react-bootstrap";
import { FiAperture ,FiShoppingCart ,FiBarChart2 ,FiCpu } from "react-icons/fi";
import StatisticsWidget from "./StatisticsWidget"

const Statistics = () => {
  return <>
      <Row>
        <Col md={6} xl={3}>
          <StatisticsWidget variant="blue"  description="Income status" stats="12145" icon={<FiAperture/>} progress={60} counterOptions={{
          prefix: "$"
        }} />
        </Col>
        <Col md={6} xl={3}>
          <StatisticsWidget variant="success" description="January's Sales" stats="1576" icon={<FiShoppingCart/>} progress={49} />
        </Col>
        <Col md={6} xl={3}>
          <StatisticsWidget variant="warning" description="Payouts" stats="8947" icon={<FiBarChart2/>} progress={18} />
        </Col>
        <Col md={6} xl={3}>
          <StatisticsWidget variant="info" description="Available Stores" stats="178" icon={<FiCpu/>} progress={74} />
        </Col>
      </Row>
    </>;
};
export default Statistics;