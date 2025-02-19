import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const DoctorProfilesSpecializations = () => {
  const navigate = useNavigate()

  // Authentication Check: Redirect to login if no token found
  useEffect(() => {
    const token = localStorage.getItem('token')

    if (!token) {
      navigate('/login')
    }
  }, [navigate])

  const [formData, setFormData] = useState({
    doctorName: '',
    qualification: '',
    experience: '',
    specializations: '',
    contactInfo: '',
    clinicAddress: '',
    biography: '',
  })
  const [doctorProfiles, setDoctorProfiles] = useState([])
  const API_URL = '${process.env.REACT_APP_API_URL}/api/doctor-profiles'

  // Fetch profiles from the backend
  const fetchProfiles = async () => {
    try {
      const token = localStorage.getItem('token') // Get the token from localStorage
      const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`, // Add Authorization header
          'Content-Type': 'application/json',
        },
      })
      const data = await response.json()
      setDoctorProfiles(data)
    } catch (error) {
      console.error('Error fetching profiles:', error)
    }
  }

  // Add a new profile to the backend
  const handleFormSubmit = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('token') // Get the token from localStorage
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Add Authorization header
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        const newProfile = await response.json()
        setDoctorProfiles([...doctorProfiles, newProfile.data]) // Update frontend with new profile
        setFormData({
          doctorName: '',
          qualification: '',
          experience: '',
          specializations: '',
          contactInfo: '',
          clinicAddress: '',
          biography: '',
        })
      } else {
        console.error('Failed to save profile')
      }
    } catch (error) {
      console.error('Error submitting profile:', error)
    }
  }

  // Fetch profiles on component mount
  useEffect(() => {
    fetchProfiles()
  }, [])

  const handleInputChange = (e) => {
    const { id, value } = e.target
    setFormData({ ...formData, [id]: value })
  }
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Doctor Profiles and Specializations</strong>
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={handleFormSubmit}>
              <CRow>
                <CCol md={4}>
                  <CFormLabel htmlFor="doctorName">Doctor Name</CFormLabel>
                  <CFormInput
                    type="text"
                    id="doctorName"
                    placeholder="Full name"
                    required
                    value={formData.doctorName}
                    onChange={handleInputChange}
                  />
                </CCol>
                <CCol md={4}>
                  <CFormLabel htmlFor="qualification">Qualification</CFormLabel>
                  <CFormInput
                    type="text"
                    id="qualification"
                    placeholder="e.g., MBBS, MD"
                    required
                    value={formData.qualification}
                    onChange={handleInputChange}
                  />
                </CCol>
                <CCol md={4}>
                  <CFormLabel htmlFor="experience">Years of Experience</CFormLabel>
                  <CFormInput
                    type="number"
                    id="experience"
                    placeholder="e.g., 10"
                    required
                    value={formData.experience}
                    onChange={handleInputChange}
                  />
                </CCol>
              </CRow>

              <CRow className="mt-3">
                <CCol md={6}>
                  <CFormLabel htmlFor="specializations">Specializations</CFormLabel>
                  <CFormTextarea
                    id="specializations"
                    rows="2"
                    placeholder="e.g., Cardiology, Neurology"
                    required
                    value={formData.specializations}
                    onChange={handleInputChange}
                  />
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="contactInfo">Contact Information</CFormLabel>
                  <CFormInput
                    type="tel"
                    id="contactInfo"
                    placeholder="Phone number or email"
                    required
                    value={formData.contactInfo}
                    onChange={handleInputChange}
                  />
                </CCol>
              </CRow>

              <CRow className="mt-3">
                <CCol md={12}>
                  <CFormLabel htmlFor="clinicAddress">Clinic/Hospital Address</CFormLabel>
                  <CFormTextarea
                    id="clinicAddress"
                    rows="3"
                    placeholder="Enter clinic or hospital address"
                    required
                    value={formData.clinicAddress}
                    onChange={handleInputChange}
                  />
                </CCol>
              </CRow>

              <CRow className="mt-3">
                <CCol md={12}>
                  <CFormLabel htmlFor="biography">Biography</CFormLabel>
                  <CFormTextarea
                    id="biography"
                    rows="4"
                    placeholder="Provide a short biography about the doctor"
                    required
                    value={formData.biography}
                    onChange={handleInputChange}
                  />
                </CCol>
              </CRow>

              <CRow className="mt-4">
                <CCol md={12} className="text-center">
                  <CButton color="primary" type="submit" className="w-25">
                    Save Profile
                  </CButton>
                </CCol>
              </CRow>
            </CForm>

            {/* Table to Display Profiles */}
            {doctorProfiles.length > 0 && (
              <CTable className="mt-4" responsive striped bordered>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>#</CTableHeaderCell>
                    <CTableHeaderCell>Doctor Name</CTableHeaderCell>
                    <CTableHeaderCell>Qualification</CTableHeaderCell>
                    <CTableHeaderCell>Experience</CTableHeaderCell>
                    <CTableHeaderCell>Specializations</CTableHeaderCell>
                    <CTableHeaderCell>Contact Info</CTableHeaderCell>
                    <CTableHeaderCell>Clinic Address</CTableHeaderCell>
                    <CTableHeaderCell>Biography</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {doctorProfiles.map((profile, index) => (
                    <CTableRow key={index}>
                      <CTableDataCell>{index + 1}</CTableDataCell>
                      <CTableDataCell>{profile.doctorName}</CTableDataCell>
                      <CTableDataCell>{profile.qualification}</CTableDataCell>
                      <CTableDataCell>{profile.experience}</CTableDataCell>
                      <CTableDataCell>{profile.specializations}</CTableDataCell>
                      <CTableDataCell>{profile.contactInfo}</CTableDataCell>
                      <CTableDataCell>{profile.clinicAddress}</CTableDataCell>
                      <CTableDataCell>{profile.biography}</CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            )}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default DoctorProfilesSpecializations
