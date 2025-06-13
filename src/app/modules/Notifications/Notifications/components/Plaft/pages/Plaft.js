import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Badge,
  ListGroup,
  Table,
} from "react-bootstrap";

const PLAFTManual = () => {
  const [activeSection, setActiveSection] = useState(null);

  const sections = [
    {
      id: "1",
      title: "1. Introducción",
      content: (
        <>
          <p>
            Este manual establece la política y los procedimientos para la
            Prevención del Lavado de Activos y Financiamiento del Terrorismo
            (PLAFT) en HNT Bank, en cumplimiento con:
          </p>
          <ul>
            <li>Ley 25.246 y sus modificatorias</li>
            <li>Resoluciones UIF vigentes</li>
            <li>Normativa del BCRA / CNV según corresponda</li>
            <li>Normativa internacional (FATF - GAFI)</li>
          </ul>
          <p>
            El presente Manual es de aplicación a todos los empleados,
            directivos, socios, contratistas y terceros que actúan en nombre de
            la empresa.
          </p>
        </>
      ),
    },
    {
      id: "2",
      title: "2. Objetivo",
      content: (
        <>
          <p>Los objetivos principales son:</p>
          <ListGroup variant="flush">
            <ListGroup.Item className="d-flex align-items-center">
              <Badge bg="success" className="me-3">
                ✓
              </Badge>
              Prevenir que HNT Bank sea utilizada como vehículo para el lavado
              de activos o el financiamiento del terrorismo.
            </ListGroup.Item>
            <ListGroup.Item className="d-flex align-items-center">
              <Badge bg="success" className="me-3">
                ✓
              </Badge>
              Cumplir con la normativa nacional e internacional.
            </ListGroup.Item>
            <ListGroup.Item className="d-flex align-items-center">
              <Badge bg="success" className="me-3">
                ✓
              </Badge>
              Establecer controles internos efectivos.
            </ListGroup.Item>
            <ListGroup.Item className="d-flex align-items-center">
              <Badge bg="success" className="me-3">
                ✓
              </Badge>
              Proteger la reputación de la empresa.
            </ListGroup.Item>
          </ListGroup>
        </>
      ),
    },
    {
      id: "3",
      title: "3. Alcance",
      content: (
        <>
          <p>El Manual aplica a:</p>
          <div className="d-flex flex-wrap gap-2 mb-3">
            <Badge bg="info" className="fs-6 p-2">
              Cuentas de clientes
            </Badge>
            <Badge bg="info" className="fs-6 p-2">
              Productos financieros ofrecidos
            </Badge>
            <Badge bg="info" className="fs-6 p-2">
              Operaciones propias y de terceros
            </Badge>
            <Badge bg="info" className="fs-6 p-2">
              Proveedores y aliados estratégicos
            </Badge>
            <Badge bg="info" className="fs-6 p-2">
              Onboarding digital
            </Badge>
            <Badge bg="info" className="fs-6 p-2">
              Procesos de alta de clientes
            </Badge>
            <Badge bg="info" className="fs-6 p-2">
              Canales electrónicos y APIs
            </Badge>
          </div>
        </>
      ),
    },
    {
      id: "4",
      title: "4. Estructura de Compliance",
      content: (
        <>
          <div className="d-flex align-items-center mb-3">
            <div className="ms-3">
              <h5 className="mb-0">Responsable de PLAFT</h5>
              <p className="mb-0 text-muted">
                Juan Pérez - Oficial de Cumplimiento
              </p>
            </div>
          </div>

          <h5>Comité de Compliance</h5>
          <p>Reporte directo al Directorio de la empresa.</p>

          <h5 className="mt-4">
            Responsabilidades del Oficial de Cumplimiento:
          </h5>
          <div className="table-responsive">
            <Table striped bordered>
              <tbody>
                <tr>
                  <td className="fw-semibold">Supervisión</td>
                  <td>Implementación de este Manual</td>
                </tr>
                <tr>
                  <td className="fw-semibold">Monitoreo</td>
                  <td>Operaciones financieras</td>
                </tr>
                <tr>
                  <td className="fw-semibold">Reportes</td>
                  <td>A la UIF</td>
                </tr>
                <tr>
                  <td className="fw-semibold">Capacitación</td>
                  <td>Coordinación de programas formativos</td>
                </tr>
                <tr>
                  <td className="fw-semibold">Actualización</td>
                  <td>Del presente Manual</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </>
      ),
    },
    {
      id: "5",
      title: "5. Política de conocimiento del cliente (KYC)",
      content: (
        <>
          <h5>5.1 Identificación y verificación</h5>
          <p>Validación de la identidad por medios digitales:</p>
          <div className="row g-3 mb-4">
            <div className="col-md-6">
              <div className="border p-3 rounded bg-light">
                <div className="d-flex">
                  <i className="bi bi-check-circle-fill text-success me-2"></i>
                  <span>Validación de documento oficial</span>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="border p-3 rounded bg-light">
                <div className="d-flex">
                  <i className="bi bi-check-circle-fill text-success me-2"></i>
                  <span>Prueba de vida</span>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="border p-3 rounded bg-light">
                <div className="d-flex">
                  <i className="bi bi-check-circle-fill text-success me-2"></i>
                  <span>Validación biométrica</span>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="border p-3 rounded bg-light">
                <div className="d-flex">
                  <i className="bi bi-check-circle-fill text-success me-2"></i>
                  <span>Consulta a RENAPER / bases oficiales</span>
                </div>
              </div>
            </div>
          </div>

          <h5>5.2 Clasificación de riesgo de clientes</h5>
          <p>Los clientes son clasificados como:</p>
          <div className="d-flex flex-wrap gap-3 mb-3">
            <Badge bg="success" className="fs-6 p-2">
              Bajo riesgo
            </Badge>
            <Badge bg="warning" className="fs-6 p-2">
              Medio riesgo
            </Badge>
            <Badge bg="danger" className="fs-6 p-2">
              Alto riesgo
            </Badge>
          </div>

          <p>Criterios de clasificación:</p>
          <ul>
            <li>Sector económico</li>
            <li>Volumen transaccional esperado</li>
            <li>Jurisdicción</li>
            <li>Perfil transaccional</li>
            <li>Persona Políticamente Expuesta (PEP)</li>
          </ul>

          <h5>5.3 Personas Políticamente Expuestas</h5>
          <div className="alert alert-warning">
            <ul className="mb-0">
              <li>Identificación obligatoria de PEPs</li>
              <li>Aprobación previa a la activación de la cuenta</li>
              <li>Monitoreo reforzado</li>
            </ul>
          </div>
        </>
      ),
    },
    {
      id: "6",
      title: "6. Monitoreo de operaciones",
      content: (
        <>
          <h5>6.1 Umbrales y alertas automáticas</h5>
          <p>El sistema de monitoreo de HNT Bank incluye:</p>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Tipo de Alerta</th>
                <th>Descripción</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="fw-semibold">Operaciones fuera de perfil</td>
                <td>Actividad inconsistente con el comportamiento histórico</td>
              </tr>
              <tr>
                <td className="fw-semibold">Operaciones de alto monto</td>
                <td>Transacciones superiores a los límites establecidos</td>
              </tr>
              <tr>
                <td className="fw-semibold">Operaciones fraccionadas</td>
                <td>Detección de smurfing (transacciones divididas)</td>
              </tr>
              <tr>
                <td className="fw-semibold">Contrapartes de riesgo</td>
                <td>
                  Operaciones con entidades de jurisdicciones de alto riesgo
                </td>
              </tr>
              <tr>
                <td className="fw-semibold">Transferencias internacionales</td>
                <td>Monitoreo especial de transacciones transfronterizas</td>
              </tr>
            </tbody>
          </Table>

          <h5>6.2 Análisis manual</h5>
          <div className="d-flex">
            <div>
              <p>
                Las alertas son analizadas por el Oficial de Cumplimiento. Se
                documenta el análisis y, si corresponde, se eleva un ROS.
              </p>
            </div>
          </div>
        </>
      ),
    },
    {
      id: "7",
      title: "7. Reportes de Operaciones Sospechosas (ROS)",
      content: (
        <>
          <div className="alert alert-danger">
            <h5 className="d-flex align-items-center">
              <i className="bi bi-exclamation-triangle-fill me-2"></i>
              Protocolo de Reporte
            </h5>
            <ul className="mb-0">
              <li>
                El Oficial de Cumplimiento es el único autorizado a enviar ROS
              </li>
              <li>Se debe preservar la confidencialidad del proceso</li>
              <li>El ROS se envía conforme a las pautas de la UIF</li>
              <li>La presentación de un ROS no se comunica al cliente</li>
            </ul>
          </div>
        </>
      ),
    },
    {
      id: "8",
      title: "8. Capacitación",
      content: (
        <>
          <div className="d-flex align-items-center mb-3">
            <div>
              <h5 className="mb-0">Programa de Capacitación Anual</h5>
              <p className="mb-0">Obligatorio para todo el personal</p>
            </div>
          </div>

          <p>Contenidos principales:</p>
          <div className="row g-3">
            <div className="col-md-6">
              <Card className="h-100">
                <Card.Body>
                  <Card.Title>Conceptos básicos de PLAFT</Card.Title>
                  <ul>
                    <li>Definiciones clave</li>
                    <li>Marco regulatorio</li>
                    <li>Responsabilidades</li>
                  </ul>
                </Card.Body>
              </Card>
            </div>
            <div className="col-md-6">
              <Card className="h-100">
                <Card.Body>
                  <Card.Title>Detección de operaciones sospechosas</Card.Title>
                  <ul>
                    <li>Indicadores de alerta</li>
                    <li>Casos prácticos</li>
                    <li>Protocolos de actuación</li>
                  </ul>
                </Card.Body>
              </Card>
            </div>
          </div>

          <div className="mt-3 d-flex align-items-center">
            <i className="bi bi-journal-check fs-4 text-primary me-2"></i>
            <span>Se documenta la participación de los asistentes</span>
          </div>
        </>
      ),
    },
    {
      id: "9",
      title: "9. Control de terceros",
      content: (
        <>
          <p>Proceso de debida diligencia sobre terceros:</p>
          <ul>
            <li>Proveedores estratégicos</li>
            <li>Proveedores tecnológicos</li>
            <li>Socios comerciales</li>
          </ul>

          <div className="alert alert-info">
            <h5 className="d-flex align-items-center">
              <i className="bi bi-file-earmark-text-fill me-2"></i>
              Requisitos contractuales
            </h5>
            <p>Se incluyen cláusulas contractuales de PLAFT en:</p>
            <div className="d-flex flex-wrap gap-2">
              <Badge bg="dark" className="fs-6">
                PLAFT
              </Badge>
              <Badge bg="dark" className="fs-6">
                Datos personales
              </Badge>
              <Badge bg="dark" className="fs-6">
                Anticorrupción
              </Badge>
              <Badge bg="dark" className="fs-6">
                Derechos laborales
              </Badge>
            </div>
          </div>

          <p>Se monitorea la actividad de los terceros periódicamente.</p>
        </>
      ),
    },
    {
      id: "10",
      title: "10. Registro y conservación de documentación",
      content: (
        <>
          <p>Se conservan registros de:</p>
          <div className="row g-3 mb-4">
            <div className="col-md-4">
              <div className="border-start border-3 border-primary p-3 bg-light">
                <h6>Identificación de clientes</h6>
              </div>
            </div>
            <div className="col-md-4">
              <div className="border-start border-3 border-primary p-3 bg-light">
                <h6>Perfil transaccional</h6>
              </div>
            </div>
            <div className="col-md-4">
              <div className="border-start border-3 border-primary p-3 bg-light">
                <h6>Alertas y análisis</h6>
              </div>
            </div>
            <div className="col-md-4">
              <div className="border-start border-3 border-primary p-3 bg-light">
                <h6>ROS enviados</h6>
              </div>
            </div>
            <div className="col-md-4">
              <div className="border-start border-3 border-primary p-3 bg-light">
                <h6>Capacitación</h6>
              </div>
            </div>
          </div>

          <div className="bg-warning bg-opacity-10 p-3 rounded">
            <h5 className="d-flex align-items-center">
              <i className="bi bi-clock-history me-2"></i>
              Plazo de conservación
            </h5>
            <p className="mb-0">Mínimo 10 años o según la norma vigente</p>
          </div>
        </>
      ),
    },
    {
      id: "11",
      title: "11. Evaluación y actualización del sistema",
      content: (
        <>
          <div className="d-flex align-items-center mb-3">
            <div>
              <h5 className="mb-0">Revisión Anual del Sistema PLAFT</h5>
            </div>
          </div>

          <p>Se actualiza este Manual conforme a:</p>
          <ul>
            <li>Cambios regulatorios</li>
            <li>Cambios en el modelo de negocio</li>
            <li>Lecciones aprendidas en la operación</li>
          </ul>
        </>
      ),
    },
    {
      id: "12",
      title: "12. Disposiciones finales",
      content: (
        <>
          <div className="alert alert-danger">
            <h5 className="d-flex align-items-center">
              <i className="bi bi-exclamation-octagon-fill me-2"></i>
              Incumplimiento
            </h5>
            <p>
              El incumplimiento de este Manual será considerado falta grave.
            </p>
          </div>

          <div className="d-flex">
            <div>
              <p>
                El Oficial de Cumplimiento y el Comité de Compliance velarán por
                su cumplimiento.
              </p>
            </div>
          </div>

          <div className="d-flex mt-3">
            <div>
              <p>
                La Alta Dirección se compromete a brindar el apoyo y recursos
                necesarios para una gestión efectiva de PLAFT.
              </p>
            </div>
          </div>
        </>
      ),
    },
  ];

  return (
    <Container fluid className="bg-light py-4 px-0">
      {/* Encabezado con estilo de documento oficial */}
      <div className="bg-white border-bottom py-5 mb-4 shadow-sm">
        <Container>
          <Row className="align-items-center">
            <Col md={9}>
              <div className="border-start border-3 border-primary ps-4">
                <h1 className="display-4 fw-bold text-dark">Manual de PLAFT</h1>
                <h2 className="text-primary">HNT Bank</h2>
                <p className="text-muted mb-0">
                  Políticas y procedimientos para la Prevención del Lavado de
                  Activos y Financiamiento del Terrorismo
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <Container className="mb-5">
        <Row>
          <Col lg={3} className="mb-4">
            <Card className="shadow-sm ">
              <Card.Header className="bg-primary text-white">
                <h5 className="mb-0">Tabla de Contenidos</h5>
              </Card.Header>
              <Card.Body>
                <ListGroup variant="flush">
                  {sections.map((section) => (
                    <ListGroup.Item
                      key={section.id}
                      action
                      active={activeSection === section.id}
                      onClick={() => setActiveSection(section.id)}
                      className="d-flex align-items-center"
                    >
                      <span className="fw-semibold">{section.title}</span>
                      {activeSection === section.id && (
                        <i className="bi bi-arrow-right ms-auto"></i>
                      )}
                    </ListGroup.Item>
                  ))}
                </ListGroup>

                <div className="mt-4 p-3 bg-light rounded">
                  <h6>Información del Documento</h6>
                  <ul className="list-unstyled small">
                    <li>
                      <strong>Versión:</strong> 3.1
                    </li>
                    <li>
                      <strong>Última actualización:</strong> 15/05/2024
                    </li>
                    <li>
                      <strong>Responsable:</strong> Oficina de Cumplimiento
                    </li>
                    <li>
                      <strong>Aprobado por:</strong> Directorio
                    </li>
                  </ul>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={9}>
            <Card className="shadow-sm">
              <Card.Body>
                {/* Sección de introducción */}
                <div className="mb-5">
                  <h3 className="text-primary mb-4">{sections[0].title}</h3>
                  {sections[0].content}
                </div>

                {/* Resto de las secciones */}
                {sections.slice(1).map((section) => (
                  <div
                    key={section.id}
                    id={`section-${section.id}`}
                    className={`mb-5 pt-4 ${
                      activeSection === section.id ? "border-top" : ""
                    }`}
                  >
                    <h3 className="text-primary mb-4">{section.title}</h3>
                    {section.content}
                  </div>
                ))}
              </Card.Body>
            </Card>

            {/* Sello de aprobación */}
            <Card className="mt-4 border-primary">
              <Card.Body>
                <div className="d-flex align-items-center">
                  <div className="bg-light border rounded p-3 text-center me-4">
                    <div
                      className="border rounded-circle d-flex align-items-center justify-content-center mx-auto mb-2"
                      style={{ width: "80px", height: "80px" }}
                    >
                      <i className="bi bi-check-circle-fill text-success fs-1"></i>
                    </div>
                    <span className="text-muted small">Aprobado</span>
                  </div>
                  <div>
                    <h5 className="text-primary">
                      Certificación de Cumplimiento
                    </h5>
                    <p className="mb-0">
                      Este documento ha sido revisado y aprobado por el Comité
                      de Cumplimiento y el Directorio de HNT Bank, garantizando
                      su alineación con la normativa vigente y las mejores
                      prácticas del sector.
                    </p>
                  </div>
                </div>
              </Card.Body>
              <Card.Footer className="text-muted small d-flex justify-content-between">
                <span>Fecha de aprobación: 10/05/2024</span>
                <span>Próxima revisión: 10/05/2025</span>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Footer con estilo profesional */}
      <footer className="bg-dark text-white py-4 mt-5">
        <Container>
          <Row>
            <Col md={6}>
              <h5>HNT Bank - Oficina de Cumplimiento</h5>
              <p className="text-muted mb-0">
                Manual de Prevención de Lavado de Activos y Financiamiento del
                Terrorismo
              </p>
            </Col>
            <Col md={6} className="text-md-end mt-3 mt-md-0">
              <p className="mb-1">Documento confidencial - Uso interno</p>
              <p className="text-muted mb-0">
                Versión 3.1 | Última actualización:{" "}
                {new Date().toLocaleDateString()}
              </p>
            </Col>
          </Row>
        </Container>
      </footer>
    </Container>
  );
};

export default PLAFTManual;
