import { Row, Col, Breadcrumb } from "react-bootstrap";
import { Link } from "@heroui/react";
/**
 * PageTitle
 */
const PageTitle = props => {
  return  <Row>
      <Col>
        <div className="page-title-box">
          <div className="page-title-right">
            <Breadcrumb className="m-0 float-right text-sm">
              {(props.breadCrumbItems || []).map((item, index) =>
                item.active ? (
                  <Breadcrumb.Item active key={index}>
                    {item.label}
                  </Breadcrumb.Item>
                ) : (
                  <Breadcrumb.Item as="span" key={index}>
                    <Link className="text-[var(--primary-color)]" href={item.path} passHref legacyBehavior>
                      <a className="text-decoration-none text-reset ">{item.label}</a>
                    </Link>
                  </Breadcrumb.Item>
                )
              )}
            </Breadcrumb>
          </div>
          <h5 className="page-title">{props.title}</h5>
        </div>
      </Col>
    </Row>;
};
export default PageTitle;

