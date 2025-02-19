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

const PaymentIntegration = () => {
  const [paymentMethod, setPaymentMethod] = useState('online')
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    transactionId: '',
    payerName: '',
    amount: '',
  })

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value)
    setPaymentDetails({
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      transactionId: '',
      payerName: '',
      amount: '',
    })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setPaymentDetails((prev) => ({ ...prev, [name]: value }))
  }

  const processPayment = () => {
    if (paymentMethod === 'online') {
      console.log('Processing Online Payment:', paymentDetails)
    } else {
      console.log('Processing Offline Payment:', paymentDetails)
    }
    alert('Payment processed successfully!')
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Payment Integration</strong>
          </CCardHeader>
          <CCardBody>
            {/* Payment Method Selection */}
            <CForm>
              <CRow>
                <CCol md={6}>
                  <CFormLabel htmlFor="paymentMethod">Select Payment Method</CFormLabel>
                  <CFormSelect
                    id="paymentMethod"
                    value={paymentMethod}
                    onChange={handlePaymentMethodChange}
                  >
                    <option value="online">Online Payment</option>
                    <option value="offline">Offline Payment</option>
                  </CFormSelect>
                </CCol>
              </CRow>

              {/* Online Payment Details */}
              {paymentMethod === 'online' && (
                <CRow className="mt-3">
                  <CCol md={4}>
                    <CFormLabel htmlFor="cardNumber">Card Number</CFormLabel>
                    <CFormInput
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      value={paymentDetails.cardNumber}
                      onChange={handleInputChange}
                      placeholder="Enter card number"
                    />
                  </CCol>
                  <CCol md={3}>
                    <CFormLabel htmlFor="expiryDate">Expiry Date</CFormLabel>
                    <CFormInput
                      type="text"
                      id="expiryDate"
                      name="expiryDate"
                      value={paymentDetails.expiryDate}
                      onChange={handleInputChange}
                      placeholder="MM/YY"
                    />
                  </CCol>
                  <CCol md={2}>
                    <CFormLabel htmlFor="cvv">CVV</CFormLabel>
                    <CFormInput
                      type="text"
                      id="cvv"
                      name="cvv"
                      value={paymentDetails.cvv}
                      onChange={handleInputChange}
                      placeholder="CVV"
                    />
                  </CCol>
                </CRow>
              )}

              {/* Offline Payment Details */}
              {paymentMethod === 'offline' && (
                <CRow className="mt-3">
                  <CCol md={4}>
                    <CFormLabel htmlFor="transactionId">Transaction ID</CFormLabel>
                    <CFormInput
                      type="text"
                      id="transactionId"
                      name="transactionId"
                      value={paymentDetails.transactionId}
                      onChange={handleInputChange}
                      placeholder="Enter transaction ID"
                    />
                  </CCol>
                  <CCol md={4}>
                    <CFormLabel htmlFor="payerName">Payer Name</CFormLabel>
                    <CFormInput
                      type="text"
                      id="payerName"
                      name="payerName"
                      value={paymentDetails.payerName}
                      onChange={handleInputChange}
                      placeholder="Enter payer's name"
                    />
                  </CCol>
                </CRow>
              )}

              {/* Common Payment Details */}
              <CRow className="mt-3">
                <CCol md={4}>
                  <CFormLabel htmlFor="amount">Payment Amount</CFormLabel>
                  <CFormInput
                    type="number"
                    id="amount"
                    name="amount"
                    value={paymentDetails.amount}
                    onChange={handleInputChange}
                    placeholder="Enter amount"
                  />
                </CCol>
              </CRow>

              {/* Submit Button */}
              <CRow className="mt-4">
                <CCol md={2}>
                  <CButton color="success" onClick={processPayment}>
                    Submit Payment
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

export default PaymentIntegration
