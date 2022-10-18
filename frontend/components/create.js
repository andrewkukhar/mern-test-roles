import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function Create() {
    const [form, setForm] = useState({
        eventName: "",
        place: "",
        discribe: "",
        eventDate: ""
    });
    const navigate = useNavigate();

    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }

    async function onSubmit(e) {
        e.preventDefault();

        const newEvent = { ...form };

        await fetch("http://localhost:4000/event/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newEvent),
        })
            .catch(error => {
                window.alert(error);
                return;
            });

        setForm({
            eventName: "",
            place: "",
            discribe: "",
            eventDate: ""
        });
        navigate("/");
    }

    return (
        <div>
            <h3>Create New Event</h3>
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
                <div className="form-group">
                    <input
                        type="submit"
                        value="Create event"
                        className="btn btn-primary"
                    />
                </div>
            </form>
        </div>
    );
}