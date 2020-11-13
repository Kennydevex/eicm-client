<template>
  <div class="px-3">
    <Form
      ref="departamentForm"
      :model="formData"
      :rules="departamentFormValidation"
      label-position="right"
      :label-width="80"
    >
      <FormItem
        prop="name"
        label="Nome"
        :error="showFormErrors('name')"
      >
        <Input v-model="formData.name" placeholder="Nome do departamento"></Input>
      </FormItem>

      <FormItem
        prop="description"
        label="Descrição"
        :error="showFormErrors('description')"
      >
        <Input
          type="textarea"
          :rows="3"
          v-model="formData.description"
          placeholder="Insira uma pequena descrição deste departamento"
        ></Input>
      </FormItem>

      <Row class="mt-5">
        <Col span="24">
          <FormItem>
            <div class="flex justify-end">
              <Button
                @click="resetFormFields('departamentForm')"
                style="margin-right: 8px"
                >Limpar</Button
              >

              <Button
                @click="
                  creating
                    ? handleModal('departaments/toggleCreateDepartamentDialog')
                    : handleModal('departaments/toggleUpdateDepartamentDialog')
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
                        'departamentForm',
                        'departaments',
                        'Departamento regsitado',
                        'APP_UPDATE_DEPARTAMENTS_DATA',
                        'departaments/toggleCreateDepartamentDialog'
                      )
                    : updateData(
                        'departamentForm',
                        'departaments',
                        'Departamento Atualizado',
                        'APP_UPDATE_DEPARTAMENTS_DATA',
                        'departaments/toggleUpdateDepartamentDialog'
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
import { departament_validation } from "@/mixins/fieldsValidation";

export default {
  name: "DepartamentForm",
  mixins: [requests, departament_validation],
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
