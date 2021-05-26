import Layout from '../components/Layout';

const About = () => (
    <Layout title="About">
        <section
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
            }}
        >
            <h2 style={{ fontFamily: 'monospace', color: '#3c444c' }}>about page</h2>
        </section>
    </Layout>
);

export default About;
