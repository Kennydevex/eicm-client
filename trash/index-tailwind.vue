<template>
  <div>
    <div class="bg-gray-100 flex">
      <div
        class="px-8 py-12 max-w-md mx-auto sm:max-w-xl lg:max-w-full lg:w-1/2 lg:py-24 lg:px-12"
      >
        <div class="xl:max-w-lg xl:ml-auto">
          <img class="h-10" src="logo.png" alt="Workcation" />
          <img
            class="mt-6 rounded-lg shadow-xl sm:mt-8 sm:h-64 sm:w-full sm:object-cover sm:object-center lg:hidden"
            src="beach.jpg"
            alt="Woman workcationing on the beach"
          />
          <h1
            class="mt-6 text-2xl font-bold text-gray-900 leading-tight sm:mt-8 sm:text-4xl lg:text-3xl xl:text-4xl"
          >
            You can work from anywhere.
            <br class="hidden lg:inline" /><span class="text-indigo-500"
              >Take advantage of it.</span
            >
          </h1>
          <p class="mt-2 text-gray-600 sm:mt-4 sm:text-xl">
            Workcation helps you find work-friendly rentals in beautiful
            locations so you can enjoy some nice weather even when you're not on
            vacation.
          </p>
          <div class="mt-4 sm:mt-6">
            <a href="#" class="btn btn-indigo shadow-lg sm:text-base"
              >Book your escape</a
            >
          </div>
        </div>
      </div>
      <div class="hidden lg:block lg:w-1/2 lg:relative">
        <img
          class="absolute inset-0 h-full w-full object-cover object-center"
          src="beach.jpg"
          alt="Woman workcationing on the beach"
        />
      </div>
    </div>
    <div>
      <div class="max-w-md sm:max-w-xl lg:max-w-6xl mx-auto px-8 lg:px-12 py-8">
        <h2 class="text-xl text-gray-900">Popular destinations</h2>
        <p class="text-gray-600">
          A selection of great work-friendly cities with lots to see and
          explore.
        </p>
        <div class="flex flex-wrap -mx-4">
          <div
            class="mt-6 w-full px-4 lg:w-1/2 xl:w-1/3"
            v-for="(destination, index) in popularDestinations"
            :key="index"
          >
            <DestinationCard :destination="destination" />
          </div>
        </div>
      </div>
    </div>

    <base-test></base-test>

    <div class="bg-gray-200 min-h-screen p-16 flex flex-col justify-center">
      <PropertyCard :property="property" />
    </div>
  </div>
</template>

<script>
import DestinationCard from "@/components/common/DestinationCard";
import PropertyCard from "@/components/common/PropertyCard";
export default {
  layout: "landing",
  name: "HomePagw",
  components: {
    DestinationCard,
    PropertyCard
  },

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
      },
      popularDestinations: [
        {
          city: "Toronto",
          averagePrice: 120,
          propertyCount: 76,
          imageUrl: "/beach.jpg",
          imageAlt: "Toronto skyline"
        },
        {
          city: "Malibu",
          averagePrice: 215,
          propertyCount: 43,
          imageUrl: "/beach.jpg",
          imageAlt: "Cliff in Malibu"
        },
        {
          city: "Chicago",
          averagePrice: 130,
          propertyCount: 115,
          imageUrl: "/beach.jpg",
          imageAlt: "Chicago skyline"
        },
        {
          city: "Seattle",
          averagePrice: 135,
          propertyCount: 63,
          imageUrl: "/beach.jpg",
          imageAlt: "Seattle skyline"
        },
        {
          city: "Colorado",
          averagePrice: 85,
          propertyCount: 47,
          imageUrl: "/beach.jpg",
          imageAlt: "Lake in Colorado"
        },
        {
          city: "Miami",
          averagePrice: 115,
          propertyCount: 86,
          imageUrl: "/beach.jpg",
          imageAlt: "Beach in Miami"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped></style>
