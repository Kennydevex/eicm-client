<template>
  <div class="justify-center w-full py-12 overflow-x-hidden bg-white">
    <div class="container mx-auto ">
      <el-row>
        <el-col :span="24" class="mb-5">
          <base-section-title>Contactos</base-section-title>
        </el-col>

        <el-col :span="24" class="mt-3">
          <el-row
            :gutter="20"
            class="flex flex-col items-center justify-center md:flex-row"
          >
            <el-col :xs="24" :md="12" class="order-2 md:order-1">
              <div
                class="overflow-hidden bg-white border-4 border-white rounded-lg shadow-xl "
              >
                <coreMaps />
              </div>
            </el-col>

            <el-col :xs="24" :md="12" class="order-1 mb-8 md:mb-0 md:order-2">
              <div
                class="px-5 py-2 mt-3 transition duration-500 ease-in-out transform border rounded-lg shadow-lg rotate-3 hover:rotate-0 hover:shadow-2xl md:m-5"
              >
                <div class="mt-3 -mb-1 text-sm tracking-wide text-center uppercase text-primary">
                  Contacte a institiição
                </div>
                <el-divider ></el-divider>

                <coreFormsToContact />
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeContacts",
  data() {
    return {
      pauseOnHover: true,
      internalAutoPlaying: true
    };
  }
};
</script>
