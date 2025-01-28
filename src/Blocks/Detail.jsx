import React, { useEffect, useState } from "react";
import {useParams, Link} from "react-router";

function Detail() {
    const { id } = useParams(); // Haalt het block-ID uit de URL
    const [block, setBlock] = useState(null);
    const [loading, setLoading] = useState(true);
    async function fetchBlock() {
        try {
            const response = await fetch(`http://145.24.223.76:8001/blocks/${id}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            });
            const data = await response.json();
            setBlock(data);
            } catch (error) {
                console.error('Er is een fout opgetreden:', error);
            }
            finally {
                setLoading(false);
            }
        }
    useEffect(() => {
        fetchBlock();
    }, [id]);

    if (loading) {
        return <div className="text-center mt-10">Loading block details...</div>;
    }

    if (!block) {
        return <div className="text-center mt-10 text-red-600">Block not found.</div>;
    }

    return (
        <div className="max-w-2xl mx-auto p-6 bg-brown-200 rounded-lg shadow-lg mt-10 border-4 border-brown-800">
            <h1 className="text-2xl font-bold text-brown-800 mb-4">Block Details</h1>
            <ul className="space-y-4">
                <li>
                    <strong className="text-brown-900">Name:</strong> {block.name}
                </li>
                <li>
                    <strong className="text-brown-900">Description:</strong> {block.description}
                </li>
                <li>
                    <strong className="text-brown-900">Category:</strong> {block.category}
                </li>
                <li>
                    <strong className="text-brown-900">Stack Size:</strong> {block.stackSize}
                </li>
                <li>
                    <strong className="text-brown-900">Gravity:</strong> {block.gravity ? "Yes" : "No"}
                </li>
            </ul>

            <div className="mt-6">
                <Link
                    to={`/edit/${id}`} // Dynamische URL
                    className="flex items-center justify-center w-full bg-green-600 text-white font-semibold py-2 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-700"
                >
                    Edit
                </Link>

                <button
                    onClick={() => window.history.back()}
                    className="mt-4 flex items-center justify-center w-full bg-green-600 text-white font-semibold py-2 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-700"
                >
                    Go Back
                </button>
            </div>


        </div>
    );
}

export default Detail;
