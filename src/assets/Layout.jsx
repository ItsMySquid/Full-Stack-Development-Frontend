import { Link, Outlet } from "react-router";

function Layout() {
    return (
        <div className="min-h-screen flex flex-col bg-green-500 text-gray-800">
            <header className="bg-brown-700 text-white py-4">
                <nav className="flex justify-center gap-8">
                    <Link
                        to={'/'}
                        className="text-xl font-bold px-4 py-2 bg-brown-600 border border-black rounded hover:bg-brown-500 transition"
                    >
                        🟩 Blocks
                    </Link>
                    <Link
                        to={`/create`}
                        className="text-xl font-bold px-4 py-2 bg-brown-600 border border-black rounded hover:bg-brown-500 transition"
                    >
                        ➕ Add a block
                    </Link>
                </nav>
            </header>
            <main className="flex-grow p-8 bg-green-400 border-t-4 border-brown-800">
                <div className="bg-green-300 border-4 border-brown-900 p-4 rounded shadow-lg">
                    <Outlet />
                </div>
            </main>
            <footer className="text-center bg-brown-700 text-white py-4 border-t border-black">
                <p className="text-sm font-pixel">Crafted with care ⚒️ | Minecraft Blocks Manager</p>
            </footer>
        </div>
    );
}

export default Layout;
