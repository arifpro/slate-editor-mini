import CustomSlateEditor from '../components/HomePage/CustomSlateEditor';
// import Info from '../components/HomePage/Info';
import Layout from '../components/Layout';

const Home = () => (
    <Layout title="Home">
        {/* <Info /> */}
        <div style={{ margin: '5rem 0', display: 'flex', justifyContent: 'center' }}>
            {/* <div style={{ width: '600px', background: 'white', padding: '1rem' }}> */}
            <div style={{ width: '600px', background: 'white' }}>
                <CustomSlateEditor />
            </div>
        </div>
    </Layout>
);

export default Home;
