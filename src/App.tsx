import './App.css'
import { Comp } from './comp'
import { MatterStepOne } from './matterStepOne'
import { MatterStepThree } from './matterStepThree'
import { MatterStepTwo } from './matterStepTwo'

function App() {

  return (
    <>
      <Comp/>
      <div style={{height:"200px"}} />
      <MatterStepOne/>
      <div style={{height:"200px"}} />
      <MatterStepTwo/>
      <div style={{height:"200px"}} />
      <MatterStepThree/>
    </>
  )
}

export default App
