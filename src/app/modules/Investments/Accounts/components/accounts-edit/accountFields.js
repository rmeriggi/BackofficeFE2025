export const accountFields = {
  pmts: [
    [
        {
          label: "Comisión sin custodia",
          value: "pmtComSinCustodia"
        }, 
        {
          label: "pmtComRecepdeInf",
          value: "pmtComRecepdeInf"
        }, 
        {
          label: "pmtDerechoenMonOpe",
          value: "pmtDerechoenMonOpe"
        }, 
        {
          label: "Es Cliente Especial",
          value: "pmtEsClienteEspecial"
        }
    ],
    [
      {
        label: "pmtEsComPromotor",
        value: "pmtEsComPromotor"
      }, 
      {
        label: "Genera Avisos Alertas UIF",
        value: "pmtGeneraAvisosAlertasUIF"
      }, 
      {
        label: "pmtivAenMondeOpeMov",
        value: "pmtivAenMondeOpeMov"
      }, 
      {
        label: "Opera bajo Acuerdo Libre Adm",
        value: "pmtOperabajoAcuerdoLibreAdm"
      }
    ],
    [
      {
        label: "Permite Suscribir Cta Bancaria En VBHome",
        value: "pmtPermiteSuscribirCtaBancariaEnVBHome"
      }, 
      {
        label: "Recibe Mail Cambio Estado Ordenes",
        value: "pmtRecibeMailCambioEstadoOrdenes"
      }, 
      {
        label: "Excluye Calculo Retencion Percepcion IVA Boletos Cheques",
        value: "pmtExcluyeCalculoRetencionPercepcionIVABoletosCheques"
      }, 
      {
        label: "Excluye Calculo Resultado Op Continuo",
        value: "pmtExcluyeCalculoResultadoOpContinuo"
      }
    ],
    [
      {
        label: "Incluye Genracion Creditos Para Operar",
        value: "pmtIncluyeGenracionCreditosParaOperar"
      }, 
      {
        label: "Informa Interfaz GTR",
        value: "pmtInformaInterfazGTR"
      }, 
      {
        label: "Bonifica Gasto Custodia CV",
        value: "pmtBonificaGastoCustodiaCV"
      }, 
      {
        label: "Se Cobra Custodia",
        value: "pmtSeCobraCustodia"
      }
    ],
    [
      {
        label: "Se Cobran Aranceles Gestion Bancaria",
        value: "pmtSeCobranArancelesGestionBancaria"
      }, 
      {
        label: "Se Cobran Cargos Por Descubierto",
        value: "pmtSeCobranCargosPorDescubierto"
      }, 
      {
        label: "Se Envia Valuacion",
        value: "pmtSeEnviaValuacion"
      }, 
      {
        label: "Se Facturan Cargos Por Descubierto",
        value: "pmtSeFacturanCargosPorDescubierto"
      }
    ],
    [
      {
        label: "Se le imimen boletos",
        value: "pmtSeleimimenboletos"
      }, 
      {
        label: "Se le Imimen etiquetas",
        value: "pmtSeleImimenetiquetas"
      }
    ]
  ]
}

export const accountMock = {
  account: {
    id: 124578, ////////
    status: {////////
      statusId: 1,////////
      status: "Estado 1"////////
    },////////
    entity: {////////
      entityId: 1,////////
      entity: "Entidad 1"////////
    },////////
    currency: {////////
      currencyId: 1,////////
      currency: "Moneda 1"////////
    },////////
    client: {
      id: 1,
      name: "Kevin",////////
      lastname: "Yaguar",////////
      cuit: "20-39281627-2"////////
    },
    openingDate: "2022-04-22T15:49:50",////////
    denomination: "Denominacíon",////////
    mail: "kevin.yaguar@gmail.com",////////
    isFisco: 0, //bit //////////////
    estimatedHeritage: 56500,/////////////
    currencyHeritage: {////////
      id: 1,////////
      currencyHeritage: "Moneda patrimonio 1"////////
    },////////
    isQualifiedInvestor: 0, //bit//////////
    activity: 1,//////////
    expBrokerCta: 0, //bit //////////
    expBrokerCtaName: "Nombre de cta broker",//////////
    expInvestment: 0, //bit //////////
    investmentExperiencies: "experiencia en inversiones",//////////
    opportunisticSpeculative: 1, //////////
    ctaEstimatedAmount: 5000, //////////
    ivaDate: "2022-04-22T15:49:50", //////////
    ivaCod: "abc123", //////////
    tpRiskCmt: "abc123", //////////
    tpDrivingCart: "abc123",  //////////
    tpCmtTrading: 5000, //////////
    codCuotapartista: "abc123", //////////
    jointSignatureRequired: 0, //bit //////////
    jointSignatureReference: "abc123", //////////
    codGrupoArOperBurs: "abc123", //////////
    codTpComitente: 1, //////////
    codCategoriaUIF: 1, //////////
    codGrupoArAcreencias: 1, //////////
    codGrupoArCustodia: 1, //////////
    noPresencial: 0, // bit //////////
    signatureDateFrom: "2022-04-22T15:49:50", //////////
    noIntermediaryThird: 0, //bit //////////
    intermediary: 0, //bit //////////
    officialAccount: 1, //////////
    administrator: 1, //////////
    producer: 1, //////////
    codTpVirtualWallet: "abc123", //////////
    pmtComSinCustodia: 0,
    pmtComRecepdeInf: 0,
    pmtDerechoenMonOpe: 0,
    pmtEsClienteEspecial: 0,
    pmtEsComPromotor: 0,
    pmtGeneraAvisosAlertasUIF: 0,
    pmtivAenMondeOpeMov: 0,
    pmtOperabajoAcuerdoLibreAdm: 0,
    pmtPermiteSuscribirCtaBancariaEnVBHome: 0,
    pmtRecibeMailCambioEstadoOrdenes: 0,
    pmtExcluyeCalculoRetencionPercepcionIVABoletosCheques: 0,
    pmtExcluyeCalculoResultadoOpContinuo: 0,
    pmtIncluyeGenracionCreditosParaOperar: 0,
    pmtInformaInterfazGTR: 0,
    pmtBonificaGastoCustodiaCV: 0,
    pmtSeCobraCustodia: 0,
    pmtSeCobranArancelesGestionBancaria: 0,
    pmtSeCobranCargosPorDescubierto: 0,
    pmtSeEnviaValuacion: 0,
    pmtSeFacturanCargosPorDescubierto: 0,
    pmtSeleimimenboletos: 0,
    pmtSeleImimenetiquetas: 0,
  }
}