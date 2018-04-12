import { h, Component } from 'preact';
import Card from 'preact-material-components/Card';
import 'preact-material-components/Card/style.css';

import Label from "../../../../components/Label";

import style from "../../style"

const makeDates = event =>
    Math.abs(Date.parse(event.start) - Date.parse(event.end)) < 24 * 60 * 60 * 1000 ?
        new Date(event.start).toLocaleString() :
        `${new Date(event.start).toLocaleString()}—${new Date(event.end).toLocaleString()}`

const EventInfo = ({ data }) => (
    <Card>
        <div class={style.cardHeader}>
            <h2 class="mdc-typography--title">{data.event.name}</h2>
            <div class="mdc-typography--subtitle">{data.event.sku}</div>
        </div>
        <div class={style.cardBody}>
            <Label title="Program" value={data.event.program} />
            <Label title="Teams" value={data.teams.length} />
            <Label title="Season" value={data.event.season} />
            <Label title="Dates" value={makeDates(data.event)} />
            <Label title="Venue" value={data.event.loc_venue} />
            <Label title="Location" value={
                [
                    data.event.loc_address1,
                    data.event.loc_city,
                    data.event.loc_region,
                    data.event.loc_country
                ].filter(a => a).join(", ")
            } />
        </div>
        <Card.Actions>
            <Card.ActionButton
                onClick={() => window.location.replace(`https://www.robotevents.com/robot-competitions/vex-robotics-competition/${data.event.sku}.html`)}>
                RobotEvents
		    </Card.ActionButton>
        </Card.Actions>
    </Card>
)

export default EventInfo;