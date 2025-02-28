import {useState, useEffect} from "react";
import {useParams, useNavigate} from "react-router";

function Edit() {
    const params = useParams();
    const navigate = useNavigate();
    const [block, setBlock] = useState(null);

    // Haal de bestaande blokgegevens op
    async function fetchBlock() {
        try {
            const response = await fetch(`http://localhost:8001/blocks/${params.id}`, {
                headers: {
                    'Accept': 'application/json'
                }
            });
            const data = await response.json();
            setBlock(data);
        } catch (error) {
            console.error('Er is een fout opgetreden:', error);
        }
    }

    useEffect(() => {
        fetchBlock();
    }, []);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        category: "Building",
        stackSize: 1,
        gravity: false,
    });

    useEffect(() => {
        if (block) {
            setFormData({
                name: block.name || "",
                description: block.description || "",
                category: block.category || "Building",
                stackSize: block.stackSize ?? 1,
                gravity: block.gravity ?? false,
            });
        }
    }, [block]);

    const handleInputChange = (event) => {
        const {name, value, type, checked} = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]:
                name === "stackSize"
                    ? Math.min(Math.max(1, parseInt(value, 10)), 64)
                    : type === "checkbox"
                        ? checked
                        : value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`http://localhost:8001/blocks/${params.id}`, {
                method: "PUT",
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
            navigate(`/${data.id}`);
        } catch (error) {
            console.error("An error occurred:", error);
            alert("Failed to update block. Please try again.");
        }
    };

    if (!block) {
        return <div className="text-center mt-10">Loading block details...</div>;
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-brown-100 p-6 rounded-lg shadow-lg mx-auto space-y-6 max-w-lg"
        >
            <h1 className="text-2xl font-bold text-brown-800 mb-4">Edit Block</h1>

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
                    required
                />
            </div>

            {/* Category */}
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
                    min="1"
                    max="64"
                    required
                />
            </div>

            {/* Gravity */}
            <div className="space-y-2">
                <label className="block text-brown-700 font-semibold">Gravity:</label>
                <div className="flex space-x-4">
                    <label className="flex items-center">
                        <input
                            type="radio"
                            name="gravity"
                            value="true"
                            checked={formData.gravity === true}
                            onChange={(e) => setFormData({...formData, gravity: JSON.parse(e.target.value)})}
                            className="mr-2"
                        />
                        <span className="text-brown-800">Yes</span>
                    </label>
                    <label className="flex items-center">
                        <input
                            type="radio"
                            name="gravity"
                            value="false"
                            checked={formData.gravity === false}
                            onChange={(e) => setFormData({...formData, gravity: JSON.parse(e.target.value)})}
                            className="mr-2"
                        />
                        <span className="text-brown-800">No</span>
                    </label>
                </div>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                className="w-full bg-green-600 text-white font-semibold py-2 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-700"
            >
                Update Block
            </button>
        </form>
    );
}

export default Edit;
