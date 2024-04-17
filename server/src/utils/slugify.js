export default function slugify(str) {
  const greekToLatinMap = {
    α: 'a',
    β: 'b',
    γ: 'g',
    δ: 'd',
    ε: 'e',
    ζ: 'z',
    η: 'i',
    θ: 'th',
    ι: 'i',
    κ: 'k',
    λ: 'l',
    μ: 'm',
    ν: 'n',
    ξ: 'x',
    ο: 'o',
    π: 'p',
    ρ: 'r',
    σ: 's',
    ς: 's',
    τ: 't',
    υ: 'u',
    φ: 'f',
    χ: 'ch',
    ψ: 'ps',
    ω: 'o',
    // Add more mappings as needed
  };

  return str
    .normalize('NFKD') // split accented characters into their base characters and diacritical marks
    .toLowerCase()
    .replace(/[α-ω]/gi, (match) => greekToLatinMap[match] || match)
    .replace(/\s+/g, '-') // replace spaces with hyphens
    .replace(/[^a-z0-9-]/g, '') // remove non-alphanumeric characters
    .replace(/-+/g, '-'); // remove consecutive hyphens
}
