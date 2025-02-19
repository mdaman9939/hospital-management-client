import {
  cilBell,
  cilCursor,
  cilDescription,
  cilNotes,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'
import React from 'react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },

  {
    component: CNavTitle,
    name: 'Components',
  },
  {
    component: CNavGroup,
    name: 'Patient Management',
    to: '/base',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Patient Registration and Admission',
        to: '/base/patientregistrationadmission',
      },
      {
        component: CNavItem,
        name: 'Appointment Scheduling',
        to: '/base/appointmentscheduling',
      },
      {
        component: CNavItem,
        name: 'Discharge Summary Management',
        to: '/base/dischargesummarymanagement',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Doctor Management',
    to: '/buttons',
    icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Doctor Profiles and Specializations',
        to: '/buttons/doctorprofilesspecializations',
      },
      {
        component: CNavItem,
        name: 'Duty Rosters and Schedules',
        to: '/buttons/dutyrostersschedules',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Staff Management',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Employee Records',
        to: '/forms/employeerecords',
      },
      {
        component: CNavItem,
        name: 'Shift Management',
        to: '/forms/shiftmanagement',
      },
      {
        component: CNavItem,
        name: 'Payroll Leave Management',
        to: '/forms/payrollleavemanagement',
      },
    ],
  },

  {
    component: CNavGroup,
    name: 'Billing and Payment',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Invoice Generation',
        to: '/icons/invoicegeneration',
      },
      {
        component: CNavItem,
        name: 'Payment Integration',
        to: '/icons/paymentintegration',
      },
      {
        component: CNavItem,
        name: 'Insurance Claim Processing',
        to: '/icons/insuranceclaimprocessing',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Emergency ',
    icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Emergency Case Tracking',
        to: '/notifications/emergencycasetracking',
      },
      {
        component: CNavItem,
        name: 'Ambulance And ICU Management',
        to: '/notifications/ambulanceandicumanagement',
      },
    ],
  },

  {
    component: CNavTitle,
    name: 'Extras',
  },
  {
    component: CNavGroup,
    name: 'Pages',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Login',
        to: '/login',
      },
      {
        component: CNavItem,
        name: 'Register',
        to: '/register',
      },
      {
        component: CNavItem,
        name: 'Error 404',
        to: '/404',
      },
      {
        component: CNavItem,
        name: 'Error 500',
        to: '/500',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Docs',
    href: 'https://coreui.io/react/docs/templates/installation/',
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  },
]

export default _nav
