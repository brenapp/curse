import { h, Component } from "preact";
import Card from "preact-material-components/Card";
import "preact-material-components/Card/style.css";
import List from "preact-material-components/List";
import "preact-material-components/List/style.css";

import DivisionTabs from "../DivisionTabs";

import style from "../../style";

const isActiveTeam = (match, color, role) => match[color + role] != match[color + "sit"]

function formatTeams(match, color) {
    return (
        <span>
            <span class={isActiveTeam(match, color, 1) ? style[color] : style.grey}>{match[color + "1"]} &#9;</span>
            <span class={isActiveTeam(match, color, 2) ? style[color] : style.grey}>{match[color + "2"]} &#9;</span>
            <span class={isActiveTeam(match, color, 3) ? style[color] : style.grey}>{match[color + "3"]} &#9;</span>
        </span>
    )
}

function matchName(match) {
    return ({ 1: "Prac.", 2: "Qual.", 3: "QF", 4: "SF", 5: "Final", 6: "R16", 16: "RR" })[match.round] + " #" +
        (match.round > 2 && match < 5 ? match.instance + "-" : "") +
        match.matchnum;
}

function prepareMatch(match) {
    return {
        name: matchName(match),
        red: formatTeams(match, "red"),
        blue: formatTeams(match, "blue"),
        ...match
    }
}

export default class EventMatches extends Component {
    state = {
        division: 0
    }

    render({ data }) {
        let { matches, event, teamInfo } = data;
        console.log(this.state.division)
        return <Card>
            <div class={style.cardHeader}>
                <strong>Matches</strong>
            </div>
            <DivisionTabs
                divisions={event.divisions}
                onChange={
                    div => this.setState({ division: event.divisions.indexOf(div) })
                }
            />
            <List dense>
                {
                    matches
                        .filter(match => match.division == event.divisions[this.state.division])
                        .map(match =>
                            <List.Item ripple>
                                <List.PrimaryText>
                                    <span>{matchName(match)}&#9;</span>
                                    <span class={style.red}>{formatTeams(match, "red")}</span>
                                    <span>vs. </span>
                                    <span class={style.blue}>{formatTeams(match, "blue")}</span>
                                </List.PrimaryText>
                            </List.Item>
                        )
                }
            </List>
        </Card>
    }
}
