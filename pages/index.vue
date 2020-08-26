<template>
  <div class="layout">
    <Layout>
      <Header>
        <Menu mode="horizontal" :theme="theme1" active-name="1">
          <MenuItem name="1">
            <Icon type="ios-paper" />
            内容管理
          </MenuItem>
          <MenuItem name="2">
            <Icon type="ios-people" />
            用户管理
          </MenuItem>
          <Submenu name="3">
            <template slot="title">
              <Icon type="ios-stats" />
              统计分析
            </template>
            <MenuGroup title="使用">
              <MenuItem name="3-1">新增和启动</MenuItem>
              <MenuItem name="3-2">活跃分析</MenuItem>
              <MenuItem name="3-3">时段分析</MenuItem>
            </MenuGroup>
            <MenuGroup title="留存">
              <MenuItem name="3-4">用户留存</MenuItem>
              <MenuItem name="3-5">流失用户</MenuItem>
            </MenuGroup>
          </Submenu>
          <MenuItem name="4">
            <Icon type="ios-construct" />
            综合设置
          </MenuItem>
        </Menu>
      </Header>
      <Content :style="{ padding: '0 50px' }">
        <Breadcrumb :style="{ margin: '20px 0' }">
          <BreadcrumbItem>Home</BreadcrumbItem>
          <BreadcrumbItem>Components</BreadcrumbItem>
          <BreadcrumbItem>Layout</BreadcrumbItem>
        </Breadcrumb>
        <Card>
          <div class="rounded-full py-2 px-4">Pill shape</div>
          <div style="min-height: 200px;">
            Content

            <div class="md:flex bg-red-200 rounded-lg p-6">
              <img
                class="h-16 w-16 md:h-24 md:w-24 rounded-full mx-auto md:mx-0 md:mr-6"
                src="https://api.adorable.io/avatars/285/abott@adorable.png"
              />
              <div class="text-center md:text-left">
                <h2 class="text-lg">Erin Lindford</h2>
                <div class="text-purple-500">Product Engineer</div>
                <div class="text-gray-600">erinlindford@example.com</div>
                <div class="text-gray-600">(555) 765-4321</div>
              </div>
            </div>

            <div class="max-w-sm rounded overflow-hidden shadow-lg">
              <img
                class="w-full"
                src="/img/card-top.jpg"
                alt="Sunset in the mountains"
              />
              <div class="px-6 py-4">
                <div class="font-bold text-xl mb-2">The Coldest Sunset</div>
                <p class="text-gray-700 text-base">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Voluptatibus quia, nulla! Maiores et perferendis eaque,
                  exercitationem praesentium nihil.
                </p>
              </div>
              <div class="px-6 pt-4 pb-2">
                <span
                  class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                  >#photography</span
                >
                <span
                  class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                  >#travel</span
                >
                <span
                  class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                  >#winter</span
                >
              </div>
            </div>
          </div>
        </Card>
      </Content>
      <Footer class="layout-footer-center">2011-2016 &copy; TalkingData</Footer>
    </Layout>
  </div>
</template>

<script>
export default {
  name: "HomePage",
  layout: "landing",
  data() {
    return {
      theme1: "light"
    };
  }
};
</script>

<style scoped>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.layout-logo {
  width: 100px;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  float: left;
  position: relative;
  top: 15px;
  left: 20px;
}
.layout-nav {
  width: 420px;
  margin: 0 auto;
  margin-right: 20px;
}
.layout-footer-center {
  text-align: center;
}
</style>
