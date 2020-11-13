<template>
  <div class="px-3">
    <Form
      ref="familyForm"
      :model="formData"
      :rules="familyFormValidation"
      label-position="right"
      :label-width="80"
    >
      <FormItem
        prop="name"
        label="Nome"
        :error="showFormErrors('name')"
      >
        <Input v-model="formData.name" placeholder="Nome da família"></Input>
      </FormItem>

      <FormItem
        prop="description"
        label="Descrição da família"
        :error="showFormErrors('description')"
      >
        <Input
          type="textarea"
          :rows="5"
          v-model="formData.description"
          placeholder="Insira uma pequena descrição desta família"
        ></Input>
      </FormItem>


      <Row class="mt-5">
        <Col span="24">
          <FormItem>
            <div class="flex justify-end">
              <Button
                @click="resetFormFields('familyForm')"
                style="margin-right: 8px"
                >Limpar</Button
              >

              <Button
                @click="
                  creating
                    ? handleModal('families/toggleCreateFamilyDialog')
                    : handleModal('families/toggleUpdateFamilyDialog')
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
                        'familyForm',
                        'families',
                        'Família registada',
                        'APP_UPDATE_FAMILIES_DATA',
                        'families/toggleCreateFamilyDialog'
                      )
                    : updateData(
                        'familyForm',
                        'families',
                        'Família Atualizada',
                        'APP_UPDATE_FAMILIES_DATA',
                        'families/toggleUpdateFamilyDialog'
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
import { family_validation } from "@/mixins/fieldsValidation";

export default {
  name: "FamilyForm",
  mixins: [requests, family_validation],
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
