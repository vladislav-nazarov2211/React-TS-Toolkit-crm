import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { FormRegistr } from './components/FormRegistr';
import { Bids } from './components/Bids';
import { EditBid } from './components/EditBid';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<FormRegistr />}/>
				<Route path='/bids' element={<Bids />}/>
				<Route path='/editbid/:id' element={<EditBid />}/>
			</Routes>  
    	</BrowserRouter>
	);
}

export default App;
