import { h, Component } from 'preact';
import Tabs from 'preact-material-components/Tabs';
import 'preact-material-components/Tabs/style.css';


export default class DivisionTabs extends Component {
    state = {
        division: ""
    }


    render(props) {
        return props.divisions.length - 1 ?
            <Tabs.TabBarScroller>
                <Tabs scroller={true} indicator-accent={true}>
                    {props.divisions.map(div =>
                        <Tabs.Tab onClick={() => this.props.onChange(div)}>{div}</Tabs.Tab>
                    )}
                </Tabs>
            </Tabs.TabBarScroller>
            : <div></div>
    }
}
