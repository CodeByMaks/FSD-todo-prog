import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import TableUser from '../pages/table-user'
import './styles/global.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TableUser />
  </StrictMode>,
)
