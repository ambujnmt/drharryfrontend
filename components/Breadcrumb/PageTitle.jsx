import { Row, Col, Breadcrumb } from "react-bootstrap";
import { Link } from "@heroui/react";

const PageTitle = (props) => {
  return (
    <Row>
      <Col>
        <div className="page-title-box flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">

          {/* Title */}
          <h5 className="page-title text-xl md:text-2xl font-semibold mb-0">
            {props.title}
          </h5>

          {/* Breadcrumb */}
          <div className="overflow-x-auto">
            <Breadcrumb className="m-0 whitespace-nowrap text-sm">
              {(props.breadCrumbItems || []).map((item, index) =>
                item.active ? (
                  <Breadcrumb.Item active key={index}>
                    {item.label}
                  </Breadcrumb.Item>
                ) : (
                  <Breadcrumb.Item as="span" key={index}>
                    <Link
                      href={item.path}
                      className="text-[var(--primary-color)] no-underline"
                    >
                      {item.label}
                    </Link>
                  </Breadcrumb.Item>
                )
              )}
            </Breadcrumb>
          </div>

        </div>
      </Col>
    </Row>
  );
};

export default PageTitle;