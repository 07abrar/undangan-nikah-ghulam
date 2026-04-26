import coupleImage from "../assets/yasmin_ghulam_wedding.png";

export default function CoupleProfile() {
  return (
    <div className="section-body">
      <img
        src={coupleImage}
        alt="Wedding illustration"
        className="couple-image"
      />

      <div className="couple-grid">
        {/* Bride — left */}
        <div id="bride_profile" className="card couple-card">
          <h3 className="couple-name">Yasmin Farhana, S.Si.</h3>
          <p className="couple-parents">
            Putri kedua dari Bapak Prof. Dr. Ir. Husni, M.Agric.Sc. (alm)
          </p>
          <p className="couple-parents">&amp; Ibu Rida Defriana</p>
          <p className="couple-parents">Ibunda Almarhumah Yasmin</p>
        </div>

        <span className="couple-ampersand" aria-hidden="true">
          &amp;
        </span>

        {/* Groom — right */}
        <div id="groom_profile" className="card couple-card">
          <h3 className="couple-name">Ghulam Abrar, S.T., M.Sc., M.Si.</h3>
          <p className="couple-parents">
            Putra pertama dari Bapak Chairul, S.E.
          </p>
          <p className="couple-parents">&amp; Ibu Tihajidah, S.Ag.</p>
          <a
            href="https://www.linkedin.com/in/07abrar/"
            aria-label="LinkedIn profile of Ghulam Abrar"
            target="_blank"
            rel="noopener noreferrer"
            className="button button-sm button-outline couple-social"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
}
