import {Link} from "react-router";

function Block({ block, blockDeleted }) {
    const deleteBlock = async () => {
        try {
            const result = await fetch(`http://145.24.223.76:8001/blocks/${block.id}`, {
                headers: {
                    'Accept': 'application/json'
                },
                method: 'DELETE'
            });
            if (result.status === 204) {
                blockDeleted()
            }
        } catch (error) {
            console.error(`Error verwijderen block: ${error}`);
        }
    }


    return (
        <li
            key={block.id}
            className="flex justify-between items-center bg-blue-100 shadow-md rounded-lg p-4 border border-gray-200"
        >
            <div>
                <div className="text-lg font-bold text-gray-800">{block.name}</div>
                <div className="text-sm text-gray-600">{block.description}</div>
            </div>

            <div className="flex space-x-4">
                <Link
                    to={`/${block.id}`}
                    className="px-4 py-2 text-sm font-semibold text-white bg-brown-600 border border-brown-700 rounded-lg hover:bg-brown-500 focus:outline-none focus:ring-2 focus:ring-brown-700 transition"
                >
                    Details
                </Link>

                <button
                    onClick={deleteBlock}
                    className="px-4 py-2 text-sm font-semibold text-white bg-red-600 border border-red-700 rounded-lg hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-700 transition"
                >
                    Delete
                </button>
            </div>
        </li>

    );
}

export default Block;
