import styles from "./Quote.module.css";

export default function Quote() {
  return (
    <div className={styles.container}>
      <p className={styles.eyebrow}>Bismillahirrahmanirrahim</p>

      <p className={styles.arabic} lang="ar">
        وَمِنْ ءَايَـٰتِهِۦٓ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَٰجًۭا
        لِّتَسْكُنُوٓا۟ إِلَيْهَا (٢١)
      </p>

      <hr className={styles.divider} />

      <p className={styles.translation}>
        "Dan di antara tanda-tanda kekuasaan Allah ialah Dia menciptakan untukmu
        pasangan-pasangan dari jenismu sendiri, agar kamu cenderung dan merasa
        tenteram kepadanya"
      </p>

      <p className={styles.source}>(QS. Ar-Ruum: 21)</p>
    </div>
  );
}
