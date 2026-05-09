import { GithubButton } from "../components/Button";

export default function Footer() {
  return (
    <footer className="site-footer">
      <p className="footer-credit">Created by 07abrar</p>
      <p className="footer-line">Visit my GitHub account</p>
      <GithubButton
        href="https://github.com/07abrar"
        label="GitHub profile of Ghulam Abrar"
        name="07abrar"
      />
    </footer>
  );
}
