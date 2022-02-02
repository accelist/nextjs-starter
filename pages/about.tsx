import React from 'react';
import { WithDefaultLayout } from '../components/DefautLayout';
import { Title } from '../components/Title';
import { Page } from '../types/Page';

const AboutPage: Page = () => {
    return (
        <div>
            <Title name="About">About</Title>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Morbi mattis tempus justo, ut vulputate justo volutpat in. 
            Interdum et malesuada fames ac ante ipsum primis in faucibus. 
            Suspendisse tincidunt nisi at tellus scelerisque, id vulputate turpis pellentesque. 
            Nullam luctus lacus at purus gravida luctus. Curabitur scelerisque interdum volutpat. 
            Aliquam non libero pellentesque, dapibus urna id, elementum nisi. 
            Mauris ac ex eu sem blandit vulputate laoreet at velit. 
        </div>
    );
}

AboutPage.layout = WithDefaultLayout;
export default AboutPage;
