import { h, Component } from "preact";
import Card from "preact-material-components/Card";
import "preact-material-components/Card/style.css";
import List from "preact-material-components/List";
import "preact-material-components/List/style.css";
import DataTable from "../../../../components/DataTable";

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
            <DataTable
                selectable
                title={"Rankings"}
                cols={["Rank", "Team", "Name", "W-L-T", "WP / AP / SP"]}
                data={
                    rankings
                        .filter(rank => rank.division == event.divisions[this.state.division] && teamInfo[rank.team])
                        .map(rank => [
                            rank.rank,
                            rank.team,
                            decodeHTML(teamInfo[rank.team].team_name),
                            `${[rank.wins, rank.losses, rank.ties].join("-")}`,
                            `${[rank.wp, rank.ap, rank.sp].join(" / ")}`]
                        )
                }
                actions={{
                    compare() {
                        alert("Compare")
                    },
                    assessment() {
                        alert("Send to Analyzer")
                    }
                }}
            >
                <DivisionTabs
                    divisions={event.divisions}
                    onChange={
                        div => this.setState({ division: event.divisions.indexOf(div) })
                    }
                />
            </DataTable>
        </Card>
    }
}
