import React, { useContext, useState } from 'react'
import Routing from './Pages/Routing.js'
import { ThemeProvider } from '@mui/material/styles'
import { userContext } from './Pages/Context.js'

function App() {
  const userData = useContext(userContext);
  const [modeWeb, setModeWeb] = useState(userData.theme.get.palette.mode);
  //webContext obtiene datos de localStorage, themeMode y lang
  //Aquí se podría chequear la región del usuario??
  //para actualizar utilizando webContext y enviarlo a <Routing>
  return (
    <ThemeProvider theme={userData.theme.update.updatetheme(modeWeb)}>
    <div className="App" style={{backgroundColor:`${userData.theme.update.updatetheme(modeWeb).palette.primary.main}`}}>
      <Routing themeMode={modeWeb} changetheme={{local:setModeWeb, web:userData.theme.update.updateLocal}} lang={userData.lang} />
    </div>
    </ThemeProvider>
  );
}

export default App;
