type CountdownBoxProps = {
  value: number;
  label: string;
};

export function CountdownBox(props: CountdownBoxProps) {
  const { value, label } = props;
  return (
    <div className="card card-tight countdown-box">
      <span className="countdown-number">
        {value.toString().padStart(2, "0")}
      </span>
      <span className="plain-capital-text">{label}</span>
    </div>
  );
}
