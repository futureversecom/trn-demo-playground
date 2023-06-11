import { Header, Main, Sidebar } from "./client";

export default function Home() {
	return (
		<main className="min-h-screen bg-gray-100">
			<div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-white dark:bg-gray-700 text-black dark:text-white">
				<Header />
				<Sidebar />
				<Main />
			</div>
		</main>
	);
}
