import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import React from 'react'

const AppointmentConsultationTracking = () => {
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Appointment and Consultation Tracking</strong>
          </CCardHeader>
          <CCardBody>
            {/* Form Section */}
            <CForm>
              <CRow>
                <CCol md={4}>
                  <CFormLabel htmlFor="patientName">Patient Name</CFormLabel>
                  <CFormInput type="text" id="patientName" placeholder="Enter patient's name" />
                </CCol>
                <CCol md={3}>
                  <CFormLabel htmlFor="doctorName">Doctor</CFormLabel>
                  <CFormSelect id="doctorName">
                    <option>Select Doctor</option>
                    <option value="drSmith">Dr. Smith</option>
                    <option value="drBrown">Dr. Brown</option>
                    <option value="drJones">Dr. Jones</option>
                  </CFormSelect>
                </CCol>
                <CCol md={3}>
                  <CFormLabel htmlFor="appointmentDate">Appointment Date</CFormLabel>
                  <CFormInput type="date" id="appointmentDate" />
                </CCol>
                <CCol md={2}>
                  <CFormLabel htmlFor="appointmentTime">Time</CFormLabel>
                  <CFormInput type="time" id="appointmentTime" />
                </CCol>
              </CRow>

              <CRow className="mt-3">
                <CCol md={12} className="text-end">
                  <CButton color="primary" type="submit">
                    Schedule Appointment
                  </CButton>
                </CCol>
              </CRow>
            </CForm>

            {/* Table Section */}
            <div className="mt-5">
              <h5>Upcoming Appointments</h5>
              <CTable striped hover responsive>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>Patient Name</CTableHeaderCell>
                    <CTableHeaderCell>Doctor</CTableHeaderCell>
                    <CTableHeaderCell>Date</CTableHeaderCell>
                    <CTableHeaderCell>Time</CTableHeaderCell>
                    <CTableHeaderCell>Status</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  <CTableRow>
                    <CTableDataCell>John Doe</CTableDataCell>
                    <CTableDataCell>Dr. Smith</CTableDataCell>
                    <CTableDataCell>2024-12-30</CTableDataCell>
                    <CTableDataCell>10:00 AM</CTableDataCell>
                    <CTableDataCell>Scheduled</CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableDataCell>Jane Roe</CTableDataCell>
                    <CTableDataCell>Dr. Brown</CTableDataCell>
                    <CTableDataCell>2024-12-31</CTableDataCell>
                    <CTableDataCell>11:00 AM</CTableDataCell>
                    <CTableDataCell>Scheduled</CTableDataCell>
                  </CTableRow>
                </CTableBody>
              </CTable>
            </div>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default AppointmentConsultationTracking
