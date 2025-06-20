// Mock data para sociedades gerentes
export const managingCompaniesData = [
  {
    id: 1,
    name: "Gerente Nacional S.A.",
    legalName: "Sociedad Gerente Nacional S.A.",
    cuit: "30-98765432-1",
    registrationNumber: "GER-001-2020",
    status: "Activa",
    type: "Nacional",
    category: "A",
    rating: "AAA",
    foundingDate: "2020-02-10",
    lastAudit: "2023-12-20",
    nextAudit: "2024-12-20",
    contactInfo: {
      email: "contacto@gerentenacional.com",
      phone: "+54 11 4321-8765",
      address: "Av. Corrientes 2345, CABA",
      website: "www.gerentenacional.com",
    },
    management: {
      ceo: "Dr. Roberto Fernández",
      compliance: "Lic. Ana López",
      operations: "Ing. Carlos Silva",
      portfolioManager: "Lic. María González",
    },
    financials: {
      totalAssets: 3200000000,
      managedFunds: 2800000000,
      capital: 800000000,
      annualRevenue: 65000000,
      performanceFee: 1.5,
      managementFee: 0.8,
    },
    services: [
      "Gestión de Fondos Comunes",
      "Gestión de Carteras Individuales",
      "Análisis de Inversiones",
      "Asesoramiento Financiero",
      "Gestión de Riesgos",
      "Reportes de Performance",
    ],
    certifications: [
      "ISO 27001",
      "ISO 9001",
      "BCRA Autorizado",
      "CNV Registrado",
      "Certificación AMA",
    ],
    clients: 68,
    funds: 45,
    totalInvestors: 12500,
    isFeatured: true,
    notes:
      "Principal sociedad gerente del mercado argentino con enfoque en fondos de inversión",
  },
  {
    id: 2,
    name: "Gestión Global S.A.",
    legalName: "Sociedad Gestión Global S.A.",
    cuit: "30-11223344-5",
    registrationNumber: "GER-002-2019",
    status: "Activa",
    type: "Nacional",
    category: "A",
    rating: "AA+",
    foundingDate: "2019-08-15",
    lastAudit: "2023-11-25",
    nextAudit: "2024-11-25",
    contactInfo: {
      email: "info@gestionglobal.com",
      phone: "+54 11 4567-1234",
      address: "Av. Santa Fe 6789, CABA",
      website: "www.gestionglobal.com",
    },
    management: {
      ceo: "Dra. Laura Martínez",
      compliance: "Lic. Pedro Rodríguez",
      operations: "Ing. Sofía Herrera",
      portfolioManager: "Lic. Diego Morales",
    },
    financials: {
      totalAssets: 2400000000,
      managedFunds: 2000000000,
      capital: 600000000,
      annualRevenue: 48000000,
      performanceFee: 1.2,
      managementFee: 0.7,
    },
    services: [
      "Gestión de Fondos Comunes",
      "Gestión de Carteras Individuales",
      "Análisis de Inversiones",
      "Asesoramiento Financiero",
      "Gestión de Riesgos",
    ],
    certifications: [
      "ISO 27001",
      "BCRA Autorizado",
      "CNV Registrado",
      "Certificación AMA",
    ],
    clients: 45,
    funds: 32,
    totalInvestors: 8900,
    isFeatured: true,
    notes:
      "Especializada en gestión de fondos internacionales y mercados emergentes",
  },
  {
    id: 3,
    name: "Gerente del Sur S.A.",
    legalName: "Sociedad Gerente del Sur S.A.",
    cuit: "30-55667788-9",
    registrationNumber: "GER-003-2021",
    status: "Activa",
    type: "Regional",
    category: "B",
    rating: "A",
    foundingDate: "2021-04-20",
    lastAudit: "2023-10-30",
    nextAudit: "2024-10-30",
    contactInfo: {
      email: "contacto@gerentedelsur.com",
      phone: "+54 11 2345-6789",
      address: "Av. 9 de Julio 4567, CABA",
      website: "www.gerentedelsur.com",
    },
    management: {
      ceo: "Lic. Juan Pérez",
      compliance: "Lic. Carmen Ruiz",
      operations: "Ing. Ricardo Castro",
      portfolioManager: "Lic. Patricia Vega",
    },
    financials: {
      totalAssets: 1200000000,
      managedFunds: 950000000,
      capital: 250000000,
      annualRevenue: 22000000,
      performanceFee: 1.0,
      managementFee: 0.6,
    },
    services: [
      "Gestión de Fondos Comunes",
      "Gestión de Carteras Individuales",
      "Análisis de Inversiones",
      "Asesoramiento Financiero",
    ],
    certifications: ["BCRA Autorizado", "CNV Registrado"],
    clients: 25,
    funds: 18,
    totalInvestors: 4200,
    isFeatured: false,
    notes: "Enfoque en fondos regionales y PYMES con gestión personalizada",
  },
  {
    id: 4,
    name: "Gestión Financiera S.A.",
    legalName: "Sociedad Gestión Financiera S.A.",
    cuit: "30-99887766-5",
    registrationNumber: "GER-004-2018",
    status: "Suspendida",
    type: "Nacional",
    category: "C",
    rating: "BBB",
    foundingDate: "2018-11-05",
    lastAudit: "2023-09-15",
    nextAudit: "2024-09-15",
    contactInfo: {
      email: "info@gestionfinanciera.com",
      phone: "+54 11 3456-7890",
      address: "Av. Libertador 8901, CABA",
      website: "www.gestionfinanciera.com",
    },
    management: {
      ceo: "Dr. Fernando Torres",
      compliance: "Lic. Patricia Vega",
      operations: "Ing. Ricardo Castro",
      portfolioManager: "Lic. Daniel Moreno",
    },
    financials: {
      totalAssets: 600000000,
      managedFunds: 450000000,
      capital: 120000000,
      annualRevenue: 15000000,
      performanceFee: 0.8,
      managementFee: 0.5,
    },
    services: ["Gestión de Fondos Comunes", "Gestión de Carteras Individuales"],
    certifications: ["CNV Registrado"],
    clients: 12,
    funds: 8,
    totalInvestors: 1800,
    isFeatured: false,
    notes: "Suspensión temporal por auditoría regulatoria de compliance",
  },
  {
    id: 5,
    name: "Gerente Digital S.A.",
    legalName: "Sociedad Gerente Digital S.A.",
    cuit: "30-44332211-0",
    registrationNumber: "GER-005-2022",
    status: "Activa",
    type: "Nacional",
    category: "A",
    rating: "AA",
    foundingDate: "2022-12-01",
    lastAudit: "2023-12-05",
    nextAudit: "2024-12-05",
    contactInfo: {
      email: "contacto@gerentedigital.com",
      phone: "+54 11 5678-9012",
      address: "Av. Córdoba 3456, CABA",
      website: "www.gerentedigital.com",
    },
    management: {
      ceo: "Ing. Valeria Ríos",
      compliance: "Lic. Daniel Moreno",
      operations: "Ing. Carlos Mendoza",
      portfolioManager: "Lic. Elena Rodríguez",
    },
    financials: {
      totalAssets: 1800000000,
      managedFunds: 1500000000,
      capital: 400000000,
      annualRevenue: 35000000,
      performanceFee: 1.3,
      managementFee: 0.75,
    },
    services: [
      "Gestión de Fondos Comunes",
      "Gestión de Carteras Individuales",
      "Análisis de Inversiones",
      "Asesoramiento Financiero",
      "Gestión de Riesgos",
      "Tecnología Fintech",
      "APIs de Integración",
      "Robo-Advisory",
    ],
    certifications: [
      "ISO 27001",
      "ISO 9001",
      "BCRA Autorizado",
      "CNV Registrado",
      "Certificación Digital",
      "Certificación AMA",
    ],
    clients: 38,
    funds: 28,
    totalInvestors: 7500,
    isFeatured: true,
    notes: "Líder en gestión digital y tecnologías fintech para inversiones",
  },
  {
    id: 6,
    name: "Gestión Internacional S.A.",
    legalName: "Sociedad Gestión Internacional S.A.",
    cuit: "30-66778899-1",
    registrationNumber: "GER-006-2020",
    status: "Activa",
    type: "Internacional",
    category: "A",
    rating: "AAA",
    foundingDate: "2020-09-15",
    lastAudit: "2023-11-15",
    nextAudit: "2024-11-15",
    contactInfo: {
      email: "info@gestioninternacional.com",
      phone: "+54 11 6789-0123",
      address: "Av. Leandro N. Alem 5678, CABA",
      website: "www.gestioninternacional.com",
    },
    management: {
      ceo: "Dr. Miguel Ángel Santos",
      compliance: "Lic. Elena Rodríguez",
      operations: "Ing. Carlos Mendoza",
      portfolioManager: "Lic. Laura Fernández",
    },
    financials: {
      totalAssets: 4500000000,
      managedFunds: 3800000000,
      capital: 1000000000,
      annualRevenue: 85000000,
      performanceFee: 1.8,
      managementFee: 1.0,
    },
    services: [
      "Gestión de Fondos Comunes",
      "Gestión de Carteras Individuales",
      "Análisis de Inversiones",
      "Asesoramiento Financiero",
      "Gestión de Riesgos",
      "Servicios Internacionales",
      "Gestión de Criptoactivos",
      "Private Equity",
      "Venture Capital",
    ],
    certifications: [
      "ISO 27001",
      "ISO 9001",
      "BCRA Autorizado",
      "CNV Registrado",
      "Certificación Internacional",
      "Certificación AMA",
    ],
    clients: 75,
    funds: 52,
    totalInvestors: 18500,
    isFeatured: true,
    notes:
      "Especializada en servicios internacionales, criptoactivos y capital privado",
  },
  {
    id: 7,
    name: "Gerente Especializada S.A.",
    legalName: "Sociedad Gerente Especializada S.A.",
    cuit: "30-22334455-6",
    registrationNumber: "GER-007-2021",
    status: "Activa",
    type: "Nacional",
    category: "B",
    rating: "A+",
    foundingDate: "2021-06-10",
    lastAudit: "2023-10-20",
    nextAudit: "2024-10-20",
    contactInfo: {
      email: "contacto@gerenteespecializada.com",
      phone: "+54 11 7890-1234",
      address: "Av. Callao 1234, CABA",
      website: "www.gerenteespecializada.com",
    },
    management: {
      ceo: "Lic. Roberto Silva",
      compliance: "Lic. Carmen López",
      operations: "Ing. Diego Morales",
      portfolioManager: "Lic. Patricia Vega",
    },
    financials: {
      totalAssets: 900000000,
      managedFunds: 750000000,
      capital: 180000000,
      annualRevenue: 18000000,
      performanceFee: 1.1,
      managementFee: 0.65,
    },
    services: [
      "Gestión de Fondos Comunes",
      "Gestión de Carteras Individuales",
      "Análisis de Inversiones",
      "Asesoramiento Financiero",
      "Gestión de Riesgos",
      "Fondos Temáticos",
      "ESG Investing",
    ],
    certifications: [
      "BCRA Autorizado",
      "CNV Registrado",
      "Certificación ESG",
      "Certificación AMA",
    ],
    clients: 22,
    funds: 15,
    totalInvestors: 3200,
    isFeatured: false,
    notes:
      "Especializada en fondos temáticos y inversiones ESG (Environmental, Social, Governance)",
  },
  {
    id: 8,
    name: "Gestión Tradicional S.A.",
    legalName: "Sociedad Gestión Tradicional S.A.",
    cuit: "30-33445566-7",
    registrationNumber: "GER-008-2017",
    status: "Activa",
    type: "Nacional",
    category: "B",
    rating: "A-",
    foundingDate: "2017-03-25",
    lastAudit: "2023-09-10",
    nextAudit: "2024-09-10",
    contactInfo: {
      email: "info@gestiontradicional.com",
      phone: "+54 11 8901-2345",
      address: "Av. Belgrano 2345, CABA",
      website: "www.gestiontradicional.com",
    },
    management: {
      ceo: "Dr. Alberto González",
      compliance: "Lic. María Silva",
      operations: "Ing. Jorge López",
      portfolioManager: "Lic. Ana Martínez",
    },
    financials: {
      totalAssets: 700000000,
      managedFunds: 580000000,
      capital: 150000000,
      annualRevenue: 14000000,
      performanceFee: 0.9,
      managementFee: 0.55,
    },
    services: [
      "Gestión de Fondos Comunes",
      "Gestión de Carteras Individuales",
      "Análisis de Inversiones",
      "Asesoramiento Financiero",
    ],
    certifications: ["BCRA Autorizado", "CNV Registrado"],
    clients: 18,
    funds: 12,
    totalInvestors: 2800,
    isFeatured: false,
    notes: "Enfoque tradicional en gestión de fondos con estrategias probadas",
  },
];
