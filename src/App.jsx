import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider, useAuth } from "./utils/AuthProvider";
import { ThemeProvider } from "./utils/ThemeProvider";
import PrivateRoute from "./utils/PrivateRoute";
import Header from "./components/Header";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import AddExpense from "./pages/AddExpense";
import AddIncome from "./pages/AddIncome";
import AddSavings from "./pages/AddSavings";
import TransactionHistory from "./pages/TransactionHistory";
import Loading from "./components/Loading";

const App = () => {
  return (
    <>
    <BrowserRouter>
      <ThemeProvider>
      <AuthProvider>
      <Header />
      <main className="h-auto w-full">
        <AuthRoutes /> {/* Moved loading state inside here */}
      </main>
      </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
    </>
  )
}

//Component to handle loading state inside Routes
const AuthRoutes = () => {

  const { loading } = useAuth();

  if (loading) {

    return (
      <>
      <Loading />
      </>
    )
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route element={<PrivateRoute />}>
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/add-income' element={<AddIncome />} />
        <Route path='/add-expense' element={<AddExpense />} />
        <Route path='/add-savings' element={<AddSavings />} />
        <Route path='/transaction-history'
         element={<TransactionHistory />} />
      </Route>
    </Routes>
  )

}


export default App