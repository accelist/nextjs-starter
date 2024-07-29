import { WithDefaultLayout } from '../components/DefautLayout';
import { Title } from '../components/Title';
import { Page } from '../types/Page';

const IndexPage: Page = () => {
    return (
        <div>
            <Title>Home</Title>
            <h1>Hello World!</h1>

            <button>Test Clicking</button>
        </div>
    );
}

IndexPage.layout = WithDefaultLayout;
export default IndexPage;
