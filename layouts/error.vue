<template>
  <div>
    <template v-if="error.statusCode === 422">
      <div
        class="absolute z-0 flex flex-wrap items-center content-center justify-center w-screen h-screen"
      >
        <svg
          class="w-full p-6 text-gray-300 fill-current lg:p-64"
          viewBox="0 0 445 202"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M137.587 154.953h-22.102V197h-37.6v-42.047H.53v-33.557L72.36 2.803h43.125V124.9h22.102v30.053zM77.886 124.9V40.537L28.966 124.9h48.92zm77.49 72.1c.36-14.016 3.37-26.818 9.03-38.408 5.48-13.028 18.417-26.818 38.812-41.373 17.7-12.668 29.154-21.742 34.365-27.223 7.996-8.535 11.994-17.879 11.994-28.031 0-8.266-2.29-15.139-6.873-20.62-4.582-5.48-11.14-8.22-19.676-8.22-11.68 0-19.63 4.357-23.853 13.072-2.426 5.032-3.863 13.028-4.313 23.989h-37.33c.63-16.622 3.639-30.053 9.03-40.295C176.804 10.394 194.997.646 221.142.646c20.664 0 37.105 5.728 49.324 17.183 12.219 11.455 18.328 26.616 18.328 45.483 0 14.465-4.313 27.313-12.938 38.543-5.66 7.458-14.958 15.768-27.896 24.932l-15.363 10.916c-9.614 6.828-16.195 11.77-19.743 14.824a43.443 43.443 0 00-8.962 10.647h85.306V197H155.376zm153.498 0c.36-14.016 3.37-26.818 9.03-38.408 5.48-13.028 18.417-26.818 38.812-41.373 17.7-12.668 29.154-21.742 34.365-27.223 7.996-8.535 11.994-17.879 11.994-28.031 0-8.266-2.29-15.139-6.873-20.62-4.582-5.48-11.14-8.22-19.676-8.22-11.68 0-19.63 4.357-23.853 13.072-2.426 5.032-3.863 13.028-4.313 23.989h-37.33c.63-16.622 3.639-30.053 9.03-40.295C330.302 10.394 348.495.646 374.64.646c20.664 0 37.105 5.728 49.324 17.183 12.219 11.455 18.328 26.616 18.328 45.483 0 14.465-4.312 27.313-12.938 38.543-5.66 7.458-14.958 15.768-27.896 24.932l-15.363 10.916c-9.614 6.828-16.195 11.77-19.743 14.824a43.443 43.443 0 00-8.962 10.647h85.306V197H308.874z"
            fill-rule="nonzero"
          />
        </svg>
      </div>
      <div
        class="relative z-10 flex flex-wrap items-end content-end justify-center w-screen h-screen md:content-center md:items-center"
      >
        <div class="p-6 text-center ">
          <h2 class="text-xl font-black uppercase lg:text-5xl">
            Página Restrita
          </h2>
          <p class="mt-3 text-sm text-gray-900 uppercase lg:text-base">
            Certifique as sua permissções antes de efuetuar esta acção
          </p>

          <NuxtLink
            class="inline-block px-6 py-3 mt-6 font-light text-white uppercase rounded-full shadow-md bg-primary hover:bg-blue-700"
            to="/"
            >Início</NuxtLink
          >
        </div>
      </div>
    </template>

    <template v-if="error.statusCode === 404">
      <div
        class="absolute z-0 flex flex-wrap items-center content-center justify-center w-screen h-screen"
      >
        <svg
          class="w-full p-6 text-gray-300 fill-current lg:p-64"
          viewBox="0 0 445 202"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M137.587 154.953h-22.102V197h-37.6v-42.047H.53v-33.557L72.36 2.803h43.125V124.9h22.102v30.053zM77.886 124.9V40.537L28.966 124.9h48.92zm116.707-23.718c0 22.46 1.842 39.643 5.525 51.547 3.684 11.905 11.23 17.857 22.64 17.857 11.411 0 18.89-5.952 22.44-17.857 3.548-11.904 5.323-29.086 5.323-51.547 0-23.54-1.775-40.97-5.324-52.29s-11.028-16.98-22.438-16.98c-11.41 0-18.957 5.66-22.64 16.98-3.684 11.32-5.526 28.75-5.526 52.29zM222.759.242c24.887 0 42.339 8.76 52.356 26.28 10.018 17.52 15.027 42.406 15.027 74.66s-5.01 57.095-15.027 74.525c-10.017 17.43-27.47 26.145-52.356 26.145-24.887 0-42.339-8.715-52.357-26.145-10.017-17.43-15.026-42.271-15.026-74.525 0-32.254 5.009-57.14 15.026-74.66C180.42 9.001 197.872.241 222.76.241zm221.824 154.711h-22.102V197h-37.6v-42.047h-77.355v-33.557l71.83-118.593h43.125V124.9h22.102v30.053zM384.882 124.9V40.537l-48.92 84.363h48.92z"
            fill-rule="nonzero"
          />
        </svg>
      </div>
      <div
        class="relative z-10 flex flex-wrap items-end content-end justify-center w-screen h-screen md:content-center md:items-center"
      >
        <div class="p-6 text-center ">
          <h2 class="text-xl font-black uppercase lg:text-5xl">
            Página não foi encontrada
          </h2>
          <p class="mt-3 text-sm text-gray-900 uppercase lg:text-base">
            A página solicitada não foi encontrada, pode ser que esta tenha sido
            removida, ou estiver temporariamente indisponível.
          </p>

          <NuxtLink
            class="inline-block px-6 py-3 mt-6 font-light text-white uppercase rounded-full shadow-md bg-primary hover:bg-blue-700"
            to="/"
            >Início</NuxtLink
          >
        </div>
      </div>
    </template>

    <template v-if="error.statusCode === 500">
      <div
        class="absolute z-0 flex flex-wrap items-center content-center justify-center w-screen h-screen"
      >
        <svg
          class="w-full p-6 text-gray-300 fill-current lg:p-64"
          viewBox="0 0 445 202"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M38.804 144.71c1.527 8.356 4.447 14.803 8.76 19.34 4.312 4.537 10.601 6.805 18.867 6.805 9.523 0 16.778-3.346 21.764-10.04 4.987-6.693 7.48-15.116 7.48-25.268 0-9.973-2.336-18.396-7.008-25.269-4.672-6.873-11.95-10.31-21.832-10.31-4.672 0-8.715.585-12.129 1.753-6.02 2.156-10.557 6.154-13.611 11.994l-34.5-1.617L20.34 4.15h107.678v32.614H48.103l-7.008 42.72c5.93-3.863 10.556-6.423 13.88-7.681 5.57-2.067 12.354-3.1 20.35-3.1 16.172 0 30.277 5.436 42.317 16.307 12.039 10.87 18.058 26.683 18.058 47.437 0 18.059-5.795 34.186-17.385 48.381-11.59 14.196-28.93 21.293-52.02 21.293-18.597 0-33.87-4.986-45.82-14.959C8.527 177.19 1.879 163.04.53 144.711h38.274zm155.789-43.528c0 22.46 1.842 39.643 5.525 51.547 3.684 11.905 11.23 17.857 22.64 17.857 11.411 0 18.89-5.952 22.44-17.857 3.548-11.904 5.323-29.086 5.323-51.547 0-23.54-1.775-40.97-5.324-52.29s-11.028-16.98-22.438-16.98c-11.41 0-18.957 5.66-22.64 16.98-3.684 11.32-5.526 28.75-5.526 52.29zM222.759.242c24.887 0 42.339 8.76 52.356 26.28 10.018 17.52 15.027 42.406 15.027 74.66s-5.01 57.095-15.027 74.525c-10.017 17.43-27.47 26.145-52.356 26.145-24.887 0-42.339-8.715-52.357-26.145-10.017-17.43-15.026-42.271-15.026-74.525 0-32.254 5.009-57.14 15.026-74.66C180.42 9.001 197.872.241 222.76.241zm125.332 100.94c0 22.46 1.842 39.643 5.525 51.547 3.684 11.905 11.23 17.857 22.64 17.857 11.411 0 18.89-5.952 22.44-17.857 3.548-11.904 5.323-29.086 5.323-51.547 0-23.54-1.775-40.97-5.324-52.29s-11.028-16.98-22.438-16.98c-11.41 0-18.957 5.66-22.64 16.98-3.684 11.32-5.526 28.75-5.526 52.29zM376.257.242c24.887 0 42.339 8.76 52.356 26.28 10.018 17.52 15.027 42.406 15.027 74.66s-5.01 57.095-15.027 74.525c-10.017 17.43-27.47 26.145-52.356 26.145-24.887 0-42.339-8.715-52.357-26.145-10.017-17.43-15.026-42.271-15.026-74.525 0-32.254 5.009-57.14 15.026-74.66C333.918 9.001 351.37.241 376.257.241z"
            fill-rule="nonzero"
          />
        </svg>
      </div>
      <div
        class="relative z-10 flex flex-wrap items-end content-end justify-center w-screen h-screen md:content-center md:items-center"
      >
        <div class="p-6 text-center ">
          <h2 class="text-xl font-black uppercase lg:text-5xl">
            Pedimos Desculpas, pela falha do sistema
          </h2>
          <p class="mt-3 text-sm text-gray-900 uppercase lg:text-base">
            Ocorreu alguma falha no sistema, a equipa da EICM-GDC, irá resolver
            o problema o mias breve possível.
          </p>

          <NuxtLink
            class="inline-block px-6 py-3 mt-6 font-light text-white uppercase rounded-full shadow-md bg-primary hover:bg-blue-700"
            to="/"
            >Início</NuxtLink
          >
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  props: ["error"],
  layout: "error" // you can set a custom layout for the error page
};
</script>
