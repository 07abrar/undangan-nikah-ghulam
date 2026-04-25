import styles from "./CoupleProfile.module.css";

export default function CoupleProfile() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Mempelai</h2>

      <div className={styles.grid}>
        {/* Bride */}
        <div id="bride_profile" className={styles.profile}>
          <img src="" alt="Yasmin Farhana" className={styles.avatar} />
          <h3 className={styles.name}>Yasmin Farhana, S.Si.</h3>
          <p className={styles.parents}>
            Putri kedua dari Bapak Prof. Dr. Ir. Husni, M.Agric.Sc. (alm)
          </p>
          <p className={styles.parents}>&amp; Ibu Rida Defriana</p>
          <p className={styles.parents}>Ibu Yasmin (alm)</p>
        </div>

        {/* Groom */}
        <div id="groom_profile" className={styles.profile}>
          <img src="" alt="Ghulam Abrar" className={styles.avatar} />
          <h3 className={styles.name}>Ghulam Abrar, S.T., M.Sc., M.Si.</h3>
          <p className={styles.parents}>
            Putra pertama dari Bapak Chairul, S.E.
          </p>
          <p className={styles.parents}>&amp; Ibu Tihajidah, S.Ag.</p>
          <a
            href="https://www.linkedin.com/in/07abrar/"
            aria-label="LinkedIn profile of Ghulam Abrar"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
          >
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
}
