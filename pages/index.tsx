import { WithDefaultLayout } from '../components/DefautLayout';
import { Title } from '../components/Title';
import { AButton } from '../components/Buttons';
import { Page } from '../types/Page';

const IndexPage: Page = () => {
    return (
        <div>
            <div>
                <Title>Home</Title>
                Hello World!
            </div>
            <AButton text="This is submit" type='submit' onClick={() => console.log("submit")} />
            <AButton text="This is default" type='button' onClick={() => console.log("default")} />
            <AButton text="This is reset" type='reset' onClick={() => console.log("cancel")} />
            <AButton text="This is disabled" disabled onClick={() => console.log("disabeld")} />
        </div>
    );
}

IndexPage.layout = WithDefaultLayout;
export default IndexPage;
