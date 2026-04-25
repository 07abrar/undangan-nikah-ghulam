import styles from "./Greetings.module.css";

export default function Greetings() {
  return (
    <div className={styles.container}>
      <p className={styles.greeting}>Assalamualaikum Wr. Wb.</p>

      <hr className={styles.divider} />

      <p className={styles.praise}>
        Maha Suci Allah yang telah menciptakan makhluk-Nya berpasang-pasangan.
      </p>

      <p className={styles.invitation}>
        Kami mengundang Bapak/Ibu/Saudara(i) pada acara pernikahan kami.
      </p>
    </div>
  );
}
