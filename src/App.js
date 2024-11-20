
// import React, { useState, useEffect } from "react";

// const PokerTracker = () => {
//     const [players, setPlayers] = useState([]);
//     const [addedPlayers, setAddedPlayers] = useState([]);
//     const [selectedPlayerId, setSelectedPlayerId] = useState("");
//     const [descriptionPopup, setDescriptionPopup] = useState(null);
//     const [notesPopup, setNotesPopup] = useState(null);
//     const [newNote, setNewNote] = useState("");
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchPlayers = async () => {
//             try {
//                 const response = await fetch("http://localhost:5000/getData");
//                 if (!response.ok) {
//                     throw new Error(`HTTP error! Status: ${response.status}`);
//                 }
//                 const result = await response.json();
//                 setPlayers(result.data.players || []);
//             } catch (error) {
//                 console.error("Failed to fetch players:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchPlayers();
//     }, []);

//     const updateMetric = async (players_ID, friend_Code, metricType, newValue) => {
//         try {
//             const response = await fetch("http://localhost:5000/updateMetric", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({ players_ID, friend_Code, metricType, value: newValue }),
//             });
//             if (!response.ok) {
//                 throw new Error(`HTTP error! Status: ${response.status}`);
//             }
//             console.log(`Metric updated: ${metricType} = ${newValue}`);
//         } catch (error) {
//             console.error("Failed to update metric:", error);
//         }
//     };

//     const addPlayerCard = () => {
//         const player = players.find((p) => p.players_ID === Number(selectedPlayerId));
//         if (player && !addedPlayers.some((p) => p.players_ID === player.players_ID)) {
//             setAddedPlayers((prev) => [
//                 ...prev,
//                 { ...player, notes: player.notes || [], tight_counter: 0, shark_counter: 0, fish_counter: 0, bluff_counter: 0 },
//             ]);
//         }
//     };

//     const removePlayerCard = (id) => {
//         setAddedPlayers((prev) => prev.filter((p) => p.players_ID !== id));
//     };

//     const updateScore = (id, field, change) => {
//         const newAddedPlayers = addedPlayers.map((player) =>
//             player.players_ID === id
//                 ? { ...player, [field]: Math.max(0, (player[field] || 0) + change) }
//                 : player
//         );
//         setAddedPlayers(newAddedPlayers);

//         const updatedPlayer = newAddedPlayers.find((player) => player.players_ID === id);
//         if (updatedPlayer) {
//             updateMetric(id, updatedPlayer.friend_Code, field, updatedPlayer[field]); // Call updateMetric with friend_Code
//         }
//     };

//     const updateDescription = (id, newDescription) => {
//         const newAddedPlayers = addedPlayers.map((player) =>
//             player.players_ID === id ? { ...player, player_short_description: newDescription } : player
//         );
//         setAddedPlayers(newAddedPlayers);
//         setDescriptionPopup(null);

//         const updatedPlayer = newAddedPlayers.find((player) => player.players_ID === id);
//         if (updatedPlayer) {
//             updateMetric(id, updatedPlayer.friend_Code, "player_short_description", newDescription); // Call updateMetric with friend_Code
//         }
//     };

//     const addNote = (id, note) => {
//         if (note.trim() === "") return;
//         setAddedPlayers((prev) =>
//             prev.map((player) =>
//                 player.players_ID === id ? { ...player, notes: [...(player.notes || []), note] } : player
//             )
//         );
//         setNewNote("");
//     };

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
//             <h1 style={{ textAlign: "center" }}>Poker Tracker</h1>

//             <div style={{ marginBottom: "20px" }}>
//                 <select
//                     onChange={(e) => setSelectedPlayerId(e.target.value)}
//                     value={selectedPlayerId}
//                     style={{ padding: "10px", marginRight: "5px" }}
//                 >
//                     <option value="" disabled>
//                         Select a player
//                     </option>
//                     {players.map((player) => (
//                         <option key={player.players_ID} value={player.players_ID}>
//                             {player.friend_Code} - {player.alias}
//                         </option>
//                     ))}
//                 </select>
//                 <button
//                     onClick={addPlayerCard}
//                     style={{
//                         padding: "10px",
//                         backgroundColor: "#007BFF",
//                         color: "white",
//                         border: "none",
//                         borderRadius: "5px",
//                         cursor: "pointer",
//                     }}
//                 >
//                     Add Player
//                 </button>
//             </div>

//             <div style={{ display: "flex", flexWrap: "wrap" }}>
//                 {addedPlayers.map((player) => (
//                     <div
//                         key={player.players_ID}
//                         style={{
//                             width: "400px",
//                             height: "400px",
//                             display: "flex",
//                             flexDirection: "column",
//                             justifyContent: "space-between",
//                             alignItems: "center",
//                             border: "1px solid black",
//                             padding: "10px",
//                             margin: "10px",
//                             borderRadius: "10px",
//                             backgroundColor: "#F9F9F9",
//                             boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
//                         }}
//                     >
//                         <div style={{ flex: 1 }}>
//                             <p><strong>Name:</strong> {player.alias}</p>
//                             <p><strong>Total Profit:</strong> {player.profit}</p>
//                             <div style={{ display: "flex", justifyContent: "space-between" }}>
//                                 {["tight_counter", "shark_counter", "fish_counter", "bluffs_counter","loose_counter","gets_bluffed_counter"].map((score) => (
//                                     <div key={score} style={{ textAlign: "center" }}>
//                                         <p>{score.replace("_", " ")}: {player[score]}</p>
//                                         <button onClick={() => updateScore(player.players_ID, score, 1)}>+</button>
//                                         <button onClick={() => updateScore(player.players_ID, score, -1)}>-</button>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                         <div>
//                             <button onClick={() => setDescriptionPopup(player)}>Edit Description</button>
//                             <button onClick={() => setNotesPopup(player)}>Notes</button>
//                             <button onClick={() => removePlayerCard(player.players_ID)}>Remove</button>
//                         </div>
//                     </div>
//                 ))}
//             </div>

//             {descriptionPopup && (
//                 <div style={popupStyle}>
//                     <textarea
//                         value={descriptionPopup.player_short_description || ""}
//                         onChange={(e) =>
//                             setDescriptionPopup({ ...descriptionPopup, player_short_description: e.target.value })
//                         }
//                     />
//                     <button onClick={() => updateDescription(descriptionPopup.players_ID, descriptionPopup.player_short_description)}>
//                         Save
//                     </button>
//                     <button onClick={() => setDescriptionPopup(null)}>Close</button>
//                 </div>
//             )}

//             {notesPopup && (
//                 <div style={popupStyle}>
//                     <ul>
//                         {notesPopup.notes.map((note, index) => (
//                             <li key={index}>{note}</li>
//                         ))}
//                     </ul>
//                     <textarea
//                         value={newNote}
//                         onChange={(e) => setNewNote(e.target.value)}
//                     />
//                     <button onClick={() => addNote(notesPopup.players_ID, newNote)}>Add Note</button>
//                     <button onClick={() => setNotesPopup(null)}>Close</button>
//                 </div>
//             )}
//         </div>
//     );
// };

// const popupStyle = {
//     position: "fixed",
//     top: "20%",
//     left: "30%",
//     width: "40%",
//     backgroundColor: "white",
//     padding: "20px",
//     border: "1px solid black",
//     borderRadius: "5px",
// };

// export default PokerTracker;






































// import React, { useState, useEffect } from "react";

// const PokerTracker = () => {
//     const [players, setPlayers] = useState([]);
//     const [addedPlayers, setAddedPlayers] = useState([]);
//     const [selectedPlayerId, setSelectedPlayerId] = useState("");
//     const [descriptionPopup, setDescriptionPopup] = useState(null);
//     const [notesPopup, setNotesPopup] = useState(null);
//     const [newNote, setNewNote] = useState("");
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchPlayers = async () => {
//             try {
//                 const response = await fetch("http://localhost:5000/getData");
//                 if (!response.ok) {
//                     throw new Error(`HTTP error! Status: ${response.status}`);
//                 }
//                 const result = await response.json();
//                 const updatedPlayers = result.data.players.map(player => ({
//                     ...player,
//                     notes: player.player_notes_1 ? player.player_notes_1.split("^") : []
//                 }));
//                 setPlayers(updatedPlayers);
//             } catch (error) {
//                 console.error("Failed to fetch players:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchPlayers();
//     }, []);

//     const updateNotes = async (players_ID, friend_Code, newNotes) => {
//         try {
//             const updatedNotes = newNotes.join("^"); // Combine notes with the delimiter
//             const response = await fetch("http://localhost:5000/updateMetric", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({ players_ID, friend_Code, metricType: "player_notes_1", value: updatedNotes }),
//             });
//             if (!response.ok) {
//                 throw new Error(`HTTP error! Status: ${response.status}`);
//             }
//             console.log(`Notes updated: ${updatedNotes}`);
//         } catch (error) {
//             console.error("Failed to update notes:", error);
//         }
//     };

//     const addNote = (id, note) => {
//         if (note.trim() === "") return;

//         const updatedPlayers = addedPlayers.map((player) => {
//             if (player.players_ID === id) {
//                 const newNotes = [...player.notes, note];
//                 updateNotes(id, player.friend_Code, newNotes); // Send updated notes to server
//                 return { ...player, notes: newNotes };
//             }
//             return player;
//         });

//         setAddedPlayers(updatedPlayers);
//         setNewNote("");
//     };

//     const addPlayerCard = () => {
//         const player = players.find((p) => p.players_ID === Number(selectedPlayerId));
//         if (player && !addedPlayers.some((p) => p.players_ID === player.players_ID)) {
//             setAddedPlayers((prev) => [
//                 ...prev,
//                 { ...player, notes: player.notes || [], tight_counter: 0, shark_counter: 0, fish_counter: 0, bluff_counter: 0 },
//             ]);
//         }
//     };

//     const removePlayerCard = (id) => {
//         setAddedPlayers((prev) => prev.filter((p) => p.players_ID !== id));
//     };

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
//             <h1 style={{ textAlign: "center" }}>Poker Tracker</h1>

//             <div style={{ marginBottom: "20px" }}>
//                 <select
//                     onChange={(e) => setSelectedPlayerId(e.target.value)}
//                     value={selectedPlayerId}
//                     style={{ padding: "10px", marginRight: "5px" }}
//                 >
//                     <option value="" disabled>
//                         Select a player
//                     </option>
//                     {players.map((player) => (
//                         <option key={player.players_ID} value={player.players_ID}>
//                             {player.friend_Code} - {player.alias}
//                         </option>
//                     ))}
//                 </select>
//                 <button
//                     onClick={addPlayerCard}
//                     style={{
//                         padding: "10px",
//                         backgroundColor: "#007BFF",
//                         color: "white",
//                         border: "none",
//                         borderRadius: "5px",
//                         cursor: "pointer",
//                     }}
//                 >
//                     Add Player
//                 </button>
//             </div>

//             <div style={{ display: "flex", flexWrap: "wrap" }}>
//                 {addedPlayers.map((player) => (
//                     <div
//                         key={player.players_ID}
//                         style={{
//                             width: "400px",
//                             height: "400px",
//                             display: "flex",
//                             flexDirection: "column",
//                             justifyContent: "space-between",
//                             alignItems: "center",
//                             border: "1px solid black",
//                             padding: "10px",
//                             margin: "10px",
//                             borderRadius: "10px",
//                             backgroundColor: "#F9F9F9",
//                             boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
//                         }}
//                     >
//                         <div style={{ flex: 1 }}>
//                             <p><strong>Name:</strong> {player.alias}</p>
//                             <p><strong>Total Profit:</strong> {player.profit}</p>
//                         </div>
//                         <div>
//                             <button onClick={() => setNotesPopup(player)}>Notes</button>
//                             <button onClick={() => removePlayerCard(player.players_ID)}>Remove</button>
//                         </div>
//                     </div>
//                 ))}
//             </div>

//             {notesPopup && (
//                 <div style={popupStyle}>
//                     <ul>
//                         {notesPopup.notes.map((note, index) => (
//                             <li key={index}>{note}</li>
//                         ))}
//                     </ul>
//                     <textarea
//                         value={newNote}
//                         onChange={(e) => setNewNote(e.target.value)}
//                     />
//                     <button onClick={() => addNote(notesPopup.players_ID, newNote)}>Add Note</button>
//                     <button onClick={() => setNotesPopup(null)}>Close</button>
//                 </div>
//             )}
//         </div>
//     );
// };

// const popupStyle = {
//     position: "fixed",
//     top: "20%",
//     left: "30%",
//     width: "40%",
//     backgroundColor: "white",
//     padding: "20px",
//     border: "1px solid black",
//     borderRadius: "5px",
// };

// export default PokerTracker;







import React, { useState, useEffect } from "react";

const PokerTracker = () => {
    const [players, setPlayers] = useState([]);
    const [addedPlayers, setAddedPlayers] = useState([]);
    const [selectedPlayerId, setSelectedPlayerId] = useState("");
    const [descriptionPopup, setDescriptionPopup] = useState(null);
    const [notesPopup, setNotesPopup] = useState(null);
    const [newNote, setNewNote] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                const response = await fetch("http://localhost:5000/getData");
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const result = await response.json();
                console.log(result.data.players);
                const updatedPlayers = result.data.players.map(player => ({
                    ...player,
                    notes: player.player_notes_1 ? player.player_notes_1.split("^") : [],
                }));
                console.log(updatedPlayers);
                setPlayers(updatedPlayers);
            } catch (error) {
                console.error("Failed to fetch players:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPlayers();
    }, []);

    const updateMetric = async (players_ID, friend_Code, metricType, newValue) => {
        try {
            const response = await fetch("http://localhost:5000/updateMetric", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ players_ID, friend_Code, metricType, value: newValue }),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            console.log(`Metric updated: ${metricType} = ${newValue}`);
        } catch (error) {
            console.error("Failed to update metric:", error);
        }
    };

    const updateNotes = async (players_ID, friend_Code, newNotes) => {
        try {
            const updatedNotes = newNotes.join("^");
            await updateMetric(players_ID, friend_Code, "player_notes_1", updatedNotes);
        } catch (error) {
            console.error("Failed to update notes:", error);
        }
    };

    const addPlayerCard = () => {
        const player = players.find((p) => p.players_ID === Number(selectedPlayerId));
        if (player && !addedPlayers.some((p) => p.players_ID === player.players_ID)) {
            setAddedPlayers((prev) => [
                ...prev,
                { ...player, notes: player.notes || [], tight_counter: player.tight_counter, shark_counter: player.shark_counter },
            ]);
        }
    };

    const removePlayerCard = (id) => {
        setAddedPlayers((prev) => prev.filter((p) => p.players_ID !== id));
    };

    const updateScore = (id, field, change) => {
        const newAddedPlayers = addedPlayers.map((player) =>
            player.players_ID === id
                ? { ...player, [field]: Math.max(0, (player[field] || 0) + change) }
                : player
        );
        setAddedPlayers(newAddedPlayers);

        const updatedPlayer = newAddedPlayers.find((player) => player.players_ID === id);
        if (updatedPlayer) {
            updateMetric(id, updatedPlayer.friend_Code, field, updatedPlayer[field]);
        }
    };

    const updateDescription = (id, newDescription) => {
        const newAddedPlayers = addedPlayers.map((player) =>
            player.players_ID === id ? { ...player, player_short_description: newDescription } : player
        );
        setAddedPlayers(newAddedPlayers);
        setDescriptionPopup(null);

        const updatedPlayer = newAddedPlayers.find((player) => player.players_ID === id);
        if (updatedPlayer) {
            updateMetric(id, updatedPlayer.friend_Code, "player_short_description", newDescription);
        }
    };

    const addNote = (id, note) => {
        if (note.trim() === "") return;

        const updatedPlayers = addedPlayers.map((player) => {
            if (player.players_ID === id) {
                const newNotes = [...player.notes, note];
                updateNotes(id, player.friend_Code, newNotes);
                return { ...player, notes: newNotes };
            }
            return player;
        });

        setAddedPlayers(updatedPlayers);
        setNewNote("");
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
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
                        <option key={player.players_ID} value={player.players_ID}>
                            {player.friend_Code} - {player.alias}
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
            <div style={{ display: "flex", flexWrap: "wrap" }}>
                {addedPlayers.map((player) => (
                    <div
                        key={player.players_ID}
                        style={{
                            width: "400px",
                            height: "500px",
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
                       <div style={{ marginLeft: "5px", flex: 1 }}>
                            <p><strong>Name:</strong> {player.alias}</p>
                            <p><strong>Total Profit:</strong> {player.profit}</p>
                            <p><strong>Hands:</strong> {player.hands}</p>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                
                                {["tight_counter", "shark_counter", "fish_counter", "bluffs_counter", "loose_counter", "gets_bluffed_counter"].map((score) => (
                                   
                                    <div key={score} style={{ textAlign: "center" }}>
                                      <p>{score.replace("_counter", " ").replace("gets_", "")}::::</p>  <p> { " "+player[score]+" "}</p>
                                        <button onClick={() => updateScore(player.players_ID, score, 1)}>+</button>
                                        <button onClick={() => updateScore(player.players_ID, score, -1)}>-</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <button onClick={() => setDescriptionPopup(player)}>Edit Description</button>
                            <button onClick={() => setNotesPopup(player)}>Notes</button>
                            <button onClick={() => removePlayerCard(player.players_ID)}>Remove</button>
                        </div>
                    </div>
                ))}
            </div>

            {descriptionPopup && (
                <div style={popupStyle}>
                    <textarea
                        value={descriptionPopup.player_short_description || ""}
                        onChange={(e) =>
                            setDescriptionPopup({ ...descriptionPopup, player_short_description: e.target.value })
                        }
                    />
                    <button onClick={() => updateDescription(descriptionPopup.players_ID, descriptionPopup.player_short_description)}>
                        Save
                    </button>
                    <button onClick={() => setDescriptionPopup(null)}>Close</button>
                </div>
            )}

            {notesPopup && (
                <div style={popupStyle}>
                    <ul>
                        {notesPopup.notes.map((note, index) => (
                            <li key={index}>{note}</li>
                        ))}
                    </ul>
                    <textarea
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                    />
                    <button onClick={() => addNote(notesPopup.players_ID, newNote)}>Add Note</button>
                    <button onClick={() => setNotesPopup(null)}>Close</button>
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
};

export default PokerTracker;