export default function({ store }) {
  store.dispatch("validationErrors/clearFormErrors");
  store.dispatch("validationErrors/clearAuth401Errors");
}
