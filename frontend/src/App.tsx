import './App.css'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import { IssuesProvider } from './state/issuesContext'
import { IssuesListPage } from './pages/issuesListPage'
import { IssueFormPage } from './pages/issuesFormPage'

function App() {
  return (
    <BrowserRouter>
      <IssuesProvider>
        <header className="">
          <nav className="">
            <Link to="/">Issues</Link>
            <Link to="/issues/new" className="">New Issue</Link>
          </nav>
        </header>
        <main className="container">
          <Routes>
            <Route path="/" element={<IssuesListPage />} />
            <Route path="/issues/new" element={<IssueFormPage mode="create" />} />
            <Route path="/issues/:id/edit" element={<IssueFormPage mode="edit" />} />
          </Routes>
        </main>
      </IssuesProvider>
    </BrowserRouter>
  )
}

export default App
