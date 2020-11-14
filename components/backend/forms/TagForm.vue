<template>
  <div class="px-3">
    <Form
      ref="tagForm"
      :model="formData"
      :rules="tagFormValidation"
      label-position="right"
      :label-width="80"
    >
      <FormItem prop="name" label="Nome" :error="showFormErrors('name')">
        <Input v-model="formData.name" placeholder="Nome do marcador"></Input>
      </FormItem>

      <FormItem
        prop="description"
        label="Descrição do marcador"
        :error="showFormErrors('description')"
      >
        <Input
          type="textarea"
          :rows="3"
          v-model="formData.description"
          placeholder="Insira uma pequena descrição deste marcador"
        ></Input>
      </FormItem>

      <Row class="mt-5">
        <Col span="24">
          <FormItem>
            <div class="flex justify-end">
              <Button
                @click="resetFormFields('tagForm')"
                style="margin-right: 8px"
                >Limpar</Button
              >

              <Button
                @click="
                  creating
                    ? handleModal('tags/toggleCreateTagDialog')
                    : handleModal('tags/toggleUpdateTagDialog')
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
                        'tagForm',
                        'tags',
                        'Marcador Registado',
                        'APP_UPDATE_TAGS_DATA',
                        'tags/toggleCreateTagDialog'
                      )
                    : updateData(
                        'tagForm',
                        'tags',
                        'Marcador Atualizado',
                        'APP_UPDATE_TAGS_DATA',
                        'tags/toggleUpdateTagDialog'
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
import { tag_validation } from "@/mixins/fieldsValidation";

export default {
  name: "TagForm",
  mixins: [requests, tag_validation],
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
