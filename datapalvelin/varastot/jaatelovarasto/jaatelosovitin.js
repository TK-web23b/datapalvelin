function muunna(muunnettavaOlio) {
  if (!muunnettavaOlio) return {};

  return Object.assign(muunnettavaOlio, {
    id: +muunnettavaOlio.id,
    hinta: Number(muunnettavaOlio.hinta),
  });
}

export { muunna };
