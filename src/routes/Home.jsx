import CustomSlateEditor from '../components/HomePage/CustomSlateEditor';
import Layout from '../components/Layout';

const Home = () => (
    <Layout title="Home">
        <section
            style={{
                margin: '5rem 0',
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
            }}
        >
            <h2 style={{ fontFamily: 'monospace', color: '#3c444c' }}>Slate Editor Mini</h2>
            <main style={{ maxWidth: '600px', background: 'white' }}>
                <CustomSlateEditor />
            </main>
        </section>
    </Layout>
);

export default Home;
