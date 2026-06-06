export default function Quote() {
  return (
    <div className="section-quote">
      <div className="card section-body">
        <p className="arabic bismillah">
          بِسْمِ ٱللّٰهِ ٱلرَّحْمٰنِ ٱلرَّحِيمِ
        </p>

        <p className="arabic" lang="ar">
          وَمِنۡ ءَايَٰتِهِۦٓ أَنۡ خَلَقَ لَكُم مِّنۡ أَنفُسِكُمۡ أَزۡوَٰجٗا
          لِّتَسۡكُنُوٓاْ إِلَيۡهَا وَجَعَلَ بَيۡنَكُم مَّوَدَّةٗ وَرَحۡمَةًۚ
        </p>

        <hr className="divider" />

        <p className="long-text body-italic">
          "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan
          pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung
          dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa
          kasih dan sayang."
        </p>

        <p className="quote-source">(QS. Ar-Ruum: 21)</p>
      </div>

      <div className="card section-body">
        <p className="long-text body-italic">
          "Pernikahan yang hebat bukanlah ketika pasangan yang sempurna
          berkumpul bersama, melainkan ketika pasangan yang tidak sempurna
          belajar untuk menikmati perbedaan mereka"
        </p>

        <p className="quote-source">(Dave Meurer)</p>
      </div>
    </div>
  );
}
