import RSVP from "./pages/RSVP"
import Wishes from "./pages/Wishes"

function App() {
  return (
    <>
      <div>
        <h1>Ghulam and Yasmin wedding</h1>
      </div>
      <div>
        <nav>
          <a href="#wishes">Wishes</a>
          <a href="#rsvp">RSVP</a>
        </nav>
        <section id="wishes">
          <Wishes />
        </section>
        <section id="rsvp">
          <RSVP />
        </section>
      </div>
    </>
  )
}

export default App