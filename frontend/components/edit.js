import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

export default function Edit() {
    const [form, setForm] = useState({
        eventName: "",
        place: "",
        discribe: "",
        eventDate: "",
        events: [],
    });
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            const id = params.id.toString();
            const response = await fetch(`http://localhost:4000/event/${params.id.toString()}`);

            if (!response.ok) {
                const message = `An error has occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const event = await response.json();
            if (!event) {
                window.alert(`Event with id ${id} not found`);
                navigate("/");
                return;
            }

            setForm(event);
        }

        fetchData();

        return;
    }, [params.id, navigate]);

    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }

    async function onSubmit(e) {
        e.preventDefault();
        const editedEvent = {
            eventName: form.eventName,
            place: form.place,
            discribe: form.discribe,
            eventDate: form.eventDate,
        };

        await fetch(`http://localhost:4000/update/${params.id}`, {
            method: "PATCH",
            body: JSON.stringify(editedEvent),
            headers: {
                'Content-Type': 'application/json'
            },
        });

        navigate("/");
    }

    return (
        <div>
            <h3>Update Event</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="eventName">Event's Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="eventName"
                        value={form.eventName}
                        onChange={(e) => updateForm({ eventName: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="place">Place</label>
                    <input
                        type="text"
                        className="form-control"
                        id="place"
                        value={form.place}
                        onChange={(e) => updateForm({ place: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="discribe">Discribe</label>
                    <input
                        type="text"
                        className="form-control"
                        id="discribe"
                        value={form.discribe}
                        onChange={(e) => updateForm({ discribe: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="eventDate">Event's Date</label>
                    <input
                        type="date"
                        className="form-control"
                        id="eventDate"
                        value={form.eventDate}
                        onChange={(e) => updateForm({ eventDate: e.target.value })}
                    />
                </div>

                <br />

                <div className="form-group">
                    <input
                        type="submit"
                        value="Update Event"
                        className="btn btn-primary"
                    />
                </div>
            </form>
        </div>
    );
}