import coupleImage from "../assets/yasmin_ghulam_wedding.png";
import styles from "./CoupleProfile.module.css";

export default function CoupleProfile() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Mempelai</h2>

      <img
        src={coupleImage}
        alt="Ilustrasi Yasmin dan Ghulam dalam pakaian pernikahan"
        className={styles.image}
      />

      <div className={styles.grid}>
        {/* Bride — left */}
        <div id="bride_profile" className={styles.profile}>
          <h3 className={styles.name}>Yasmin Farhana, S.Si.</h3>
          <p className={styles.parents}>
            Putri kedua dari Bapak Prof. Dr. Ir. Husni, M.Agric.Sc. (alm)
          </p>
          <p className={styles.parents}>&amp; Ibu Rida Defriana</p>
          <p className={styles.parents}>Ibunda Almarhumah Yasmin</p>
        </div>

        {/* aria-hidden because the ampersand is purely decorative —
            screen readers don't need to announce it. */}
        <span className={styles.ampersand} aria-hidden="true">
          &amp;
        </span>

        {/* Groom — right */}
        <div id="groom_profile" className={styles.profile}>
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
