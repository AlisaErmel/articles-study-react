import { useState } from 'react'
import type { Meta, StoryFn } from '@storybook/react'
import UIInput from './Input'

export default {
    title: 'Components/Input',
    component: UIInput,
} as Meta

const Template: StoryFn<any> = (args) => {
    const [value, setValue] = useState('')
    return <UIInput {...args} value={value} onChange={(e) => setValue(e.target.value)} />
}

export const Default = Template.bind({})
Default.args = {
    id: 'example-input',
    label: 'Example Input',
    placeholder: 'Type something…',
    required: true,
    size: 'large',
}

export const Small = Template.bind({})
Small.args = {
    ...Default.args,
    size: 'small',
}