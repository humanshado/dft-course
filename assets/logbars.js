/* DFT course: reusable log-scale bar chart (inline SVG).
 *
 * LogBars.render(svgElement, {
 *   max: 120,                         // largest exponent on the axis (10^max)
 *   bars: [{ label: "ψ", log10: 30, cls: "wf", note: "10³⁰ numbers" }, ...],
 *   refs: [{ label: "laptop RAM", log10: 9.3 }, ...]   // vertical reference lines
 * });
 *
 * Classes "wf" and "dn" pick up the course's wavefunction / density colours.
 * Used for any "how does cost grow" comparison (storage, CPU time, scaling).
 */
window.LogBars = (function () {
  var NS = "http://www.w3.org/2000/svg";
  function el(name, attrs, text) {
    var e = document.createElementNS(NS, name);
    for (var k in attrs) e.setAttribute(k, attrs[k]);
    if (text != null) e.textContent = text;
    return e;
  }
  var SUP = "⁰¹²³⁴⁵⁶⁷⁸⁹";
  function sup(n) { return String(n).replace(/[0-9]/g, function (c) { return SUP[+c]; }).replace("-", "⁻"); }
  function render(svg, opts) {
    var W = 640, left = 92, right = 16, top = 26, barH = 30, gap = 18;
    var n = opts.bars.length;
    var H = top + n * (barH + gap) + 34;
    svg.setAttribute("viewBox", "0 0 " + W + " " + H);
    svg.setAttribute("width", "100%");
    svg.setAttribute("role", "img");
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    var plotW = W - left - right, max = opts.max;
    function x(v) { return left + plotW * Math.min(Math.max(v, 0), max) / max; }

    var step = max <= 30 ? 5 : max <= 60 ? 10 : 20;
    for (var t = 0; t <= max; t += step) {
      svg.appendChild(el("line", { x1: x(t), x2: x(t), y1: top - 6, y2: H - 28, stroke: "var(--rule)", "stroke-width": 1 }));
      svg.appendChild(el("text", { x: x(t), y: H - 12, "text-anchor": "middle", "font-size": 12, fill: "var(--muted)" }, "10" + sup(t)));
    }
    (opts.refs || []).forEach(function (r, i) {
      svg.appendChild(el("line", { x1: x(r.log10), x2: x(r.log10), y1: top - 10, y2: H - 28,
        stroke: "var(--fg)", "stroke-width": 1.2, "stroke-dasharray": "4 3" }));
      svg.appendChild(el("text", { x: x(r.log10) + 4, y: top - 12, "font-size": 11, fill: "var(--fg)" }, r.label));
    });
    opts.bars.forEach(function (b, i) {
      var y = top + i * (barH + gap);
      svg.appendChild(el("text", { x: left - 10, y: y + barH / 2 + 5, "text-anchor": "end", "font-size": 14, fill: "var(--fg)" }, b.label));
      var color = b.cls === "dn" ? "var(--accent-2)" : b.cls === "wf" ? "var(--accent)" : "var(--muted)";
      var overflow = b.log10 > max;
      svg.appendChild(el("rect", { x: left, y: y, width: Math.max(x(b.log10) - left, 2), height: barH, fill: color, opacity: 0.85, rx: 2 }));
      if (overflow) {
        svg.appendChild(el("text", { x: W - right - 4, y: y + barH / 2 + 5, "text-anchor": "end", "font-size": 13, fill: "var(--bg)", "font-weight": 600 }, "off the chart →"));
      }
      if (b.note) {
        var nx = x(b.log10) + 6, anchor = "start", fill = "var(--fg)";
        if (nx > W - 150) { nx = x(Math.min(b.log10, max)) - 6; anchor = "end"; fill = "var(--bg)"; }
        if (overflow) { nx = left + 8; anchor = "start"; fill = "var(--bg)"; }
        svg.appendChild(el("text", { x: nx, y: y + barH / 2 + 5, "text-anchor": anchor, "font-size": 13, fill: fill }, b.note));
      }
    });
  }
  return { render: render, sup: sup };
})();
