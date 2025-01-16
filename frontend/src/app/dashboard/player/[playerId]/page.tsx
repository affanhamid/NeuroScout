interface PlayerDashboardPageProps {
params: {
    playerId: string;
};
}

export default function PlayerDashboardPage({ params }: PlayerDashboardPageProps) {
return (
    <div style={{ padding: "2rem" }}>
    <h1>Player Dashboard</h1>
    <p>
        You are viewing the dashboard for <strong>Player ID: {params.playerId}</strong>.
    </p>
    </div>
);
}
