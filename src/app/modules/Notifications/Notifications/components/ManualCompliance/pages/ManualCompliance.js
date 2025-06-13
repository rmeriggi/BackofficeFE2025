import React, { useState } from "react";
import { Container, Row, Col, Card, Table, Badge } from "react-bootstrap";
import { sections, summaryTable } from "../data/data";
const ManualCompliance = () => {
  const [activeKey, setActiveKey] = useState("0");

  return (
    <Container fluid className="bg-light py-4 px-0">
      {/* Encabezado con estilo Metronic */}
      <div className="bg-primary text-white py-5 mb-4">
        <Container>
          <Row>
            <Col>
              <h1 className="display-4 fw-bold">Manual de Compliance</h1>
              <p className="lead mb-0">
                Principales tareas y responsabilidades para entidades
                financieras
              </p>
            </Col>
          </Row>
        </Container>
      </div>

      <Container className="mb-5">
        <Row>
          <Col lg={8}>
            <Card className="shadow-sm mb-4">
              <Card.Body>
                <h2 className="text-primary mb-4">
                  <span aria-label="" role="img">
                    📋
                  </span>{" "}
                  Principales tareas y responsabilidades
                </h2>
                <p className="text-muted mb-4">
                  El área de Compliance es fundamental para cualquier entidad
                  que opera con dinero o datos personales, siendo uno de los
                  elementos que los reguladores observan con mayor atención.
                </p>

                <Col lg={8}>
                  <Card className="shadow-sm mb-4">
                    <Card.Body>
                      <h2 className="text-primary mb-4">
                        <span aria-label="" role="img">
                          📋
                        </span>{" "}
                        Principales tareas y responsabilidades
                      </h2>
                      <p className="text-muted mb-4">
                        El área de Compliance es fundamental para cualquier
                        entidad que opera con dinero o datos personales, siendo
                        uno de los elementos que los reguladores observan con
                        mayor atención.
                      </p>

                      {sections.map((section) => (
                        <Card key={section.id} className="mb-3 border-0">
                          <Card.Header
                            onClick={() =>
                              setActiveKey(
                                activeKey === section.id ? null : section.id
                              )
                            }
                            style={{ cursor: "pointer" }}
                            className="bg-white"
                          >
                            <div className="d-flex align-items-center">
                              <Badge bg="primary" className="me-3">
                                {section.id}
                              </Badge>
                              <span className="fw-bold">{section.title}</span>
                              <span className="ms-auto">
                                {activeKey === section.id ? "▼" : "►"}
                              </span>
                            </div>
                          </Card.Header>

                          {activeKey === section.id && (
                            <Card.Body className="bg-light">
                              <ul className="list-unstyled">
                                {section.items.map((item, itemIndex) => (
                                  <li key={itemIndex} className="mb-2 d-flex">
                                    <span className="text-success me-2">✓</span>
                                    <span
                                      className={
                                        item.startsWith(" - ") ? "ms-3" : ""
                                      }
                                    >
                                      {item}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            </Card.Body>
                          )}
                        </Card>
                      ))}
                    </Card.Body>
                  </Card>
                </Col>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4}>
            <Card className="shadow-sm mb-4">
              <Card.Body>
                <h3 className="text-primary mb-3">
                  <span aria-label="" role="img">
                    📊
                  </span>{" "}
                  Resumen gráfico de roles clave
                </h3>
                <div className="table-responsive">
                  <Table striped bordered hover className="mb-0">
                    <thead className="bg-primary text-white">
                      <tr>
                        <th>Función</th>
                        <th>Ejemplo práctico</th>
                      </tr>
                    </thead>
                    <tbody>
                      {summaryTable.map((row, index) => (
                        <tr key={index}>
                          <td className="fw-semibold">{row.funcion}</td>
                          <td>{row.ejemplo}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </Card.Body>
            </Card>

            <Card className="shadow-sm bg-info-light border-info">
              <Card.Body>
                <h4 className="text-info mb-3">
                  <span aria-label="check" role="img">
                    ✅
                  </span>
                  Requisitos esenciales
                </h4>
                <p>
                  En cualquier entidad financiera (HNT Bank, DA Valores, Omega,
                  PSPs) debe existir siempre:
                </p>
                <ul className="list-unstyled">
                  <li className="mb-2 d-flex">
                    <span className="text-info me-2">•</span>
                    <span>
                      Un Responsable de Compliance designado oficialmente
                    </span>
                  </li>
                  <li className="mb-2 d-flex">
                    <span className="text-info me-2">•</span>
                    <span>Políticas y procedimientos claros</span>
                  </li>
                  <li className="mb-2 d-flex">
                    <span className="text-info me-2">•</span>
                    <span>Un sistema de monitoreo con alertas</span>
                  </li>
                  <li className="mb-2 d-flex">
                    <span className="text-info me-2">•</span>
                    <span>Capacitaciones registradas</span>
                  </li>
                  <li className="mb-2 d-flex">
                    <span className="text-info me-2">•</span>
                    <span>Reporting a la Alta Dirección</span>
                  </li>
                </ul>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="mt-4">
          <Col>
            <Card className="shadow-sm bg-light-primary border-primary">
              <Card.Body>
                <div className="d-flex align-items-start">
                  <div className="flex-shrink-0 bg-primary text-white p-3 rounded-circle me-4">
                    <i className="bi bi-lightbulb fs-1"></i>
                  </div>
                  <div>
                    <h3 className="text-primary">Conclusión</h3>
                    <p className="lead mb-0">
                      El área de Compliance es el pilar fundamental que
                      garantiza la integridad, legalidad y sostenibilidad de
                      cualquier entidad financiera. Su función estratégica
                      protege tanto a la organización como a sus clientes,
                      asegurando el cumplimiento normativo en un entorno
                      regulatorio cada vez más complejo y exigente.
                    </p>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Footer con estilo Metronic */}
      <footer className="bg-dark text-white py-4 mt-5">
        <Container>
          <Row>
            <Col md={6}>
              <h5>Manual de Compliance</h5>
              <p className="text-muted mb-0">Documento interno - Versión 1.0</p>
            </Col>
            <Col md={6} className="text-md-end">
              <p className="mb-0">
                © {new Date().getFullYear()} Todos los derechos reservados
              </p>
              <p className="text-muted mb-0">
                Última actualización: {new Date().toLocaleDateString()}
              </p>
            </Col>
          </Row>
        </Container>
      </footer>
    </Container>
  );
};

export default ManualCompliance;
