<template>
  <div class="px-3">
    <Form
      ref="chargeForm"
      :model="formData"
      :rules="chargeFormValidation"
      label-position="right"
      :label-width="80"
    >
      <FormItem
        prop="name"
        label="Nome Completo"
        :error="showFormErrors('name')"
      >
        <Input v-model="formData.name" placeholder="Nome do cargo"></Input>
      </FormItem>

      <FormItem
        prop="description"
        label="Descrição do cargo"
        :error="showFormErrors('description')"
      >
        <Input
          type="textarea"
          :rows="3"
          v-model="formData.description"
          placeholder="Insira uma pequena descrição deste cargo"
        ></Input>
      </FormItem>

      <FormItem label="Secção" prop="section">
        <RadioGroup  type="button" v-model="formData.section">
          <Radio label="1">Direção</Radio>
          <Radio label="2">Secretaria</Radio>
          <Radio label="3">Biblioteca</Radio>
          <Radio label="4">Geral</Radio>
        </RadioGroup>
      </FormItem>

      <Row class="mt-5">
        <Col span="24">
          <FormItem>
            <div class="flex justify-end">
              <Button
                @click="resetFormFields('chargeForm')"
                style="margin-right: 8px"
                >Limpar</Button
              >

              <Button
                @click="
                  creating
                    ? handleModal('charges/toggleCreateChargeDialog')
                    : handleModal('charges/toggleUpdateChargeDialog')
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
                        'chargeForm',
                        'charges',
                        'Cargo regsitado',
                        'APP_UPDATE_CHARGES_DATA',
                        'charges/toggleCreateChargeDialog'
                      )
                    : updateData(
                        'chargeForm',
                        'charges',
                        'Cargo Atualizado',
                        'APP_UPDATE_CHARGES_DATA',
                        'charges/toggleUpdateChargeDialog'
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
import { charge_validation } from "@/mixins/fieldsValidation";

export default {
  name: "ChargeForm",
  mixins: [requests, charge_validation],
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
