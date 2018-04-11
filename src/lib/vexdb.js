import { get } from "vexdb";

function getEvents(date = new Date()) {
    date = date.toISOString();
    return get("events", { date })
}

function loadAll(requests, setState) {
    Promise.all(requests).then(data => setState({
        data,
        loaded: true
    }));
}


export {
    getEvents,
    loadAll
}