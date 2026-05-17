import { Amplify } from 'aws-amplify'
import outputs from '../amplify_outputs.json'
import { createRoot } from 'react-dom/client'
import App from './app/App.tsx'
import './styles/index.css'

Amplify.configure(outputs)

createRoot(document.getElementById('root')!).render(<App />)
