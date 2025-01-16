interface PlayerDashboardPageProps {
    params: {
      playerId: string;
    };
  }
  
  export default function PlayerDashboardPage({ params }: PlayerDashboardPageProps) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h1>Player Dashboard</h1>
        <p>
          Welcome to the dashboard for Player ID: <strong>{params.playerId}</strong>
        </p>
        <p>This page is accessible to admin and manager roles.</p>
      </div>
    );
  }
  