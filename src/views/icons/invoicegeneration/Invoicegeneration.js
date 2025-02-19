import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import React, { useState } from 'react'

const InvoiceGeneration = () => {
  const [services, setServices] = useState([])
  const [newService, setNewService] = useState({
    description: '',
    quantity: 1,
    rate: 0,
  })

  const [totalAmount, setTotalAmount] = useState(0)

  const addService = () => {
    const updatedServices = [
      ...services,
      { ...newService, total: newService.quantity * newService.rate },
    ]
    setServices(updatedServices)
    calculateTotal(updatedServices)
    setNewService({ description: '', quantity: 1, rate: 0 })
  }

  const calculateTotal = (updatedServices) => {
    const total = updatedServices.reduce((acc, service) => acc + service.total, 0)
    setTotalAmount(total)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setNewService((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Invoice Generation</strong>
          </CCardHeader>
          <CCardBody>
            {/* Service Input Form */}
            <CForm>
              <CRow>
                <CCol md={4}>
                  <CFormLabel htmlFor="description">Service Description</CFormLabel>
                  <CFormInput
                    type="text"
                    id="description"
                    name="description"
                    value={newService.description}
                    onChange={handleChange}
                    placeholder="Enter service description"
                  />
                </CCol>
                <CCol md={2}>
                  <CFormLabel htmlFor="quantity">Quantity</CFormLabel>
                  <CFormInput
                    type="number"
                    id="quantity"
                    name="quantity"
                    value={newService.quantity}
                    onChange={handleChange}
                    min="1"
                    placeholder="Enter quantity"
                  />
                </CCol>
                <CCol md={3}>
                  <CFormLabel htmlFor="rate">Rate per Unit</CFormLabel>
                  <CFormInput
                    type="number"
                    id="rate"
                    name="rate"
                    value={newService.rate}
                    onChange={handleChange}
                    min="0"
                    placeholder="Enter rate"
                  />
                </CCol>
                <CCol md={3} className="d-flex align-items-end">
                  <CButton color="primary" onClick={addService} className="w-100">
                    Add Service
                  </CButton>
                </CCol>
              </CRow>
            </CForm>

            {/* Services Table */}
            <div className="mt-4">
              <h5>Services</h5>
              <CTable striped hover responsive>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>#</CTableHeaderCell>
                    <CTableHeaderCell>Service Description</CTableHeaderCell>
                    <CTableHeaderCell>Quantity</CTableHeaderCell>
                    <CTableHeaderCell>Rate</CTableHeaderCell>
                    <CTableHeaderCell>Total</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {services.map((service, index) => (
                    <CTableRow key={index}>
                      <CTableDataCell>{index + 1}</CTableDataCell>
                      <CTableDataCell>{service.description}</CTableDataCell>
                      <CTableDataCell>{service.quantity}</CTableDataCell>
                      <CTableDataCell>${service.rate}</CTableDataCell>
                      <CTableDataCell>${service.total}</CTableDataCell>
                    </CTableRow>
                  ))}
                  {services.length === 0 && (
                    <CTableRow>
                      <CTableDataCell colSpan="5" className="text-center">
                        No services added
                      </CTableDataCell>
                    </CTableRow>
                  )}
                </CTableBody>
              </CTable>
            </div>

            {/* Total Amount */}
            <div className="text-end mt-3">
              <h5>Total Amount: ${totalAmount.toFixed(2)}</h5>
              <CButton color="success">Generate Invoice</CButton>
            </div>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default InvoiceGeneration
