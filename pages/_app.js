import '@/styles/globals.css'
import Layot from '@/components/layot'
import { ToastContainer } from 'react-toastify'
import { defaultConfig } from 'next/dist/server/config-shared'
import 'react-toastify/dist/ReactToastify.css'

function App({ Component, pageProps }) {
  return(
    <Layot>
      <ToastContainer limit={1}/>
     <Component {...pageProps} />
    </Layot>
  )
}
export default App;