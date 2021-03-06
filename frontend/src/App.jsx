import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

import { SessionContext, HostContext } from './util/contexts';
import { useCookies } from 'react-cookie';
import { useJwt } from 'react-jwt';

import Aboutus from "./pages/Aboutus/About" 
import Notfound from './pages/Notfound';
import Home from './pages/LandingPage/Home';
import Signup from './pages/authpages/Signup';
import Signin from './pages/authpages/Signin';
import User from './pages/profiles/User';
import UserEdit from './pages/profiles/UserEdit';
import Team from './pages/teams/team';
import TeamPage from './pages/teams/teampage';
import TeamEdit from './pages/teams/teamedit';
import Courts from './pages/courts/courtpage';
import CourtCreate from './pages/courts/courtcreate';

const themes = {
	dark: createTheme({
		palette: {
			mode: 'dark',

			primary:
			{
				main: '#8e34b3'
			},

			neutral:
			{
				main: '#dddddd',
				light: '#ffffff',
				dark: '#525252',
				contrastText: 'rgba(0, 0, 0, 0.87)'
			},
			
			background:
			{
				box: '#0f0f0f',
				overlay: '#222222'
			}
		},
	}),

	light: createTheme({
		palette: {
			mode: 'light',

			primary:
			{
				main: '#8e34b3'
			},

			neutral:
			{
				main: '#808080',
				light: '#gggggg',
				dark: '#707070',
				contrastText: 'rgba(0, 0, 0, 0.87)'
			},
			
			background:
			{
				overlay: '#eeeeee'
			}
		},
	})
}

function App() {
	const [cookies] = useCookies(['token'])
	const { decodedToken } = useJwt(cookies.token);
	const session_uid = (decodedToken !== null) ? decodedToken.uid : null;
	const hostname = (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') ? 'http://localhost:3001/' : '/';

  	return (
		<ThemeProvider theme={themes.dark}>
			<CssBaseline />
			<Router>
				<SessionContext.Provider value={session_uid}>
				<HostContext.Provider value={hostname}>
					<Routes>
						<Route path="/" element={<Home />} /> 
						<Route path="/registre-se" element={<Signup />} />
						<Route path="/sobre" element={<Aboutus />} /> 
						<Route path="/entrar" element={<Signin />} />
						<Route path="/user/:id" element={<User />} />
						<Route path="/myteam" element={<TeamPage />} />
						<Route path="/courts" element={<Courts />} />
						<Route path="/cadastrarlocal" element={<CourtCreate />} />
						<Route path="/team/:id" element={<Team />} />	
						<Route path="/editartime/:id" element={<TeamEdit />}/>
						<Route path="/editarperfil" element={<UserEdit />}/>
						<Route path="*" element={<Notfound />} /> 
					</Routes>
				</HostContext.Provider>
				</SessionContext.Provider>
			</Router>
		</ThemeProvider>
	);
}

export default App;
