import { useEffect, useRef } from "react";

export default function BotanicalSVG() {
  const svgRef = useRef<SVGSVGElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function update() {
      const svg = svgRef.current;
      const cover = wrapRef.current?.parentElement;
      if (!svg || !cover) return;
      const W = cover.clientWidth;
      const H = cover.clientHeight || window.innerHeight;
      const VH = 844;
      const VW_MIN = 390;
      const vW = Math.max(VW_MIN, Math.ceil((VH * W) / H));
      const vX = -((vW - VW_MIN) / 2);
      svg.setAttribute("viewBox", `${vX.toFixed(1)} 0 ${vW} ${VH}`);
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <div ref={wrapRef} className="cover-botanical-wrap">
      <svg
        ref={svgRef}
        className="cover-botanical-svg"
        viewBox="0 0 390 844"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <g id="cov-la">
            <path d="M0,0 C-8,-10 -9,-22 0,-36 C9,-22 8,-10 0,0" fill="#c9a14d" opacity="0.88"/>
            <path d="M0,-1 L0,-35 M0,-11 C-5,-15 -7,-20 -6,-25 M0,-21 C4,-25 6,-29 5,-33" stroke="#8a6010" strokeWidth="0.4" fill="none" opacity="0.5"/>
          </g>
          <g id="cov-lb">
            <path d="M0,0 C-11,-13 -12,-30 0,-48 C12,-30 11,-13 0,0" fill="#b08a2a" opacity="0.84"/>
            <path d="M0,-1 L0,-47 M0,-14 C-7,-19 -9,-25 -8,-32 M0,-27 C6,-32 8,-38 7,-43" stroke="#8a6010" strokeWidth="0.45" fill="none" opacity="0.45"/>
          </g>
          <g id="cov-lc">
            <path d="M0,0 C-5.5,-6 -5,-14 0,-22 C5,-14 5.5,-6 0,0" fill="#d4b45a" opacity="0.84"/>
            <path d="M0,-1 L0,-21 M0,-8 C-3.5,-11 -4.5,-14 -3.5,-17" stroke="#8a6010" strokeWidth="0.35" fill="none" opacity="0.42"/>
          </g>
          <g id="cov-ld">
            <path d="M0,0 C-4,-4 -4,-10 0,-16 C4,-10 4,-4 0,0" fill="#c9a14d" opacity="0.78"/>
            <path d="M0,-1 L0,-15" stroke="#8a6010" strokeWidth="0.3" fill="none" opacity="0.38"/>
          </g>
          <g id="cov-le">
            <path d="M0,0 C-12,-8 -11,-22 0,-34 C11,-22 12,-8 0,0" fill="#d8bc5a" opacity="0.82"/>
            <path d="M0,-1 L0,-33" stroke="#8a6010" strokeWidth="0.4" fill="none" opacity="0.4"/>
          </g>
          <g id="cov-fw">
            <ellipse rx="4.5" ry="10" cy="-10" fill="#fffef8" stroke="#ddd5c0" strokeWidth="0.4"/>
            <ellipse rx="4.5" ry="10" cy="-10" transform="rotate(72)"  fill="#fffef8" stroke="#ddd5c0" strokeWidth="0.4"/>
            <ellipse rx="4.5" ry="10" cy="-10" transform="rotate(144)" fill="#fffef8" stroke="#ddd5c0" strokeWidth="0.4"/>
            <ellipse rx="4.5" ry="10" cy="-10" transform="rotate(216)" fill="#fffef8" stroke="#ddd5c0" strokeWidth="0.4"/>
            <ellipse rx="4.5" ry="10" cy="-10" transform="rotate(288)" fill="#fffef8" stroke="#ddd5c0" strokeWidth="0.4"/>
            <circle r="5"   fill="#f0b800"/>
            <circle r="3.2" fill="#d49000"/>
          </g>
          <g id="cov-bud">
            <path d="M0,5 C-4,3 -5,-5 -4,-12 C-2,-19 0,-22 0,-22 C0,-22 2,-19 4,-12 C5,-5 4,3 0,5" fill="#fefdf8" stroke="#ddd5c0" strokeWidth="0.4" opacity="0.92"/>
            <path d="M0,5 L0,11" stroke="#b0a060" strokeWidth="0.7"/>
          </g>
        </defs>

        <rect width="390" height="844" fill="#fafafa"/>

        {/* TOP-RIGHT CORNER */}
        <g className="cover-float-corner cover-ct-9 cover-cd-n14">
          <path d="M406,-4 C380,20 350,46 316,74 C292,94 268,114 246,140" stroke="#8a6010" strokeWidth="1.1" fill="none" opacity="0.5"/>
          <path d="M403,22 C382,38 356,58 330,76 C310,90 292,102 275,116" stroke="#8a6010" strokeWidth="0.72" fill="none" opacity="0.36"/>
          <path d="M394,8 C376,30 355,52 334,70 C316,84 300,98 282,112" stroke="#8a6010" strokeWidth="0.58" fill="none" opacity="0.28"/>
          <use href="#cov-lb" transform="translate(377,4)   rotate(-33)"/>
          <use href="#cov-la" transform="translate(361,18)  rotate(-60)"/>
          <use href="#cov-lb" transform="translate(393,20)  rotate(12)"/>
          <use href="#cov-le" transform="translate(381,34)  rotate(-15)"/>
          <use href="#cov-la" transform="translate(363,42)  rotate(-86)"/>
          <use href="#cov-lc" transform="translate(396,8)   rotate(30)"/>
          <use href="#cov-lb" transform="translate(345,56)  rotate(-54)"/>
          <use href="#cov-lc" transform="translate(365,56)  rotate(-26)"/>
          <use href="#cov-la" transform="translate(325,72)  rotate(-80)"/>
          <use href="#cov-lb" transform="translate(309,86)  rotate(-108)"/>
          <use href="#cov-le" transform="translate(329,82)  rotate(-142)"/>
          <use href="#cov-lc" transform="translate(347,66)  rotate(-40)"/>
          <use href="#cov-lb" transform="translate(291,102) rotate(-122)"/>
          <use href="#cov-la" transform="translate(275,116) rotate(-74)"/>
          <use href="#cov-lc" transform="translate(297,108) rotate(-152)"/>
          <use href="#cov-le" transform="translate(265,130) rotate(-98)"/>
          <use href="#cov-la" transform="translate(253,142) rotate(-110)"/>
          <use href="#cov-lc" transform="translate(309,94)  rotate(6)"/>
          <use href="#cov-fw" transform="translate(381,10)  scale(1.15)"/>
          <use href="#cov-fw" transform="translate(319,64)  scale(0.92)"/>
          <use href="#cov-fw" transform="translate(271,110) scale(0.78)"/>
        </g>

        {/* BOTTOM-LEFT CORNER */}
        <g className="cover-float-corner cover-ct-10 cover-cd-n38">
          <path d="M-16,854 C12,828 44,804 76,782 C100,762 124,744 150,724" stroke="#8a6010" strokeWidth="1.1" fill="none" opacity="0.5"/>
          <path d="M-13,828 C10,812 36,796 60,780 C82,764 106,750 128,736" stroke="#8a6010" strokeWidth="0.72" fill="none" opacity="0.36"/>
          <path d="M-8,810 C12,800 34,786 56,772 C76,758 98,746 118,732" stroke="#8a6010" strokeWidth="0.58" fill="none" opacity="0.28"/>
          <use href="#cov-lb" transform="translate(13,843)  rotate(147)"/>
          <use href="#cov-la" transform="translate(29,831)  rotate(120)"/>
          <use href="#cov-lb" transform="translate(-3,823)  rotate(192)"/>
          <use href="#cov-le" transform="translate(9,809)   rotate(165)"/>
          <use href="#cov-la" transform="translate(35,813)  rotate(94)"/>
          <use href="#cov-lc" transform="translate(-6,843)  rotate(210)"/>
          <use href="#cov-lb" transform="translate(53,801)  rotate(126)"/>
          <use href="#cov-lc" transform="translate(33,799)  rotate(154)"/>
          <use href="#cov-la" transform="translate(73,787)  rotate(100)"/>
          <use href="#cov-lb" transform="translate(89,773)  rotate(82)"/>
          <use href="#cov-le" transform="translate(69,773)  rotate(42)"/>
          <use href="#cov-lc" transform="translate(51,787)  rotate(140)"/>
          <use href="#cov-la" transform="translate(107,759) rotate(62)"/>
          <use href="#cov-lb" transform="translate(123,745) rotate(108)"/>
          <use href="#cov-lc" transform="translate(101,753) rotate(32)"/>
          <use href="#cov-le" transform="translate(133,733) rotate(86)"/>
          <use href="#cov-la" transform="translate(145,723) rotate(74)"/>
          <use href="#cov-lc" transform="translate(91,761)  rotate(190)"/>
          <use href="#cov-fw" transform="translate(9,839)   scale(1.15)"/>
          <use href="#cov-fw" transform="translate(69,783)  scale(0.92)"/>
          <use href="#cov-fw" transform="translate(117,749) scale(0.82)"/>
          <use href="#cov-fw" transform="translate(29,819)  scale(0.7)"/>
        </g>

        {/* BOTTOM-RIGHT CORNER (small) */}
        <path d="M406,854 C383,832 361,814 341,798" stroke="#8a6010" strokeWidth="0.8" fill="none" opacity="0.34"/>
        <use href="#cov-la" transform="translate(388,838) rotate(-157)"/>
        <use href="#cov-lc" transform="translate(374,826) rotate(-132)"/>
        <use href="#cov-lb" transform="translate(360,814) rotate(-153)"/>
        <use href="#cov-la" transform="translate(346,802) rotate(-115)"/>
        <use href="#cov-lc" transform="translate(364,808) rotate(-175)"/>
        <use href="#cov-le" transform="translate(378,820) rotate(-138)"/>
        <use href="#cov-fw" transform="translate(382,832) scale(0.72)"/>

        {/* SCATTERED FLOATING ELEMENTS — falling motion */}
        <g className="cover-fall cover-t-52"><use href="#cov-ld" transform="translate(76,196)  rotate(20)"/></g>
        <g className="cover-fall cover-t-46"><use href="#cov-ld" transform="translate(189,286) rotate(-24)"/></g>
        <g className="cover-fall cover-t-64"><use href="#cov-lc" transform="translate(321,329) rotate(40)"/></g>
        <g className="cover-fall cover-t-57"><use href="#cov-ld" transform="translate(136,431) rotate(-14)"/></g>
        <g className="cover-fall cover-t-43"><use href="#cov-ld" transform="translate(301,485) rotate(30)"/></g>
        <g className="cover-fall cover-t-60"><use href="#cov-ld" transform="translate(219,389) rotate(-40)"/></g>
        <g className="cover-fall cover-t-72"><use href="#cov-ld" transform="translate(357,457) rotate(50)"/></g>
        <g className="cover-fall cover-t-55"><use href="#cov-ld" transform="translate(51,509)  rotate(-30)"/></g>
        <g className="cover-fall cover-t-61"><use href="#cov-ld" transform="translate(245,565) rotate(16)"/></g>
        <g className="cover-fall cover-t-48"><use href="#cov-ld" transform="translate(174,461) rotate(-8)"/></g>
        <g className="cover-fall cover-t-51"><use href="#cov-bud" transform="translate(273,555) rotate(9)"/></g>
        <g className="cover-fall cover-t-60"><use href="#cov-bud" transform="translate(107,649) rotate(-7)"/></g>
        <g className="cover-fall cover-t-73"><use href="#cov-bud" transform="translate(333,395) rotate(-16)"/></g>
        <g className="cover-fall cover-t-58"><use href="#cov-bud" transform="translate(211,241) rotate(5)"/></g>

        {/* Gold dots */}
        <circle cx="125" cy="187" r="2.4" fill="#c9a14d" opacity="0.55"/>
        <circle cx="281" cy="249" r="1.8" fill="#d4b45a" opacity="0.44"/>
        <circle cx="55"  cy="361" r="1.6" fill="#c9a14d" opacity="0.42"/>
        <circle cx="345" cy="317" r="2.6" fill="#c9a14d" opacity="0.48"/>
        <circle cx="203" cy="229" r="1.2" fill="#d4b45a" opacity="0.34"/>
        <circle cx="333" cy="411" r="2.2" fill="#c9a14d" opacity="0.42"/>
        <circle cx="71"  cy="471" r="1.6" fill="#c9a14d" opacity="0.38"/>
        <circle cx="357" cy="561" r="1.2" fill="#d4b45a" opacity="0.30"/>
        <circle cx="173" cy="511" r="1.8" fill="#c9a14d" opacity="0.35"/>
        <circle cx="287" cy="609" r="1.6" fill="#d4b45a" opacity="0.38"/>
        <circle cx="105" cy="615" r="2.0" fill="#c9a14d" opacity="0.32"/>
        <circle cx="247" cy="659" r="1.2" fill="#d4b45a" opacity="0.30"/>
        <circle cx="367" cy="685" r="1.6" fill="#c9a14d" opacity="0.33"/>
        <circle cx="197" cy="163" r="2.2" fill="#c9a14d" opacity="0.45"/>
        <circle cx="211" cy="179" r="1.4" fill="#d4b45a" opacity="0.36"/>
        <circle cx="221" cy="149" r="1.5" fill="#c9a14d" opacity="0.40"/>
        <circle cx="249" cy="159" r="2.0" fill="#d4b45a" opacity="0.35"/>
        <circle cx="205" cy="701" r="2.0" fill="#c9a14d" opacity="0.42"/>
        <circle cx="217" cy="715" r="1.3" fill="#d4b45a" opacity="0.33"/>
        <circle cx="317" cy="275" r="1.6" fill="#c9a14d" opacity="0.38"/>
        <circle cx="85"  cy="425" r="1.8" fill="#c9a14d" opacity="0.35"/>
      </svg>
    </div>
  );
}
