import { h, Component } from 'preact';

const Label = ({ title, value }) => (
    <div>
        <strong>{title}: </strong>
        <span>{value}</span>
    </div>
)

export default Label;
