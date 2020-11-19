<template>
  <div class="bg-gray-100 w-full py-12 justify-center">
    <div class=" container px-3 mx-auto">
      <Row type="flex">
        <Col span="24" class="mb-10">
          <base-home-section-title>PUBLICAÇÕES</base-home-section-title>
        </Col>

        <Col
          v-for="(article, a) in articles" 
          :key="a"
          :xs="24"
          :sm="12"
          :md="8"
        >
          <featured-post-card :article="article"></featured-post-card>
          <!--<post-card :article="article"></post-card>-->
        </Col>
      </Row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "HomeFeaturedCourses",

  props: {
    articles: {
      type: Array,
      default: () => {
        return [];
      }
    }
  }
};
</script>
