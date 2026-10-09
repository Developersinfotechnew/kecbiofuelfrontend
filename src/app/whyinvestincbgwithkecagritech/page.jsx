import QrScreens from '@/screens/QrScreens'
import React from 'react'
import PopupFormModal from '../Components/PopupFormModal'

const page = () => {
  return (
    <div>
      {/* Popup Form Modal */}
      <PopupFormModal
        googleFormActionUrl="https://docs.google.com/forms/d/e/1FAIpQLSfWc8xFd-PXIMWmh1rOEER1bblLfZObPv0BYjZmy7N-MMcunQ/formResponse"
        nameFieldId="entry.160379097"
        emailFieldId="entry.241185335"
        phoneFieldId="entry.863912628"
        investorFieldId="entry.1408678745"
      />
      
      {/* Your QR Screen Component */}
      <QrScreens/>
    </div>
  )
}

export default page