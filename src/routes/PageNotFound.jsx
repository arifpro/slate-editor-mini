import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

// load pages by on hover (Eager Loading)
const home = () => import('./Home');

const PageNotFound = () => (
    <div>
        <Helmet>
            <title>404</title>
        </Helmet>
        <section
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                height: '100vh',
            }}
        >
            <h2 style={{ fontFamily: 'monospace', color: '#3c444c' }}>Page Not Found</h2>
            <Link to="/" onMouseOver={() => home()}>
                <button
                    type="button"
                    style={{
                        background: '#3c444c',
                        color: '#cccccc',
                        border: 'none',
                        padding: '0.7rem 1.5rem',
                        borderRadius: '25px',
                        fontWeight: 'bold',
                        fontFamily: 'monospace',
                    }}
                >
                    Go back to the homepage
                </button>
            </Link>
        </section>
    </div>
);

export default PageNotFound;
