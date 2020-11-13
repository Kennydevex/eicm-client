<template>
  <div class="px-3">
    <Form
      ref="outcomeForm"
      :model="formData"
      :rules="outcomeFormValidation"
      label-position="right"
      :label-width="80"
    >
      <FormItem
        prop="name"
        label="Nome Completo"
        :error="showFormErrors('name')"
      >
        <Input v-model="formData.name" placeholder="Nome do saída"></Input>
      </FormItem>

      <FormItem
        prop="description"
        label="Descrição da saída"
        :error="showFormErrors('description')"
      >
        <Input
          type="textarea"
          :rows="3"
          v-model="formData.description"
          placeholder="Insira uma pequena descrição desta saída"
        ></Input>
      </FormItem>

      <FormItem label="Tipo" prop="type">
        <RadioGroup type="button" v-model="formData.type">
          <Radio label="1">Académica</Radio>
          <Radio label="2">Profissional</Radio>
        </RadioGroup>
      </FormItem>

      <Row class="mt-5">
        <Col span="24">
          <FormItem>
            <div class="flex justify-end">
              <Button
                @click="resetFormFields('outcomeForm')"
                style="margin-right: 8px"
                >Limpar</Button
              >

              <Button
                @click="
                  creating
                    ? handleModal('outcomes/toggleCreateOutcomeDialog')
                    : handleModal('outcomes/toggleUpdateOutcomeDialog')
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
                        'outcomeForm',
                        'outcomes',
                        'Outcomeo regsitado',
                        'APP_UPDATE_OUTCOMES_DATA',
                        'outcomes/toggleCreateOutcomeDialog'
                      )
                    : updateData(
                        'outcomeForm',
                        'outcomes',
                        'Outcomeo Atualizado',
                        'APP_UPDATE_OUTCOMES_DATA',
                        'outcomes/toggleUpdateOutcomeDialog'
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
import { outcome_validation } from "@/mixins/fieldsValidation";

export default {
  name: "OutcomeForm",
  mixins: [requests, outcome_validation],
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
