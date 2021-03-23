
export default function({ $axios, store, redirect, app }) {
  $axios.onError(error => {
    if (error.response.status === 422) {
      store.dispatch(
        "validationErrors/setFormErrors",
        error.response.data.errors
      );
    }

    if (error.response.status === 401) {
      if (error.response.data.errors) {
        store.dispatch(
          "validationErrors/setAuth401Errors",
          error.response.data.errors
        );
      }
    }

    if (error.response.status === 403) {
      redirect("/");
      // console.log('Utilizador sem permissão');
      return;
    }
    return Promise.reject(error);
  });

  $axios.onRequest(() => {
    store.dispatch("validationErrors/clearFormErrors");
  });
}
