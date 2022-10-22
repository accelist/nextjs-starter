import { WithDefaultLayout } from '../components/DefautLayout';
import { Title } from '../components/Title';
import { Page } from '../types/Page';

const IndexPage: Page = () => {
    return (
        <div>
            <Title>Home</Title>
            Hello World!
        </div>
    );
}

IndexPage.layout = WithDefaultLayout;
export default IndexPage;
