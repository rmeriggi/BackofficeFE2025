import { LOGIN_URL, MENU_URL } from "../_redux/authCrud";

export default function mockAuth(mock) {
  mock.onPost(LOGIN_URL).reply(({ data }) => {
    const { email, password } = JSON.parse(data);

    if (email && password) {
      if (email === "gadehnerA1@gmail.com" && password === "1234") {
        return [
          200,
          {
            jwt:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImNsaWVudElkIjo0LCJlbWFpbCI6ImdhZGVobmVyQTFAZ21haWwuY29tIiwibmFtZSI6IktldmluIiwibGFzdE5hbWUiOiJZYWd1YXIiLCJpYXQiOjI2MjUwNjQ2ODJ9.AOiujXPqrJt-QlhlEqkUqa1WkrrGy7FN9Exx2XxHuu0",
          },
        ];
      }
      if (email === "test@test.com.ar") {
        return [
          200,
          {
            jwt:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6InRlc3RAdGVzdC5jb20uYXIiLCJpYXQiOjE2MzUyNTY3NjN9.WMhbYIy9-m_prcPU5-1dbcFb_uu6Dv8dO435Pp6RIUA",
          },
        ];
      }
    }

    return [404];
  });

  mock.onGet(MENU_URL(1)).reply(() => {
    return [
      200,
      {
        menu: [
          {
            itemActive: "clients",
            nameMenu: "Clientes",
            icon: "/media/svg/icons/Communication/Group.svg",
            access: 1,
            subMenu: [
              {
                link: "/clients/statistics",
                name: "Estadisticas",
                access: 1,
              },
              {
                link: "/clients/clients",
                name: "Clientes",
                access: 1,
              },
            ],
          },
          {
            itemActive: "accounts",
            nameMenu: "Cuentas",
            icon: "/media/svg/icons/Communication/Clipboard-list.svg",
            access: 1,
            subMenu: [
              {
                link: "/accounts/dashboard",
                name: "Dashboard",
                access: 1,
              },
              {
                link: "/accounts/accounts",
                name: "Cuentas",
                access: 1,
              },
              {
                link: "/accounts/transactions",
                name: "Transacciones",
                access: 1,
              },
              {
                link: "/accounts/balances",
                name: "Saldos",
                access: 1,
              },
              {
                link: "/accounts/settings",
                name: "Ajustes",
                access: 1,
              },
            ],
          },
          {
            itemActive: "credits",
            nameMenu: "Creditos",
            icon: "/media/svg/icons/Layout/Layout-top-panel-6.svg",
            access: 1,
            subMenu: [
              {
                link: "/credits/dashboard",
                name: "Dashboard de productos",
                access: 1,
              },
              {
                link: "/credits/dashboard-collections",
                name: "Dashboard de cobranzas",
                access: 1,
              },
              {
                link: "/credits/settings-collections",
                name: "Ajustes de Cobranzas",
                access: 1,
              },
              {
                link: "/credits/products",
                name: "Oferta de productos",
                access: 1,
              },
              {
                link: "/credits/credits",
                name: "Créditos/Adelantos",
                access: 1,
              },
              {
                link: "/credits/creditsmanagement",
                name: "Gestion de Créditos",
                access: 1,
              },
              {
                link: "/credits/wallet",
                name: "Asignar cartera",
                access: 1,
              },
              {
                link: "/credits/query-assignment",
                name: "Consulta asignación",
                access: 1,
              },
              {
                link: "/credits/management",
                name: "Gestion de Cobranzas",
                access: 1,
              },
              {
                link: "/credits/external-imputations",
                name: "Imputaciones externas",
                access: 1,
              },
            ],
          },
          {
            itemActive: "cash",
            nameMenu: "Caja",
            icon: "/media/svg/icons/Communication/Group.svg",
            access: 1,
            subMenu: [
              {
                link: "/cash/collections",
                name: "Cobranzas",
                access: 1,
              },
              {
                link: "/cash/operations",
                name: "Operaciones",
                access: 1,
              },
              {
                link: "/cash/itau",
                name: "Banco Itaú",
                access: 1,
              },
              {
                link: "/cash/collectionsnc",
                name: "Cobranzas NC",
                access: 1,
              },
              {
                link: "/cash/values",
                name: "Banco de valores",
                access: 1,
              },
              {
                link: "/cash/balances-itau",
                name: "Saldos Itaú",
                access: 1,
              },
            ],
          },
          {
            itemActive: "cards",
            nameMenu: "Tarjetas",
            icon: "/media/svg/icons/Shopping/Credit-card.svg",
            access: 1,
            subMenu: [
              {
                link: "/cards/dashboard",
                name: "Dashboard de productos",
                access: 1,
              },
              {
                link: "/cards/products",
                name: "Productos",
                access: 1,
              },
              {
                link: "/cards/cards",
                name: "Tarjetas emitidas",
                access: 1,
              },
              {
                link: "/cards/transactions",
                name: "Asignar cartera",
                access: 1,
              },
              {
                link: "/cards/limits",
                name: "Limites/control",
                access: 1,
              },
              {
                link: "/cards/providers",
                name: "Procesadores",
                access: 1,
              },
              {
                link: "/cards/cardsrs",
                name: "Emisores",
                access: 1,
              },
            ],
          },
          {
            itemActive: "bcra",
            nameMenu: "BCRA/AFIP",
            icon: "/media/svg/icons/Home/Building.svg",
            access: 1,
            subMenu: [
              {
                link: "/bcra/comunications",
                name: "Comunicaciones",
                access: 1,
              },
              {
                link: "/bcra/ros",
                name: "ROS",
                access: 1,
              },
              {
                link: "/bcra/reports",
                name: "Informes",
                access: 1,
              },
              {
                link: "/bcra/archives",
                name: "Archivos",
                access: 1,
              },
              {
                link: "/bcra/sectionA",
                name: "Apartado A",
                access: 1,
              },
              {
                link: "/bcra/sectionB",
                name: "Apartado B",
                access: 1,
              },
            ],
          },
          {
            itemActive: "taxes",
            nameMenu: "Impuestos",
            icon: "/media/svg/icons/Files/File.svg",
            access: 1,
            subMenu: [
              {
                link: "/taxes/taxes",
                name: "Impuestos",
                access: 1,
              },
              {
                link: "/taxes/liquidations",
                name: "Liquidaciones",
                access: 1,
              },
            ],
          },
          {
            itemActive: "psp",
            nameMenu: "PSP",
            icon: "/media/svg/icons/Layout/Layout-grid.svg",
            access: 1,
            subMenu: [
              {
                link: "/psp/cashin",
                name: "Cashin",
                access: 1,
              },
              {
                link: "/psp/cashout",
                name: "Cashout",
                access: 1,
              },
              {
                link: "/psp/cvu",
                name: "Alta CVU",
                access: 1,
              },
              {
                link: "/psp/banco-cashout",
                name: "Banco Cashout",
                access: 1,
              },
            ],
          },
          {
            itemActive: "loyalty",
            nameMenu: "Loyalty",
            icon: "/media/svg/icons/General/Bookmark.svg",
            access: 1,
            subMenu: [
              {
                link: "/loyalty/programs",
                name: "Programas",
                access: 1,
              },
            ],
          },
          {
            itemActive: "settings",
            nameMenu: "Configuración",
            icon: "/media/svg/icons/General/Settings-2.svg",
            access: 1,
            subMenu: [
              {
                link: "/settings/scoresub",
                name: "Scoresub",
                access: 1,
              },
              {
                link: "/settings/scoreparams",
                name: "Scoreparams",
                access: 1,
              },
              {
                link: "/settings/user-management",
                name: "Gestión de Usuarios",
                access: 1,
              },
              {
                link: "/settings/frequency",
                name: "Frecuencia",
                access: 1,
              },
              {
                link: "/settings/login-data",
                name: "Datos de Ingreso",
                access: 1,
              },
            ],
          },
          {
            itemActive: "accounting",
            nameMenu: "Contabilidad",
            icon: "/media/svg/icons/General/Size.svg",
            access: 1,
            subMenu: [
              {
                link: "/accounting/dashboard",
                name: "Dashboard",
                access: 1,
              },
              {
                link: "/accounting/accounting-plan",
                name: "Plan Contable",
                access: 1,
              },
              {
                link: "/accounting/accounting-groups",
                name: "Grupos Contables",
                access: 1,
              },
              {
                link: "/accounting/accounts",
                name: "Cuentas",
                access: 1,
              },
              {
                link: "/accounting/subaccounts",
                name: "Subcuentas",
                access: 1,
              },
              {
                link: "/accounting/auxiliary-accounts",
                name: "Cuenta Auxiliar",
                access: 1,
              },
              {
                link: "/accounting/templates-entries",
                name: "Plantillas Asientos",
                access: 1,
              },
              {
                link: "/accounting/accounting-entries",
                name: "Asientos Contables",
                access: 1,
              },
              {
                link: "/accounting/balances",
                name: "Sumas y saldos",
                access: 1,
              },
              {
                link: "/accounting/diaryBook",
                name: "Libro diario",
                access: 1,
              },
              {
                link: "/accounting/mayorBook",
                name: "Libro mayor",
                access: 1,
              },
              {
                link: "/accounting/ivaventas",
                name: "Listado de Ventas IVA",
                access: 1,
              },
              {
                link: "/accounting/ivacompras",
                name: "Listado de Ventas IVA",
                access: 1,
              },
            ],
          },
          {
            itemActive: "investements",
            nameMenu: "Inversiones",
            icon: "/media/svg/icons/General/Size.svg",
            access: 1,
            subMenu: [
              {
                link: "/investments/dashboard",
                name: "Dashboard",
                access: 1,
              },
              {
                link: "/investments/products",
                name: "Productos",
                access: 1,
              },
              {
                link: "/investments/operations",
                name: "Operaciones",
                access: 1,
              },
              {
                link: "/investments/clients",
                name: "Clientes",
                access: 1,
              },
              {
                link: "/investments/p&l",
                name: "P&L",
                access: 1,
              },
              {
                link: "/investments/normative",
                name: "Normativo",
                access: 1,
              },
            ],
          },
          {
            itemActive: "investements",
            nameMenu: "Inversiones",
            icon: "/media/svg/icons/General/Size.svg",
            access: 1,
            subMenu: [
              {
                link: "/investments/dashboard",
                name: "Dashboard",
                access: 1,
              },
              {
                link: "/investments/products",
                name: "Productos",
                access: 1,
              },
              {
                link: "/investments/operations",
                name: "Operaciones",
                access: 1,
              },
              {
                link: "/investments/clients",
                name: "Clientes",
                access: 1,
              },
              {
                link: "/investments/p&l",
                name: "P&L",
                access: 1,
              },
              {
                link: "/investments/normative",
                name: "Normativo",
                access: 1,
              },
              {
                link: "/accounting/balances",
                name: "Sumas y saldos",
                access: 1,
              },
              {
                link: "/accounting/diaryBook",
                name: "Libro diario",
                access: 1,
              },
              {
                link: "/accounting/mayorBook",
                name: "Libro mayor",
                access: 1,
              },
              {
                link: "/accounting/ivaventas",
                name: "Listado de Ventas IVA",
                access: 1,
              },
              {
                link: "/accounting/ivacompras",
                name: "Listado de Ventas IVA",
                access: 1,
              },
            ],
          },
          {
            itemActive: "investements",
            nameMenu: "Inversiones",
            icon: "/media/svg/icons/General/Size.svg",
            access: 1,
            subMenu: [
              {
                link: "/investments/dashboard",
                name: "Dashboard",
                access: 1,
              },
              {
                link: "/investments/products",
                name: "Productos",
                access: 1,
              },
              {
                link: "/investments/operations",
                name: "Operaciones",
                access: 1,
              },
              {
                link: "/investments/clients",
                name: "Clientes",
                access: 1,
              },
              {
                link: "/investments/p&l",
                name: "P&L",
                access: 1,
              },
              {
                link: "/investments/normative",
                name: "Normativo",
                access: 1,
              },
            ],
          },
          {
            itemActive: "investements",
            nameMenu: "Inversiones",
            icon: "/media/svg/icons/General/Size.svg",
            access: 1,
            subMenu: [
              {
                link: "/investments/dashboard",
                name: "Dashboard",
                access: 1,
              },
              {
                link: "/investments/products",
                name: "Productos",
                access: 1,
              },
              {
                link: "/investments/operations",
                name: "Operaciones",
                access: 1,
              },
              {
                link: "/investments/clients",
                name: "Clientes",
                access: 1,
              },
              {
                link: "/investments/p&l",
                name: "P&L",
                access: 1,
              },
              {
                link: "/investments/normative",
                name: "Normativo",
                access: 1,
              },
            ],
          },
          {
            itemActive: "externalcharges",
            nameMenu: "Cobros Externos",
            icon: "/media/svg/icons/General/Size.svg",
            access: 1,
            subMenu: [
              {
                link: "/externalcharges/dashboard",
                name: "Dashboard",
                access: 1,
              },
              {
                link: "/externalcharges/links",
                name: "Link de Pagos",
                access: 1,
              },
              {
                link: "/externalcharges/distributorslink",
                name: "Distribuidores",
                access: 1,
              },
              {
                link: "/externalcharges/sites",
                name: "Sites",
                access: 1,
              },
              {
                link: "/externalcharges/movement",
                name: "Movimientos",
                access: 1,
              },
            ],
          },
          {
            itemActive: "reports",
            nameMenu: "Reportes",
            icon: "/media/svg/icons/General/Size.svg",
            access: 1,
            subMenu: [
              {
                link: "/reports/clients",
                name: "Reporte",
                access: 1,
              },
            ],
          },
        ],
      },
    ];
  });
}
