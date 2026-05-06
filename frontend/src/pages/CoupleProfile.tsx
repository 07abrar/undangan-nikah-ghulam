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
        src="/assets/couple/yasmin_ghulam_wedding.png"
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
          <a
            href="https://www.linkedin.com/in/07abrar/"
            aria-label="LinkedIn profile of Ghulam Abrar"
            target="_blank"
            rel="noopener noreferrer"
            className="linkedin"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            Ghulam Abrar
          </a>
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
