import History from "../components/History";

function JournalPage({ history, goals }) {
  return (
    <History
      history={history}
      goals={goals}
    />
  );
}

export default JournalPage;