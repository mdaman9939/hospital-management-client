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
} from '@coreui/react'
import React, { useState } from 'react'

const AmbulanceAndICUManagement = () => {
  const [ambulanceDetails, setAmbulanceDetails] = useState({
    ambulanceId: '',
    driverName: '',
    status: 'available', // Default status is 'available'
    assignedToCase: false,
    patientName: '',
    icuBed: '',
    caseType: '',
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setAmbulanceDetails((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleAssignAmbulance = () => {
    console.log('Ambulance Assigned:', ambulanceDetails)
    alert('Ambulance has been successfully assigned.')
  }

  const handleAssignICUBed = () => {
    console.log('ICU Bed Assigned:', ambulanceDetails)
    alert('ICU Bed has been successfully assigned.')
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Ambulance and ICU Management</strong>
          </CCardHeader>
          <CCardBody>
            <CForm>
              {/* Ambulance Information */}
              <CRow>
                <CCol md={6}>
                  <CFormLabel htmlFor="ambulanceId">Ambulance ID</CFormLabel>
                  <CFormInput
                    type="text"
                    id="ambulanceId"
                    name="ambulanceId"
                    value={ambulanceDetails.ambulanceId}
                    onChange={handleInputChange}
                    placeholder="Enter ambulance ID"
                  />
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="driverName">Driver Name</CFormLabel>
                  <CFormInput
                    type="text"
                    id="driverName"
                    name="driverName"
                    value={ambulanceDetails.driverName}
                    onChange={handleInputChange}
                    placeholder="Enter driver's name"
                  />
                </CCol>
              </CRow>

              <CRow className="mt-3">
                <CCol md={6}>
                  <CFormLabel htmlFor="status">Ambulance Status</CFormLabel>
                  <CFormSelect
                    id="status"
                    name="status"
                    value={ambulanceDetails.status}
                    onChange={handleInputChange}
                  >
                    <option value="available">Available</option>
                    <option value="on-duty">On Duty</option>
                    <option value="assigned">Assigned</option>
                  </CFormSelect>
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="assignedToCase">Assigned to Case</CFormLabel>
                  <CFormSelect
                    id="assignedToCase"
                    name="assignedToCase"
                    value={ambulanceDetails.assignedToCase}
                    onChange={handleInputChange}
                  >
                    <option value={false}>No</option>
                    <option value={true}>Yes</option>
                  </CFormSelect>
                </CCol>
              </CRow>

              {/* ICU Management */}
              <CRow className="mt-3">
                <CCol md={6}>
                  <CFormLabel htmlFor="icuBed">ICU Bed Allocation</CFormLabel>
                  <CFormSelect
                    id="icuBed"
                    name="icuBed"
                    value={ambulanceDetails.icuBed}
                    onChange={handleInputChange}
                  >
                    <option value="">Select ICU Bed</option>
                    <option value="bed1">ICU Bed 1</option>
                    <option value="bed2">ICU Bed 2</option>
                    <option value="bed3">ICU Bed 3</option>
                  </CFormSelect>
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="caseType">Case Type</CFormLabel>
                  <CFormSelect
                    id="caseType"
                    name="caseType"
                    value={ambulanceDetails.caseType}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Case Type</option>
                    <option value="accident">Accident</option>
                    <option value="cardiac">Cardiac Arrest</option>
                    <option value="stroke">Stroke</option>
                    <option value="other">Other</option>
                  </CFormSelect>
                </CCol>
              </CRow>

              {/* Patient Details */}
              <CRow className="mt-3">
                <CCol md={6}>
                  <CFormLabel htmlFor="patientName">Patient Name</CFormLabel>
                  <CFormInput
                    type="text"
                    id="patientName"
                    name="patientName"
                    value={ambulanceDetails.patientName}
                    onChange={handleInputChange}
                    placeholder="Enter patient's name"
                  />
                </CCol>
              </CRow>

              {/* Actions */}
              <CRow className="mt-4">
                <CCol md={3}>
                  <CButton
                    color="primary"
                    onClick={handleAssignAmbulance}
                    disabled={ambulanceDetails.status !== 'available'}
                  >
                    Assign Ambulance
                  </CButton>
                </CCol>
                <CCol md={3}>
                  <CButton
                    color="success"
                    onClick={handleAssignICUBed}
                    disabled={!ambulanceDetails.icuBed}
                  >
                    Assign ICU Bed
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

export default AmbulanceAndICUManagement
