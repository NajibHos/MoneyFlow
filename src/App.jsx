import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider, useAuth } from "./utils/AuthProvider";
import PrivateRoute from "./utils/PrivateRoute";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AddExpense from "./pages/AddExpense";
import AddIncome from "./pages/AddIncome";
import Dashboard from "./pages/Dashboard";
import TransactionHistory from "./pages/TransactionHistory";
import AddSavings from "./pages/AddSavings";
import SkeletonLoading from "./components/SkeletonLoading";

const App = () => {
  return (
    <BrowserRouter>
    <AuthProvider>
      <Header />
      <main className="h-auto w-full">
        <AuthRoutes /> {/* ✅ Moved loading state inside here */}
      </main>
      <Footer />
      </AuthProvider>
    </BrowserRouter>
  )
}

// ✅ Component to handle loading state inside Routes
const AuthRoutes = () => {

  const { loading } = useAuth();

  if (loading) {
    return (
      <>
      <SkeletonLoading />
      </>
    )
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route element={<PrivateRoute />}>
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/add-income' element={<AddIncome />} />
        <Route path='/add-expenses' element={<AddExpense />} />
        <Route path='/add-savings' element={<AddSavings />} />
        <Route path='/transaction-history'
         element={<TransactionHistory />} />
      </Route>
    </Routes>
  )

}

export default App