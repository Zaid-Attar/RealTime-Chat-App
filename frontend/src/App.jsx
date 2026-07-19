import './App.css'
import { Show, SignInButton, SignUpButton, SignOutButton, UserButton } from '@clerk/react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <h1>RealTime Chat App</h1>
      <Show when="signed-out">
        <SignInButton mode="modal"/>
        <SignUpButton mode="modal"/>
      </Show>
      <Show when="signed-in">
        <SignOutButton />
        <UserButton />
      </Show>
    </div>
  )
}

export default App
