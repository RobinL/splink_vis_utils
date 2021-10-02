export const log2 = Math.log2;

export function bayes_factor_to_prob(b) {
  return b / (b + 1);
}

export function prob_to_bayes_factor(p) {
  return p / (1 - p);
}

export function prob_to_log2_bayes_factor(p) {
  return log2(prob_to_bayes_factor(p));
}

export function log2_bayes_factor_to_prob(log2_b) {
  return bayes_factor_to_prob(2 ** log2_b);
}
