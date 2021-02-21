<template>
  <div class="container m-auto">
    <el-row v-if="featured_courses.length > 0">
      <el-col class="mt-5">
        <div class="overflow-hidden rounded-lg">
          <FeaturedCourses :courses="featured_courses"></FeaturedCourses>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="16" class="p-8 mt-5 mb-8 bg-white rounded-lg">
      <el-col :span="24" :xs="24" :lg="16">
        <div class="flex items-center justify-start w-full mb-8">
          <div
            class="text-xl antialiased font-semibold leading-relaxed tracking-wider text-gray-600 uppercase"
          >
            <span> {{ cousesType }} </span>
            <div class="w-1/3 mt-2 text-center border-b-4 border-primary"></div>
          </div>
        </div>

        <template v-if="courses.length > 0">
          <template v-for="course in courses">
            <div class="my-4" :key="course.id">
              <Course :course="course" />
            </div>
          </template>
        </template>

        <template v-else>
          <div>
            <el-alert
              type="warning alert"
              show-icon
              class="shadow-xl"
              title="Sem registo de cursos"
              description="Nenhum curso desta categoria registado."
            >
            </el-alert>
          </div>
        </template>

        <el-divider></el-divider>

         <div>
            <div class="mb-3">
              <h2
                class="text-sm tracking-wide text-center text-gray-600 md:text-left"
              >
                Partilhe com os amigos e familiares
              </h2>
            </div>
            <div class="text-center md:text-left">
              <SocialNet
                :button="'small'"
                :title="cousesType"
                :description="'Cursos da via técnica'"
                :hashtags="'Cursos e formações profissionais'"
              ></SocialNet>
            </div>
          </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "CoursesInfo",
  layout: "landing",

  head() {
    return {
      title: this.cousesType,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: "description",
          name: "description",
          content: "Cursos oferecidos pela EICM-GDC"
        },
        { hid: "og:title", name: "og:title", content: this.cousesType },
        {
          hid: "og:description",
          name: "og:description",
          content: "Cursos oferecidos pela EICM-GDC"
        },
        {
          hid: "og:image",
          name: "og:image",
          content: "/sliders/slide.jpg"
        },
        { hid: "og:type", name: "og:type", content: "article" },
        {
          hide: "twitter:card",
          name: "twitter:card",
          content: "summary"
          // content: this.article.cover ? "summary_large_image" : "summary"
        }
      ].filter(x => x.content)
    };
  },

  async fetch({ store, params }) {
    await store.dispatch("courses/getActivedCourses");
    await store.dispatch("courses/getFeaturedCourses");
    await store.dispatch(
      "courses/getCoursesByType",
      params.courses == "acp"
        ? 3
        : params.courses == "formacoes_profissionais"
        ? 2
        : params.courses == "cursos_via_tecnica"
        ? 1
        : 4
    );
  },

  data: function() {
    return {};
  },

  computed: {
    ...mapGetters({
      courses: "courses/courses_by_type",
      featured_courses: "courses/featured_courses"
    }),

    slug() {
      return this.$route.params.courses;
    },
    cousesType() {
      return this.slug == "acp"
        ? "ACP"
        : this.slug == "formacoes_profissionais"
        ? "Formações Profissionais"
        : this.slug == "cursos_via_tecnica"
        ? "Cursos da Via Técnica"
        : "Outros";
    },

    cousesId() {
      return this.slug == "acp"
        ? 3
        : this.slug == "formacoes_profissionais"
        ? 2
        : this.slug == "cursos_via_tecnica"
        ? 1
        : 4;
    },
    slug() {
      return this.$route.params.courses;
    }
  }
};
</script>

<style scoped></style>
