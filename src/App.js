import React, { useEffect } from 'react'
import StateContext from './StateContext'
import DispatchContext from './DispatchContext'
import { useImmerReducer } from 'use-immer'

// COMPONENTS
import Header from './components/Header'
import Footer from './components/Footer'
import Welcome from './components/Welcome'
import FlashMessages from './components/FlashMessages'
import Home from './components/Home'
import LoadingDotsIcon from './components/LoadingDotsIcon'
import CenteredInContainer from './components/CenteredInContainer'

function App() {
  const initialState = {
    loggedIn: Boolean(localStorage.getItem('workflowUserId')),
    waitingForServer: false,
    flashMessages: [],
    user: {
      userId: localStorage.getItem('workflowUserId') || '',
      username: localStorage.getItem('workflowUsername') || ''
    }
  }

  function reducer(draft, action) {
    switch (action.type) {
      case 'login':
        draft.loggedIn = true
        draft.user.userId = action.value._id
        draft.user.username = action.value.username
        break
      case 'logout':
        draft.loggedIn = false
        break
      case 'flashMessage':
        draft.flashMessages.push({ value: action.value, color: action.color })
        break
      case 'startServerRequest':
        draft.waitingForServer = true
        break
      case 'stopServerRequest':
        draft.waitingForServer = false
        break
      default:
        break
    }
  }

  const [state, dispatch] = useImmerReducer(reducer, initialState)

  useEffect(() => {
    if (state.loggedIn) {
      localStorage.setItem('workflowUserId', state.user.userId)
      localStorage.setItem('workflowUsername', state.user.username)
    } else {
      localStorage.removeItem('workflowUserId')
      localStorage.removeItem('workflowUsername')
    }
  }, [state.loggedIn])

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <FlashMessages messages={state.flashMessages} />
        <Header />
        {state.waitingForServer ? (
          <CenteredInContainer minHeight="500px">
            <LoadingDotsIcon />
          </CenteredInContainer>
        ) : state.loggedIn ? (
          <Home />
        ) : (
          <Welcome />
        )}
        <Footer />
      </DispatchContext.Provider>
    </StateContext.Provider>
  )
}

export default App
