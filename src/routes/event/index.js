import { h, Component } from 'preact';
import Card from 'preact-material-components/Card';
import 'preact-material-components/Card/style.css';
import 'preact-material-components/Button/style.css';
import LayoutGrid from 'preact-material-components/LayoutGrid';
import 'preact-material-components/LayoutGrid/style.css';
import List from 'preact-material-components/List';
import 'preact-material-components/List/style.css';
import Tabs, { Tab } from 'preact-material-components/Tabs';
import 'preact-material-components/Tabs/style.css';
import DataTables from 'material-ui-datatables';


import style from './style';

import { route } from "preact-router";
import { get, cache } from "vexdb";
import { loadAll } from "../../lib/vexdb";

const Stat = ({ title, value }) => (
	<div>
		<strong>{title}: </strong>
		<span>{value}</span>
	</div>
)

const makeDates = event =>
	Math.abs(Date.parse(event.start) - Date.parse(event.end)) < 24 * 60 * 60 * 1000 ?
		new Date(event.start).toLocaleString() :
		`${new Date(event.start).toLocaleString()}—${new Date(event.end).toLocaleString()}`

const itemize = (array, key) =>
	[{}, ...array].reduce((obj, item) => (obj[item[key]] = item, obj))

function decodeHTML(html) {
	var txt = document.createElement("textarea");
	txt.innerHTML = html;
	return txt.value;
}

function sortToDivision(items) {
	let out = {};
	items.map(item => out[item.division] ? out[item.division].push(item) : out[item.division] = [item])
	return out;
}

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
	return ["", "Prac.", "Qual.", "QF", "SF", "Final", "R16"][match.round] + " #" +
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

const MATCH_COLS = [
	{ key: "name", label: "Match" },
	{ key: "scheduled", label: "Time (scheduled)" },
	{ key: "red", label: "Red" },
	{ key: "blue", label: "Blue" },
	{ key: "redscore", label: "Red Score" },
	{ key: "bluescore", label: "Blue Score" }
]


const MatchGrid = ({ matches }) => (
	<DataTables
		selectable={true}
		columns={MATCH_COLS}
		data={matchs.map(prepareMatch)}
	/>
);


export default class Event extends Component {
	state = {
		data: {},
		loaded: false
	}

	componentDidMount() {
		if (this.state.loaded) return;
		let sku = this.props.sku;
		loadAll([
			get("events", { sku }),
			get("teams", { sku }),
			get("rankings", { sku })
				.then(ranks => ranks.sort((a, b) => a.rank - b.rank)),
			get("matches", { sku })
		], this.setState.bind(this));
	}

	render({ sku }, { data, loaded }) {
		let [event, teams, rankings, matches] = data;
		let teamInfo;
		if (loaded) teamInfo = itemize(teams, "number")
		return !loaded ?
			<div>Loading...</div> :
			<div>
				<LayoutGrid>
					<LayoutGrid.Inner>
						<LayoutGrid.Cell cols="6">
							<Card>
								<div class={style.cardHeader}>
									<h2 class="mdc-typography--title">{event.name}</h2>
									<div class="mdc-typography--subtitle">{event.sku}</div>
								</div>
								<div class={style.cardBody}>
									<Stat title="Program" value={event.program} />
									<Stat title="Teams" value={teams} />
									<Stat title="Season" value={event.season} />
									<Stat title="Dates" value={makeDates(event)} />
									<Stat title="Venue" value={event.loc_venue} />
									<Stat title="Location" value={
										[
											event.loc_address1,
											event.loc_city,
											event.loc_region,
											event.loc_country
										].filter(a => a).join(", ")
									} />
								</div>
								<Card.Actions>
									<Card.ActionButton
										onClick={() => window.location.replace(`https://www.robotevents.com/robot-competitions/vex-robotics-competition/${event.sku}.html`)}>
										RobotEvents
									</Card.ActionButton>
								</Card.Actions>
							</Card>
							<Card style={{ marginTop: "24px" }}>
								<div class={style.cardHeader}>
									<strong>Rankings</strong>
								</div>
								{ event.divisions.length - 1 ? 
									<Tab scroller>
										{ event.divisions.map(div =>
											<Tabs.Tab>{ div }</Tabs.Tab>
										)}
									</Tab>	
									
								: null }
								<List dense>
									{rankings.map(rank =>
										<List.LinkItem href={`/team/${rank.team}`} ripple>
											<List.PrimaryText>{rank.rank}. {decodeHTML(teamInfo[rank.team].team_name)}</List.PrimaryText>
											<span class="mdc-list-item__meta">{rank.team}</span>
										</List.LinkItem>
									)}
								</List>
							</Card>
						</LayoutGrid.Cell>
						<LayoutGrid.Cell cols="6">
							<Card>
								<div class={style.cardHeader}>
									<strong>Matches</strong>
								</div>
								<List dense>
									{matches.map(match =>
										<List.Item ripple>
											<List.PrimaryText>
												<span>{matchName(match)}&#9;</span>
												<span class={style.red}>{formatTeams(match, "red")}</span>
												<span>vs. </span>
												<span class={style.blue}>{formatTeams(match, "blue")}</span>
											</List.PrimaryText>
										</List.Item>
									)}
								</List>
							</Card>
						</LayoutGrid.Cell>
					</LayoutGrid.Inner>
				</LayoutGrid>
			</div>
	}
}
