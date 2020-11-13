<template>
  <div class="px-3">
    <Form
      ref="disciplineForm"
      :model="formData"
      :rules="disciplineFormValidation"
      label-position="right"
      :label-width="80"
    >
      <FormItem
        prop="name"
        label="Nome"
        :error="showFormErrors('name')"
      >
        <Input v-model="formData.name" placeholder="Nome da disciplina"></Input>
      </FormItem>

      <FormItem
        prop="description"
        label="Descrição da disciplina"
        :error="showFormErrors('description')"
      >
        <Input
          type="textarea"
          :rows="3"
          v-model="formData.description"
          placeholder="Insira uma pequena descrição desta disciplina"
        ></Input>
      </FormItem>

      <FormItem label="Secção" prop="type">
        <RadioGroup  type="button" v-model="formData.type">
          <Radio label="1">Tipo1</Radio>
          <Radio label="2">Tipo2</Radio>
          <Radio label="3">Tipo3</Radio>
          <Radio label="4">Tipo4</Radio>
        </RadioGroup>
      </FormItem>

      <Row class="mt-5">
        <Col span="24">
          <FormItem>
            <div class="flex justify-end">
              <Button
                @click="resetFormFields('disciplineForm')"
                style="margin-right: 8px"
                >Limpar</Button
              >

              <Button
                @click="
                  creating
                    ? handleModal('disciplines/toggleCreateDisciplineDialog')
                    : handleModal('disciplines/toggleUpdateDisciplineDialog')
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
                        'disciplineForm',
                        'disciplines',
                        'Disciplina Registada',
                        'APP_UPDATE_DISCIPLINES_DATA',
                        'disciplines/toggleCreateDisciplineDialog'
                      )
                    : updateData(
                        'disciplineForm',
                        'disciplines',
                        'Disciplina Atualizada',
                        'APP_UPDATE_DISCIPLINES_DATA',
                        'disciplines/toggleUpdateDisciplineDialog'
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
import { discipline_validation } from "@/mixins/fieldsValidation";

export default {
  name: "DisciplineForm",
  mixins: [requests, discipline_validation],
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
