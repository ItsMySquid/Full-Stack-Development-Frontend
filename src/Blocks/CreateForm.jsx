import { useState } from "react";
import { useNavigate } from "react-router";

function BlockCreateForm() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        category: "Building",
        stackSize: 1,
        gravity: false,
    });

    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: name === "stackSize"
                ? Math.min(Math.max(1, parseInt(value, 10)), 64) // Houdt stackSize tussen 1 en 64
                : type === "checkbox"
                    ? checked
                    : name === "gravity"
                        ? value === "true" // Zet "true"/"false" om naar een boolean
                        : value,
        }));
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("Form submitted:", formData);

        try {
            const response = await fetch("http://145.24.223.76:8001/blocks", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log("Response from server:", data);
            if (response.status === 201) {
                navigate(`/${data.id}`);
            }
        } catch (error) {
            console.error("An error occurred:", error);
            alert("Failed to create block. Please try again.");
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-brown-100 p-6 rounded-lg shadow-lg mx-auto space-y-6 max-w-lg"
        >
            <h1 className="text-2xl font-bold text-brown-800 mb-4">Add a New Block</h1>

            {/* Name */}
            <div className="space-y-2">
                <label htmlFor="name" className="block text-brown-700 font-semibold">
                    Name:
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-brown-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-600"
                    placeholder="Enter the block name"
                    required
                />
            </div>

            {/* Description */}
            <div className="space-y-2">
                <label htmlFor="description" className="block text-brown-700 font-semibold">
                    Description:
                </label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-brown-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-600"
                    placeholder="Enter the block description"
                    required
                />
            </div>

            {/* Category (Dropdown) */}
            <div className="space-y-2">
                <label htmlFor="category" className="block text-brown-700 font-semibold">
                    Category:
                </label>
                <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-brown-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-600"
                >
                    <option value="Building">Building</option>
                    <option value="Redstone">Redstone</option>
                    <option value="Decoration">Decoration</option>
                    <option value="Utility">Utility</option>
                    <option value="Natural">Natural</option>
                    <option value="Miscellaneous">Miscellaneous</option>
                </select>
            </div>

            {/* Stack Size */}
            <div className="space-y-2">
                <label htmlFor="stackSize" className="block text-brown-700 font-semibold">
                    Stack Size:
                </label>
                <input
                    type="number"
                    id="stackSize"
                    name="stackSize"
                    value={formData.stackSize}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-brown-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-600"
                    placeholder="Enter the stack size"
                    min="1"
                    max="64"
                    required
                />
                <small className="text-brown-600">Value must be between 1 and 64.</small>
            </div>

            {/* Gravity */}
            <div className="space-y-2">
                <label className="block text-brown-700 font-semibold">
                    Gravity:
                </label>
                <div className="flex items-center space-x-4">
                    <label className="flex items-center">
                        <input
                            type="radio"
                            id="gravityYes"
                            name="gravity"
                            value={true}
                            checked={formData.gravity === true}
                            onChange={(e) => setFormData({ ...formData, gravity: e.target.value === "true" })}
                            className="mr-2"
                        />
                        <span className="text-brown-800">Yes</span>
                    </label>
                    <label className="flex items-center">
                        <input
                            type="radio"
                            id="gravityNo"
                            name="gravity"
                            value={false}
                            checked={formData.gravity === false}
                            onChange={(e) => setFormData({ ...formData, gravity: e.target.value === "true" })}
                            className="mr-2"
                        />
                        <span className="text-brown-800">No</span>
                    </label>
                </div>
            </div>

            <button
                type="submit"
                className="w-full bg-green-600 text-white font-semibold py-2 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-700"
            >
                Submit
            </button>
        </form>
    );
}

export default BlockCreateForm;
