import { Route, Routes } from 'react-router-dom'
import { withAuthentication } from '../../app-factory'
import { CustomersPage } from './pages/CustomersPage/CustomersPage'
import CustomerDetailsPage from './pages/CustomerDetailsPage/CustomerDetailsPage'
import { CustomerSearch } from './components/CustomerSearch/CustomerSearch'

const ProtectedHomePage = withAuthentication(CustomerSearch)
const ProtectedCustomersPage = withAuthentication(CustomersPage)
const ProtectedCustomerDetailsPage = withAuthentication(CustomerDetailsPage)

export const CustomerServiceApp = () => (
  <Routes>
    {/* <Route path="/" element={<ProtectedHomePage />} /> */}
    <Route path="/home" element={<ProtectedHomePage />} />
    <Route path="/home/customers" element={<ProtectedCustomersPage />} />
    <Route path="/home/customer-details" element={<ProtectedCustomerDetailsPage />} />
  </Routes>
)
