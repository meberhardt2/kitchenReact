import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Loading from 'components/common/loading';
import ErrorBoundary from 'components/common/error_boundary';
import Header from 'components/common/header';

const Homepage = lazy(() => import('components/homepage/index'));
const Recipe = lazy(() => import('components/recipe/index'));
const Tags = lazy(() => import('components/tags/index'));
const Search = lazy(() => import('components/search/index'));
const Camera = lazy(() => import('components/camera/index'));
const Upload = lazy(() => import('components/upload/index'));

/**************************************************************************************/
function App() {	
	return (
		<BrowserRouter>
			<Header />

			<div className="content">
				<ErrorBoundary>
					<Suspense fallback={<Loading />}>
						<Routes>
							<Route exact path="/" element={<Homepage />} />
							<Route path="/recipe/:id" element={<Recipe />} />
							<Route exact path="/tags" element={<Tags />} />
							<Route exact path="/search/" element={<Search />} />
							<Route exact path="/camera" element={<Camera />} />
							<Route exact path="/upload" element={<Upload />} />
						</Routes>
					</Suspense>
				</ErrorBoundary>
			</div>
			
		</BrowserRouter>
	);
}
/**************************************************************************************/

export default App;
