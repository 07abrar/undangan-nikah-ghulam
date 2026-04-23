import CoupleProfile from "./pages/CoupleProfile";
import RSVP from "./pages/RSVP";

function App() {
  return (
    <>
      <div>
        <h1>Ghulam and Yasmin wedding</h1>
      </div>
      <div>
        <nav>
          <a href="#couple_profile">Calon Mempelai</a>
          <a href="#rsvp">RSVP</a>
        </nav>
        <section id="couple_profile">
          <CoupleProfile />
        </section>
        <section id="rsvp">
          <RSVP />
        </section>
      </div>
    </>
  );
}

export default App;
