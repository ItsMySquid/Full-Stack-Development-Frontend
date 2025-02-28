import { useEffect, useState } from "react";
import Block from "../Block.jsx";

function List() {
    const [blocks, setBlocks] = useState(null);
        async function fetchBlocks() {
            try {
                const response = await fetch('http://localhost:8001/blocks/', {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                const data = await response.json();
                setBlocks(data.items);
            } catch (error) {
                console.error('Er is een fout opgetreden:', error);
            }
        }

        useEffect(() => {
            fetchBlocks();
        }, []);

    return (
        <>
            <section>
                {blocks ? (
                    <ul className="space-y-4 p-6">
                        {blocks.map((block) => (
                            <Block key={block.id} block={block} blockDeleted={fetchBlocks()}/>
                        ))}
                    </ul>
                ) : (
                    <p>Blocks aan het laden...</p>
                )}
            </section>
        </>
    );
}

export default List;
