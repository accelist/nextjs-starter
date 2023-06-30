import { WithDefaultLayout } from '../components/DefautLayout';
import { Title } from '../components/Title';
import { ButtonComponent } from '../components/Buttons';
import { Page } from '../types/Page';

const IndexPage: Page = () => {
    const disabled = true;
    return (
        <div>
            <div>
                <Title>Home</Title>
                Hello World!
            </div>
            <ButtonComponent text="This is primary" type='primary' onClicked={() => console.log("primary")} />
            <ButtonComponent text="This is default" type='default' onClicked={() => console.log("default")} />
            <ButtonComponent text="This is cancel" type='cancel' onClicked={() => console.log("cancel")} />
            <ButtonComponent text="This is disabled with variable" type='default' disabled={disabled} onClicked={() => console.log("disabeld")} />
            <ButtonComponent text="This is disabled without variable" type='default' disabled onClicked={() => console.log("disabeld")} />
        </div>
    );
}

IndexPage.layout = WithDefaultLayout;
export default IndexPage;
