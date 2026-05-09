import { LinkedInButton } from "../components/Button";

export default function CoupleProfile() {
  return (
    <div className="section-body">
      <p className="salam">Assalamualaikum Warahmatullahi Wabarakatuh</p>
      <p className="long-text">
        Maha Suci Allah yang telah menciptakan makhluk-Nya berpasang-pasangan.
      </p>
      <p className="long-text">
        Kami mengundang Bapak/Ibu/Saudara(i) pada acara pernikahan kami.
      </p>

      <img
        src={`${import.meta.env.BASE_URL}assets/couple/yasmin_ghulam_wedding.webp`}
        alt="Wedding illustration"
        className="couple-image"
      />

      <div className="couple-grid">
        {/* Groom — left */}
        <div id="groom_profile" className="card couple-card">
          <h3 className="couple-name">Ghulam Abrar, S.T., M.Sc., M.Si.</h3>
          <p className="couple-parents">Putra pertama dari</p>
          <p className="couple-parents">Bapak Chairul, S.E., M.E.</p>
          <p className="couple-parents">&amp; Ibu Tihajidah, S.Ag.</p>
          <LinkedInButton
            href="https://www.linkedin.com/in/07abrar/"
            label="LinkedIn profile of Ghulam Abrar"
            name="Ghulam Abrar"
          />
        </div>

        <span className="couple-ampersand" aria-hidden="true">
          &amp;
        </span>

        {/* Bride — right */}
        <div id="bride_profile" className="card couple-card">
          <h3 className="couple-name">Yasmin Farhana, S.Pd.</h3>
          <p className="couple-parents">Putri kedua dari</p>
          <p className="couple-parents">
            Bapak (alm) Prof. Dr. Ir. Husni, M.Agric.Sc.
          </p>
          <p className="couple-parents">&amp; Ibu (almh) Ir. Dewi Afriani</p>
          <p className="couple-parents">&amp; Ibu Rida Defriana, S.P.</p>
        </div>
      </div>
    </div>
  );
}
