<template>
  <client-only>
    <div>
      <!--<div class="py-2">jhffjhd</div>-->
      <vue-navigation-bar class="px-6" :options="navbarOptions" />
    </div>
  </client-only>
</template>

<script>
import "vue-navigation-bar/dist/vue-navigation-bar.css";
import VueNavigationBar from "vue-navigation-bar";
export default {
  name: "HeaderApp",
  data() {
    return {
      navbarOptions: {
        elementId: "main-navbar",
        isUsingVueRouter: true,
        mobileBreakpoint: 992,
        brandImagePath: "/",
        brandImage: "/logo/logo.gif",
        brandImageAltText: "EICM-GDC image logo",
        collapseButtonOpenColor: "#3E4095",
        collapseButtonCloseColor: "#3E4095",
        showBrandImageInMobilePopup: true,
        ariaLabelMainNav: "Main Navigation",
        tooltipAnimationType: "shift-away", // 'shift-away', 'shift-toward', 'scale', 'perspective'
        menuOptionsRight: [
          {
            type: "link",
            text: "INÍCIO",
            path: { name: "index" },
            iconRight: '<i class="fa fa-long-arrow-right fa-fw"></i>'
          },

          {
            type: "link",
            text: "INSTITUIÇÃO",
            arrowColor: "#659CC8",
            subMenuOptions: [
              {
                // isLinkAction: true,
                type: "link",
                text: "SOBRE",
                subText:
                  "Informações básicas sobre esta intituição de ensino secundário",
                path: { name: "institution-about" }
                // iconLeft:
                //   '<svg id="i-info" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M16 14 L16 23 M16 8 L16 10" /><circle cx="16" cy="16" r="14" /></svg>'
              },
              {
                type: "hr"
              },
              {
                type: "link",
                text: "HISTÓRIA E MARCOS",
                subText:
                  "A história da escola e os principais marcos hitóricos",
                path: { name: "institution-histories" },
                iconLeft: ""
              },
              {
                type: "hr"
              },
              {
                type: "link",
                text: "CORPO DIRETIVO",
                subText:
                  "Com determinação e responsabilidade, servimos a nossa comunidade com um serviço de pertigio...",
                path: { name: "institution-team" }
                // iconLeft:
                //   '<svg id="i-info" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M16 14 L16 23 M16 8 L16 10" /><circle cx="16" cy="16" r="14" /></svg>'
              }
            ]
          },
          {
            type: "link",
            text: "CURSOS E FORMAÇÕES",
            subMenuOptions: [
              {
                type: "link",
                text: "CURSOS VIA TÉCNICA",
                subText:
                  "Leques de cursos apresentados como opções para a via técnica",
                path: { name: "courses-tecnics" }
              },
              {
                type: "link",
                text: "FORMAÇÕES PROFISSIONAIS",
                subText:
                  "Formações destinadas para os que pretendem especializar para o mercado de trabalho",
                path: { name: "courses-profissional" }
              },
              {
                type: "hr"
              },
              {
                type: "link",
                text: "ACP",

                path: { name: "courses-acp" }
              },

              {
                type: "link",
                text: "OUTROS",

                path: { name: "courses-others" }
              }
            ]
          },
          {
            type: "link",
            text: "CONTACTOS",
            path: { name: "contacts" },
            iconRight: '<i class="fa fa-long-arrow-right fa-fw"></i>'
          }
          // {
          //   type: "button",
          //   text: "Entrar",
          //   path: { name: "auth-register" },
          //   class: "button-red"
          // },
          // {
          //   type: "button",
          //   text: "Login",
          //   path: { name: "auth-login" },
          //   iconRight:
          //     '<svg id="i-signin" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M3 16 L23 16 M15 8 L23 16 15 24 M21 4 L29 4 29 28 21 28" /></svg>'
          // }
        ]
        // menuOptionsLeft: [
        //   {
        //     type: "link",
        //     text: "EICM-GDC",
        //     path: { name: "index" }
        //   }
        // ]
      }
    };
  },
  components: {
    VueNavigationBar
  },
  methods: {}
};
</script>

<style lang="scss">
.vnb {
  .button-red {
    background: #ff3b30;

    &:hover {
      background: darken(#ff3b30, 10%);
    }
  }
}

.vnb {
  &__brand-image-wrapper {
    &__link {
      &__image {
      }
    }
  }

  &__menu-options {
    &--left {
    }

    &--right {
    }

    &__option {
      &__link {
        &:hover {
          color: #3e4095;
        }

        &__icon {
          svg {
          }

          &--left {
          }

          &--right {
          }
        }
      }

      &__arrow {
        &--hover {
        }
      }

      &__button {
        &__icon {
          svg {
          }

          &--left {
          }

          &--right {
          }
        }
      }

      &__spacer {
      }
    }
  }

  &__sub-menu-options {
    &__option {
      &__link {
        color: #3e4095;

        &:hover {
        }

        &__icon {
          svg {
          }

          &--left {
          }

          &--right {
          }
        }

        &__text-wrapper {
          &__text {
          }

          &__sub-text {
          }
        }
      }

      &__hr {
      }
    }
  }

  &__collapse-button {
    &:hover {
    }

    &__image {
    }
  }

  &__popup {
    &__top {
      background: rgb(216, 216, 216);
      padding: 20px;

      &__image {
      }

      &__close-button {
        &:hover {
        }

        &__image {
          margin-top: 20px;
        }
      }
    }

    &__bottom {
      &__custom-section {
      }

      &__menu-options {
        &__option {
          &:not(:last-child) {
          }

          &__link {
            &:hover {
            }

            &--no-highlight {
              &:hover {
              }
            }

            &__icon {
              svg {
              }

              &--left {
              }

              &--right {
              }
            }
          }
        }
      }

      &__sub-menu-options {
        &__option {
          &__link {
            color: #3e4095;

            &:hover {
            }

            &__sub-text {
            }
          }
        }
      }
    }
  }
}

.vnb-button {
  &:hover {
  }
}
</style>
