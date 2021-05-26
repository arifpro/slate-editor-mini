import CustomSlateEditor from '../components/HomePage/CustomSlateEditor';
import Layout from '../components/Layout';

const Home = () => (
    <Layout title="Home">
        <div
            style={{
                margin: '5rem 0',
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
            }}
        >
            <h2 style={{ fontFamily: 'monospace', color: '#3c444c' }}>Slate Editor Mini</h2>
            <div style={{ width: '600px', background: 'white' }}>
                <CustomSlateEditor />
            </div>
        </div>
    </Layout>
);

export default Home;
