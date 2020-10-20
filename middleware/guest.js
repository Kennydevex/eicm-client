export default function({ store, redirect }) {
  if (store.getters["authenticated"]) {
    //   No caso do utilizador já se encontra regsitado, redireciona-lo para a página de perfil
    return redirect("/");
    // return redirect("/profile");
  }
}
