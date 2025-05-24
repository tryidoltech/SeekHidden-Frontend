export const menuList = [
  {
    id: 0,
    name: "dashboards",
    path: "/dashboards",
    icon: 'feather-airplay',
  },
  {
    id: 1,
    name: "clients",
    path: "/clients",
    icon: 'feather-users',
  },
  {
    id: 2,
    name: "others",
    path: "#",
    icon: 'feather-grid',
    dropdownMenu: [
      {
        id: 1,
        name: "reports",
        path: "#",
        icon: 'feather-cast',
        subdropdownMenu: [
          {
            id: 1,
            name: "Sales Report",
            path: "/reports/sales"
          },
          {
            id: 2,
            name: "Leads Report",
            path: "/reports/leads"
          },
          {
            id: 3,
            name: "Project Report",
            path: "/reports/project"
          },
          {
            id: 4,
            name: "Timesheets Report",
            path: "/reports/timesheets"
          }
        ]
      },
      {
        id: 2,
        name: "applications",
        path: '#',
        icon: 'feather-send',
        subdropdownMenu: [
          {
            id: 1,
            name: "Chat",
            path: "/applications/chat"
          },
          {
            id: 2,
            name: "Email",
            path: "/applications/email"
          },
          {
            id: 3,
            name: "Tasks",
            path: "/applications/tasks"
          },
          {
            id: 4,
            name: "Notes",
            path: "/applications/notes"
          },
          {
            id: 5,
            name: "Storage",
            path: "/applications/storage"
          },
          {
            id: 6,
            name: "Calender",
            path: "/applications/calender"
          }
        ]
      },
      {
        id: 3,
        name: "proposal",
        path: "#",
        icon: 'feather-sign',
        subdropdownMenu: [
          {
            id: 1,
            name: "Proposal",
            path: "/proposal/list"
          },
          {
            id: 2,
            name: "Proposal View",
            path: "/proposal/view"
          },
          {
            id: 3,
            name: "Proposal Edit",
            path: "/proposal/edit"
          },
          {
            id: 4,
            name: "Proposal Create",
            path: "/proposal/create"
          }
        ]
      },
      {
        id: 4,
        name: "payment",
        path: "#",
        icon: 'feather-dollar-sign',
        subdropdownMenu: [
          {
            id: 1,
            name: "Payment",
            path: "/payment/list"
          },
          {
            id: 2,
            name: "Invoice View",
            path: "/payment/view"
          },
          {
            id: 3,
            name: "Invoice Create",
            path: "/payment/create"
          }
        ]
      },
      {
        id: 5,
        name: "customers",
        path: "#",
        icon: 'feather-users',
        subdropdownMenu: [
          {
            id: 1,
            name: "Customers",
            path: "/customers/list"
          },
          {
            id: 2,
            name: "Customers View",
            path: "/customers/view"
          },
          {
            id: 3,
            name: "Customers Create",
            path: "/customers/create"
          }
        ]
      },
      {
        id: 6,
        name: "leads",
        path: "#",
        icon: 'feather-alert-circle',
        subdropdownMenu: [
          {
            id: 1,
            name: "Leads",
            path: "/leads/list"
          },
          {
            id: 2,
            name: "Leads View",
            path: "/leads/view"
          },
          {
            id: 3,
            name: "Leads Create",
            path: "/leads/create"
          }
        ]
      },
      {
        id: 7,
        name: "projects",
        path: "#",
        icon: 'feather-briefcase',
        subdropdownMenu: [
          {
            id: 1,
            name: "Projects",
            path: "/projects/list"
          },
          {
            id: 2,
            name: "Projects View",
            path: "/projects/view"
          },
          {
            id: 3,
            name: "Projects Create",
            path: "/projects/create"
          }
        ]
      },
      {
        id: 8,
        name: "widgets",
        path: "#",
        icon: 'feather-layout',
        subdropdownMenu: [
          {
            id: 1,
            name: "Lists",
            path: "/widgets/lists"
          },
          {
            id: 2,
            name: "Tables",
            path: "/widgets/tables"
          },
          {
            id: 3,
            name: "Charts",
            path: "/widgets/charts"
          },
          {
            id: 4,
            name: "Statistics",
            path: "/widgets/statistics"
          },
          {
            id: 5,
            name: "Miscellaneous",
            path: "/widgets/miscellaneous"
          }
        ]
      },
      {
        id: 9,
        name: "settings",
        path: "#",
        icon: 'feather-settings',
        subdropdownMenu: [
          {
            id: 1,
            name: "General",
            path: "/settings/general"
          },
          {
            id: 2,
            name: "SEO",
            path: "/settings/seo"
          },
          {
            id: 3,
            name: "Tags",
            path: "/settings/tags"
          },
          {
            id: 4,
            name: "Email",
            path: "/settings/email"
          },
          {
            id: 5,
            name: "Tasks",
            path: "/settings/tasks"
          },
          {
            id: 6,
            name: "Leads",
            path: "/settings/leads"
          },
          {
            id: 7,
            name: "Support",
            path: "/settings/support"
          },
          {
            id: 8,
            name: "Finance",
            path: "/settings/finance"
          },
          {
            id: 9,
            name: "Gateways",
            path: "/settings/gateways"
          },
          {
            id: 10,
            name: "Customers",
            path: "/settings/customers"
          },
          {
            id: 11,
            name: "Localization",
            path: "/settings/localization"
          },
          {
            id: 12,
            name: "reCAPTCHA",
            path: "/settings/recaptcha"
          },
          {
            id: 13,
            name: "Miscellaneous",
            path: "/settings/miscellaneous"
          }
        ]
      },
      {
        id: 10,
        name: "authentication",
        path: "#",
        icon: 'feather-power',
        subdropdownMenu: [
          {
            id: 1,
            name: "login",
            path: "#",
            subdropdownMenu: [
              {
                id: 1,
                name: "Cover",
                path: "/authentication/login/cover"
              },
              {
                id: 2,
                name: "Minimal",
                path: "/authentication/login/minimal"
              },
              {
                id: 3,
                name: "Creative",
                path: "/authentication/login/creative"
              }
            ]
          },
          {
            id: 2,
            name: "register",
            path: "#",
            subdropdownMenu: [
              {
                id: 1,
                name: "Cover",
                path: "/authentication/register/cover"
              },
              {
                id: 2,
                name: "Minimal",
                path: "/authentication/register/minimal"
              },
              {
                id: 3,
                name: "Creative",
                path: "/authentication/register/creative"
              }
            ]
          },
          {
            id: 3,
            name: "Error 404",
            path: "#",
            subdropdownMenu: [
              {
                id: 1,
                name: "Cover",
                path: "/authentication/404/cover"
              },
              {
                id: 2,
                name: "Minimal",
                path: "/authentication/404/minimal"
              },
              {
                id: 3,
                name: "Creative",
                path: "/authentication/404/creative"
              }
            ]
          },
          {
            id: 4,
            name: "Reset Pass",
            path: "#",
            subdropdownMenu: [
              {
                id: 1,
                name: "Cover",
                path: "/authentication/reset/cover"
              },
              {
                id: 2,
                name: "Minimal",
                path: "/authentication/reset/minimal"
              },
              {
                id: 3,
                name: "Creative",
                path: "/authentication/reset/creative"
              }
            ]
          },
          {
            id: 5,
            name: "Verify OTP",
            path: "#",
            subdropdownMenu: [
              {
                id: 1,
                name: "Cover",
                path: "/authentication/verify/cover"
              },
              {
                id: 2,
                name: "Minimal",
                path: "/authentication/verify/minimal"
              },
              {
                id: 3,
                name: "Creative",
                path: "/authentication/verify/creative"
              }
            ]
          },
          {
            id: 6,
            name: "Maintenance",
            path: "#",
            subdropdownMenu: [
              {
                id: 1,
                name: "Cover",
                path: "/authentication/maintenance/cover"
              },
              {
                id: 2,
                name: "Minimal",
                path: "/authentication/maintenance/minimal"
              },
              {
                id: 3,
                name: "Creative",
                path: "/authentication/maintenance/creative"
              }
            ]
          }
        ]
      },
      {
        id: 11,
        name: "Help Center",
        path: "#",
        icon: 'feather-life-buoy',
        subdropdownMenu: [
          {
            id: 1,
            name: "Support",
            path: "https://themeforest.net/user/theme_ocean",
            subdropdownMenu: []
          },
          {
            id: 2,
            name: "KnowledgeBase",
            path: "/help/knowledgebase",
            subdropdownMenu: []
          },
          {
            id: 3,
            name: "Documentations",
            path: "/documentations",
            subdropdownMenu: []
          }
        ]
      }
    ]
  }
];