<template>
  <div class="bg-gray-300 w-full py-12 justify-center">
    <div class=" container px-3 mx-auto">
      <Row type="flex">
        <Col span="24" class="mb-10">
          <base-home-section-title>Cursos em distaques</base-home-section-title>
        </Col>
        <Col :xs="24" :sm="12" :md="8" :lg="6">
          <base-course-card :property="property" />
        </Col>
        <Col :xs="24" :sm="12" :md="8" :lg="6">
          <base-course-card :property="property" />
        </Col>
        <Col :xs="24" :sm="12" :md="8" :lg="6">
          <base-course-card :property="property" />
        </Col>
        <Col :xs="24" :sm="12" :md="8" :lg="6">
          <base-course-card :property="property" />
        </Col>
      </Row>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeFeaturedCourses",

  data() {
    return {
      property: {
        imageUrl:
          "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        imageAlt: "Rear view of modern home with pool",
        beds: 3,
        baths: 2,
        title: "Modern home in city center",
        priceInCents: 190000,
        formattedPrice: "$1,900.00",
        reviewCount: 34,
        rating: 4
      }
    };
  },
  methods: {}
};
</script>

<style scoped>
.section-title {
  display: inline-block;
  position: relative;
}
.section-title:after {
  background: none repeat scroll 0 0 transparent;
  bottom: 0;
  content: "";
  display: block;
  height: 4px;
  left: 0;
  position: absolute;
  background: rgb(12, 1, 1);
  transition: width 0.3s ease 0s, left 0.3s ease 0s;
  width: 100%;
}
.section-title:hover:after {
  width: 100%;
  left: 0;
}
</style>
