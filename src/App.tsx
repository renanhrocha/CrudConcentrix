import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import ItemList from './components/ItemList'
import { useTheme } from './context/ThemeContext'

function App() {
  const { theme, toggleTheme } = useTheme()
  return (
    <div className={`App ${theme}`}>
      <header className={`App-header ${theme}`}>
        <h1>Gerenciamento de Itens</h1>
        <button className="btn btn-primary" onClick={toggleTheme}>
          Trocar para {theme === 'light' ? 'Tema Escuro' : 'Tema Claro'}
        </button>
        <ItemList />
      </header>
    </div>
  )
}

export default App
