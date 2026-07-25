import React from 'react'
import { hydrate, render } from 'preact'
import App from './App.jsx'
import './styles.css'

const root = document.getElementById('root')
if (root.hasChildNodes()) hydrate(<App />, root)
else render(<App />, root)
