import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { publicRoutes } from '~/routes';
import { DefaultLayout } from '~/components/Layouts';
import { Fragment } from 'react';
import { DataProvider } from '~/context/DataContext'; // 👈 Thêm dòng này
import { FEProvider } from './context/FEProvider';
import ScrollToTopButton from './components/Layouts/components/ScrollToTopButton';

function App() {
    return (
        <Router>
            <DataProvider>
                <FEProvider>
                    <div className="App">
                        <Routes>
                            {publicRoutes.map((route, index) => {
                                const Page = route.component;
                                let Layout = DefaultLayout;
                                if (route.layout) Layout = route.layout;
                                else if (route.layout === null) Layout = Fragment;

                                return (
                                    <Route
                                        key={index}
                                        path={route.path}
                                        element={
                                            <Layout>
                                                <Page />
                                            </Layout>
                                        }
                                    />
                                );
                            })}
                        </Routes>
                        <ScrollToTopButton />

                        <ToastContainer position="top-right" autoClose={3000} />
                    </div>
                </FEProvider>
            </DataProvider>
        </Router>
    );
}

export default App;
