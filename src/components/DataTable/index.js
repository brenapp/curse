import { h, Component } from "preact";
import Card from "preact-material-components/Card";
import "preact-material-components/Card/style.css";
import List from "preact-material-components/List";
import "preact-material-components/List/style.css";
import Checkbox from "preact-material-components/Checkbox";
import "preact-material-components/Checkbox/style.css";
import "preact-material-components/Button/style.css";
import Icon from 'preact-material-components/Icon';
import Button from 'preact-material-components/Button';
import 'preact-material-components/Button/style.css';
import 'preact-material-components/Theme/style.css';
import Toolbar from 'preact-material-components/Toolbar';
import 'preact-material-components/Toolbar/style.css';


import Label from "../Label";

import style from "./style"

class TableRow extends Component {

    constructor({ selected }) {
        super();
        this.state = { selected }

    }
    componentWillUpdate({ selected }) {
        this.setState({ selected });
    }

    onSelect() {
        this.setState({ selected: !this.state.selected })
        this.props.onChange(this.state.selected)
    }

    render({ items, header, selectable, selected, onChange }) {
        return (
            <List.Item class={`${header ? style.header : style.main} ${this.state.selected && !header ? style.selected : ""}`} onClick={() => !header ? this.onSelect() : null}>
                {selectable ?
                    <Checkbox id="basic-checkbox" class={style.checkbox} onChange={() => header ? this.onSelect() : null} checked={this.state.selected} />
                    : null}
                {items.map((col, i) => <span>{items[i]}</span>)}
            </List.Item>
        )
    }
}

export default class DataTable extends Component {

    constructor({ data }) {
        super()
        this.state = {
            selected: Array(data.length).fill(false)
        }
    }

    render({ selectable, cols, data, title, icons, actions, children }, { selected }) {
        let selectedRows = selected.filter(a => a).length;
        return <div class={style.fullwidth}>
            <List class={style.table}>
                <List.Item class={[style.header, selectedRows > 0 ? style.tableSelection : ""].join(" ")}>
                    <div class={style.flex}>
                        <strong>{
                            selectedRows ? `${selectedRows} item(s) selected` : title
                            }</strong>
                    </div>
                    <div class={style.action}>
                    { Object.keys(actions).map(action => 
                            <Icon class={style.iconButton} onClick={actions[action]}>{ action }</Icon>
                        )}
                    </div>
                </List.Item>
                { children }
                <TableRow selectable header items={cols} onChange={
                    state => this.setState({ selected: Array(data.length).fill(state) })
                } />
                {data.map((item, i) =>
                    <TableRow key={i} selectable items={item} selected={selected[i]} onChange={
                        state => this.setState({ selected: (selected[i] = state, selected) })
                    } />
                )}
            </List>
        </div >
    }
}