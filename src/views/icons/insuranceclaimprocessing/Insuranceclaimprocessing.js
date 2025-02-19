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

const InsuranceClaimProcessing = () => {
  const [claimDetails, setClaimDetails] = useState({
    patientName: '',
    policyNumber: '',
    insurer: '',
    claimAmount: '',
    claimReason: '',
    documents: null,
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setClaimDetails((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e) => {
    setClaimDetails((prev) => ({ ...prev, documents: e.target.files[0] }))
  }

  const submitClaim = () => {
    console.log('Submitting Claim:', claimDetails)
    alert('Claim submitted successfully!')
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Insurance Claim Processing</strong>
          </CCardHeader>
          <CCardBody>
            <CForm>
              <CRow>
                {/* Patient Name */}
                <CCol md={6}>
                  <CFormLabel htmlFor="patientName">Patient Name</CFormLabel>
                  <CFormInput
                    type="text"
                    id="patientName"
                    name="patientName"
                    value={claimDetails.patientName}
                    onChange={handleInputChange}
                    placeholder="Enter patient name"
                  />
                </CCol>

                {/* Policy Number */}
                <CCol md={6}>
                  <CFormLabel htmlFor="policyNumber">Policy Number</CFormLabel>
                  <CFormInput
                    type="text"
                    id="policyNumber"
                    name="policyNumber"
                    value={claimDetails.policyNumber}
                    onChange={handleInputChange}
                    placeholder="Enter policy number"
                  />
                </CCol>
              </CRow>

              <CRow className="mt-3">
                {/* Insurance Provider */}
                <CCol md={6}>
                  <CFormLabel htmlFor="insurer">Insurance Provider</CFormLabel>
                  <CFormSelect
                    id="insurer"
                    name="insurer"
                    value={claimDetails.insurer}
                    onChange={handleInputChange}
                  >
                    <option value="">Select provider</option>
                    <option value="provider1">Provider 1</option>
                    <option value="provider2">Provider 2</option>
                    <option value="provider3">Provider 3</option>
                  </CFormSelect>
                </CCol>

                {/* Claim Amount */}
                <CCol md={6}>
                  <CFormLabel htmlFor="claimAmount">Claim Amount</CFormLabel>
                  <CFormInput
                    type="number"
                    id="claimAmount"
                    name="claimAmount"
                    value={claimDetails.claimAmount}
                    onChange={handleInputChange}
                    placeholder="Enter claim amount"
                  />
                </CCol>
              </CRow>

              <CRow className="mt-3">
                {/* Claim Reason */}
                <CCol md={12}>
                  <CFormLabel htmlFor="claimReason">Claim Reason</CFormLabel>
                  <CFormTextarea
                    id="claimReason"
                    name="claimReason"
                    rows="3"
                    value={claimDetails.claimReason}
                    onChange={handleInputChange}
                    placeholder="Provide a detailed reason for the claim"
                  />
                </CCol>
              </CRow>

              <CRow className="mt-3">
                {/* Document Upload */}
                <CCol md={12}>
                  <CFormLabel htmlFor="documents">Supporting Documents</CFormLabel>
                  <CFormInput
                    type="file"
                    id="documents"
                    name="documents"
                    onChange={handleFileChange}
                    placeholder="Upload relevant documents"
                  />
                </CCol>
              </CRow>

              <CRow className="mt-4">
                {/* Submit Button */}
                <CCol md={2}>
                  <CButton color="primary" onClick={submitClaim}>
                    Submit Claim
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

export default InsuranceClaimProcessing
