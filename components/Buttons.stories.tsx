import {AButton} from './Buttons';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    // Name of the component for the stories
    component: AButton,

    // Stories Title
    title: 'AButton',

    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],

     // Add documentation for each args. More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        text:{        
            description:"Button Text"
        },
        type:{
            control:"select",
            options:["button","submit","reset"],    
            description:"Button Type"
        },
        disabled:{
            control:"boolean",
            description:"Button disabled or not"
        },
    }
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default = {
    // Args for the component
    args:{
        text: "Default",
        type: "button"
    }
};
export const Submit = {
    args:{
        text: "Submit",
        type: "submit"
    }
};
export const Reset = {
    args:{
        text: "Reset",
        type: "reset"
    }
};

