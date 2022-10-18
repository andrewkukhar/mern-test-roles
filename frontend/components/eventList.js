import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Event = (props) => (
    <tr>
        <td>{props.event.eventName}</td>
        <td>{props.event.place}</td>
        <td>{props.event.discribe}</td>
        <td>{props.event.eventDate}</td>
        <td className="">
            <Link className="btn btn-warning m-1 px-2" to={`/edit/${props.event._id}`}>Edit</Link>
            <button className="btn btn-danger m-1 px-2"
                onClick={() => {
                    props.deleteEvent(props.event._id);
                }}
            >
                Delete
            </button>
        </td>
    </tr>
);

export default function EventList({ }) {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const getEvents = async () => {
            const response = await fetch(`http://localhost:4000/event/`);
            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const events = await response.json();
            setEvents(events);
        }
        getEvents()
        return;

    }, [events.length]);

    async function deleteEvent(id) {
        await fetch(`http://localhost:4000/${id}`, {
            method: "DELETE"
        });

        const newEvents = events.filter((el) => el._id !== id);
        setEvents(newEvents);
    }


    function eventList() {
        return events.map((event) => {
            return (
                <Event
                    event={event}
                    deleteEvent={() => deleteEvent(event._id)}
                    key={event._id}
                />
            );
        });
    }

    return (
        <div>
            <h3>Event List</h3>
            <table className="table table-striped" style={{ marginTop: 20 }}>
                <thead>
                    <tr>
                        <th>Event's Name</th>
                        <th>Place</th>
                        <th>Discribe</th>
                        <th>Event's Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>{eventList()}</tbody>
            </table>
        </div>
    );
}
