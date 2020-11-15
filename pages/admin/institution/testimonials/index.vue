<template>
  <div>
    <Row>
      <Col span="24"> </Col>

      <Col span="24" class="my-5">
        <Row>
          <Col span="24">
            <Button
              :loading="creating_testimonial"
              type="primary"
              @click.stop="onCreateTestimonial()"
            >
              <span v-if="!creating_testimonial">Novo Testemunho</span>
              <span v-else>Solicitando...</span></Button
            >
          </Col>

          <Col span="24" class="mt-5">
            <Table
              border
              :columns="testimonials_header"
              :data="testimonials"
              context-menu
              show-context-menu
              @on-contextmenu="handleContextMenu"
            >
              <template slot="contextMenu">
                <DropdownItem @click.native="handleContextMenuEdit"
                  >Editar</DropdownItem
                >
                <DropdownItem
                  @click.native="handleContextMenuDelete"
                  style="color: #ed4014"
                  >Eliminar</DropdownItem
                >
              </template>

              <template slot-scope="{ row }" slot="type">
                <span>{{
                  row.type == 1
                    ? "Colaborador"
                    : row.type == 2
                    ? "Antogo Colaborador"
                    : row.type == 3
                    ? "Estudante"
                    : row.type == 4
                    ? "Antogo Estudante"
                    : row.type == 5
                    ? "Fez Formação"
                    : "Outro"
                }}</span>
              </template>

              <template slot-scope="{ row, index }" slot="action">
                <Button
                  type="primary"
                  size="small"
                  style="margin-right: 5px"
                  :loading="on_load_data[row.id]"
                  @click="onUpdateTestimonial(row.id)"
                >
                  <Icon v-if="!on_load_data[row.id]" type="md-create" />
                </Button>
                <Button
                  type="error"
                  size="small"
                  :loading="deleting[row.id]"
                  @click="
                    onDelete(
                      'testimonials',
                      row.id,
                      'APP_UPDATE_TESTIMONIALS_DATA'
                    )
                  "
                >
                  <Icon v-if="!deleting[row.id]" type="md-trash"
                /></Button>
              </template>
            </Table>
            <create-testimonial></create-testimonial>
            <update-testimonial></update-testimonial>
          </Col>
        </Row>
      </Col>
    </Row>
  </div>
</template>

<script>
import { handleActivations, deleteDatas } from "@/mixins/appRequest";
import { mapGetters } from "vuex";
import { requests } from "@/mixins/appRequest";

export default {
  name: "TestimonialPage",
  layout: "admin",
  mixins: [handleActivations, deleteDatas, requests],

  async fetch({ store }) {
    await store.dispatch("testimonials/getTestimonials");
  },

  data() {
    return {
      context_testimonial: {},

      creating_testimonial: false,
      selected: [],
      context_testimonial: {},
      single_testimonial: [],
      testimonials_header: [
        {
          title: "Name",
          key: "name",
          minWidth: 150,
          sortable: true
        },
        {
          title: "Instituição",
          key: "institution",
          minWidth: 150
        },

        {
          title: "Cargo",
          key: "job_title",
          mxWidth: 100
        },

        {
          title: "Tipo",
          slot: "type",
          mxWidth: 150
        },

        {
          title: "Action",
          slot: "action",
          width: 150,
          align: "center"
        }
      ]
    };
  },

  computed: {
    ...mapGetters({
      testimonials: "testimonials/testimonials"
    })
  },
  async created() {
    if (process.client) {
      window.getApp.$on("APP_UPDATE_TESTIMONIALS_DATA", () => {
        this.getTestimonials();
      });
    }
  },
  methods: {
    async onCreateTestimonial() {
      this.creating_testimonial = true;
      this.handleModal("testimonials/toggleCreateTestimonialDialog");
      this.creating_testimonial = false;
    },

    async onUpdateTestimonial(id) {
      await this.onUpdateData(
        id,
        "testimonials",
        "APP_ON_UPDATE_TESTIMONIAL",
        "testimonials/toggleUpdateTestimonialDialog"
      );
    },

    async getTestimonials() {
      await this.$store.dispatch("testimonials/getTestimonials");
    },

    handleContextMenu(row) {
      this.context_testimonial = row;
    },

    handleContextMenuEdit() {
      this.onUpdateTestimonial(this.context_testimonial.id);
    },
    handleContextMenuDelete() {
      this.onDelete(
        "testimonials",
        this.context_testimonial.id,
        "APP_UPDATE_TESTIMONIALS_DATA"
      );
    }
  },
  components: {
    CreateTestimonial: () =>
      import("@/components/backend/testimonials/CreateTestimonial"),
    UpdateTestimonial: () =>
      import("@/components/backend/testimonials/UpdateTestimonial")
  }
};
</script>

<style lang="scss" scoped></style>
