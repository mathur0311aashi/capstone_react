import { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { generateAIResponse } from '../services/api';

const Planner = () => {

    const [output, setOutput] = useState("");
    const [loading, setLoading] = useState(false);
    const { days, setDays } = useContext(AppContext);
    const { place, setPlace, budget, setBudget } = useContext(AppContext);
    const [step, setStep] = useState(1);
    const navigate = useNavigate();
    const handleGenerate = async () => {
        setLoading(true);

        const prompt = `
Create a ${days}-day travel plan for ${place} with a ${budget} budget.
Include:
- Hotels
- Cafes
- Transport
- Day-wise itinerary
`;


        const result = await generateAIResponse(prompt);

        setOutput(result);
        setLoading(false);
    };
    const nextStep = async () => {
        if (step === 1 && !place) return alert("Enter place");
        if (step === 2 && !days) return alert("Enter days");
        if (step === 3 && !budget) return alert("Select budget");

        if (step < 3) {
            setStep(step + 1);
        } else {
            navigate("/hotel"); // final step
        }
    };
    return (

        <div className="planner-page">
            <h2>Plan Your Trip ✈️</h2>
            {/* <form className="planner-form" onSubmit={handleSubmit}> */}


            {/* PLACE */}
            {step === 1 && (
                <>
                    <input
                        type="text"
                        placeholder="Enter destination"
                        value={place}
                        onChange={(e) => setPlace(e.target.value)}
                    />
                </>)}

            {step === 2 && (
                <>
                    <input
                        type="number"
                        placeholder="Number of days"
                        value={days}
                        onChange={(e) => setDays(e.target.value)}
                    />
                </>
            )}


            {step === 3 && (
                <>
                    <p>Select your budget</p>
                    <select onChange={(e) => setBudget(e.target.value)} value={budget}>
                        <option value="">Select Budget</option>
                        <option value="bronze">Bronze</option>
                        <option value="silver">Silver</option>
                        <option value="gold">Gold</option>
                    </select>
                </>
            )}

            {/* BUTTON */}
            <button onClick={nextStep}>
                {step === 3 ? "Generate Plan →" : "Next →"}
            </button>

            {/* LOADING */}
            {loading && <p>Generating your plan...</p>}

            {/* OUTPUT */}
            {output && (
                <div className="result-box">
                    <h3>Your Travel Plan</h3>
                    <p>{output}</p>
                </div>
            )}
        </div>

    );
};



export default Planner