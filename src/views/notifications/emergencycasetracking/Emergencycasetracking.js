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
  CFormTextarea,
  CRow,
} from '@coreui/react'
import React, { useState } from 'react'

const EmergencyCaseTracking = () => {
  const [emergencyDetails, setEmergencyDetails] = useState({
    caseId: '',
    patientName: '',
    patientAge: '',
    caseType: '',
    emergencyDate: '',
    contactNumber: '',
    assignedDoctor: '',
    caseStatus: 'pending', // Default status is 'pending'
    emergencyNotes: '',
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setEmergencyDetails((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const submitEmergencyCase = () => {
    console.log('Emergency Case Submitted:', emergencyDetails)
    alert('Emergency case details saved successfully!')
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Emergency Case Tracking</strong>
          </CCardHeader>
          <CCardBody>
            <CForm>
              {/* Emergency Case Information */}
              <CRow>
                <CCol md={6}>
                  <CFormLabel htmlFor="caseId">Case ID</CFormLabel>
                  <CFormInput
                    type="text"
                    id="caseId"
                    name="caseId"
                    value={emergencyDetails.caseId}
                    onChange={handleInputChange}
                    placeholder="Enter case ID"
                  />
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="patientName">Patient Name</CFormLabel>
                  <CFormInput
                    type="text"
                    id="patientName"
                    name="patientName"
                    value={emergencyDetails.patientName}
                    onChange={handleInputChange}
                    placeholder="Enter patient's name"
                  />
                </CCol>
              </CRow>

              <CRow className="mt-3">
                <CCol md={3}>
                  <CFormLabel htmlFor="patientAge">Patient Age</CFormLabel>
                  <CFormInput
                    type="number"
                    id="patientAge"
                    name="patientAge"
                    value={emergencyDetails.patientAge}
                    onChange={handleInputChange}
                    placeholder="Enter patient's age"
                  />
                </CCol>
                <CCol md={3}>
                  <CFormLabel htmlFor="caseType">Case Type</CFormLabel>
                  <CFormSelect
                    id="caseType"
                    name="caseType"
                    value={emergencyDetails.caseType}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Case Type</option>
                    <option value="accident">Accident</option>
                    <option value="cardiac">Cardiac Arrest</option>
                    <option value="stroke">Stroke</option>
                    <option value="other">Other</option>
                  </CFormSelect>
                </CCol>
                <CCol md={3}>
                  <CFormLabel htmlFor="emergencyDate">Emergency Date</CFormLabel>
                  <CFormInput
                    type="datetime-local"
                    id="emergencyDate"
                    name="emergencyDate"
                    value={emergencyDetails.emergencyDate}
                    onChange={handleInputChange}
                  />
                </CCol>
                <CCol md={3}>
                  <CFormLabel htmlFor="contactNumber">Contact Number</CFormLabel>
                  <CFormInput
                    type="tel"
                    id="contactNumber"
                    name="contactNumber"
                    value={emergencyDetails.contactNumber}
                    onChange={handleInputChange}
                    placeholder="Enter contact number"
                  />
                </CCol>
              </CRow>

              <CRow className="mt-3">
                <CCol md={6}>
                  <CFormLabel htmlFor="assignedDoctor">Assigned Doctor</CFormLabel>
                  <CFormInput
                    type="text"
                    id="assignedDoctor"
                    name="assignedDoctor"
                    value={emergencyDetails.assignedDoctor}
                    onChange={handleInputChange}
                    placeholder="Enter doctor's name"
                  />
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="caseStatus">Case Status</CFormLabel>
                  <CFormSelect
                    id="caseStatus"
                    name="caseStatus"
                    value={emergencyDetails.caseStatus}
                    onChange={handleInputChange}
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                    <option value="closed">Closed</option>
                  </CFormSelect>
                </CCol>
              </CRow>

              <CRow className="mt-3">
                <CCol md={12}>
                  <CFormLabel htmlFor="emergencyNotes">Emergency Notes</CFormLabel>
                  <CFormTextarea
                    id="emergencyNotes"
                    name="emergencyNotes"
                    value={emergencyDetails.emergencyNotes}
                    onChange={handleInputChange}
                    rows="3"
                    placeholder="Enter any notes or updates regarding the emergency case"
                  />
                </CCol>
              </CRow>

              <CRow className="mt-4">
                <CCol md={2}>
                  <CButton color="primary" onClick={submitEmergencyCase}>
                    Submit Case
                  </CButton>
                </CCol>
              </CRow>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default EmergencyCaseTracking
