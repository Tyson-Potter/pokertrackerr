

import React, { useState, useEffect } from "react";

const PokerTracker = () => {
    const initialPlayers = [
      {
        id: "C9101",
        alias1: "Chris Thunder",
        alias2: "Lightning",
        alias3: "The Silent Shark",
        tightScore: 6,
        sharkScore: 7,
        fishScore: 3,
        bluffScore: 5,
        totalProfit: "$1,800",
        bio: "Chris is a calculated player who strikes at the perfect moment, leaving opponents stunned.",
        notes: ["Excellent at reading opponents' hands", "Prefers aggressive opponents"],
    },
    {
        id: "D1122",
        alias1: "Patricia Blaze",
        alias2: "Firestarter",
        alias3: "The Risk Taker",
        tightScore: 4,
        sharkScore: 8,
        fishScore: 2,
        bluffScore: 6,
        totalProfit: "$2,500",
        bio: "Patricia thrives under pressure and excels at high-stakes games.",
        notes: ["Regular at weekend tournaments", "Master of quick decisions"],
    },
    {
        id: "E3141",
        alias1: "Daniel Stone",
        alias2: "Rocky",
        alias3: "The Immoveable Force",
        tightScore: 9,
        sharkScore: 5,
        fishScore: 1,
        bluffScore: 3,
        totalProfit: "$1,400",
        bio: "Daniel is known for his unshakable strategies and disciplined playstyle.",
        notes: ["Rarely bluffs", "Prefers conservative tables"],
    },
    {
        id: "F5161",
        alias1: "Linda Sparks",
        alias2: "Sparky",
        alias3: "The Wild Card",
        tightScore: 5,
        sharkScore: 6,
        fishScore: 4,
        bluffScore: 7,
        totalProfit: "$1,700",
        bio: "Linda is unpredictable and often catches opponents off guard with bold moves.",
        notes: ["Adapts quickly to table dynamics", "Prefers mixed tournaments"],
    },
    {
        id: "G7182",
        alias1: "Michael Flash",
        alias2: "Speedy",
        alias3: "The Quick Thinker",
        tightScore: 7,
        sharkScore: 7,
        fishScore: 2,
        bluffScore: 5,
        totalProfit: "$2,100",
        bio: "Michael excels in fast-paced games, outthinking opponents with speed and precision.",
        notes: ["Frequently competes in speed poker", "Great under time pressure"],
    },
    {
        id: "H8193",
        alias1: "Sarah Storm",
        alias2: "Cyclone",
        alias3: "The Hurricane",
        tightScore: 3,
        sharkScore: 8,
        fishScore: 3,
        bluffScore: 6,
        totalProfit: "$2,800",
        bio: "Sarah brings chaos to the table, overwhelming her opponents with her relentless strategy.",
        notes: ["Known for aggressive pre-flop raises", "Wins big or loses big"],
    },
    {
        id: "I9204",
        alias1: "Tom Frost",
        alias2: "Iceman",
        alias3: "The Cold Gambler",
        tightScore: 8,
        sharkScore: 6,
        fishScore: 2,
        bluffScore: 4,
        totalProfit: "$1,600",
        bio: "Tom maintains a cool demeanor under pressure and methodically dismantles opponents.",
        notes: ["Prefers deep stack tournaments", "Rarely shows emotion"],
    },
    {
        id: "J0215",
        alias1: "Alice Dagger",
        alias2: "Sharpie",
        alias3: "The Precision Player",
        tightScore: 6,
        sharkScore: 7,
        fishScore: 3,
        bluffScore: 4,
        totalProfit: "$1,900",
        bio: "Alice is precise and calculated, making every move count.",
        notes: ["Excels at heads-up poker", "Analyzes opponents carefully"],
    },
    {
        id: "K1226",
        alias1: "Victor Shade",
        alias2: "Phantom",
        alias3: "The Elusive Player",
        tightScore: 7,
        sharkScore: 8,
        fishScore: 2,
        bluffScore: 5,
        totalProfit: "$2,400",
        bio: "Victor is hard to read, blending into any table style and exploiting weaknesses.",
        notes: ["Regular at high-stakes cash games", "Plays mind games with opponents"],
    },
    {
        id: "L2237",
        alias1: "Nina Flux",
        alias2: "Flow",
        alias3: "The Adaptive Player",
        tightScore: 5,
        sharkScore: 6,
        fishScore: 3,
        bluffScore: 6,
        totalProfit: "$1,500",
        bio: "Nina adjusts her strategy seamlessly, making her a formidable opponent in any scenario.",
        notes: ["Plays best in multi-day tournaments", "Thrives in unpredictable situations"],
    }
    ];

    const [players, setPlayers] = useState(() => {
        const storedPlayers = localStorage.getItem("pokerTrackerPlayers");
        return storedPlayers ? JSON.parse(storedPlayers) : initialPlayers;
    });
    const [addedPlayers, setAddedPlayers] = useState([]);
    const [selectedPlayerId, setSelectedPlayerId] = useState("");
    const [bioPopup, setBioPopup] = useState(null);
    const [notesPopup, setNotesPopup] = useState(null);
    const [newNote, setNewNote] = useState("");

    useEffect(() => {
        localStorage.setItem("pokerTrackerPlayers", JSON.stringify(players));
    }, [players]);

    const addPlayerCard = () => {
        const player = players.find((p) => p.id === selectedPlayerId);
        if (player && !addedPlayers.some((p) => p.id === player.id)) {
            setAddedPlayers((prevPlayers) => [...prevPlayers, { ...player }]);
        }
    };

    const removePlayerCard = (id) => {
        setAddedPlayers((prevPlayers) => prevPlayers.filter((p) => p.id !== id));
    };

    const updateScore = (id, field, change) => {
        setAddedPlayers((prevPlayers) =>
            prevPlayers.map((player) =>
                player.id === id
                    ? { ...player, [field]: Math.max(0, player[field] + change) }
                    : player
            )
        );
    };

    const updateBio = (id, newBio) => {
        setAddedPlayers((prevPlayers) =>
            prevPlayers.map((player) =>
                player.id === id ? { ...player, bio: newBio } : player
            )
        );
        setBioPopup(null);
    };

    const addNote = (id, note) => {
        if (note.trim() === "") return; // Ignore empty notes
        setAddedPlayers((prevPlayers) =>
            prevPlayers.map((player) =>
                player.id === id
                    ? { ...player, notes: [...player.notes, note] }
                    : player
            )
        );
        setNewNote(""); // Clear the input field
    };

    return (
        <div style={{ padding: "5px", fontFamily: "Arial, sans-serif" }}>
            <h1 style={{ textAlign: "center" }}>Poker Tracker</h1>

            <div style={{ marginBottom: "20px" }}>
                <select
                    onChange={(e) => setSelectedPlayerId(e.target.value)}
                    value={selectedPlayerId}
                    style={{ padding: "10px", marginRight: "5px" }}
                >
                    <option value="" disabled>
                        Select a player
                    </option>
                    {players.map((player) => (
                        <option key={player.id} value={player.id}>
                            {player.id} - {player.alias1}
                        </option>
                    ))}
                </select>
                <button
                    onClick={addPlayerCard}
                    style={{
                        padding: "10px",
                        backgroundColor: "#007BFF",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                    }}
                >
                    Add Player
                </button>
            </div>

            <div>
                {addedPlayers.map((player) => (
                    <div
                        key={player.id}
                        // style={{
                        //     display: "flex",
                        //     alignItems: "center",
                        //     justifyContent: "space-between",
                        //     border: "1px solid black",
                        //     padding: "10px",
                        //     marginBottom: "10px",
                        //     borderRadius: "5px",
                        //     backgroundColor: "#F9F9F9",
                        // }}
                        style={{
                          width: "250px",
                          height: "250px",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          alignItems: "center",
                          border: "1px solid black",
                          padding: "10px",
                          margin: "10px",
                          borderRadius: "10px",
                          backgroundColor: "#F9F9F9",
                          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                        <div style={{ flex: 1 }}>
                            <p>
                                <strong>Name:</strong> {player.alias1} | <strong>Alias 2:</strong>{" "}
                                {player.alias2} | <strong>Alias 3:</strong> {player.alias3}
                            </p>
                            <p>
                                <strong>Total Profit:</strong> {player.totalProfit}
                            </p>
                            <div style={{ display: "flex", alignItems: "center" }}>
                                {["tightScore", "sharkScore", "fishScore", "bluffScore"].map(
                                    (score) => (
                                        <div
                                            key={score}
                                            style={{
                                                marginRight: "20px",
                                                textAlign: "center",
                                            }}
                                        >
                                            <p>
                                                {score
                                                    .replace("Score", "")
                                                    .charAt(0)
                                                    .toUpperCase() +
                                                    score
                                                        .replace("Score", "")
                                                        .slice(1)}:{" "}
                                                {player[score]}
                                            </p>
                                            <button
                                                onClick={() =>
                                                    updateScore(player.id, score, 1)
                                                }
                                                style={{
                                                    marginRight: "5px",
                                                    backgroundColor: "#28a745",
                                                    color: "white",
                                                    border: "none",
                                                    padding: "5px",
                                                    borderRadius: "5px",
                                                    cursor: "pointer",
                                                }}
                                            >
                                                +
                                            </button>
                                            <button
                                                onClick={() =>
                                                    updateScore(player.id, score, -1)
                                                }
                                                style={{
                                                    backgroundColor: "#dc3545",
                                                    color: "white",
                                                    border: "none",
                                                    padding: "5px",
                                                    borderRadius: "5px",
                                                    cursor: "pointer",
                                                }}
                                            >
                                                -
                                            </button>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                        <div>
                            <button
                                onClick={() => setBioPopup(player)}
                                style={{
                                    padding: "5px 10px",
                                    marginRight: "5px",
                                    backgroundColor: "#007BFF",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "5px",
                                    cursor: "pointer",
                                }}
                            >
                                Bio
                            </button>
                            <button
                                onClick={() => setNotesPopup(player)}
                                style={{
                                    padding: "5px 10px",
                                    marginRight: "5px",
                                    backgroundColor: "#6c757d",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "5px",
                                    cursor: "pointer",
                                }}
                            >
                                Notes
                            </button>
                            <button
                                onClick={() => removePlayerCard(player.id)}
                                style={{
                                    padding: "5px 10px",
                                    backgroundColor: "#dc3545",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "5px",
                                    cursor: "pointer",
                                }}
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {bioPopup && (
                <div style={popupStyle}>
                    <h2>Edit Bio for {bioPopup.alias1}</h2>
                    <textarea
                        value={bioPopup.bio}
                        onChange={(e) =>
                            setBioPopup({ ...bioPopup, bio: e.target.value })
                        }
                        style={{ width: "100%", height: "100px", marginBottom: "10px" }}
                    />
                    <button
                        onClick={() => updateBio(bioPopup.id, bioPopup.bio)}
                        style={buttonStyle}
                    >
                        Save
                    </button>
                    <button onClick={() => setBioPopup(null)} style={buttonStyle}>
                        Close
                    </button>
                </div>
            )}

            {notesPopup && (
                <div style={popupStyle}>
                    <h2>Notes for {notesPopup.alias1}</h2>
                    <ul>
                        {notesPopup.notes.map((note, index) => (
                            <li key={index}>{note}</li>
                        ))}
                    </ul>
                    <textarea
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                        placeholder="Add a new note"
                        style={{ width: "100%", height: "50px", marginBottom: "10px" }}
                    />
                    <button
                        onClick={() => addNote(notesPopup.id, newNote)}
                        style={buttonStyle}
                    >
                        Save Note
                    </button>
                    <button onClick={() => setNotesPopup(null)} style={buttonStyle}>
                        Close
                    </button>
                </div>
            )}
        </div>
    );
};

const popupStyle = {
    position: "fixed",
    top: "20%",
    left: "30%",
    width: "40%",
    backgroundColor: "white",
    padding: "20px",
    border: "1px solid black",
    borderRadius: "5px",
    boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
};

const buttonStyle = {
    padding: "10px",
    marginRight: "10px",
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
};

export default PokerTracker;