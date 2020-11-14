<template>
  <div class="px-3">
    <Form
      ref="categoryForm"
      :model="formData"
      :rules="categoryFormValidation"
      label-position="right"
      :label-width="80"
    >
      <FormItem prop="name" label="Nome" :error="showFormErrors('name')">
        <Input v-model="formData.name" placeholder="Nome da categoria"></Input>
      </FormItem>

      <FormItem
        prop="description"
        label="Descrição da categoria"
        :error="showFormErrors('description')"
      >
        <Input
          type="textarea"
          :rows="3"
          v-model="formData.description"
          placeholder="Insira uma pequena descrição desta categoria"
        ></Input>
      </FormItem>

      <Row class="mt-5">
        <Col span="24">
          <FormItem>
            <div class="flex justify-end">
              <Button
                @click="resetFormFields('categoryForm')"
                style="margin-right: 8px"
                >Limpar</Button
              >

              <Button
                @click="
                  creating
                    ? handleModal('categories/toggleCreateCategoryDialog')
                    : handleModal('categories/toggleUpdateCategoryDialog')
                "
                >Cancelar</Button
              >

              <Button
                :loading="sending"
                type="primary"
                style="margin-left: 8px"
                @click.stop="
                  creating
                    ? addData(
                        'categoryForm',
                        'categories',
                        'Categoria Registada',
                        'APP_UPDATE_CATEGORIES_DATA',
                        'categories/toggleCreateCategoryDialog'
                      )
                    : updateData(
                        'categoryForm',
                        'categories',
                        'Categoria Atualizada',
                        'APP_UPDATE_CATEGORIES_DATA',
                        'categories/toggleUpdateCategoryDialog'
                      )
                "
                ><span v-if="!sending">{{
                  creating ? "Registar" : "Atualizar"
                }}</span>
                <span v-else>Enviando...</span></Button
              >
            </div>
          </FormItem>
        </Col>
      </Row>
    </Form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { requests } from "@/mixins/appRequest";
import { category_validation } from "@/mixins/fieldsValidation";

export default {
  name: "CategoryForm",
  mixins: [requests, category_validation],
  props: {
    creating: {
      type: Boolean,
      default: false
    },
    formData: {
      type: Object,
      default: () => {
        return {};
      }
    }
  }
};
</script>

<style lang="css"></style>
