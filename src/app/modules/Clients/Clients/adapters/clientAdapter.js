export const clientAdapter = (requestedClient) => {
  const client = {
    client: {
      id: requestedClient?.client.id || "Sin datos",
      name: requestedClient?.client.name || "Sin datos",
      lastName: requestedClient?.client.lastName || "Sin datos",
      bussinessName: requestedClient?.client.bussinessName || "Sin datos",
      passport: requestedClient?.client.passport || "Sin datos",
      country: requestedClient?.client.country || "Sin datos",
      street: requestedClient?.client.street || "Sin datos",
      number: requestedClient?.client.number || "Sin datos",
      city: requestedClient?.client.city || "Sin datos",
      postalCode: requestedClient?.client.postalCode || "Sin datos",
      email: requestedClient?.client.email || "Sin datos",
      phone: requestedClient?.client.phone || "Sin datos",
      facebookId: requestedClient?.client.facebookId || "Sin datos",
      googleId: requestedClient?.client.googleId || "Sin datos",
      appleId: requestedClient?.client.appleId || "Sin datos",
      otherId: requestedClient?.client.otherId || "Sin datos",
      status: requestedClient?.client.status || "Sin datos",
      verified: requestedClient?.client.verified || "Sin datos",
      level: requestedClient?.client.level || "Sin datos",
      category: requestedClient?.client.category || "Sin datos",
      activity: requestedClient?.client.activity || "Sin datos",
      reference: requestedClient?.client.reference || "Sin datos",
      origen: requestedClient?.client.origen || "Sin Datos",
      idOrigen: requestedClient?.client.idOrigen || "Sin Datos",
      registrationdate: requestedClient?.client.registrationdate || "Sin Datos",
      constitutiondate: requestedClient?.client.constitutiondate || "Sin Datos",
      registrationnumber:
        requestedClient?.client.registrationnumber || "Sin Datos",
      ImpGanancias: requestedClient?.client.ImpGanancias || "Sin Datos",
      ImpIVA: requestedClient?.client.ImpIVA|| "Sin Datos",
      ImpIIBB: requestedClient?.client.ImpIIBB || "Sin Datos",
      NumIIBB: requestedClient?.client.NumIIBB || "Sin Datos",
      FacturacionAnual: requestedClient?.client.FacturacionAnual || "Sin Datos",
      DomicilioFiscal: requestedClient?.client.DomicilioFiscal || "Sin Datos",
      TipoSociedad: requestedClient?.client.TipoSociedad || "Sin Datos",
      EntidadRegistro: requestedClient?.client.EntidadRegistro || "Sin Datos",
      PaisInscripcion: requestedClient?.client.PaisInscripcion || "Sin Datos",
      ProvinciaInscripcion: requestedClient?.client.ProvinciaInscripcion || "Sin Datos",
      actividad: requestedClient?.client.actividad || "Sin Datos",
    },
    identity: {
      id: requestedClient?.identity.id || "Sin datos",
      level: requestedClient?.identity.level || "Sin datos",
      date: requestedClient?.identity.date || "Sin datos",
      dni: requestedClient?.identity.dni || "Sin datos",
      phone: requestedClient?.identity.phone || "Sin datos",
      obligatedSubject:
        requestedClient?.identity.obligatedSubject || "Sin datos",
      politicallyExposedPerson:
        requestedClient?.identity.politicallyExposedPerson || "Sin datos",
      name: requestedClient?.identity.name || "Sin Datos",
      lastname: requestedClient?.identity.lastname || "Sin Datos",
      email: requestedClient?.identity.email || "Sin Datos",
    },
    score: {
      name: requestedClient?.score.name || "Sin datos",
      lastName: requestedClient?.score.lastName || "Sin datos",
      score: requestedClient?.score.score || "Sin datos",
      income: requestedClient?.score.income || "Sin datos",
      available: requestedClient?.score.available || "Sin datos",
      expiration: requestedClient?.score.expiration || "Sin datos",
      socialRating: requestedClient?.score.socialRating || "Sin datos",
      operation: requestedClient?.score.operation || "Sin datos",
      situation: requestedClient?.score.situation || "Sin datos",
      situation6M: requestedClient?.score.situation6M || "Sin datos",
      situation12M: requestedClient?.score.situation12M || "Sin datos",
      model: requestedClient?.score.model || "Sin datos",
      maxi: requestedClient?.score.maxi || "Sin datos",
      maxShare: requestedClient?.score.maxShare || "Sin datos",
      age: requestedClient?.score.age || "Sin datos",
      cuit: requestedClient?.score.cuit || "Sin datos",
      dependecyRelationship:
        requestedClient?.score.dependecyRelationship || "Sin datos",
      retired: requestedClient?.score.retired || "Sin datos",
      monotribute: requestedClient?.score.monotribute || "Sin datos",
      MaxOperacionesHNTDia:
        requestedClient?.score.MaxOperacionesHNTDia || "Sin Datos",
      MaxOperacionesHNTMes:
        requestedClient?.score.MaxOperacionesHNTMes || "Sin Datos",
      MaxVolumenHNTDia: requestedClient?.score.MaxVolumenHNTDia || "Sin Datos",
      MaxVolumenHNTMes: requestedClient?.score.MaxVolumenHNTMes || "Sin Datos",
      idsituacionlaboral:
        requestedClient?.score.idsituacionlaboral || "Sin Datos",
      IncomeVolumenAnnual:
        requestedClient?.score.IncomeVolumenAnnual || "Sin Datos",
      actividad: requestedClient?.score.actividad || "Sin Datos",
    },
    hntAccount: {
      movementsHnt: requestedClient?.hntAccount.movementsHnt || [],
      dataAccount: {
        id: requestedClient?.hntAccount.dataAccount?.id || "Sin datos",
        account:
          requestedClient?.hntAccount.dataAccount?.account || "Sin datos",
        amount: requestedClient?.hntAccount.dataAccount?.amount || "Sin datos",
        type: requestedClient?.hntAccount.dataAccount?.type || "Sin datos",
        currency:
          requestedClient?.hntAccount.dataAccount?.currency || "Sin datos",
        cvu: requestedClient?.hntAccount.dataAccount?.cvu || "Sin datos",
        alias: requestedClient?.hntAccount.dataAccount?.alias || "Sin datos",
      },
    },
    arAccount: {
      movementsAr: requestedClient?.arAccount.movementsAr.map((mAr) => {
        const formattedMovementsAr = {
          id: mAr.id,
          Descripcion: mAr.Descripcion,
          Fecha: mAr.Fecha,
          Tipo: mAr.Tipo,
          TipoDescripcion: mAr.TipoDescripcion,
          Estado: mAr.Estado,
          TimeStamp: mAr.TimeStamp,
          Importe: mAr.Importe,
        };
        return formattedMovementsAr || [];
      }),
      dataAccount: {
        id: requestedClient?.arAccount?.dataAccount?.id || "Sin datos",
        account:
          requestedClient?.arAccount?.dataAccount?.account || "Sin datos",
        amount: requestedClient?.arAccount?.dataAccount?.amount || "Sin datos",
        type: requestedClient?.arAccount?.dataAccount?.type || "Sin datos",
        currency:
          requestedClient?.arAccount?.dataAccount?.currency || "Sin datos",
        cvu: requestedClient?.arAccount?.dataAccount?.cvu || "Sin datos",
        alias: requestedClient?.arAccount?.dataAccount?.alias || "Sin datos",
      },
    },
    usAccount: {
      movementsUs: requestedClient?.usAccount.movementsUs || [],
    },
    credits: {
      creditsRequested:
        requestedClient?.credits?.creditsRequested?.map((credits) => {
          const formattedCredits = {
            amount: credits.amount,
            date: credits.date,
            expiration: credits.expiration,
            id: credits.id,
            productName: credits.productName,
            quota: credits.quota,
            rate: credits.rate,
            status: credits.status,
            originalId: credits.reference,
          };
          return formattedCredits;
        }) || [],
    },
    activities: requestedClient?.activities || [],
  };
  return client;
};
