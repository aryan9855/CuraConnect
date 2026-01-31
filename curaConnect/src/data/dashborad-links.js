import { ACCOUNT_TYPE } from "../utils/constants";
export const sidebarLinks = [
  {
    id: 1,
    name: "My Profile",
    path: "/dashboard/my-profile",
    icon: "VscAccount",
  },
  {
    id: 2,
    name: "Dashboard",
    path: "/dashboard/doctor",
    type: ACCOUNT_TYPE.DOCTOR,
    icon: "VscDashboard",
  },
  {
    id: 3,
    name: "My Health Program",
    path: "/dashboard/my-health-programs",
    type: ACCOUNT_TYPE.DOCTOR,
    icon: "VscVm",
  },
  {
    id: 4,
    name: "Add Health Program",
    path: "/dashboard/add-health-programs",
    type: ACCOUNT_TYPE.DOCTOR,
    icon: "VscAdd",
  },
  {
    id: 5,
    name: "Enrolled Health Program",
    path: "/dashboard/enrolled-health-programs",
    type: ACCOUNT_TYPE.PATIENT,
    icon: "VscMortarBoard",
  },
  {
    id: 6,
    name: "Your Cart",
    path: "/dashboard/cart",
    type: ACCOUNT_TYPE.PATIENT,
    icon: "VscHistory",
  },
];