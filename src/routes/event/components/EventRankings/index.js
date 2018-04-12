import { h, Component } from "preact";
import Card from "preact-material-components/Card";
import "preact-material-components/Card/style.css";
import List from "preact-material-components/List";
import "preact-material-components/List/style.css";

import style from "../../style";

import DivisionTabs from "../DivisionTabs";

function decodeHTML(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}


export default class EventRankings extends Component {
    state = {
        division: 0
    }

    render({ data }) {
        let { rankings, event, teamInfo } = data;
        console.log(this.state.division)
        return <Card class={style.marginTop}>
            <div class={style.cardHeader}>
                <strong>Rankings</strong>
            </div>
            <DivisionTabs
                divisions={event.divisions}
                onChange={
                    div => this.setState({ division: event.divisions.indexOf(div) })
                }
            />
            <List dense>
                {
                    rankings
                        .filter(rank => rank.division == event.divisions[this.state.division])
                        .map(rank => teamInfo[rank.team] ?
                            <List.LinkItem href={`/team/${rank.team}`} ripple>
                                <List.PrimaryText>{rank.rank}. {decodeHTML(teamInfo[rank.team].team_name)}</List.PrimaryText>
                                <span class="mdc-list-item__meta">{rank.team}</span>
                            </List.LinkItem> : undefined
                        )
                }
            </List>
        </Card>
    }
}
