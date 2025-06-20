import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { privateRoutes, publicRoutes } from '~/routes';
import { DefaultLayout } from '~/components/Layouts';
import { Fragment, useEffect } from 'react';
import { useFEContext } from './context/FEProvider';
import ScrollToTopButton from './components/Layouts/components/ScrollToTopButton';
import Loading from './components/Layouts/components/Loading';
import LoadingInterceptor from '~/api/LoadingInterceptor';
import { AuthProvider } from './context/AuthContext';
import RequireAuth from './routes/RequireAuth';

function App() {
    const { isLoading } = useFEContext();
    useEffect(() => {
        const scrollY = localStorage.getItem('scrollY');
        if (scrollY !== null) {
            setTimeout(() => {
                window.scrollTo(0, parseInt(scrollY, 10));
                localStorage.removeItem('scrollY');
            }, 100); // delay 100ms để đảm bảo nội dung render xong
        }
    }, []);
    return (
        <AuthProvider>
            <Router>
                <div className="App">
                    <LoadingInterceptor />
                    {isLoading && <Loading />}
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
                        <Route element={<RequireAuth />}>
                            {privateRoutes
                                .filter((p) => !p.permissions) // chi can login, ko can role
                                .map((route, index) => {
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
                        </Route>
                        {privateRoutes
                            .filter((r) => r.permissions?.length > 0)
                            .map((route, index) => {
                                const Page = route.component;
                                let Layout = DefaultLayout;
                                if (route.layout) Layout = route.layout;
                                else if (route.layout === null) Layout = Fragment;

                                return (
                                    <Route
                                        key={index}
                                        path={route.path}
                                        element={
                                            <RequireAuth allowedPermissions={route.permissions}>
                                                <Layout>
                                                    <Page />
                                                </Layout>
                                            </RequireAuth>
                                        }
                                    />
                                );
                            })}

                        <Route path="*" element={<h1>404 – Not Found</h1>} />
                    </Routes>
                    <ScrollToTopButton />
                    <ToastContainer position="top-right" autoClose={3000} />
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
