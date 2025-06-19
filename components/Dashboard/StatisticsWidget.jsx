import { Card, Row, Col, ProgressBar } from "react-bootstrap";
import CountUp from "react-countup";

const StatisticsWidget = (props) => {
    // Manually define rgba colors with opacity (0.15)
    const variantColors = {
        blue: "rgba(74, 129, 212, 1)",
        success: "rgba(26, 188, 156, 1)",
        warning: "rgba(247, 184, 75, 1)",
        info: "rgba(67, 191, 229, 1)",
    };

    // Solid colors for progress bar
    const progressColors = {
        blue: "rgba(74, 129, 212, 1)",
        success: "rgba(26, 188, 156, 1)",
        warning: "rgba(247, 184, 75, 1)",
        info: "rgba(67, 191, 229, 1)",
    };

    const bgColor = variantColors[props.variant];
    const progressBarColor = progressColors[props.variant];

    return (
        <Card>
            <Card.Body>
                <Row>
                    <Col className="col-6">
                        <div
                            className="d-flex align-items-center justify-content-center"
                            style={{
                                width: "40px",
                                height: "40px",
                                backgroundColor: bgColor,
                                borderRadius: "6px",
                            }}
                        >
                            <div style={{ fontSize: "24px", color: "#fff" }}>
                                {props.icon}
                            </div>
                        </div>
                    </Col>
                    <Col className="col-6">
                        <div className="text-end">
                            <h3 className="text-dark my-1 text-xl">
                                <span>
                                    <CountUp duration={1} end={props.stats} {...props.counterOptions} />
                                </span>
                            </h3>
                            <p className="text-muted mb-1 text-truncate">
                                {props.description}
                            </p>
                        </div>
                    </Col>
                </Row>
                <div className="mt-3">
                    <h6 className="text-uppercase text-xs">
                        Target <span className="float-end text-xs">{props.progress}%</span>
                    </h6>
                   <ProgressBar
                        now={props.progress}
                        className="m-0"
                        visuallyHidden
                        style={{
                            height: "4px", // thin progress bar
                            backgroundColor: "rgba(0,0,0,0.05)", // light track
                        }}
                        variant={null} // ignore Bootstrap color classes
                    >
                        <div
                            style={{
                                width: `${props.progress}%`,
                                height: "100%",
                                backgroundColor: progressBarColor,
                                borderRadius: "4px",
                            }}
                        />
                    </ProgressBar>
                
                </div>
            </Card.Body>
        </Card>
    );
};

export default StatisticsWidget;
